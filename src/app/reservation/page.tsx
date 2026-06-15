'use client';

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
} from '@/services/themeService';
import { Theme } from '@/types/theme';

const SORT_OPTIONS = [
  { value: 'popular', label: '인기순' },
  { value: 'latest', label: '최신순' },
] as const;
const PER_PAGE = 5;
const TEEN_PRICE = 20000;

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
    { n: 2, label: '결제' },
    { n: 3, label: '예약 완료' },
  ];

  return (
    <div className="relative border-b border-white/[0.08] bg-[#0d0d0d]/92 backdrop-blur">
      <div className="mx-auto flex max-w-[1480px] items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
        {steps.map((item, index) => (
          <div key={item.n} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={[
                  'flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold',
                  step > item.n
                    ? 'border-[#2ecc71] bg-[#2ecc71] text-white'
                    : step === item.n
                      ? 'border-[#e63946] bg-[#e63946] text-white'
                      : 'border-[#444] bg-transparent text-[#444]',
                ].join(' ')}
              >
                {step > item.n ? '✓' : item.n}
              </div>
              <span className={['hidden text-xs sm:inline', step === item.n ? 'font-medium text-[#f5f5f5]' : 'text-[#444]'].join(' ')}>
                {item.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={['mx-3 h-px w-12 sm:w-20', step > item.n ? 'bg-[#2ecc71]' : 'bg-[#2a2a2a]'].join(' ')} />
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
  onBack,
}: {
  theme: Theme;
  date: string;
  time: string;
  slot?: AvailableThemeSlot | null;
  onBack: () => void;
}) {
  const router = useRouter();
  const { setTheme, setLocation, setDateTime, setHeadcount } = useReservationStore();

  const [adultCount, setAdultCount] = useState(2);
  const [teenCount, setTeenCount] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeCancellation, setAgreeCancellation] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const requiredAgreed = agreeTerms && agreePrivacy && agreeCancellation;
  const agreeAll = requiredAgreed && agreeMarketing;
  const totalPlayers = adultCount + teenCount;
  const totalAmount = adultCount * (theme.price ?? 25000) + teenCount * TEEN_PRICE;
  const displayTime = slot ? formatSlotRange(slot) : time;

  const handleAgreeAll = (checked: boolean) => {
    setAgreeTerms(checked);
    setAgreePrivacy(checked);
    setAgreeCancellation(checked);
    setAgreeMarketing(checked);
  };

  const handlePay = () => {
    if (!requiredAgreed) return;
    setTheme(theme.id, theme.title, theme.imageUrl);
    setLocation(theme.locationName ?? '', theme.branchName ?? '');
    setDateTime(date, displayTime);
    setHeadcount(adultCount, teenCount);
    router.push('/reservation/complete');
  };

  return (
    <div className="relative mx-auto max-w-2xl px-4 py-8">
      <div className="space-y-6">
        <section className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-5">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#f5f5f5]">
            <span className="h-4 w-1 rounded-full bg-[#e63946]" />
            예약 정보 확인
          </h2>
          <div className="flex gap-4">
            <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded bg-[#111]">
              <ImageWithFallback
                src={theme.imageUrl}
                fallbackSrc="/images/theme-placeholder.png"
                alt={theme.title}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="rounded border border-[#2a2a2a] bg-[#222] px-1.5 py-0.5 text-xs text-[#888]">{theme.locationName}</span>
              <h3 className="mb-2 mt-2 text-base font-bold text-[#f5f5f5]">{theme.title}</h3>
              <div className="flex flex-wrap gap-2">
                <span className="rounded border border-[#2a2a2a] bg-[#0d0d0d] px-2 py-0.5 text-xs text-[#f5f5f5]">{formatDateLabel(date)}</span>
                <span className="rounded border border-[#e63946]/40 bg-[#0d0d0d] px-2 py-0.5 text-xs text-[#e63946]">{displayTime}</span>
                {slot?.timeSlotId && (
                  <span className="rounded border border-[#2a2a2a] bg-[#0d0d0d] px-2 py-0.5 text-xs text-[#666]">slot #{slot.timeSlotId}</span>
                )}
                <span className="rounded border border-[#2a2a2a] bg-[#0d0d0d] px-2 py-0.5 text-xs text-[#888]">{theme.branchName}</span>
                <span className="rounded border border-[#2a2a2a] bg-[#0d0d0d] px-2 py-0.5 text-xs text-[#888]">{theme.duration}분</span>
              </div>
              <button onClick={onBack} className="mt-2 text-xs text-[#888] transition-colors hover:text-[#e63946]">
                시간 변경
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-5">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#f5f5f5]">
            <span className="h-4 w-1 rounded-full bg-[#e63946]" />
            인원 선택
          </h2>
          {[
            { label: '성인', sub: `1인 ${formatPrice(theme.price ?? 25000)}`, count: adultCount, set: setAdultCount, min: 0 },
            { label: '청소년', sub: `1인 ${formatPrice(TEEN_PRICE)} · 만 14~18세`, count: teenCount, set: setTeenCount, min: 0 },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between border-b border-[#2a2a2a] py-3 last:border-b-0">
              <div>
                <p className="text-sm text-[#f5f5f5]">{row.label}</p>
                <p className="text-xs text-[#888]">{row.sub}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => row.set(Math.max(row.min, row.count - 1))} className="flex h-7 w-7 items-center justify-center rounded border border-[#2a2a2a] text-lg leading-none text-[#f5f5f5] transition-colors hover:border-[#e63946]">-</button>
                <span className="w-5 text-center text-sm font-medium text-[#f5f5f5]">{row.count}</span>
                <button onClick={() => row.set(row.count + 1)} disabled={totalPlayers >= (theme.maxPlayers ?? 6)} className="flex h-7 w-7 items-center justify-center rounded border border-[#2a2a2a] text-lg leading-none text-[#f5f5f5] transition-colors hover:border-[#e63946] disabled:opacity-30">+</button>
              </div>
            </div>
          ))}
          <div className="mt-3 flex items-center justify-between text-xs text-[#888]">
            <span>최소 {theme.minPlayers}명 · 최대 {theme.maxPlayers}명</span>
            <span>총 <span className="font-bold text-[#f5f5f5]">{totalPlayers}</span>명</span>
          </div>
        </section>

        <section className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-5">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#f5f5f5]">
            <span className="h-4 w-1 rounded-full bg-[#e63946]" />
            이용 약관 동의
          </h2>
          <label className="mb-2 flex cursor-pointer items-center gap-2 border-b border-[#2a2a2a] py-2">
            <input type="checkbox" checked={agreeAll} onChange={(event) => handleAgreeAll(event.target.checked)} className="accent-[#e63946]" />
            <span className="text-sm font-medium text-[#f5f5f5]">전체 동의</span>
          </label>
          {[
            { label: '[필수] 이용약관에 동의합니다.', checked: agreeTerms, set: setAgreeTerms },
            { label: '[필수] 개인정보 수집 및 이용에 동의합니다.', checked: agreePrivacy, set: setAgreePrivacy },
            { label: '[필수] 취소 및 환불 규정을 확인했습니다.', checked: agreeCancellation, set: setAgreeCancellation },
            { label: '[선택] 마케팅 정보 수신에 동의합니다.', checked: agreeMarketing, set: setAgreeMarketing },
          ].map((item) => (
            <label key={item.label} className="flex cursor-pointer items-center gap-2 py-1.5">
              <input type="checkbox" checked={item.checked} onChange={(event) => item.set(event.target.checked)} className="accent-[#e63946]" />
              <span className="text-xs text-[#888]">{item.label}</span>
            </label>
          ))}
        </section>

        <section className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-5">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#f5f5f5]">
            <span className="h-4 w-1 rounded-full bg-[#e63946]" />
            취소 및 환불 규정
          </h2>
          <table className="mb-3 w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a2a2a]">
                <th className="py-2 text-left text-xs font-medium text-[#888]">취소 시점</th>
                <th className="py-2 text-right text-xs font-medium text-[#888]">환불 금액</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#1a1a1a]">
                <td className="py-2.5 text-xs text-[#f5f5f5]">예약일 7일 전까지</td>
                <td className="py-2.5 text-right text-xs font-medium text-[#2ecc71]">100% 환불</td>
              </tr>
              <tr className="border-b border-[#1a1a1a]">
                <td className="py-2.5 text-xs text-[#f5f5f5]">예약일 3일 전까지</td>
                <td className="py-2.5 text-right text-xs font-medium text-[#f39c12]">50% 환불</td>
              </tr>
              <tr>
                <td className="py-2.5 text-xs text-[#f5f5f5]">예약 당일 또는 노쇼</td>
                <td className="py-2.5 text-right text-xs font-medium text-[#e63946]">환불 불가</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-[#555]">환불 내역은 마이페이지의 캐시 내역에서 확인할 수 있습니다.</p>
        </section>

        <div className="flex items-center justify-between rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4">
          <span className="text-sm text-[#888]">최종 결제 금액</span>
          <span className="text-xl font-black text-[#e63946]">{formatPrice(totalAmount)}</span>
        </div>

        <button
          onClick={handlePay}
          disabled={!requiredAgreed || totalPlayers === 0}
          className={[
            'w-full rounded-lg py-4 text-base font-bold transition-colors',
            requiredAgreed && totalPlayers > 0
              ? 'bg-[#e63946] text-white hover:bg-[#c1121f]'
              : 'cursor-not-allowed bg-[#2a2a2a] text-[#555]',
          ].join(' ')}
        >
          결제하기
        </button>
      </div>
    </div>
  );
}

function ReservationContent() {
  const searchParams = useSearchParams();
  const urlThemeId = searchParams.get('themeId');
  const urlDate = searchParams.get('date');
  const urlTime = searchParams.get('time');

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
      .then((theme) => {
        if (!isMounted) return;
        setSelectedTheme(theme);
        setSelectedDate(urlDate ?? '');
        setSelectedTime(urlTime ?? '');
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
  }, [hasUrlParams, urlDate, urlThemeId, urlTime]);

  const handleBook = (item: AvailableSlotTheme, slot: AvailableThemeSlot) => {
    setSelectedTheme(mapAvailableThemeToTheme(item));
    setSelectedDate(slot.slotDate);
    setSelectedTime(formatSlotTime(slot.startTime));
    setSelectedSlot(slot);
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          onBack={() => setStep('select')}
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
