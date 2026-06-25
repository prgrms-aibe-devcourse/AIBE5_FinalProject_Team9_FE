'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createMatePost, getMatePostById, updateMatePost } from '@/services/mateService';
import { getThemes } from '@/services/themeService';
import { MateExperienceLevel } from '@/types/mate';
import { Theme } from '@/types/theme';
import RatingIcons from '@/components/common/RatingIcons';

const ALL_TAGS = [
  '초보 환영',
  '숙련자 환영',
  '첫 방탈출 환영',
  '성별 무관',
  '여성만',
  '남성만',
  '또래 선호',
  '쫄보 가능',
  '공포 잘 버팀',
  '탱커 구함',
  '탱커 가능',
  '즐겜 지향',
  '빡겜 지향',
  '스토리 몰입',
  '문제풀이 집중',
  '힌트 적극 사용',
  '노힌트 도전',
  '역할분담 선호',
  '천천히 진행',
  '편하게 가요',
  '친목 가능',
  '조용히 플레이',
];

const OPEN_CHAT_PREFIX = 'https://open.kakao.com/o/';
const MAX_TAG_COUNT = 5;
const TITLE_MIN_LENGTH = 5;
const TITLE_MAX_LENGTH = 50;
const MIN_PEOPLE = 2;
const MAX_PEOPLE = 6;

const TIME_OPTIONS = Array.from({ length: 28 }, (_, index) => {
  const totalMinutes = 10 * 60 + index * 30;
  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
});

const EXPERIENCE_OPTIONS: { value: MateExperienceLevel; label: string; desc: string }[] = [
  { value: 'ANY', label: '무관', desc: '경험 여부에 관계없이 모집합니다' },
  { value: 'BEGINNER', label: '초보', desc: '처음 도전하는 분도 환영합니다' },
  { value: 'INTERMEDIATE', label: '중급', desc: '어느 정도 경험이 있는 분 선호' },
  { value: 'EXPERT', label: '숙련자', desc: '방탈출 다수 경험자 선호' },
];

function toIsoString(date: string, time: string) {
  if (!date || !time) return '';
  return new Date(`${date}T${time}:00`).toISOString();
}

function getTodayValue() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function toDateValue(date: Date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function parseDateValue(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getDateRangeEnd() {
  const today = parseDateValue(getTodayValue()) ?? new Date();
  return toDateValue(addDays(today, 30));
}

function getCalendarDays(monthDate: Date) {
  const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const startDate = addDays(firstDay, -firstDay.getDay());
  return Array.from({ length: 42 }, (_, index) => addDays(startDate, index));
}

function formatCalendarTitle(date: Date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
}

function formatSelectedDate(value: string) {
  if (!value) return '';
  return value.replaceAll('-', '.');
}

function isPreviousMonthDisabled(monthDate: Date, minDate: string) {
  const previousMonth = addMonths(monthDate, -1);
  const previousMonthEnd = new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0);
  return toDateValue(previousMonthEnd) < minDate;
}

function isNextMonthDisabled(monthDate: Date, maxDate: string) {
  const nextMonth = addMonths(monthDate, 1);
  return toDateValue(nextMonth) > maxDate;
}

function normalizeTimeOption(value: string) {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})(?::\d{2})?/);
  if (!match) return '';

  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return '';

  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function normalizeOpenChatUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return OPEN_CHAT_PREFIX;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  if (trimmed.startsWith('open.kakao.com/o/')) return `https://${trimmed}`;
  if (trimmed.startsWith('/o/')) return `https://open.kakao.com${trimmed}`;
  return `${OPEN_CHAT_PREFIX}${trimmed.replace(/^\/+/, '')}`;
}

function getOpenChatCode(value: string) {
  const normalized = normalizeOpenChatUrl(value);
  return normalized.startsWith(OPEN_CHAT_PREFIX) ? normalized.slice(OPEN_CHAT_PREFIX.length) : normalized;
}

