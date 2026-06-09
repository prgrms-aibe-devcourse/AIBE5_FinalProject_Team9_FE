'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useReservationStore } from '@/stores/reservationStore';
import { Theme } from '@/types/theme';

const MOCK_THEMES: Theme[] = [
  { id: 1, title: '감옥 탈출', description: '탈출 불가능한 감옥에 갇힌 당신. 문은 잠겼고, 감시의 눈은 점점 가까워진다.', genre: '공포/미스터리', difficulty: 4, horrorLevel: 5, minPlayers: 2, maxPlayers: 4, duration: 80, price: 28000, imageUrl: 'https://picsum.photos/seed/grimgate1/400/300', rating: 4.9, reviewCount: 342, isBest: true, locationName: '홍대', branchName: '홍대 1호점', clearRate: 41 },
  { id: 2, title: '13번째 방', description: '전설의 13번째 방에 들어간 사람은 아무도 돌아오지 못했다.', genre: '공포/스릴러', difficulty: 5, horrorLevel: 3, minPlayers: 3, maxPlayers: 6, duration: 90, price: 30000, imageUrl: 'https://picsum.photos/seed/grimgate2/400/300', rating: 4.9, reviewCount: 312, isBest: true, locationName: '홍대', branchName: '홍대 6호점', clearRate: 38 },
  { id: 3, title: '블러드문', description: '붉은 달이 뜨는 밤, 오래된 저주가 다시 시작된다.', genre: '공포/추리', difficulty: 5, horrorLevel: 5, minPlayers: 3, maxPlayers: 6, duration: 90, price: 32000, imageUrl: 'https://picsum.photos/seed/grimgate3/400/300', rating: 4.8, reviewCount: 289, isHot: true, locationName: '강남', branchName: '강남 8호점', clearRate: 57 },
  { id: 4, title: '좀비 아포칼립스', description: '바이러스가 창궐한 도시에서 마지막 탈출 경로를 찾아야 한다.', genre: '액션/공포', difficulty: 3, horrorLevel: 4, minPlayers: 2, maxPlayers: 6, duration: 75, price: 26000, imageUrl: 'https://picsum.photos/seed/grimgate4/400/300', rating: 4.8, reviewCount: 275, isHot: true, locationName: '강남', branchName: '강남 3호점', clearRate: 62 },
  { id: 5, title: '미상의 초상화', description: '그림 속 인물이 당신을 따라온다. 액자 뒤에 숨은 진실을 찾아라.', genre: '추리/공포', difficulty: 4, horrorLevel: 4, minPlayers: 1, maxPlayers: 6, duration: 70, price: 25000, imageUrl: 'https://picsum.photos/seed/grimgate5/400/300', rating: 4.5, reviewCount: 287, locationName: '건대', branchName: '건대 2호점', clearRate: 44 },
  { id: 6, title: '체이서', description: '사라진 의뢰인을 추적하다 발견한 단서는 더 큰 함정으로 이어진다.', genre: '스릴러', difficulty: 5, horrorLevel: 5, minPlayers: 2, maxPlayers: 4, duration: 75, price: 27000, imageUrl: 'https://picsum.photos/seed/grimgate6/400/300', rating: 4.8, reviewCount: 234, isHot: true, locationName: '건대', branchName: '건대 6호점', clearRate: 41 },
  { id: 7, title: '감옥 탈출 2', description: '탈출은 가능하지만 살아남기는 어렵다. 제한 시간 안에 문을 열어라.', genre: '스릴러', difficulty: 4, horrorLevel: 4, minPlayers: 2, maxPlayers: 7, duration: 60, price: 22000, imageUrl: 'https://picsum.photos/seed/grimgate7/400/300', rating: 4.5, reviewCount: 221, isHot: true, locationName: '건대', branchName: '건대 2호점', clearRate: 68 },
  { id: 8, title: '사일런스', description: '소리를 내면 끝난다. 침묵 속에서 탈출구를 찾아라.', genre: '공포/스릴러', difficulty: 3, horrorLevel: 4, minPlayers: 2, maxPlayers: 6, duration: 70, price: 24000, imageUrl: 'https://picsum.photos/seed/grimgate8/400/300', rating: 4.5, reviewCount: 203, locationName: '신촌', branchName: '신촌 4호점', clearRate: 72 },
  { id: 9, title: '인형의 방', description: '움직이지 않아야 할 인형들이 당신의 뒤를 따라온다.', genre: '공포', difficulty: 4, horrorLevel: 4, minPlayers: 2, maxPlayers: 6, duration: 75, price: 25000, imageUrl: 'https://picsum.photos/seed/grimgate9/400/300', rating: 4.7, reviewCount: 198, locationName: '홍대', branchName: '홍대 3호점', clearRate: 55 },
  { id: 10, title: '낡은 인형', description: '오래된 인형이 남긴 단서를 따라 마지막 방으로 향한다.', genre: '공포', difficulty: 3, horrorLevel: 4, minPlayers: 2, maxPlayers: 4, duration: 65, price: 23000, imageUrl: 'https://picsum.photos/seed/grimgate10/400/300', rating: 4.5, reviewCount: 188, locationName: '강남', branchName: '강남 5호점', clearRate: 61 },
  { id: 11, title: '저주받은 극장', description: '닫힌 극장에서 울려 퍼지는 마지막 공연의 비밀을 밝혀라.', genre: '미스터리', difficulty: 3, horrorLevel: 4, minPlayers: 2, maxPlayers: 6, duration: 80, price: 25000, imageUrl: 'https://picsum.photos/seed/grimgate11/400/300', rating: 4.6, reviewCount: 180, locationName: '강남', branchName: '강남 1호점', clearRate: 59 },
  { id: 12, title: '악마의 계약', description: '계약서에 서명하면 다시 돌아갈 수 없다. 선택은 당신의 몫이다.', genre: '공포/스릴러', difficulty: 4, horrorLevel: 5, minPlayers: 2, maxPlayers: 5, duration: 75, price: 26000, imageUrl: 'https://picsum.photos/seed/grimgate12/400/300', rating: 4.4, reviewCount: 165, locationName: '건대', branchName: '건대 1호점', clearRate: 48 },
];

