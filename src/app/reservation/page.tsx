'use client';

import type { ReactNode } from 'react';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import { useReservationStore } from '@/stores/reservationStore';
import {
  AvailableSlotTheme,
  AvailableThemeSlot,
  getAvailableSlotThemes,
  getThemeById,
  getThemes,
} from '@/services/themeService';
import { readyPayment } from '@/services/paymentService';
import {
  cancelReservation,
  createReservation,
  holdSlot,
  releaseSlot,
} from '@/services/reservationService';
import { Theme } from '@/types/theme';
import { AxiosError } from 'axios';
import { loadTossPaymentWindow } from '@/lib/tossPayments';
import {
  clearPendingPaymentSession,
  savePendingPaymentSession,
} from '@/lib/reservationPaymentSession';

const SORT_OPTIONS = [
  { value: 'popular', label: '인기순' },
  { value: 'latest', label: '최신순' },
] as const;
const PER_PAGE = 5;
const TEEN_PRICE = 20000;
const TOSS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
const TOSS_CUSTOMER_KEY = 'ANONYMOUS';

function getApiErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    const body = error.response?.data as { message?: string; error?: string } | undefined;
    return body?.message ?? body?.error ?? error.message;
  }

  if (error instanceof Error) return error.message;
  return '요청 처리 중 오류가 발생했습니다.';
}

function getUpcomingDates(count = 3) {
  const today = new Date();
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(today);
    date.setDate(date.getDate() + index);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const relativeLabels = ['오늘', '내일', '모레'];

    return {
      dateStr: `${date.getFullYear()}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      label: `${relativeLabels[index] ?? `${index + 1}일 후`} ${month}.${day}(${days[date.getDay()]})`,
    };
  });
}

function formatDateLabel(dateStr: string) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${dateStr} (${days[date.getDay()]})`;
}

function formatPrice(value: number) {
  return `${value.toLocaleString('ko-KR')}원`;
}

function formatSlotTime(value: string) {
  return value.slice(0, 5);
}

function formatSlotRange(slot: AvailableThemeSlot) {
  return slot.endTime ? `${formatSlotTime(slot.startTime)}~${formatSlotTime(slot.endTime)}` : formatSlotTime(slot.startTime);
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-5 flex items-center gap-3 text-[15px] font-black text-[#f5f5f5]">
      <span className="h-5 w-1 rounded-full bg-[#e63946] shadow-[0_0_16px_rgba(230,57,70,0.35)]" />
      {children}
    </h2>
  );
}

function CustomCheckbox({
  checked,
  onChange,
  label,
  badge,
  emphasized = false,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  badge?: '필수' | '선택';
  emphasized?: boolean;
}) {
  return (
    <label
      className={[
        'group flex cursor-pointer items-center gap-3 rounded-[12px] border transition-all',
        emphasized
          ? 'border-white/[0.1] bg-[#101010] px-4 py-3 hover:border-[#e63946]/45'
          : 'border-transparent px-1 py-2 hover:bg-white/[0.025]',
      ].join(' ')}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span
        className={[
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border text-[12px] font-black transition-all',
          checked
            ? 'border-[#e63946] bg-[#e63946] text-white shadow-[0_0_16px_rgba(230,57,70,0.28)]'
            : 'border-white/[0.18] bg-[#080808] text-transparent group-hover:border-[#e63946]/50',
        ].join(' ')}
      >
        ✓
      </span>
      <span className="min-w-0 flex-1">
        {badge && (
          <span
            className={[
              'mr-2 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-black leading-none',
              badge === '필수'
                ? 'border-[#e63946]/35 bg-[#e63946]/10 text-[#ff6b6b]'
                : 'border-white/[0.12] bg-white/[0.04] text-[#8d8d8d]',
            ].join(' ')}
          >
            {badge}
          </span>
        )}
        <span className={emphasized ? 'text-sm font-black text-[#f5f5f5]' : 'text-[13px] font-semibold text-[#a8a8a8]'}>
          {label}
        </span>
      </span>
    </label>
  );
}

function mapAvailableThemeToTheme(item: AvailableSlotTheme): Theme {
  return {
    id: item.themeId,
    title: item.themeTitle,
    description: item.description ?? '',
    genre: item.tags ?? '',
    difficulty: item.difficulty ?? 0,
    horrorLevel: item.horrorLevel ?? 0,
    minPlayers: item.minPeople ?? 0,
    maxPlayers: item.maxPeople ?? 0,
    duration: item.playTime ?? 0,
    price: item.price ?? 0,
    imageUrl: item.thumbnailUrl ?? '',
    rating: item.rating ?? 0,
    reviewCount: item.reviewCount ?? 0,
    locationName: item.region,
    branchName: item.branchName,
  };
}

function StepBar({ step }: { step: 1 | 2 }) {
  const steps = [
    { n: 1, label: '지점/테마/시간 선택' },
    { n: 2, label: '예약 확인/결제' },
    { n: 3, label: '예약 완료' },
  ];

  return (
    <div className="relative border-b border-white/[0.08] bg-[#080808]/88 shadow-[0_10px_34px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1480px] items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
        {steps.map((item, index) => (
          <div key={item.n} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={[
                  'flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-black transition-all',
                  step > item.n
                    ? 'border-[#5fa889]/45 bg-[#16352b] text-[#9ad8c0]'
                    : step === item.n
                      ? 'border-[#e63946] bg-[#e63946] text-white shadow-[0_0_18px_rgba(230,57,70,0.24)]'
                      : 'border-white/[0.14] bg-[#101010] text-[#555]',
                ].join(' ')}
              >
                {step > item.n ? '✓' : item.n}
              </div>
              <span className={['hidden text-xs sm:inline', step === item.n ? 'font-black text-[#f5f5f5]' : step > item.n ? 'font-bold text-[#8aa99c]' : 'font-bold text-[#555]'].join(' ')}>
                {item.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={['mx-3 h-px w-10 sm:w-20', step > item.n ? 'bg-[#5fa889]/45' : 'bg-white/[0.1]'].join(' ')} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReservationSkullIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M8 1.7c-3.1 0-5.2 2.1-5.2 5.1 0 1.8.8 3.2 2 4v2.1c0 .8.6 1.4 1.4 1.4h3.6c.8 0 1.4-.6 1.4-1.4v-2.1c1.2-.8 2-2.2 2-4 0-3-2.1-5.1-5.2-5.1Zm-2.1 7.6c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4Zm2.1 1.5c-.4 0-.8-.3-.8-.7 0-.3.5-1.2.8-1.7.3.5.8 1.4.8 1.7 0 .4-.4.7-.8.7Zm2.1-1.5c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4ZM6.1 12.1h.8v1h-.8v-1Zm1.5 0h.8v1h-.8v-1Zm1.5 0h.8v1h-.8v-1Z"
      />
    </svg>
  );
}

function ReservationLockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M4.2 6.7V5.2C4.2 3 5.8 1.5 8 1.5s3.8 1.5 3.8 3.7v1.5h.4c.8 0 1.3.6 1.3 1.3v5.1c0 .8-.6 1.4-1.4 1.4H3.9c-.8 0-1.4-.6-1.4-1.4V8c0-.8.6-1.3 1.3-1.3h.4Zm1.7 0h4.2V5.2c0-1.2-.8-2-2.1-2s-2.1.8-2.1 2v1.5Z"
      />
    </svg>
  );
}

function ReservationRatingIcons({
  level,
  type,
}: {
  level: number;
  type: 'horror' | 'difficulty';
}) {
  const Icon = type === 'horror' ? ReservationSkullIcon : ReservationLockIcon;
  const activeColor = type === 'horror' ? 'text-[#c94a4a]' : 'text-[#d7b46a]';
  const activeShadow =
    type === 'horror'
      ? 'drop-shadow-[0_0_5px_rgba(204,34,34,0.16)]'
      : 'drop-shadow-[0_0_5px_rgba(215,180,106,0.2)]';

  return (
    <span className="inline-flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Icon
          key={index}
          className={[
            'h-4 w-4 transition-all',
            index < level ? `${activeColor} ${activeShadow} opacity-100` : 'text-[#303030] opacity-45',
          ].join(' ')}
        />
      ))}
    </span>
  );
}

