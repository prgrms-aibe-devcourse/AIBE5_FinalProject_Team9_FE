import Link from 'next/link';
import { Theme } from '@/types/theme';

interface ThemeCardProps {
  theme: Theme;
}

function DifficultyDots({ level, max = 5 }: { level: number; max?: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={[
            'w-2 h-2 rounded-full',
            i < level ? 'bg-[#e63946]' : 'bg-[#2a2a2a]',
          ].join(' ')}
        />
      ))}
    </span>
  );
}

export default function ThemeCard({ theme }: ThemeCardProps) {
  return (
    <div className="group relative bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden hover:border-[#e63946] transition-colors">
      {/* Badge */}
      {(theme.isBest || theme.isNew || theme.isHot || theme.rank) && (
        <div className="absolute top-2 left-2 z-10 flex gap-1">
          {theme.rank && (
            <span className="bg-[#e63946] text-white text-xs font-bold px-2 py-0.5 rounded">
              {theme.rank}위
            </span>
          )}
          {theme.isBest && (
            <span className="bg-[#f39c12] text-white text-xs font-bold px-2 py-0.5 rounded">BEST</span>
          )}
          {theme.isNew && (
            <span className="bg-[#2ecc71] text-white text-xs font-bold px-2 py-0.5 rounded">NEW</span>
          )}
          {theme.isHot && (
            <span className="bg-[#e63946] text-white text-xs font-bold px-2 py-0.5 rounded">HOT</span>
          )}
        </div>
      )}

      {/* Image */}
      <div className="aspect-[4/3] bg-[#111] overflow-hidden">
        {theme.imageUrl ? (
          <img
            src={theme.imageUrl}
            alt={theme.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#2a2a2a] text-4xl">🚪</div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs text-[#888] mb-1">{theme.locationName} · {theme.branchName}</p>
        <h3 className="font-semibold text-[#f5f5f5] text-sm mb-2 leading-tight">{theme.title}</h3>

        <div className="flex items-center gap-3 text-xs text-[#888] mb-2">
          <span>난이도 <DifficultyDots level={theme.difficulty} /></span>
          <span>공포 <DifficultyDots level={theme.horrorLevel} /></span>
        </div>

        <div className="flex items-center justify-between text-xs text-[#888]">
          <span>★ {theme.rating?.toFixed(1)} ({theme.reviewCount})</span>
          <span>{theme.minPlayers}~{theme.maxPlayers}인 · {theme.duration}분</span>
        </div>

        <Link
          href={`/themes/${theme.id}`}
          className="mt-3 block w-full text-center bg-[#e63946] hover:bg-[#c1121f] text-white text-sm py-2 rounded transition-colors"
        >
          예약하기
        </Link>
      </div>
    </div>
  );
}