function splitDateTime(value?: string) {
  const normalizedValue = value?.trim();
  if (!normalizedValue) return { date: '', time: '' };

  const explicitMatch = normalizedValue.match(
    /^(\d{4}-\d{2}-\d{2})(?:[T\s]+)(\d{1,2}:\d{2}(?::\d{2})?)/,
  );

  if (explicitMatch) {
    return {
      date: explicitMatch[1],
      time: normalizeTimeOption(explicitMatch[2]),
    };
  }

  const timeOnly = normalizeTimeOption(normalizedValue);
  if (timeOnly) return { date: '', time: timeOnly };

  const date = new Date(normalizedValue);
  if (Number.isNaN(date.getTime())) {
    return { date: '', time: '' };
  }

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');

  return { date: `${yyyy}-${mm}-${dd}`, time: normalizeTimeOption(`${hh}:${mi}`) };
}

function isValidTimeValue(value: string) {
  return Boolean(normalizeTimeOption(value));
}

function getApiErrorMessage(error: unknown, fallback: string) {
  const axiosError = error as AxiosError<{ message?: string; data?: { message?: string } }>;
  return axiosError.response?.data?.message ?? axiosError.response?.data?.data?.message ?? fallback;
}

function ChevronDownIcon({ isOpen = false, className = '' }: { isOpen?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={[
        'h-[18px] w-[18px] transition-transform duration-200',
        isOpen ? 'rotate-180' : '',
        className,
      ].join(' ')}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function DarkDatePicker({
  label,
  value,
  onChange,
  maxDate = getDateRangeEnd(),
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxDate?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const minDate = getTodayValue();
  const selectedDate = parseDateValue(value);
  const initialMonth = selectedDate && value >= minDate ? selectedDate : parseDateValue(minDate) ?? new Date();
  const [visibleMonth, setVisibleMonth] = useState(new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1));
  const popoverRef = useRef<HTMLDivElement>(null);
  const calendarDays = getCalendarDays(visibleMonth);

  useEffect(() => {
    if (!isOpen) return;
    const openDate = parseDateValue(value);
    const nextMonth = openDate && value >= minDate ? openDate : parseDateValue(minDate) ?? new Date();
    setVisibleMonth(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1));

    const handlePointerDown = (event: MouseEvent) => {
      if (!popoverRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, minDate, value]);

  return (
    <div ref={popoverRef} className="relative">
      <label className="mb-2 block text-xs text-[#888]">
        {label} <span className="text-[#e63946]">*</span>
      </label>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={[
          'relative flex h-[46px] w-full items-center rounded-lg border bg-[#0d0d0d] px-3 pr-12 text-left text-sm outline-none transition-colors',
          isOpen || value ? 'border-[#3a3a3a] text-[#f5f5f5]' : 'border-[#2a2a2a] text-[#555]',
          'hover:border-[#444] focus:border-[#e63946]',
        ].join(' ')}
      >
        <span className={value ? 'font-bold' : ''}>{value ? formatSelectedDate(value) : '날짜 선택'}</span>
        <ChevronDownIcon
          isOpen={isOpen}
          className={[
            'pointer-events-none absolute right-5 top-1/2 -translate-y-1/2',
            isOpen ? 'text-[#e63946]' : 'text-[#aaa]',
          ].join(' ')}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[76px] z-30 rounded-xl border border-[#303030] bg-[#111] p-2.5 shadow-[0_18px_50px_rgba(0,0,0,0.55)]">
          <div className="mb-2 flex items-center justify-between px-1">
            <button
              type="button"
              onClick={() => setVisibleMonth((current) => addMonths(current, -1))}
              disabled={isPreviousMonthDisabled(visibleMonth, minDate)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-lg leading-none text-[#aaa] transition-colors hover:bg-[#1b1b1b] hover:text-white disabled:cursor-not-allowed disabled:opacity-20 disabled:hover:bg-transparent"
              aria-label="이전 달"
            >
              ‹
            </button>
            <div className="text-sm font-black text-[#f5f5f5]">{formatCalendarTitle(visibleMonth)}</div>
            <button
              type="button"
              onClick={() => setVisibleMonth((current) => addMonths(current, 1))}
              disabled={isNextMonthDisabled(visibleMonth, maxDate)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-lg leading-none text-[#aaa] transition-colors hover:bg-[#1b1b1b] hover:text-white disabled:cursor-not-allowed disabled:opacity-20 disabled:hover:bg-transparent"
              aria-label="다음 달"
            >
              ›
            </button>
          </div>
          <div className="mb-1 grid grid-cols-7 gap-0.5 text-center text-[10px] font-bold text-[#666]">
            {['일', '월', '화', '수', '목', '금', '토'].map((weekday) => (
              <span key={weekday} className="py-1">{weekday}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {calendarDays.map((date) => {
              const dateValue = toDateValue(date);
              const isCurrentMonth = date.getMonth() === visibleMonth.getMonth();
              const isToday = dateValue === minDate;
              const isSelected = value === dateValue;
              const isDisabled = dateValue < minDate || dateValue > maxDate;

              return (
                <button
                  key={dateValue}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => {
                    onChange(dateValue);
                    setIsOpen(false);
                  }}
                  className={[
                    'flex h-7 items-center justify-center rounded-md border text-xs font-bold transition-colors',
                    isSelected
                      ? 'border-[#e63946] bg-[#e63946] text-white shadow-[0_0_16px_rgba(230,57,70,0.24)]'
                      : isToday
                        ? 'border-[#e63946]/40 bg-[#e63946]/10 text-[#ff8a92]'
                        : 'border-transparent bg-transparent text-[#aaa] hover:border-[#333] hover:bg-[#181818]',
                    !isCurrentMonth && 'text-[#444]',
                    isDisabled && 'cursor-not-allowed border-transparent bg-transparent text-[#333] opacity-45 hover:border-transparent hover:bg-transparent',
                  ].filter(Boolean).join(' ')}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function DarkTimePicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const timeOptions = useMemo(
    () => (value && !TIME_OPTIONS.includes(value) ? [value, ...TIME_OPTIONS] : TIME_OPTIONS),
    [value],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!popoverRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={popoverRef} className="relative">
      <label className="mb-2 block text-xs text-[#888]">
        {label} <span className="text-[#e63946]">*</span>
      </label>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={[
          'relative flex h-[46px] w-full items-center rounded-lg border bg-[#0d0d0d] px-3 pr-12 text-left text-sm outline-none transition-colors',
          isOpen || value ? 'border-[#3a3a3a] text-[#f5f5f5]' : 'border-[#2a2a2a] text-[#555]',
          'hover:border-[#444] focus:border-[#e63946]',
        ].join(' ')}
      >
        <span className={value ? 'font-bold' : ''}>{value || '시간 선택'}</span>
        <ChevronDownIcon
          isOpen={isOpen}
          className={[
            'pointer-events-none absolute right-5 top-1/2 -translate-y-1/2',
            isOpen ? 'text-[#e63946]' : 'text-[#aaa]',
          ].join(' ')}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[76px] z-30 rounded-xl border border-[#303030] bg-[#111] p-2 shadow-[0_18px_50px_rgba(0,0,0,0.55)]">
          <div className="max-h-[236px] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-1">
              {timeOptions.map((timeValue) => {
                const isSelected = value === timeValue;

                return (
                  <button
                    key={timeValue}
                    type="button"
                    onClick={() => {
                      onChange(timeValue);
                      setIsOpen(false);
                  }}
                  className={[
                      'rounded-md border px-3 py-2 text-left text-sm font-bold transition-colors',
                      isSelected
                        ? 'border-[#e63946]/70 bg-[#e63946]/15 text-[#ff6b74]'
                        : 'border-transparent bg-transparent text-[#aaa] hover:bg-[#1a1a1a] hover:text-white',
                    ].join(' ')}
                  >
                    {timeValue}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getThemeBranchName(theme: Theme) {
  return theme.branchName || theme.storeName || theme.locationName || '지점 정보 없음';
}

function getThemeMeta(theme: Theme) {
  const details = [getThemeBranchName(theme)];

  if (theme.minPlayers || theme.maxPlayers) {
    details.push(`${theme.minPlayers || 1}~${theme.maxPlayers || theme.minPlayers || 1}인`);
  }
  if (theme.duration) details.push(`${theme.duration}분`);

  return details.join(' · ');
}

function ThemeSearchSelect({
  themes,
  value,
  isLoading,
  onChange,
}: {
  themes: Theme[];
  value: string;
  isLoading: boolean;
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('전체');
  const popoverRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const selectedTheme = useMemo(
    () => themes.find((theme) => theme.id === Number(value)),
    [themes, value],
  );
  const branches = useMemo(
    () => Array.from(new Set(themes.map(getThemeBranchName))).sort((a, b) => a.localeCompare(b, 'ko')),
    [themes],
  );
  const filteredThemes = useMemo(() => {
    const keyword = searchKeyword.trim().toLocaleLowerCase('ko');

    return themes.filter((theme) => {
      const branchName = getThemeBranchName(theme);
      const matchesBranch = selectedBranch === '전체' || branchName === selectedBranch;
      const matchesKeyword =
        !keyword ||
        theme.title.toLocaleLowerCase('ko').includes(keyword) ||
        branchName.toLocaleLowerCase('ko').includes(keyword);

      return matchesBranch && matchesKeyword;
    });
  }, [searchKeyword, selectedBranch, themes]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!popoverRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    window.setTimeout(() => searchInputRef.current?.focus(), 0);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={popoverRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className={[
          'relative flex min-h-[48px] w-full items-center rounded-lg border bg-[#0d0d0d] px-4 pr-12 text-left outline-none transition-all',
          isOpen
            ? 'border-[#e63946] shadow-[0_0_0_3px_rgba(230,57,70,0.08)]'
            : 'border-[#2a2a2a] hover:border-[#444]',
        ].join(' ')}
      >
        {selectedTheme ? (
          <span className="min-w-0">
            <span className="block truncate text-sm font-black text-[#f5f5f5]">
              {selectedTheme.title}
            </span>
            <span className="mt-0.5 block truncate text-[11px] text-[#737373]">
              {getThemeMeta(selectedTheme)}
            </span>
          </span>
        ) : (
          <span className="text-sm font-semibold text-[#666]">
            {isLoading ? '테마를 불러오는 중...' : '테마를 선택해주세요'}
          </span>
        )}
        <ChevronDownIcon
          isOpen={isOpen}
          className={[
            'pointer-events-none absolute right-4 top-1/2 -translate-y-1/2',
            isOpen ? 'text-[#e63946]' : 'text-[#888]',
          ].join(' ')}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[56px] z-40 overflow-hidden rounded-xl border border-[#343434] bg-[#111] shadow-[0_24px_70px_rgba(0,0,0,0.68),0_0_28px_rgba(230,57,70,0.08)]">
          <div className="border-b border-white/[0.07] p-3">
            <div className="relative">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666]"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.2-3.2" />
              </svg>
              <input
                ref={searchInputRef}
                value={searchKeyword}
                onChange={(event) => setSearchKeyword(event.target.value)}
                placeholder="테마명 또는 지점명으로 검색"
                className="h-10 w-full rounded-lg border border-[#292929] bg-[#0b0b0b] pl-9 pr-3 text-sm font-semibold text-[#f5f5f5] outline-none placeholder:text-[#555] focus:border-[#e63946]/75"
              />
            </div>

            {branches.length > 0 && (
              <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
                {['전체', ...branches].map((branch) => {
                  const isSelected = selectedBranch === branch;

                  return (
                    <button
                      key={branch}
                      type="button"
                      onClick={() => setSelectedBranch(branch)}
                      className={[
                        'shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-black transition-colors',
                        isSelected
                          ? 'border-[#e63946]/70 bg-[#e63946]/15 text-[#ff6b74]'
                          : 'border-[#2d2d2d] bg-[#171717] text-[#777] hover:border-[#444] hover:text-[#bbb]',
                      ].join(' ')}
                    >
                      {branch}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div role="listbox" className="max-h-[320px] overflow-y-auto p-2">
            {isLoading ? (
              <p className="px-3 py-10 text-center text-sm font-semibold text-[#666]">
                테마 목록을 불러오는 중입니다.
              </p>
            ) : filteredThemes.length === 0 ? (
              <p className="px-3 py-10 text-center text-sm font-semibold text-[#666]">
                검색 결과가 없습니다.
              </p>
            ) : (
              filteredThemes.map((theme) => {
                const isSelected = theme.id === Number(value);

                return (
                  <button
                    key={theme.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange(String(theme.id));
                      setIsOpen(false);
                      setSearchKeyword('');
                    }}
                    className={[
                      'mb-1 flex w-full items-center justify-between gap-4 rounded-lg border px-3.5 py-3 text-left transition-all last:mb-0',
                      isSelected
                        ? 'border-[#e63946]/55 bg-[#e63946]/12 shadow-[inset_3px_0_0_#e63946]'
                        : 'border-transparent bg-transparent hover:border-white/[0.06] hover:bg-white/[0.045]',
                    ].join(' ')}
                  >
                    <span className="min-w-0">
                      <span
                        className={[
                          'block truncate text-sm font-black',
                          isSelected ? 'text-[#ff7079]' : 'text-[#ededed]',
                        ].join(' ')}
                      >
                        {theme.title}
                      </span>
                      <span className="mt-1 block truncate text-[11px] font-semibold text-[#686868]">
                        {getThemeMeta(theme)}
                      </span>
                    </span>
                    {isSelected && (
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e63946] text-xs font-black text-white">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {selectedTheme && (
        <div className="mt-3 rounded-xl border border-[#2b2b2b] bg-[linear-gradient(135deg,rgba(230,57,70,0.08),rgba(13,13,13,0.92)_38%)] p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-black text-[#f5f5f5]">{selectedTheme.title}</p>
              <p className="mt-1 text-xs font-semibold text-[#777]">{getThemeMeta(selectedTheme)}</p>
            </div>
            <span className="shrink-0 rounded-full border border-[#e63946]/35 bg-[#e63946]/10 px-2.5 py-1 text-[10px] font-black text-[#ff6b74]">
              선택됨
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.06] pt-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#777]">공포도</span>
              <RatingIcons value={selectedTheme.horrorLevel} type="horror" size="xs" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#777]">난이도</span>
              <RatingIcons value={selectedTheme.difficulty} type="difficulty" size="xs" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MateWritePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = Number(searchParams.get('editId'));
  const isEditMode = Number.isFinite(editId) && editId > 0;
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isThemesLoading, setIsThemesLoading] = useState(true);
  const [isPostLoading, setIsPostLoading] = useState(isEditMode);
  const [title, setTitle] = useState('');
  const [themeId, setThemeId] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');
  const [maxPeople, setMaxPeople] = useState(2);
  const [experienceLevel, setExperienceLevel] = useState<MateExperienceLevel>('ANY');
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [openChatUrl, setOpenChatUrl] = useState(OPEN_CHAT_PREFIX);
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getThemes()
      .then((data) => {
        if (isMounted) setThemes(data);
      })
      .finally(() => {
        if (isMounted) setIsThemesLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isEditMode) return;
    let isMounted = true;

    setIsPostLoading(true);
    setErrorMessage('');

    getMatePostById(editId)
      .then((post) => {
        if (!isMounted) return;
        const meeting = splitDateTime(post.meetingTime);
        const deadlineValue = splitDateTime(post.deadline);
        setTitle(post.title);
        setThemeId(String(post.themeId));
        setMeetingDate(meeting.date);
        setMeetingTime(meeting.time);
        setDeadlineDate(deadlineValue.date);
        setDeadlineTime(deadlineValue.time);
        setMaxPeople(Math.min(MAX_PEOPLE, Math.max(MIN_PEOPLE, post.maxPeople)));
        setExperienceLevel(post.experienceLevel);
        setTags(post.tags);
        setContent(post.content);
        setOpenChatUrl(post.openChatUrl ?? OPEN_CHAT_PREFIX);
        setImageUrl(post.imageUrl ?? '');
      })
      .catch((error) => {
        if (isMounted) setErrorMessage(getApiErrorMessage(error, '모집 글을 불러오지 못했습니다.'));
      })
      .finally(() => {
        if (isMounted) setIsPostLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [editId, isEditMode]);

  useEffect(() => {
    if (meetingDate && deadlineDate && deadlineDate > meetingDate) {
      setDeadlineDate(meetingDate);
    }
  }, [deadlineDate, meetingDate]);

  const toggleTag = (tag: string) => {
    setTags((prev) => {
      if (prev.includes(tag)) return prev.filter((item) => item !== tag);
      if (prev.length >= MAX_TAG_COUNT) return prev;
      return [...prev, tag];
    });
  };

  const validationMessage = useMemo(() => {
    const todayValue = getTodayValue();
    const trimmedTitle = title.trim();
    if (!themeId) return '테마를 선택해주세요.';
    if (trimmedTitle.length < TITLE_MIN_LENGTH) {
      return `제목은 ${TITLE_MIN_LENGTH}자 이상 입력해주세요.`;
    }
    if (trimmedTitle.length > TITLE_MAX_LENGTH) {
      return `제목은 ${TITLE_MAX_LENGTH}자 이하로 입력해주세요.`;
    }
    if (!content.trim()) return '내용을 입력해주세요.';
    if (!meetingDate || !meetingTime) return '모임 날짜와 시간을 입력해주세요.';
    if (!deadlineDate || !deadlineTime) return '모집 마감 날짜와 시간을 입력해주세요.';
    if (meetingDate < todayValue) return '오늘 이전 날짜는 선택할 수 없습니다.';
    if (deadlineDate < todayValue) return '오늘 이전 날짜는 선택할 수 없습니다.';
    if (deadlineDate > meetingDate) return '모집 마감일은 모임 날짜보다 늦을 수 없습니다.';
    if (!isValidTimeValue(meetingTime) || !isValidTimeValue(deadlineTime)) {
      return '시간을 확인해주세요.';
    }
    if (deadlineDate === meetingDate && deadlineTime >= meetingTime) {
      return '모집 마감 시간은 모임 시간보다 이전이어야 합니다.';
    }
    if (maxPeople < MIN_PEOPLE || maxPeople > MAX_PEOPLE) {
      return `모집 인원은 ${MIN_PEOPLE}명 이상 ${MAX_PEOPLE}명 이하여야 합니다.`;
    }
    if (!getOpenChatCode(openChatUrl).trim()) return '오픈채팅 코드를 입력해주세요.';
    return '';
  }, [content, deadlineDate, deadlineTime, maxPeople, meetingDate, meetingTime, openChatUrl, themeId, title]);

  const isValid = !validationMessage;

  const handleSubmit = async () => {
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        themeId: Number(themeId),
        title: title.trim(),
        content: content.trim(),
        meetingTime: toIsoString(meetingDate, meetingTime),
        deadline: toIsoString(deadlineDate, deadlineTime),
        maxPeople,
        tags,
        experienceLevel,
        openChatUrl: normalizeOpenChatUrl(openChatUrl),
        imageUrl: imageUrl.trim() || undefined,
      };
      if (isEditMode) await updateMatePost(editId, payload);
      else await createMatePost(payload);
      setSubmitted(true);
      window.setTimeout(() => router.push(isEditMode ? `/mate/${editId}` : '/mate'), 900);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, isEditMode ? '모집 글 수정에 실패했습니다.' : '모집 글 등록에 실패했습니다.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d0d0d]">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#2ecc71]/40 bg-[#2ecc71]/20 text-2xl text-[#2ecc71]">
            ✓
          </div>
          <p className="mb-1 text-lg font-bold text-[#2ecc71]">
            모집 글이 {isEditMode ? '수정' : '등록'}되었습니다.
          </p>
          <p className="text-sm text-[#888]">잠시 후 이동합니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] pb-24">
      <div className="border-b border-[#1a1a1a]">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-[#555]">
            <Link href="/" className="transition-colors hover:text-[#888]">홈</Link>
            <span>›</span>
            <Link href="/mate" className="transition-colors hover:text-[#888]">메이트 모집</Link>
            <span>›</span>
            <span className="text-[#888]">글쓰기</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-1 text-2xl font-black text-[#f5f5f5]">
          {isEditMode ? '메이트 모집 글 수정' : '메이트 모집 글쓰기'}
        </h1>
        <p className="mb-8 text-sm text-[#888]">실제 테마와 시간 정보를 기준으로 함께할 메이트를 모집해보세요.</p>

        {isPostLoading ? (
          <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] py-20 text-center text-sm font-bold text-[#888]">
            모집 글을 불러오는 중입니다.
          </div>
        ) : (
        <>
        <section className="mb-5 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-sm font-bold text-[#f5f5f5]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e63946] text-xs font-bold text-white">1</span>
            기본 정보
          </h2>

          <div className="mb-5">
            <label className="mb-2 block text-xs text-[#888]">모집 제목 <span className="text-[#e63946]">*</span></label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="예) 강남점 공포 테마 같이 가실 분"
              minLength={TITLE_MIN_LENGTH}
              maxLength={TITLE_MAX_LENGTH}
              className="w-full rounded border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f5f5f5] outline-none placeholder:text-[#555] focus:border-[#e63946]"
            />
            <p className="mt-1 text-right text-xs text-[#555]">
              {title.length}/{TITLE_MAX_LENGTH} · 최소 {TITLE_MIN_LENGTH}자
            </p>
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-xs text-[#888]">테마 <span className="text-[#e63946]">*</span></label>
            <ThemeSearchSelect
              themes={themes}
              value={themeId}
              isLoading={isThemesLoading}
              onChange={setThemeId}
            />
          </div>

          <div className="mb-5 grid gap-4 lg:grid-cols-2">
            <DarkDatePicker label="모임 날짜" value={meetingDate} onChange={setMeetingDate} />
            <DarkTimePicker label="모임 시간" value={meetingTime} onChange={setMeetingTime} />
            <DarkDatePicker label="모집 마감일" value={deadlineDate} onChange={setDeadlineDate} maxDate={meetingDate || getDateRangeEnd()} />
            <DarkTimePicker label="마감 시간" value={deadlineTime} onChange={setDeadlineTime} />
          </div>

          <div>
            <label className="mb-3 block text-xs text-[#888]">최대 인원 <span className="text-[#e63946]">*</span></label>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setMaxPeople((value) => Math.max(MIN_PEOPLE, value - 1))} className="flex h-8 w-8 items-center justify-center rounded border border-[#2a2a2a] text-[#888] transition-colors hover:border-[#e63946] hover:text-[#e63946]">−</button>
              <span className="w-10 text-center text-sm font-bold text-[#f5f5f5]">{maxPeople}</span>
              <button type="button" onClick={() => setMaxPeople((value) => Math.min(MAX_PEOPLE, value + 1))} className="flex h-8 w-8 items-center justify-center rounded border border-[#2a2a2a] text-[#888] transition-colors hover:border-[#e63946] hover:text-[#e63946]">+</button>
              <span className="text-xs text-[#555]">명 · 최대 {MAX_PEOPLE}명</span>
            </div>
          </div>
        </section>

        <section className="mb-5 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-sm font-bold text-[#f5f5f5]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e63946] text-xs font-bold text-white">2</span>
            모집 내용
          </h2>

          <div className="mb-5">
            <label className="mb-3 block text-xs text-[#888]">경험 레벨</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {EXPERIENCE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={[
                    'flex cursor-pointer flex-col gap-1 rounded-lg border p-3 transition-colors',
                    experienceLevel === option.value ? 'border-[#e63946] bg-[#e63946]/10' : 'border-[#2a2a2a] hover:border-[#333]',
                  ].join(' ')}
                >
                  <input
                    type="radio"
                    name="experienceLevel"
                    value={option.value}
                    checked={experienceLevel === option.value}
                    onChange={() => setExperienceLevel(option.value)}
                    className="sr-only"
                  />
                  <span className={['text-xs font-medium', experienceLevel === option.value ? 'text-[#e63946]' : 'text-[#f5f5f5]'].join(' ')}>
                    {option.label}
                  </span>
                  <span className="text-xs leading-tight text-[#555]">{option.desc}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <div className="mb-3 flex items-end justify-between gap-3">
              <label className="block text-xs text-[#888]">모집 태그</label>
              <span className="text-[11px] text-[#555]">최대 {MAX_TAG_COUNT}개 선택</span>
            </div>
            <div className="rounded-lg border border-[#252525] bg-[#0d0d0d] p-3">
              <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  disabled={!tags.includes(tag) && tags.length >= MAX_TAG_COUNT}
                  className={[
                    'rounded-full border px-3 py-1.5 text-xs font-bold transition-colors sm:text-sm',
                    tags.includes(tag)
                      ? 'border-[#e63946] bg-[#e63946]/15 text-[#ff6b74] shadow-[0_0_14px_rgba(230,57,70,0.12)]'
                      : 'border-[#2a2a2a] bg-[#151515] text-[#888] hover:border-[#444] hover:text-[#bbb] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[#2a2a2a] disabled:hover:text-[#888]',
                  ].join(' ')}
                >
                  {tag}
                </button>
              ))}
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs text-[#888]">상세 내용 <span className="text-[#e63946]">*</span></label>
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="본인 소개, 원하는 플레이 스타일, 주의사항 등을 자유롭게 적어주세요."
              rows={6}
              maxLength={1000}
              className="w-full resize-none rounded border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f5f5f5] outline-none placeholder:text-[#555] focus:border-[#e63946]"
            />
            <p className="mt-1 text-right text-xs text-[#555]">{content.length}/1000</p>
          </div>
        </section>

        <section className="mb-8 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-sm font-bold text-[#f5f5f5]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e63946] text-xs font-bold text-white">3</span>
            연락 정보
          </h2>
          <div className="mb-4">
            <label className="mb-2 block text-xs text-[#888]">오픈채팅 링크 <span className="text-[#e63946]">*</span></label>
            <input
              type="text"
              value={openChatUrl}
              onChange={(event) => setOpenChatUrl(event.target.value)}
              onFocus={(event) => {
                const cursorPosition = event.currentTarget.value.length;
                event.currentTarget.setSelectionRange(cursorPosition, cursorPosition);
              }}
              onBlur={() => setOpenChatUrl(normalizeOpenChatUrl(openChatUrl))}
              placeholder={OPEN_CHAT_PREFIX}
              className="w-full rounded-lg border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f5f5f5] outline-none placeholder:text-[#555] focus:border-[#e63946]"
            />
            <p className="mt-2 text-xs text-[#666]">
              전체 URL을 붙여넣어도 되고, 오픈채팅 코드만 입력해도 됩니다.
            </p>
          </div>
          <div>
            <label className="mb-2 block text-xs text-[#888]">이미지 URL <span className="text-[#666]">(선택)</span></label>
            {/* TODO: mate-post API가 multipart 업로드를 지원하면 파일 첨부 UI로 전환 예정 */}
            <input
              type="url"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f5f5f5] outline-none placeholder:text-[#555] focus:border-[#e63946]"
            />
            <p className="mt-2 text-xs text-[#666]">
              현재는 이미지 URL만 지원합니다. 파일 업로드는 추후 전환 예정입니다.
            </p>
          </div>
        </section>

        {errorMessage && <p className="mb-3 text-center text-xs font-bold text-[#ef5353]">{errorMessage}</p>}

        <div className="flex gap-3">
          <Link href="/mate" className="rounded border border-[#2a2a2a] px-5 py-3 text-sm text-[#888] transition-colors hover:border-[#444]">취소</Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className="flex-1 rounded bg-[#e63946] py-3 text-sm font-bold text-white transition-colors hover:bg-[#c1121f] disabled:cursor-not-allowed disabled:bg-[#2a1719] disabled:text-[#b9a4a6] disabled:hover:bg-[#2a1719]"
          >
            {isSubmitting ? '저장 중...' : isEditMode ? '모집 글 수정하기' : '모집 글 등록하기'}
          </button>
        </div>

        {!isValid && (
          <p className="mt-3 text-center text-xs text-[#555]">
            * {validationMessage}
          </p>
        )}
        </>
        )}
      </div>
    </div>
  );
}
