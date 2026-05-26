'use client';

import { useRef } from 'react';
import ThemeCard from '@/components/card/ThemeCard';
import { Theme } from '@/types/theme';

interface ThemeCarouselProps {
  themes: Theme[];
}

export default function ThemeCarousel({ themes }: ThemeCarouselProps) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' });
  };

  return (
    <div className="relative group/carousel">
      {/* 좌측 버튼 */}
      <button
        onClick={() => scroll('left')}
        aria-label="이전"
        className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full items-center justify-center text-[#f5f5f5] text-lg hover:border-[#e63946] hover:text-[#e63946] transition-colors shadow-lg opacity-0 group-hover/carousel:opacity-100"
      >
        ‹
      </button>

      {/* 카드 트랙 */}
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {themes.map((theme) => (
          <div
            key={theme.id}
            className="snap-start shrink-0 w-55 sm:w-60"
          >
            <ThemeCard theme={theme} />
          </div>
        ))}
      </div>

      {/* 우측 버튼 */}
      <button
        onClick={() => scroll('right')}
        aria-label="다음"
        className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full items-center justify-center text-[#f5f5f5] text-lg hover:border-[#e63946] hover:text-[#e63946] transition-colors shadow-lg opacity-0 group-hover/carousel:opacity-100"
      >
        ›
      </button>
    </div>
  );
}
