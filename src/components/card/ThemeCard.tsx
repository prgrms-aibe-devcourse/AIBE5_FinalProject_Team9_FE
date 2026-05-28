import Image from "next/image";
import Link from "next/link";
import { Theme } from "@/types/theme";

interface ThemeCardProps {
  theme: Theme;
}

function Dots({ level }: { level: number }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={[
            "h-3 w-3 rounded-full",
            index < level ? "bg-[#cc2222]" : "bg-[#343434]",
          ].join(" ")}
        />
      ))}
    </span>
  );
}

export default function ThemeCard({ theme }: ThemeCardProps) {
  return (
    <article className="group overflow-hidden rounded-[12px] border border-white/[0.08] bg-[#171717] shadow-[0_14px_34px_rgba(0,0,0,0.22)] transition-all duration-300 hover:border-[#cc2222]/70 hover:bg-[#1b1b1b]">
      <div className="relative h-[230px] overflow-hidden bg-[#101010] lg:h-[248px]">
        {theme.imageUrl && (
          <Image
            src={theme.imageUrl}
            alt={theme.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-center transition duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#171717] to-transparent" />
        {theme.rank && (
          <span className="absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-[8px] bg-[#cc2222] px-3 text-[12px] font-black text- shadow-[0_8px_22px_rgba(204,34,34,0.32)]">
            {theme.rank}
          </span>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-[20px] font-black leading-snug text-[#f5f5f5]">
          {theme.title}
        </h3>

        <div className="mt-5 space-y-4">
          <div className="flex items-center gap-4 text-[14px] text-[#8f8f8f]">
            <span className="shrink-0">공포도</span>
            <Dots level={theme.horrorLevel} />
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-[#a5a5a5]">
            <span className="font-semibold text-[#ffcc4d]">
              ★ {theme.rating.toFixed(1)}
            </span>
            <span className="text-[#777]">리뷰 {theme.reviewCount}</span>
            <span className="text-[#a5a5a5]">📍 {theme.locationName}</span>
          </div>

          <div className="text-[13px] leading-5 text-[#777]">
            {theme.minPlayers}~{theme.maxPlayers}인 · {theme.duration}분
          </div>
        </div>

        <Link
          href={`/themes/${theme.id}`}
          className="mt-6 block h-12 w-full rounded-[8px] bg-[#cc2222] text-center text-[15px] font-black leading-[48px] text-white transition-colors hover:bg-[#a91d1d]"
        >
          예약하기
        </Link>
      </div>
    </article>
  );
}