function FilterRatingControl({
  label,
  value,
  type,
  onChange,
}: {
  label: string;
  value: number;
  type: 'horror' | 'difficulty';
  onChange: (value: number) => void;
}) {
  const Icon = type === 'horror' ? ReservationSkullIcon : ReservationLockIcon;
  const activeColor = type === 'horror' ? 'text-[#c94a4a]' : 'text-[#d7b46a]';

  return (
    <div className="mb-6">
      <h3 className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#9a9a9a]">{label}</h3>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(0)}
          className={[
            'h-8 rounded-full border px-3 text-xs font-black transition-all',
            value === 0
              ? 'border-[#cc2222]/60 bg-[#cc2222]/12 text-[#ef5353]'
              : 'border-white/[0.1] text-[#8a8a8a] hover:border-white/20 hover:text-[#d8d8d8]',
          ].join(' ')}
        >
          전체
        </button>
        <div className="flex min-w-0 flex-1 items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => {
            const level = index + 1;
            const isActive = value >= level;

            return (
              <button
                key={level}
                type="button"
                onClick={() => onChange(level)}
                aria-label={`${label} ${level}단계`}
                className="flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors hover:bg-white/[0.05]"
              >
                <Icon
                  className={[
                    'h-[17px] w-[17px] transition-all',
                    isActive ? `${activeColor} opacity-100` : 'text-[#343434] opacity-55 hover:text-[#5a5a5a] hover:opacity-75',
                  ].join(' ')}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ThemeListRow({
  item,
  selectedDate,
  onQuickBook,
}: {
  item: AvailableSlotTheme;
  selectedDate: string;
  onQuickBook: (item: AvailableSlotTheme, slot: AvailableThemeSlot) => void;
}) {
  const [selectedSlot, setSelectedSlot] = useState<AvailableThemeSlot | null>(null);
  const [showTimeNotice, setShowTimeNotice] = useState(false);

  const slots = item.availableSlots.filter((slot) => slot.slotDate === selectedDate);
  const showcaseDescription =
    item.description ||
    `${item.themeTitle}의 예약 가능한 시간을 확인하고 바로 예약을 진행해보세요.`;

  const handleBook = () => {
    if (!selectedSlot) {
      setShowTimeNotice(true);
      return;
    }
    onQuickBook(item, selectedSlot);
  };

  useEffect(() => {
    setSelectedSlot(null);
    setShowTimeNotice(false);
  }, [item.themeId, selectedDate]);

  return (
    <div className="mx-auto w-full max-w-[1120px] overflow-hidden rounded-[12px] border border-white/[0.08] bg-[#171717] shadow-[0_14px_34px_rgba(0,0,0,0.22)] transition-all duration-300 hover:border-[#cc2222]/70 hover:bg-[#1b1b1b] hover:shadow-[0_18px_48px_rgba(204,34,34,0.16)]">
      <div className="grid min-h-[308px] grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)_380px]">
        <div className="relative min-h-[300px] shrink-0 overflow-hidden bg-[#111] lg:min-h-0">
          <ImageWithFallback
            src={item.thumbnailUrl}
            fallbackSrc="/images/theme-placeholder.png"
            alt={item.themeTitle}
            fill
            className="object-cover brightness-[0.76] contrast-110 saturate-[0.82]"
            sizes="(max-width: 1024px) 100vw, 300px"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0)_58%,rgba(0,0,0,0.36)_88%,#151515_100%)]" />
        </div>

        <div className="contents">
          <div className="flex min-w-0 flex-col justify-center border-y border-white/[0.08] px-[28px] py-7 lg:border-x lg:border-y-0">
            <h3 className="flex min-w-0 items-baseline gap-2 text-[22px] font-black leading-tight text-white">
              <span className="min-w-0 shrink truncate">{item.themeTitle}</span>
              <span className="min-w-0 truncate text-[12px] font-bold text-[#8a8a8a]">· {item.branchName}</span>
            </h3>

            <div className="mt-4 space-y-2.5 text-[12px] leading-none text-[#888]">
              <div className="grid grid-cols-[48px_1fr]">
                <span>별점</span>
                <span className="flex items-center gap-3">
                  <span className="text-[15px] tracking-[0.08em] text-[#f39c12]">★★★★★</span>
                  <strong className="text-[14px] font-black text-[#f5f5f5]">{(item.rating ?? 0).toFixed(1)}</strong>
                  <span className="text-[#5f5f5f]">({item.reviewCount ?? 0})</span>
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="inline-flex items-center gap-3">
                  <span>난이도</span>
                  <ReservationRatingIcons level={item.difficulty ?? 0} type="difficulty" />
                </span>
                <span className="inline-flex items-center gap-3">
                  <span>공포도</span>
                  <ReservationRatingIcons level={item.horrorLevel ?? 0} type="horror" />
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[#7f8791]">
                <span>인원 {item.minPeople ?? 0}~{item.maxPeople ?? 0}명</span>
                {item.playTime && <span>시간 {item.playTime}분</span>}
                <span className="font-bold text-[#c6c6c6]">가격 {(item.price ?? 0).toLocaleString('ko-KR')}원</span>
                {(item.region || item.branchName) && (
                  <span>{[item.region, item.branchName].filter(Boolean).join(' · ')}</span>
                )}
              </div>
            </div>

            <p className="mt-[22px] max-w-[320px] overflow-hidden whitespace-pre-line text-[13px] font-medium leading-[1.72] text-[#b0b0b0] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
              {showcaseDescription}
            </p>
          </div>

          <div className="flex min-h-[308px] min-w-0 flex-col justify-center px-5 py-5">
            <div className="border-b border-white/[0.08] pb-3">
              <p className="text-[11px] font-black tracking-[0.2em] text-[#cc2222]">예약 가능 시간</p>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-1.5">
              {slots.map((slot) => {
                const isAvailable = !slot.status || slot.status === 'SLOT_AVAILABLE';
                const isSelected = selectedSlot?.timeSlotId === slot.timeSlotId;

                return (
                  <button
                    key={slot.timeSlotId}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => {
                      setSelectedSlot(slot);
                      setShowTimeNotice(false);
                    }}
                    className={[
                      'h-[38px] min-w-0 rounded-[7px] border text-[12px] font-bold transition-colors',
                      !isAvailable
                        ? 'cursor-not-allowed border-white/[0.05] bg-[#101010] text-[#444] line-through'
                        : isSelected
                          ? 'border-[#e12225] bg-[#e12225] text-white shadow-[0_0_16px_rgba(204,34,34,0.22)]'
                          : 'border-white/[0.1] bg-[#171717] text-[#d8d8d8] hover:border-[#cc2222]/65 hover:bg-[#cc2222]/10',
                    ].join(' ')}
                  >
                    {formatSlotTime(slot.startTime)}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleBook}
              disabled={!selectedSlot}
              className={[
                'mt-6 h-10 w-full rounded-[8px] text-[13px] font-black transition-colors',
                selectedSlot
                  ? 'bg-[#cc2222] text-white hover:bg-[#e23b3b] hover:shadow-[0_0_22px_rgba(204,34,34,0.22)]'
                  : 'cursor-not-allowed bg-[#cc2222]/55 text-white/60',
              ].join(' ')}
            >
              빠른 예약하기
            </button>
            {showTimeNotice && (
              <p className="mt-2 text-center text-[12px] font-bold text-[#ef5353]">
                예약 시간을 선택해주세요.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemeFilterSidebar({
  locations,
  selectedLocations,
  difficulty,
  horrorLevel,
  minPlayers,
  minRating,
  sort,
  onResetLocations,
  onToggleLocation,
  onDifficulty,
  onHorrorLevel,
  onMinPlayers,
  onMinRating,
  onSort,
  onResetFilters,
}: {
  locations: string[];
  selectedLocations: string[];
  difficulty: number;
  horrorLevel: number;
  minPlayers: number;
  minRating: number;
  sort: 'popular' | 'latest';
  onResetLocations: () => void;
  onToggleLocation: (location: string) => void;
  onDifficulty: (value: number) => void;
  onHorrorLevel: (value: number) => void;
  onMinPlayers: (value: number) => void;
  onMinRating: (value: number) => void;
  onSort: (value: 'popular' | 'latest') => void;
  onResetFilters: () => void;
}) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  return (
    <aside className="hidden rounded-[18px] border border-white/[0.08] bg-[#171717]/92 p-5 shadow-[0_18px_44px_rgba(0,0,0,0.28)] backdrop-blur md:block lg:sticky lg:top-24 lg:self-start">
      <input
        type="text"
        placeholder="테마 검색"
        className="mb-3 h-11 w-full rounded-[10px] border border-white/[0.1] bg-[#101010] px-3 text-sm font-semibold text-[#f5f5f5] outline-none transition-colors placeholder:text-[#555] focus:border-[#cc2222]/80"
      />

      <Link
        href="/ai-recommend"
        className="mb-7 block h-11 w-full rounded-[10px] border border-[#cc2222]/45 bg-[#cc2222]/10 text-center text-sm font-black leading-[44px] text-[#ef5353] transition-all hover:border-[#cc2222]/80 hover:bg-[#cc2222]/16 hover:text-white hover:shadow-[0_0_20px_rgba(204,34,34,0.14)]"
      >
        AI 테마 추천받기
      </Link>

      <div className="mb-6">
        <h3 className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#9a9a9a]">지역</h3>
        <div className="grid grid-cols-2 gap-1.5">
          {['전체', ...locations].map((location) => {
            const isAll = location === '전체';
            const isActive = isAll ? selectedLocations.length === 0 : selectedLocations.includes(location);

            return (
              <button
                key={location}
                type="button"
                onClick={isAll ? onResetLocations : () => onToggleLocation(location)}
                className={[
                  'flex h-9 items-center justify-center rounded-full border px-3 text-sm font-bold transition-all',
                  isActive
                    ? 'border-[#cc2222]/60 bg-[#cc2222]/12 text-[#ef5353]'
                    : 'border-white/[0.1] bg-[#101010] text-[#cfcfcf] hover:border-white/20 hover:bg-[#202020]',
                ].join(' ')}
              >
                {location}
              </button>
            );
          })}
        </div>
      </div>

      <FilterRatingControl label="난이도" value={difficulty} type="difficulty" onChange={onDifficulty} />
      <FilterRatingControl label="공포도" value={horrorLevel} type="horror" onChange={onHorrorLevel} />

      <div className="mb-6">
        <h3 className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#9a9a9a]">인원 수</h3>
        <div className="flex flex-wrap gap-1.5">
          {[0, 2, 3, 4].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onMinPlayers(value)}
              className={[
                'rounded-full border px-2.5 py-1.5 text-xs font-bold transition-all',
                minPlayers === value
                  ? 'border-[#cc2222]/70 bg-[#cc2222]/12 text-[#ef5353]'
                  : 'border-white/[0.1] text-[#8a8a8a] hover:border-white/20 hover:text-[#d8d8d8]',
              ].join(' ')}
            >
              {value === 0 ? '전체' : `${value}명+`}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#9a9a9a]">평점 범위</h3>
        <div className="flex flex-wrap gap-1.5">
          {[0, 4.0, 4.5, 4.8].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onMinRating(value)}
              className={[
                'rounded-full border px-2.5 py-1.5 text-xs font-bold transition-all',
                minRating === value
                  ? 'border-[#cc2222]/70 bg-[#cc2222]/12 text-[#ef5353]'
                  : 'border-white/[0.1] text-[#8a8a8a] hover:border-white/20 hover:text-[#d8d8d8]',
              ].join(' ')}
            >
              {value === 0 ? '전체' : `${value}+`}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-7">
        <h3 className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#9a9a9a]">정렬</h3>
        <div ref={sortDropdownRef} className="relative">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isSortOpen}
            onClick={() => setIsSortOpen((open) => !open)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setIsSortOpen(false);
            }}
            className={[
              'flex h-10 w-full items-center justify-between rounded-[10px] border bg-[#101010] pl-3 pr-3 text-left text-sm font-bold text-[#f5f5f5] outline-none transition-all',
              isSortOpen ? 'border-[#cc2222]/70 shadow-[0_0_18px_rgba(204,34,34,0.14)]' : 'border-white/[0.1] hover:border-white/20',
            ].join(' ')}
          >
            <span>{SORT_OPTIONS.find((option) => option.value === sort)?.label}</span>
            <span
              aria-hidden="true"
              className={['ml-3 text-[10px] text-[#8a8a8a] transition-transform', isSortOpen ? 'rotate-180 text-[#ef5353]' : ''].join(' ')}
            >
              ▼
            </span>
          </button>

          {isSortOpen && (
            <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-[10px] border border-white/[0.1] bg-[#101010] shadow-[0_18px_36px_rgba(0,0,0,0.42)]">
              <ul role="listbox" aria-label="정렬 방식" className="p-1">
                {SORT_OPTIONS.map((option) => {
                  const isSelected = sort === option.value;

                  return (
                    <li key={option.value} role="option" aria-selected={isSelected}>
                      <button
                        type="button"
                        onClick={() => {
                          onSort(option.value);
                          setIsSortOpen(false);
                        }}
                        className={[
                          'flex h-9 w-full items-center justify-between rounded-[8px] px-3 text-left text-sm font-bold transition-colors',
                          isSelected ? 'bg-[#cc2222]/12 text-[#ef5353]' : 'text-[#b8b8b8] hover:bg-white/[0.06] hover:text-[#f2f2f2]',
                        ].join(' ')}
                      >
                        <span>{option.label}</span>
                        {isSelected && <span className="text-[10px] text-[#ef5353]">●</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onResetFilters}
        className="h-11 w-full rounded-[10px] border border-white/[0.12] bg-transparent text-sm font-black text-[#b8b8b8] transition-all hover:border-[#cc2222]/55 hover:bg-[#cc2222]/8 hover:text-[#f2f2f2]"
      >
        필터 초기화
      </button>
    </aside>
  );
}

function BrowseStep({ onBook }: { onBook: (item: AvailableSlotTheme, slot: AvailableThemeSlot) => void }) {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState(0);
  const [horrorLevel, setHorrorLevel] = useState(0);
  const [minPlayers, setMinPlayers] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<'popular' | 'latest'>('popular');
  const [page, setPage] = useState(1);
  const [activeDateIdx, setActiveDateIdx] = useState(0);
  const [availableThemes, setAvailableThemes] = useState<AvailableSlotTheme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const dates = useMemo(() => getUpcomingDates(), []);
  const selectedDate = dates[activeDateIdx]?.dateStr ?? dates[0]?.dateStr ?? '';
  const availableLocations = useMemo(
    () =>
      Array.from(
        new Set(
          availableThemes
            .map((theme) => theme.region || theme.branchName)
            .filter((location): location is string => Boolean(location)),
        ),
      ),
    [availableThemes],
  );

  useEffect(() => {
    if (!selectedDate) return;

    let isMounted = true;

    setIsLoading(true);
    setErrorMessage('');
    setPage(1);

    getAvailableSlotThemes(selectedDate, selectedDate)
      .then((themes) => {
        if (!isMounted) return;

        const filteredByDate = themes
          .map((theme) => ({
            ...theme,
            availableSlots: theme.availableSlots.filter((slot) => slot.slotDate === selectedDate),
          }))
          .filter((theme) => theme.availableSlots.length > 0);

        setAvailableThemes(filteredByDate);
      })
      .catch(() => {
        if (!isMounted) return;
        setAvailableThemes([]);
        setErrorMessage('예약 가능 정보를 불러오지 못했습니다');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedDate]);

  const filtered = useMemo(() => {
    let list = [...availableThemes];
    if (selectedLocations.length > 0) {
      list = list.filter((theme) => selectedLocations.includes(theme.region || theme.branchName));
    }
    if (difficulty > 0) list = list.filter((theme) => theme.difficulty === difficulty);
    if (horrorLevel > 0) list = list.filter((theme) => theme.horrorLevel === horrorLevel);
    if (minPlayers > 0) list = list.filter((theme) => (theme.maxPeople ?? 0) >= minPlayers);
    if (minRating > 0) list = list.filter((theme) => (theme.rating ?? 0) >= minRating);
    if (sort === 'popular') list.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
    else list.sort((a, b) => b.themeId - a.themeId);
    return list;
  }, [availableThemes, selectedLocations, difficulty, horrorLevel, minPlayers, minRating, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const setFilter = <T,>(setter: (value: T) => void, value: T) => {
    setter(value);
    setPage(1);
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations((current) =>
      current.includes(location) ? current.filter((item) => item !== location) : [...current, location],
    );
    setPage(1);
  };

  const resetFilters = () => {
    setSelectedLocations([]);
    setDifficulty(0);
    setHorrorLevel(0);
    setMinPlayers(0);
    setMinRating(0);
    setSort('popular');
    setPage(1);
  };

  return (
    <div className="relative mx-auto max-w-[1480px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <nav className="mb-8 flex items-center gap-1.5 text-xs font-bold text-[#777]">
        <Link href="/" className="transition-colors hover:text-[#f5f5f5]">홈</Link>
        <span>›</span>
        <span className="text-[#f5f5f5]">빠른 예약</span>
      </nav>

      <div className="mb-10 border-b border-white/[0.08] pb-8">
        <p className="mb-3 text-[10px] font-black tracking-[0.32em] text-[#cc2222]">
          {'// QUICK RESERVATION'}
        </p>
        <h1 className="text-[34px] font-black leading-tight text-[#f5f5f5] md:text-[44px]">
          🔥 빠른 <span className="text-[#e63946]">예약</span>
        </h1>
        <p className="mt-3 max-w-[620px] text-[15px] leading-7 text-[#a0a0a0]">
          GrimGate의 테마를 지점과 시간대별로 빠르게 찾아보세요.
        </p>
      </div>

      <div className="grid gap-7 lg:grid-cols-[240px_1fr] lg:gap-7 xl:grid-cols-[248px_1fr]">
        <ThemeFilterSidebar
          locations={availableLocations}
          selectedLocations={selectedLocations}
          difficulty={difficulty}
          horrorLevel={horrorLevel}
          minPlayers={minPlayers}
          minRating={minRating}
          sort={sort}
          onResetLocations={() => {
            setSelectedLocations([]);
            setPage(1);
          }}
          onToggleLocation={toggleLocation}
          onDifficulty={(value) => setFilter(setDifficulty, value)}
          onHorrorLevel={(value) => setFilter(setHorrorLevel, value)}
          onMinPlayers={(value) => setFilter(setMinPlayers, value)}
          onMinRating={(value) => setFilter(setMinRating, value)}
          onSort={(value) => setFilter(setSort, value)}
          onResetFilters={resetFilters}
        />

        <div className="min-w-0">
          <div className="sticky top-0 z-20 mb-5 space-y-3 bg-[#0b0b0b]/95 py-2 backdrop-blur">
            <div className="grid grid-cols-3 overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#171717]/90">
              {dates.map((date, index) => {
                const isActive = activeDateIdx === index;

                return (
                  <button
                    key={date.dateStr}
                    type="button"
                    onClick={() => {
                      setActiveDateIdx(index);
                      setPage(1);
                    }}
                    className={[
                      'relative h-12 text-center text-sm font-black transition-colors',
                      isActive ? 'bg-[#cc2222]/14 text-[#ef5353]' : 'text-[#d8d8d8] hover:bg-white/[0.04] hover:text-white',
                    ].join(' ')}
                  >
                    {date.label}
                    {isActive && <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#e12225]" />}
                  </button>
                );
              })}
            </div>

            <div className="flex h-11 items-center justify-between rounded-[14px] border border-white/[0.08] bg-[#171717]/90 px-4">
              <span className="text-sm text-[#888]">
                <span className="font-bold text-[#f5f5f5]">{filtered.length}</span>개의 테마
              </span>
              <span className="text-xs font-bold text-[#aaa]">{formatDateLabel(selectedDate)}</span>
            </div>
          </div>

          {isLoading ? (
            <div className="rounded-[14px] border border-white/[0.08] bg-[#171717] py-20 text-center text-sm font-bold text-[#888]">
              예약 가능 정보를 불러오는 중입니다.
            </div>
          ) : errorMessage ? (
            <div className="rounded-[14px] border border-[#cc2222]/35 bg-[#171717] py-20 text-center">
              <p className="text-sm font-black text-[#ef5353]">{errorMessage}</p>
              <p className="mt-2 text-xs text-[#777]">잠시 후 다시 시도해주세요.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {paged.map((theme) => (
                <ThemeListRow
                  key={`${theme.themeId}-${theme.branchId}`}
                  item={theme}
                  selectedDate={selectedDate}
                  onQuickBook={onBook}
                />
              ))}
              {paged.length === 0 && (
                <div className="rounded-[14px] border border-white/[0.08] bg-[#171717] py-20 text-center text-[#888]">
                  <p className="text-sm font-black text-[#d8d8d8]">
                    {availableThemes.length === 0 ? '선택한 날짜에 예약 가능한 테마가 없습니다' : '조건에 맞는 테마가 없습니다.'}
                  </p>
                  <p className="mt-2 text-xs text-[#777]">
                    {availableThemes.length === 0 ? '다른 날짜를 선택해주세요.' : '필터를 조정해보세요.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {!isLoading && !errorMessage && totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-1">
              <button
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page === 1}
                className="flex h-8 w-8 items-center justify-center rounded border border-[#2a2a2a] text-[#888] transition-colors hover:border-[#e63946] hover:text-[#e63946] disabled:opacity-30"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index + 1)}
                  className={[
                    'flex h-8 w-8 items-center justify-center rounded border text-sm transition-colors',
                    page === index + 1
                      ? 'border-[#e63946] bg-[#e63946]/10 text-[#e63946]'
                      : 'border-[#2a2a2a] text-[#888] hover:border-[#555]',
                  ].join(' ')}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                disabled={page === totalPages}
                className="flex h-8 w-8 items-center justify-center rounded border border-[#2a2a2a] text-[#888] transition-colors hover:border-[#e63946] hover:text-[#e63946] disabled:opacity-30"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PaymentStep({
  theme,
  date,
  time,
  slot,
  timeSlotId,
  onBack,
}: {
  theme: Theme;
  date: string;
  time: string;
  slot?: AvailableThemeSlot | null;
  timeSlotId?: number | null;
  onBack: () => void;
}) {
  const {
    setTheme,
    setLocation,
    setDateTime,
    setHeadcount,
    setReservationResult,
  } = useReservationStore();

  const [adultCount, setAdultCount] = useState(2);
  const [teenCount, setTeenCount] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeCancellation, setAgreeCancellation] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flowError, setFlowError] = useState('');
  const [readyResult, setReadyResult] = useState<{
    reservationId: number;
    paymentId: number;
    orderId: string;
    amount: number;
    status: string;
    orderName: string;
    customerName?: string;
    customerEmail?: string;
  } | null>(null);
  const [isRequestingPayment, setIsRequestingPayment] = useState(false);

  const requiredAgreed = agreeTerms && agreePrivacy && agreeCancellation;
  const agreeAll = requiredAgreed && agreeMarketing;
  const totalPlayers = adultCount + teenCount;
  const totalAmount = adultCount * (theme.price ?? 25000) + teenCount * TEEN_PRICE;
  const displayTime = slot ? formatSlotRange(slot) : time;
  const selectedTimeSlotId = slot?.timeSlotId ?? timeSlotId ?? null;
  const displayThemeTitle = theme.title?.trim() || '선택한 테마';
  const adultSubtotal = adultCount * (theme.price ?? 25000);
  const teenSubtotal = teenCount * TEEN_PRICE;
  const canPay =
    requiredAgreed &&
    totalPlayers > 0 &&
    Boolean(selectedTimeSlotId) &&
    !isSubmitting &&
    !readyResult;
  const canRequestPayment =
    Boolean(readyResult) &&
    !isSubmitting &&
    !isRequestingPayment;

  const handleAgreeAll = (checked: boolean) => {
    setAgreeTerms(checked);
    setAgreePrivacy(checked);
    setAgreeCancellation(checked);
    setAgreeMarketing(checked);
  };

  const handlePay = async () => {
    if (!requiredAgreed || !selectedTimeSlotId || isSubmitting) return;

    setIsSubmitting(true);
    setFlowError('');
    let holdToken = '';
    let reservationId: number | null = null;

    try {
      const hold = await holdSlot(selectedTimeSlotId);
      holdToken = hold.holdToken;

      const reservation = await createReservation({
        timeSlotId: selectedTimeSlotId,
        holdToken,
        peopleCount: totalPlayers,
        termsAgreed: agreeTerms,
      });
      reservationId = reservation.reservationId;

      const paymentReady = await readyPayment({
        reservationId: reservation.reservationId,
        amount: reservation.totalPrice,
      });

      setTheme(theme.id, displayThemeTitle, theme.imageUrl);
      setLocation(theme.locationName ?? '', theme.branchName ?? '');
      setDateTime(date, displayTime, selectedTimeSlotId);
      setHeadcount(adultCount, teenCount);
      setReservationResult({
        reservationId: reservation.reservationId,
        paymentId: paymentReady.paymentId,
        orderId: paymentReady.orderId,
        paymentStatus: paymentReady.status,
        totalAmount: paymentReady.amount,
      });
      setReadyResult({
        reservationId: paymentReady.reservationId,
        paymentId: paymentReady.paymentId,
        orderId: paymentReady.orderId,
        amount: paymentReady.amount,
        status: paymentReady.status,
        orderName: paymentReady.orderName,
        customerName: paymentReady.customerName,
        customerEmail: paymentReady.customerEmail,
      });
      savePendingPaymentSession(paymentReady, {
        themeId: theme.id,
        themeTitle: displayThemeTitle,
        themeImageUrl: theme.imageUrl,
        locationName: theme.locationName,
        branchName: theme.branchName,
        timeSlotId: selectedTimeSlotId,
        date,
        time: displayTime,
        adultCount,
        teenCount,
      });
    } catch (error) {
      if (reservationId) {
        try {
          await cancelReservation(reservationId);
        } catch {
          // 결제 준비 실패 후 예약 취소까지 실패하면 서버 정리 배치/관리자 확인이 필요합니다.
        }
      } else if (holdToken) {
        try {
          await releaseSlot(selectedTimeSlotId, holdToken);
        } catch {
          // hold는 5분 TTL이 있어 release 실패 시에도 자동 만료됩니다.
        }
      }

      setFlowError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelPending = async () => {
    if (!readyResult || isSubmitting) return;

    setIsSubmitting(true);
    setFlowError('');

    try {
      await cancelReservation(readyResult.reservationId);
      clearPendingPaymentSession();
      setReadyResult(null);
    } catch (error) {
      setFlowError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestPayment = async () => {
    if (!readyResult || isRequestingPayment) return;

    if (!TOSS_CLIENT_KEY) {
      setFlowError('NEXT_PUBLIC_TOSS_CLIENT_KEY 환경변수가 필요합니다.');
      return;
    }

    const origin = window.location.origin;
    const successUrl = new URL('/reservation/payment/success', origin);
    successUrl.searchParams.set('reservationId', String(readyResult.reservationId));
    successUrl.searchParams.set('paymentId', String(readyResult.paymentId));

    const failUrl = new URL('/reservation/payment/fail', origin);
    failUrl.searchParams.set('reservationId', String(readyResult.reservationId));
    failUrl.searchParams.set('paymentId', String(readyResult.paymentId));
    failUrl.searchParams.set('orderId', readyResult.orderId);
    failUrl.searchParams.set('amount', String(readyResult.amount));

    setIsRequestingPayment(true);
    setFlowError('');

    try {
      const payment = await loadTossPaymentWindow(TOSS_CLIENT_KEY, TOSS_CUSTOMER_KEY);

      await payment.requestPayment({
        method: 'CARD',
        amount: {
          currency: 'KRW',
          value: readyResult.amount,
        },
        orderId: readyResult.orderId,
        orderName: readyResult.orderName,
        successUrl: successUrl.toString(),
        failUrl: failUrl.toString(),
        customerName: readyResult.customerName,
        customerEmail: readyResult.customerEmail,
      });
    } catch (error) {
      setFlowError(getApiErrorMessage(error));
      try {
        await cancelReservation(readyResult.reservationId);
        clearPendingPaymentSession();
        setReadyResult(null);
      } catch {
        // 결제창 호출 실패 후 예약 취소 실패는 서버 상태 확인이 필요합니다.
      }
    } finally {
      setIsRequestingPayment(false);
    }
  };

  return (
    <div className="relative mx-auto max-w-5xl px-4 pb-28 pt-8 sm:px-6 lg:px-8 lg:pb-12">
      <div className="mb-7">
        <p className="mb-2 text-[10px] font-black tracking-[0.32em] text-[#cc2222]">
          {'// RESERVATION CHECKOUT'}
        </p>
        <h1 className="text-[30px] font-black leading-tight text-[#f5f5f5] sm:text-[38px]">
          예약 확인과 <span className="text-[#e63946]">결제</span>
        </h1>
      </div>

      <div className="space-y-6">
        <section className="overflow-hidden rounded-[18px] border border-white/[0.08] bg-[linear-gradient(180deg,#151515_0%,#101010_64%,rgba(230,57,70,0.08)_100%)] shadow-[0_24px_70px_rgba(0,0,0,0.38),0_0_34px_rgba(230,57,70,0.05)] backdrop-blur">
          <div className="relative aspect-[16/9] overflow-hidden bg-[#080808] md:aspect-[21/9]">
            <ImageWithFallback
              src={theme.imageUrl}
              fallbackSrc="/images/theme-placeholder.png"
              alt={displayThemeTitle}
              fill
              className="object-cover object-[center_56%] brightness-[0.9] contrast-110 saturate-[0.94]"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.02)_32%,rgba(0,0,0,0.54)_70%,rgba(0,0,0,0.86)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 lg:p-8">
              <h2 className="max-w-[780px] break-keep text-[32px] font-black leading-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.88)] sm:text-[44px] lg:text-[52px]">
                {displayThemeTitle}
              </h2>
              {(theme.locationName || theme.branchName) && (
                <span className="mt-4 inline-flex max-w-full rounded-full border border-white/[0.14] bg-black/42 px-3 py-1 text-[11px] font-black text-[#f1f1f1] backdrop-blur">
                  <span className="truncate">{[theme.locationName, theme.branchName].filter(Boolean).join(' · ')}</span>
                </span>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/[0.12] bg-black/36 px-3 py-1.5 text-[11px] font-bold text-[#d8d8d8] backdrop-blur">
                  진행 {theme.duration}분
                </span>
                <span className="rounded-full border border-[#e4b660]/22 bg-[#e4b660]/10 px-3 py-1.5 text-[11px] font-bold text-[#e0c17b] backdrop-blur">
                  난이도 {theme.difficulty || '-'}
                </span>
                <span className="rounded-full border border-[#e63946]/26 bg-[#e63946]/12 px-3 py-1.5 text-[11px] font-bold text-[#ff7777] backdrop-blur">
                  공포도 {theme.horrorLevel || '-'}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.08] p-5 sm:p-6 lg:p-7">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[11px] font-black tracking-[0.24em] text-[#8f8f8f]">예약 정보</p>
                <h3 className="mt-2 text-xl font-black text-[#f5f5f5]">예약 요약</h3>
              </div>
              <button
                type="button"
                onClick={onBack}
                className="inline-flex h-9 w-full items-center justify-center rounded-[9px] border border-white/[0.09] bg-white/[0.025] px-3.5 text-xs font-black text-[#b8b8b8] transition-all hover:border-[#e63946]/40 hover:bg-[#e63946]/7 hover:text-[#f1f1f1] sm:w-auto"
              >
                시간 변경
              </button>
            </div>

            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['날짜', formatDateLabel(date)],
                ['시간', displayTime],
                ['지점', theme.branchName || theme.locationName || '지점 정보 없음'],
                ['진행 시간', `${theme.duration}분`],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[14px] border border-white/[0.07] bg-[#0b0b0b]/68 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                  <dt className="text-[11px] font-black tracking-[0.12em] text-[#6f6f6f]">{label}</dt>
                  <dd className={['mt-2 min-w-0 break-keep text-sm font-black leading-snug', label === '시간' ? 'text-[#ff6b6b]' : 'text-[#e8e8e8]'].join(' ')}>
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {slot?.timeSlotId && (
              <p className="mt-4 text-xs font-bold text-[#5f5f5f]">예약 슬롯 #{slot.timeSlotId}</p>
            )}
          </div>
        </section>

        <section className="rounded-[18px] border border-white/[0.08] bg-[#151515]/92 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:p-6">
          <SectionTitle>입장 인원</SectionTitle>
          <div className="space-y-3">
            {[
              { label: '성인', sub: `1인 ${formatPrice(theme.price ?? 25000)}`, count: adultCount, set: setAdultCount, min: 0, subtotal: adultSubtotal },
              { label: '청소년', sub: `1인 ${formatPrice(TEEN_PRICE)} · 만 14~18세`, count: teenCount, set: setTeenCount, min: 0, subtotal: teenSubtotal },
            ].map((row) => (
              <div key={row.label} className="grid gap-4 rounded-[14px] border border-white/[0.08] bg-[#0f0f0f] p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="text-base font-black text-[#f5f5f5]">{row.label}</p>
                  <p className="mt-1 text-sm font-semibold text-[#8a8a8a]">{row.sub}</p>
                </div>
                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <div className="flex items-center overflow-hidden rounded-[10px] border border-white/[0.1] bg-[#080808]">
                    <button
                      type="button"
                      onClick={() => row.set(Math.max(row.min, row.count - 1))}
                      className="flex h-9 w-9 items-center justify-center text-lg leading-none text-[#d8d8d8] transition-colors hover:bg-[#e63946]/12 hover:text-white"
                    >
                      -
                    </button>
                    <span className="flex h-9 w-10 items-center justify-center border-x border-white/[0.08] text-sm font-black text-[#f5f5f5]">
                      {row.count}
                    </span>
                    <button
                      type="button"
                      onClick={() => row.set(row.count + 1)}
                      disabled={totalPlayers >= (theme.maxPlayers ?? 6)}
                      className="flex h-9 w-9 items-center justify-center text-lg leading-none text-[#d8d8d8] transition-colors hover:bg-[#e63946]/12 hover:text-white disabled:cursor-not-allowed disabled:text-[#444]"
                    >
                      +
                    </button>
                  </div>
                  <p className="min-w-[96px] text-right text-sm font-black text-[#f5f5f5]">
                    {formatPrice(row.subtotal)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-[12px] border border-white/[0.07] bg-[#101010] px-4 py-3 text-xs font-bold text-[#888]">
            <span>최소 {theme.minPlayers}명 · 최대 {theme.maxPlayers}명</span>
            <span>총 <span className="text-[#f5f5f5]">{totalPlayers}</span>명</span>
          </div>
        </section>

        <section className="rounded-[18px] border border-white/[0.08] bg-[#151515]/92 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:p-6">
          <SectionTitle>약관 확인</SectionTitle>
          <CustomCheckbox checked={agreeAll} onChange={handleAgreeAll} label="전체 동의" emphasized />
          <div className="mt-3 space-y-1">
            <CustomCheckbox checked={agreeTerms} onChange={setAgreeTerms} badge="필수" label="이용약관에 동의합니다." />
            <CustomCheckbox checked={agreePrivacy} onChange={setAgreePrivacy} badge="필수" label="개인정보 수집 및 이용에 동의합니다." />
            <CustomCheckbox checked={agreeCancellation} onChange={setAgreeCancellation} badge="필수" label="취소 및 환불 규정을 확인했습니다." />
            <CustomCheckbox checked={agreeMarketing} onChange={setAgreeMarketing} badge="선택" label="마케팅 정보 수신에 동의합니다." />
          </div>
        </section>

        <section className="rounded-[18px] border border-white/[0.08] bg-[#151515]/92 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:p-6">
          <SectionTitle>환불 안내</SectionTitle>
          <div className="overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#0f0f0f]">
            {[
              { when: '예약일 7일 전까지', amount: '100% 환불', style: 'border-[#65d6aa]/25 bg-[#65d6aa]/10 text-[#8de4c1]' },
              { when: '예약일 3일 전까지', amount: '50% 환불', style: 'border-[#e4b660]/25 bg-[#e4b660]/10 text-[#f0c674]' },
              { when: '예약 당일 또는 노쇼', amount: '환불 불가', style: 'border-[#e63946]/30 bg-[#e63946]/12 text-[#ff6b6b]' },
            ].map((item) => (
              <div key={item.when} className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3 last:border-b-0">
                <span className="text-sm font-bold text-[#d8d8d8]">{item.when}</span>
                <span className={['shrink-0 rounded-full border px-3 py-1 text-xs font-black', item.style].join(' ')}>
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs font-semibold text-[#666]">환불 내역은 마이페이지의 캐시 내역에서 확인할 수 있습니다.</p>
        </section>

        <section className="rounded-[18px] border border-[#e63946]/20 bg-[linear-gradient(135deg,#171717_0%,#111_58%,rgba(230,57,70,0.1)_100%)] p-5 shadow-[0_20px_58px_rgba(0,0,0,0.34)] sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-black tracking-[0.22em] text-[#8a8a8a]">PAYMENT SUMMARY</p>
              <h2 className="mt-2 text-lg font-black text-[#f5f5f5]">최종 결제 금액</h2>
            </div>
            <span className="text-right text-[28px] font-black leading-none text-[#e63946] sm:text-[34px]">
              {formatPrice(totalAmount)}
            </span>
          </div>
          <div className="grid gap-2 text-sm font-bold text-[#9a9a9a] sm:grid-cols-3">
            <div className="rounded-[12px] border border-white/[0.08] bg-[#0b0b0b]/70 px-4 py-3">
              총 인원 <span className="ml-2 text-[#f5f5f5]">{totalPlayers}명</span>
            </div>
            <div className="rounded-[12px] border border-white/[0.08] bg-[#0b0b0b]/70 px-4 py-3">
              성인 <span className="ml-2 text-[#f5f5f5]">{adultCount}명</span>
            </div>
            <div className="rounded-[12px] border border-white/[0.08] bg-[#0b0b0b]/70 px-4 py-3">
              청소년 <span className="ml-2 text-[#f5f5f5]">{teenCount}명</span>
            </div>
          </div>
        </section>

        {!selectedTimeSlotId && (
          <div className="rounded-[14px] border border-[#e4b660]/25 bg-[#e4b660]/10 px-4 py-3 text-sm font-bold text-[#f0c674]">
            선택한 예약 시간의 슬롯 ID가 없어 결제를 시작할 수 없습니다. 시간표에서 시간을 다시 선택해주세요.
          </div>
        )}

        {flowError && (
          <div className="rounded-[14px] border border-[#e63946]/30 bg-[#e63946]/10 px-4 py-3 text-sm font-bold text-[#ff7777]">
            {flowError}
          </div>
        )}

        {readyResult && (
          <section className="rounded-[18px] border border-[#65d6aa]/25 bg-[#65d6aa]/10 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.24)] sm:p-6">
            <SectionTitle>Toss 결제창</SectionTitle>
            <div className="grid gap-2 text-sm font-bold text-[#9ad8c0] sm:grid-cols-2">
              <div className="rounded-[12px] border border-white/[0.08] bg-[#0b0b0b]/60 px-4 py-3">
                예약 ID <span className="ml-2 text-[#f5f5f5]">{readyResult.reservationId}</span>
              </div>
              <div className="rounded-[12px] border border-white/[0.08] bg-[#0b0b0b]/60 px-4 py-3">
                결제 ID <span className="ml-2 text-[#f5f5f5]">{readyResult.paymentId}</span>
              </div>
              <div className="rounded-[12px] border border-white/[0.08] bg-[#0b0b0b]/60 px-4 py-3 sm:col-span-2">
                주문 ID <span className="ml-2 break-all text-[#f5f5f5]">{readyResult.orderId}</span>
              </div>
            </div>
            <div className="mt-5 rounded-[14px] border border-white/[0.08] bg-[#0b0b0b]/60 px-4 py-4">
              <p className="text-sm font-black text-[#f5f5f5]">{readyResult.orderName}</p>
              <p className="mt-2 text-xs font-bold leading-5 text-[#8aa99c]">
                API 개별 연동 키용 Toss 결제창을 엽니다. 결제 인증이 성공하면 success callback에서 paymentKey, orderId, amount를 확인한 뒤 백엔드 confirm API를 호출합니다.
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleRequestPayment}
                disabled={!canRequestPayment}
                className={[
                  'h-11 flex-[1.7] rounded-[10px] text-sm font-black transition-all',
                  canRequestPayment
                    ? 'bg-[#e63946] text-white hover:bg-[#ff4654]'
                    : 'cursor-not-allowed bg-[#242424] text-[#666]',
                ].join(' ')}
              >
                {isRequestingPayment ? '결제창 이동 중...' : 'Toss 결제창 열기'}
              </button>
              <button
                type="button"
                onClick={handleCancelPending}
                disabled={isSubmitting || isRequestingPayment}
                className="h-11 flex-1 rounded-[10px] border border-white/[0.12] px-4 text-xs font-black text-[#d8d8d8] transition-colors hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:text-[#555]"
              >
                예약 대기 취소
              </button>
            </div>
          </section>
        )}

        <button
          type="button"
          onClick={handlePay}
          disabled={!canPay}
          className={[
            'hidden w-full rounded-[14px] py-4 text-base font-black transition-all sm:block',
            canPay
              ? 'bg-[#e63946] text-white shadow-[0_18px_42px_rgba(230,57,70,0.18)] hover:bg-[#ff4654] hover:shadow-[0_20px_52px_rgba(230,57,70,0.28)]'
              : 'cursor-not-allowed border border-white/[0.08] bg-[#1f1f1f] text-[#666]',
          ].join(' ')}
        >
          {isSubmitting ? '처리 중...' : '결제 준비하기'}
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/[0.08] bg-[#090909]/94 px-4 py-3 shadow-[0_-18px_48px_rgba(0,0,0,0.38)] backdrop-blur sm:hidden">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold text-[#777]">총 {totalPlayers}명 · 성인 {adultCount} / 청소년 {teenCount}</p>
            <p className="mt-0.5 text-lg font-black text-[#e63946]">{formatPrice(totalAmount)}</p>
          </div>
          <button
            type="button"
            onClick={handlePay}
            disabled={!canPay}
            className={[
              'h-12 shrink-0 rounded-[12px] px-5 text-sm font-black transition-all',
              canPay ? 'bg-[#e63946] text-white hover:bg-[#ff4654]' : 'cursor-not-allowed bg-[#242424] text-[#666]',
            ].join(' ')}
          >
            {isSubmitting ? '처리 중...' : '결제 준비'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ReservationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlThemeId = searchParams.get('themeId');
  const urlDate = searchParams.get('date');
  const urlTime = searchParams.get('time');
  const urlTimeSlotId = searchParams.get('timeSlotId');
  const source = searchParams.get('source');
  const returnTo = searchParams.get('returnTo');
  const rawTimeSlotId = urlTimeSlotId ? Number(urlTimeSlotId) : null;
  const parsedUrlTimeSlotId =
    rawTimeSlotId && Number.isFinite(rawTimeSlotId) ? rawTimeSlotId : null;

  const hasUrlParams = Boolean(urlThemeId && urlDate && urlTime);

  const [step, setStep] = useState<'select' | 'payment'>(hasUrlParams ? 'payment' : 'select');
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [selectedDate, setSelectedDate] = useState(urlDate ?? '');
  const [selectedTime, setSelectedTime] = useState(urlTime ?? '');
  const [selectedSlot, setSelectedSlot] = useState<AvailableThemeSlot | null>(null);
  const [isLoadingUrlTheme, setIsLoadingUrlTheme] = useState(hasUrlParams);

  useEffect(() => {
    if (!hasUrlParams || !urlThemeId) return;

    let isMounted = true;
    setIsLoadingUrlTheme(true);

    getThemeById(Number(urlThemeId))
      .then(async (theme) => {
        if (!isMounted) return;

        let nextTheme = theme;

        if (!theme.title?.trim()) {
          try {
            const themes = await getThemes();
            const listTheme = themes.find((item) => item.id === Number(urlThemeId));
            if (listTheme) {
              nextTheme = {
                ...theme,
                title: listTheme.title,
                imageUrl: theme.imageUrl || listTheme.imageUrl,
                locationName: theme.locationName || listTheme.locationName,
                branchName: theme.branchName || listTheme.branchName,
              };
            }
          } catch {
            // 상세 응답에 제목이 없을 때만 목록 제목 보강을 시도합니다.
          }
        }

        if (!isMounted) return;
        setSelectedTheme(nextTheme);
        setSelectedDate(urlDate ?? '');
        setSelectedTime(urlTime ?? '');
        setSelectedSlot(
          parsedUrlTimeSlotId
            ? {
                timeSlotId: parsedUrlTimeSlotId,
                slotDate: urlDate ?? '',
                startTime: urlTime ?? '',
                endTime: '',
              }
            : null,
        );
        setStep('payment');
        setIsLoadingUrlTheme(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setIsLoadingUrlTheme(false);
        setStep('select');
      });

    return () => {
      isMounted = false;
    };
  }, [hasUrlParams, parsedUrlTimeSlotId, urlDate, urlThemeId, urlTime]);

  const handleBook = (item: AvailableSlotTheme, slot: AvailableThemeSlot) => {
    setSelectedTheme(mapAvailableThemeToTheme(item));
    setSelectedDate(slot.slotDate);
    setSelectedTime(formatSlotTime(slot.startTime));
    setSelectedSlot(slot);
    setStep('payment');
    window.history.pushState(
      null,
      '',
      `/reservation?source=quick-reservation&returnTo=${encodeURIComponent('/quick-reservation')}`,
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSafeReturnTo = (value: string | null) => {
    if (!value || !value.startsWith('/') || value.startsWith('//')) return '';
    return value;
  };

  const handleChangeTime = () => {
    const safeReturnTo = getSafeReturnTo(returnTo);

    if (safeReturnTo === '/quick-reservation') {
      setStep('select');
      window.history.pushState(null, '', '/reservation');
      return;
    }

    if (safeReturnTo) {
      router.push(safeReturnTo);
      return;
    }

    if (source === 'quick-reservation') {
      setStep('select');
      window.history.pushState(null, '', '/reservation');
      return;
    }

    if (!hasUrlParams) {
      setStep('select');
      return;
    }

    const themeId = selectedTheme?.id ?? (urlThemeId ? Number(urlThemeId) : null);

    if (themeId) {
      router.push(`/themes?themeId=${themeId}&tab=reservation`);
      return;
    }

    setStep('select');
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f5f5f5]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(204,34,34,0.14),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(204,34,34,0.08),transparent_30%),linear-gradient(180deg,#0d0d0d_0%,#101010_48%,#0d0d0d_100%)]" />
      <StepBar step={step === 'select' ? 1 : 2} />
      {step === 'select' && <BrowseStep onBook={handleBook} />}
      {step === 'payment' && isLoadingUrlTheme && (
        <div className="relative mx-auto max-w-2xl px-4 py-16 text-center">
          <p className="text-sm font-bold text-[#f5f5f5]">예약 정보를 불러오는 중입니다.</p>
          <p className="mt-2 text-xs text-[#888]">잠시만 기다려주세요.</p>
        </div>
      )}
      {step === 'payment' && selectedTheme && selectedDate && selectedTime && (
        <PaymentStep
          theme={selectedTheme}
          date={selectedDate}
          time={selectedTime}
          slot={selectedSlot}
          timeSlotId={parsedUrlTimeSlotId}
          onBack={handleChangeTime}
        />
      )}
    </div>
  );
}

export default function ReservationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d0d0d]" />}>
      <ReservationContent />
    </Suspense>
  );
}
