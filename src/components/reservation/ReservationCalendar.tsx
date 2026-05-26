'use client';

import { useState } from 'react';

interface ReservationCalendarProps {
  selectedDate: string;
  onSelect: (date: string) => void;
}

export default function ReservationCalendar({ selectedDate, onSelect }: ReservationCalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const toDateStr = (d: number) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const isPast = (d: number) => new Date(toDateStr(d)) < today;

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="text-[#888] hover:text-[#f5f5f5] px-2">‹</button>
        <span className="text-sm font-medium text-[#f5f5f5]">
          {viewYear}년 {viewMonth + 1}월
        </span>
        <button onClick={nextMonth} className="text-[#888] hover:text-[#f5f5f5] px-2">›</button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 text-center text-xs text-[#888] mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 text-center text-sm gap-y-1">
        {Array.from({ length: firstDay }).map((_, i) => <span key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const d = i + 1;
          const dateStr = toDateStr(d);
          const past = isPast(d);
          const selected = selectedDate === dateStr;
          return (
            <button
              key={d}
              onClick={() => !past && onSelect(dateStr)}
              disabled={past}
              className={[
                'w-8 h-8 mx-auto rounded-full text-xs transition-colors',
                past ? 'text-[#444] cursor-not-allowed' : 'text-[#f5f5f5] hover:bg-[#2a2a2a]',
                selected ? 'bg-[#e63946] text-white hover:bg-[#e63946]' : '',
              ].join(' ')}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}
