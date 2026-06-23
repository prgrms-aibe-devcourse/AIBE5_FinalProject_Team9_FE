"use client";

import Link from "next/link";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import RatingIcons from "@/components/common/RatingIcons";
import RatingStars from "@/components/common/RatingStars";
import { Theme } from "@/types/theme";

const THEME_PLACEHOLDER_IMAGE = "/images/theme-placeholder.png";

interface ThemeCardProps {
  theme: Theme;
  showRank?: boolean;
  showPrice?: boolean;
  actionLabel?: string;
  onAction?: (theme: Theme) => void;
}

function RankBadge({ rank }: { rank: number }) {
  return (
    <span className="absolute left-3 top-0 z-10 block h-11 w-8 overflow-hidden rounded-t-[4px] bg-[linear-gradient(180deg,#cc2222_0%,#b5161d_48%,#8f1116_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-8px_14px_rgba(60,0,0,0.16),0_10px_22px_rgba(143,17,22,0.38)] transition-transform duration-500 [clip-path:polygon(0_0,100%_0,100%_100%,50%_72%,0_100%)] group-hover:-translate-y-0.5">
      <span className="relative z-10 flex h-9 items-center justify-center text-[16px] font-black leading-none text-white">
        {rank}
      </span>
      <span className="absolute right-0 top-0 h-4 w-4 bg-gradient-to-br from-white/10 via-[#b5161d]/10 to-black/8 opacity-45 [clip-path:polygon(0_0,100%_0,100%_100%)]" />
      <span className="absolute inset-x-0 top-0 h-px bg-white/18" />
      <span className="absolute inset-y-0 left-0 w-px bg-white/18" />
    </span>
  );
}

export default function ThemeCard({
  theme,
  showRank = true,
  showPrice = false,
  actionLabel = "예약하기",
  onAction,
}: ThemeCardProps) {
  const playerLabel =
    theme.minPlayers && theme.maxPlayers
      ? `${theme.minPlayers}~${theme.maxPlayers}인`
      : "인원 정보 없음";
  const durationLabel = theme.duration ? `${theme.duration}분` : "시간 정보 없음";
  const locationLabel = theme.locationName || theme.branchName || theme.storeName || "위치 정보 없음";
  const actionClassName =
    "mt-6 block h-12 w-full rounded-[8px] border border-[#e23b3b]/75 bg-transparent text-center text-[15px] font-black leading-[48px] text-[#e23b3b] transition-all duration-300 hover:bg-[#e23b3b]/10 hover:text-white hover:shadow-[0_0_18px_rgba(204,34,34,0.18)]";

  return (
    <article className="group overflow-hidden rounded-[12px] border border-white/[0.08] bg-[#171717] shadow-[0_14px_34px_rgba(0,0,0,0.22)] transition-all duration-500 hover:-translate-y-1 hover:border-[#cc2222]/70 hover:bg-[#1b1b1b] hover:shadow-[0_18px_48px_rgba(204,34,34,0.16)]">
      <div className="relative mb-[-1px] block h-[230px] overflow-hidden bg-[#171717] leading-none lg:h-[248px]">
        <ImageWithFallback
          src={theme.imageUrl}
          fallbackSrc={THEME_PLACEHOLDER_IMAGE}
          alt={theme.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-center brightness-[0.68] contrast-115 saturate-[0.68] transition duration-700 group-hover:scale-105 group-hover:brightness-[0.82] group-hover:saturate-80"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.1)_42%,rgba(23,23,23,0.97)_100%)] opacity-95 transition-opacity duration-700 group-hover:opacity-[0.82]" />
        {showRank && theme.rank && theme.rank <= 3 && (
          <RankBadge rank={theme.rank} />
        )}
      </div>

      <div className="relative bg-[#171717] p-6 transition-colors duration-500 group-hover:bg-[#1b1b1b]">
        <h3 className="text-[21px] font-black leading-snug text-[#f5f5f5]">
          {theme.title}
        </h3>

        <div className="mt-5 space-y-3.5">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[#8f8f8f]">
            <span className="inline-flex items-center gap-3">
              <span className="shrink-0 text-[#9a9a9a]">공포도</span>
              <RatingIcons value={theme.horrorLevel} type="horror" />
            </span>
            <span className="inline-flex items-center gap-3">
              <span className="shrink-0 text-[#9a9a9a]">난이도</span>
              <RatingIcons value={theme.difficulty} type="difficulty" />
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-[#777]">
            <RatingStars value={theme.rating} showValue reviewCount={theme.reviewCount} size="xs" />
            <span className="text-[#777]">📍 {locationLabel}</span>
          </div>

          <div
            className={[
              "gap-3 text-[12px] leading-5 text-[#666]",
              showPrice ? "flex flex-wrap items-center justify-between" : "",
            ].join(" ")}
          >
            {playerLabel} · {durationLabel}
            {showPrice && (
              <span className="font-black text-[#d8d8d8]">
                {theme.price.toLocaleString()}원
              </span>
            )}
          </div>
        </div>

        <Link
          href={`/themes?themeId=${theme.id}`}
          onClick={(event) => {
            if (!onAction) return;
            event.preventDefault();
            onAction(theme);
          }}
          className={actionClassName}
        >
          {actionLabel}
        </Link>
      </div>
    </article>
  );
}
