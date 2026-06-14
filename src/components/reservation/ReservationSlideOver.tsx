'use client';

import ImageWithFallback from '@/components/common/ImageWithFallback';
import ReservationCalendar from '@/components/reservation/ReservationCalendar';
import { useReservationStore } from '@/stores/reservationStore';
import Link from 'next/link';

interface ReservationTheme {
  id: number;
  title: string;
  branchName?: string;
  locationName?: string;
  price: number;
  minPlayers: number;
  maxPlayers: number;
  duration: number;
  imageUrl?: string;
}

interface ReservationSlideOverProps {
  theme: ReservationTheme;
  selectedDate: string;
  selectedTime: string;
  times: { time: string; soldOut?: boolean }[];
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
  onClose: () => void;
}

const THEME_PLACEHOLDER_IMAGE = '/images/theme-placeholder.png';

export default function ReservationSlideOver({
  theme,
  selectedDate,
  selectedTime,
  times,
  onSelectDate,
  onSelectTime,
  onClose,
}: ReservationSlideOverProps) {
  const { setTheme, setLocation, setDateTime, setHeadcount } = useReservationStore();
  const minPlayers = Math.max(1, theme.minPlayers || 1);
  const maxPlayers = Math.max(minPlayers, theme.maxPlayers || minPlayers);
  const selectedHeadcount = minPlayers;
  const totalPrice = theme.price * selectedHeadcount;
  const canReserve = Boolean(selectedDate && selectedTime);

  const handleReserve = () => {
    if (!canReserve) return;

    setTheme(theme.id, theme.title, theme.imageUrl);
    setLocation(theme.locationName ?? '', theme.branchName ?? '');
    setDateTime(selectedDate, selectedTime);
    setHeadcount(selectedHeadcount, 0);
  };

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="예약 패널 닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/72 backdrop-blur-[2px]"
      />

      <aside className="absolute bottom-0 right-0 flex h-[92vh] w-full flex-col overflow-hidden rounded-t-[18px] border border-[#cc2222]/25 bg-[#111] shadow-[-28px_0_70px_rgba(0,0,0,0.56),-8px_0_32px_rgba(204,34,34,0.12)] md:top-0 md:h-full md:max-w-[520px] md:rounded-none md:border-y-0 md:border-r-0">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(204,34,34,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_34%)]" />

        <div className="relative flex h-full flex-col">
          <header className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
            <div>
              <p className="text-[10px] font-black tracking-[0.26em] text-[#cc2222]">
                {'// RESERVATION'}
              </p>
              <h2 className="mt-1 text-lg font-black text-white">예약하기</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="닫기"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-black/35 text-xl font-black text-white transition-colors hover:border-[#cc2222]/60 hover:bg-[#cc2222]/18"
            >
              ×
            </button>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
            <section className="mb-5 overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#171717]">
              <div className="relative h-36 bg-[#111]">
                <ImageWithFallback
                  src={theme.imageUrl}
                  fallbackSrc={THEME_PLACEHOLDER_IMAGE}
                  alt={theme.title}
                  fill
                  sizes="520px"
                  className="object-cover brightness-[0.72] contrast-110 saturate-[0.82]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#171717] via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <p className="text-xs font-bold text-[#888]">
                  {theme.locationName} {theme.branchName ? `· ${theme.branchName}` : ''}
                </p>
                <h3 className="mt-1 text-xl font-black text-white">{theme.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-[#aaa]">
                  <span className="rounded border border-white/[0.08] bg-black/20 px-2 py-1">
                    {theme.duration}분
                  </span>
                  <span className="rounded border border-white/[0.08] bg-black/20 px-2 py-1">
                    {minPlayers}-{maxPlayers}명
                  </span>
                  <span className="rounded border border-[#cc2222]/35 bg-[#cc2222]/10 px-2 py-1 text-[#ef5353]">
                    {theme.price.toLocaleString()}원
                  </span>
                </div>
              </div>
            </section>

            <section className="mb-5">
              <h3 className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#9a9a9a]">
                예약 날짜
              </h3>
              <ReservationCalendar selectedDate={selectedDate} onSelect={onSelectDate} />
            </section>

            <section className="mb-5">
              <h3 className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#9a9a9a]">
                예약 시간
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {times.map((slot) => {
                  const isSelected = selectedTime === slot.time;

                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={slot.soldOut}
                      onClick={() => onSelectTime(slot.time)}
                      className={[
                        'h-11 rounded-[10px] border text-sm font-black transition-all',
                        slot.soldOut
                          ? 'cursor-not-allowed border-white/[0.05] text-[#444] line-through'
                          : isSelected
                            ? 'border-[#cc2222] bg-[#cc2222] text-white shadow-[0_0_18px_rgba(204,34,34,0.2)]'
                            : 'border-white/[0.1] bg-[#171717] text-[#d8d8d8] hover:border-[#cc2222]/65',
                      ].join(' ')}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-[14px] border border-white/[0.08] bg-[#171717] p-4">
              <h3 className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#9a9a9a]">
                예약 요약
              </h3>
              <div className="space-y-2 text-sm">
                <SummaryRow label="날짜" value={selectedDate || '날짜를 선택해주세요'} />
                <SummaryRow label="시간" value={selectedTime || '시간을 선택해주세요'} />
                <SummaryRow label="인원" value={`${selectedHeadcount}명`} />
                <SummaryRow label="예상 금액" value={`${totalPrice.toLocaleString()}원`} highlight />
              </div>
            </section>
          </div>

          <footer className="relative flex gap-3 border-t border-white/[0.08] bg-[#111]/95 px-5 py-4 backdrop-blur">
            <button
              type="button"
              onClick={onClose}
              className="h-12 flex-1 rounded-[10px] border border-white/[0.12] text-sm font-black text-[#d8d8d8] transition-colors hover:bg-white/[0.06]"
            >
              닫기
            </button>
            {canReserve ? (
              <Link
                href={`/reservation?themeId=${theme.id}&date=${selectedDate}&time=${selectedTime}`}
                onClick={handleReserve}
                className="h-12 flex-[1.7] rounded-[10px] bg-[#cc2222] text-center text-sm font-black leading-[48px] text-white transition-all hover:bg-[#e23b3b] hover:shadow-[0_0_22px_rgba(204,34,34,0.22)]"
              >
                예약 진행하기
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="h-12 flex-[1.7] cursor-not-allowed rounded-[10px] bg-[#cc2222] text-sm font-black text-white opacity-45"
              >
                예약 진행하기
              </button>
            )}
          </footer>
        </div>
      </aside>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[#777]">{label}</span>
      <span className={highlight ? 'font-black text-[#ef5353]' : 'font-bold text-[#f5f5f5]'}>
        {value}
      </span>
    </div>
  );
}