const LOCATIONS = ['강남', '홍대', '건대', '신촌'];
const SORT_OPTIONS = [
  { value: 'popular', label: '인기순' },
  { value: 'latest', label: '최신순' },
] as const;
const BASE_TIMES = ['11:00', '13:00', '15:00', '17:00', '19:00', '21:00'];
const PER_PAGE = 5;
const TEEN_PRICE = 20000;

function getUpcomingDates(count = 3) {
  const today = new Date();
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(today);
    date.setDate(date.getDate() + index + 1);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return {
      dateStr: `${date.getFullYear()}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      label: `${month}.${day}(${days[date.getDay()]})`,
    };
  });
}

function getSlots(themeId: number, dateIndex: number) {
  const soldOut = new Set([
    (themeId + dateIndex * 2) % 6,
    (themeId * 3 + dateIndex + 4) % 6,
  ]);

  return BASE_TIMES.map((time, index) => ({
    time,
    soldOut: soldOut.has(index),
  }));
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

  return (
    <span className="inline-flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Icon
          key={index}
          className={[
            'h-[15px] w-[15px]',
            index < level ? activeColor : 'text-[#343434] opacity-55',
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
  theme,
  dates,
  onQuickBook,
}: {
  theme: Theme;
  dates: { dateStr: string; label: string }[];
  onQuickBook: (theme: Theme, date: string, time: string) => void;
}) {
  const [activeDateIdx, setActiveDateIdx] = useState(0);
  const [selectedTime, setSelectedTime] = useState('17:00');

  const slots = getSlots(theme.id, activeDateIdx);
  const showcaseDescription =
    theme.description.length > 80
      ? theme.description
      : `${theme.description}
문은 잠겼고, 감시의 눈은 점점 가까워진다.
남은 단서는 어둠 속에 숨겨진 흔적뿐.
시간이 흐를수록 탈출의 기회는 사라진다.`;

  const handleBook = () => {
    if (!selectedTime) return;
    onQuickBook(theme, dates[activeDateIdx].dateStr, selectedTime);
  };

  return (
    <div className="mx-auto w-full max-w-[1120px] overflow-hidden rounded-[12px] border border-white/[0.08] bg-[#171717] shadow-[0_14px_34px_rgba(0,0,0,0.22)] transition-all duration-300 hover:border-[#cc2222]/70 hover:bg-[#1b1b1b] hover:shadow-[0_18px_48px_rgba(204,34,34,0.16)]">
      <div className="grid min-h-[360px] grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)_380px]">
        <div className="relative min-h-[300px] shrink-0 overflow-hidden bg-[#111] lg:min-h-0">
          {theme.isHot && (
            <span className="absolute right-4 top-8 z-10 flex h-6 min-w-[54px] items-center justify-center rounded-full border border-[#cc2222]/45 bg-[#cc2222]/90 px-3 text-[11px] font-black text-white">HOT</span>
          )}
          {theme.isBest && (
            <span className="absolute right-4 top-8 z-10 flex h-6 min-w-[54px] items-center justify-center rounded-full border border-[#d7b46a]/45 bg-[#d7b46a]/90 px-3 text-[11px] font-black text-white">BEST</span>
          )}
          <Image
            src={theme.imageUrl || 'https://picsum.photos/seed/default/400/300'}
            alt={theme.title}
            fill
            className="object-cover brightness-[0.76] contrast-110 saturate-[0.82]"
            sizes="(max-width: 1024px) 100vw, 300px"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0)_58%,rgba(0,0,0,0.36)_88%,#151515_100%)]" />
        </div>

        <div className="contents">
          <div className="flex min-w-0 flex-col justify-center border-y border-white/[0.08] px-[28px] py-7 lg:border-x lg:border-y-0">
            <p className="text-[12px] leading-none text-[#555]">11:00</p>
            <p className="mt-1 text-[12px] font-medium leading-none text-[#9a9a9a]">{theme.branchName}</p>
            <h3 className="mt-4 text-[20px] font-black leading-tight text-[#f5f5f5]">{theme.title}</h3>

            <div className="mt-5 grid grid-cols-[48px_1fr] gap-y-2 text-[12px] leading-none text-[#888]">
              <span>별점</span>
              <span className="flex items-center gap-3">
                <span className="text-[15px] tracking-[0.08em] text-[#f39c12]">★★★★★</span>
                <strong className="text-[14px] font-black text-[#f5f5f5]">{theme.rating?.toFixed(1)}</strong>
                <span className="text-[#5f5f5f]">({theme.reviewCount})</span>
              </span>
              <span>난이도</span>
              <span className="flex items-center gap-1.5">
                <ReservationRatingIcons level={theme.difficulty} type="difficulty" />
              </span>
              <span>공포도</span>
              <span className="flex items-center gap-1.5">
                <ReservationRatingIcons level={theme.horrorLevel} type="horror" />
              </span>
              <span>인원</span>
              <span className="text-[#7f8791]">{theme.minPlayers}~{theme.maxPlayers}명</span>
              <span>시간</span>
              <span className="text-[#7f8791]">{theme.duration}분</span>
            </div>

            <p className="mt-6 max-w-[320px] whitespace-pre-line text-[13px] font-medium leading-[1.62] text-[#a8a8a8]">
              {showcaseDescription}
            </p>
          </div>

          <div className="flex min-h-[360px] min-w-0 flex-col px-6 py-6">
            <div className="grid grid-cols-3 border-b border-white/[0.08]">
              {dates.map((date, index) => {
                const isActive = activeDateIdx === index;

                return (
                  <button
                    key={date.dateStr}
                    onClick={() => {
                      setActiveDateIdx(index);
                      setSelectedTime('');
                    }}
                    className={[
                      'relative h-9 text-center text-[12px] font-bold transition-colors',
                      isActive ? 'text-[#e72a2d]' : 'text-[#d9d9d9] hover:text-white',
                    ].join(' ')}
                  >
                    {date.label}
                    {isActive && <span className="absolute bottom-[-1px] left-2 right-2 h-[2px] bg-[#e12225]" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-3.5 grid grid-cols-3 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  disabled={slot.soldOut}
                  onClick={() => !slot.soldOut && setSelectedTime(slot.time)}
                  className={[
                    'h-[42px] min-w-0 rounded-[7px] border text-[12px] font-bold transition-colors',
                    slot.soldOut
                      ? 'cursor-not-allowed border-transparent bg-[#222] text-[#686868] line-through opacity-70'
                      : selectedTime === slot.time
                        ? 'border-[#e12225] bg-[#e12225] text-white'
                        : 'border-white/[0.1] bg-[#171717] text-[#d8d8d8] hover:border-[#cc2222]/65',
                  ].join(' ')}
                >
                  {slot.time}
                </button>
              ))}
            </div>

            <button
              onClick={handleBook}
              className={[
                'mt-7 h-10 w-full rounded-[8px] text-[13px] font-black transition-colors',
                selectedTime
                  ? 'bg-[#cc2222] text-white hover:bg-[#e23b3b] hover:shadow-[0_0_22px_rgba(204,34,34,0.22)]'
                  : 'cursor-not-allowed bg-[#cc2222]/55 text-white/60',
              ].join(' ')}
            >
              빠른 예약하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemeFilterSidebar({
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
          {['전체', ...LOCATIONS].map((location) => {
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

function BrowseStep({ onBook }: { onBook: (theme: Theme, date: string, time: string) => void }) {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState(0);
  const [horrorLevel, setHorrorLevel] = useState(0);
  const [minPlayers, setMinPlayers] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<'popular' | 'latest'>('popular');
  const [page, setPage] = useState(1);

  const dates = useMemo(() => getUpcomingDates(), []);

  const filtered = useMemo(() => {
    let list = [...MOCK_THEMES];
    if (selectedLocations.length > 0) list = list.filter((theme) => selectedLocations.includes(theme.locationName ?? ''));
    if (difficulty > 0) list = list.filter((theme) => theme.difficulty === difficulty);
    if (horrorLevel > 0) list = list.filter((theme) => theme.horrorLevel === horrorLevel);
    if (minPlayers > 0) list = list.filter((theme) => (theme.maxPlayers ?? 0) >= minPlayers);
    if (minRating > 0) list = list.filter((theme) => (theme.rating ?? 0) >= minRating);
    if (sort === 'popular') list.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
    else list.sort((a, b) => b.id - a.id);
    return list;
  }, [selectedLocations, difficulty, horrorLevel, minPlayers, minRating, sort]);

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
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-[#888]">
              <span className="font-bold text-[#f5f5f5]">{filtered.length}</span>개의 테마
            </span>
          </div>

          <div className="space-y-8">
            {paged.map((theme) => (
              <ThemeListRow key={theme.id} theme={theme} dates={dates} onQuickBook={onBook} />
            ))}
            {paged.length === 0 && (
              <div className="py-20 text-center text-[#888]">
                <p>조건에 맞는 테마가 없습니다.</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
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
  onBack,
}: {
  theme: Theme;
  date: string;
  time: string;
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
    setDateTime(date, time);
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
              <Image src={theme.imageUrl || 'https://picsum.photos/seed/default/400/300'} alt={theme.title} fill className="object-cover" sizes="96px" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="rounded border border-[#2a2a2a] bg-[#222] px-1.5 py-0.5 text-xs text-[#888]">{theme.locationName}</span>
              <h3 className="mb-2 mt-2 text-base font-bold text-[#f5f5f5]">{theme.title}</h3>
              <div className="flex flex-wrap gap-2">
                <span className="rounded border border-[#2a2a2a] bg-[#0d0d0d] px-2 py-0.5 text-xs text-[#f5f5f5]">{formatDateLabel(date)}</span>
                <span className="rounded border border-[#e63946]/40 bg-[#0d0d0d] px-2 py-0.5 text-xs text-[#e63946]">{time}</span>
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

  const initialTheme = urlThemeId ? MOCK_THEMES.find((theme) => theme.id === Number(urlThemeId)) : null;
  const hasUrlParams = Boolean(initialTheme && urlDate && urlTime);

  const [step, setStep] = useState<'select' | 'payment'>(hasUrlParams ? 'payment' : 'select');
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(initialTheme ?? null);
  const [selectedDate, setSelectedDate] = useState(urlDate ?? '');
  const [selectedTime, setSelectedTime] = useState(urlTime ?? '');

  const handleBook = (theme: Theme, date: string, time: string) => {
    setSelectedTheme(theme);
    setSelectedDate(date);
    setSelectedTime(time);
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f5f5f5]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(204,34,34,0.14),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(204,34,34,0.08),transparent_30%),linear-gradient(180deg,#0d0d0d_0%,#101010_48%,#0d0d0d_100%)]" />
      <StepBar step={step === 'select' ? 1 : 2} />
      {step === 'select' && <BrowseStep onBook={handleBook} />}
      {step === 'payment' && selectedTheme && selectedDate && selectedTime && (
        <PaymentStep
          theme={selectedTheme}
          date={selectedDate}
          time={selectedTime}
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
