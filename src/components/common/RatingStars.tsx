type RatingStarsSize = "xs" | "sm" | "md" | "lg";

interface RatingStarsProps {
  value: number;
  max?: number;
  size?: RatingStarsSize;
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
  valueClassName?: string;
  reviewClassName?: string;
  interactive?: boolean;
  onChange?: (value: number) => void;
  ariaLabel?: string;
}

const SIZE_CLASS: Record<RatingStarsSize, string> = {
  xs: "h-4 w-4",
  sm: "h-[18px] w-[18px]",
  md: "h-[22px] w-[22px]",
  lg: "h-8 w-8",
};

function clampRating(value: number, max: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(max, value));
}

function StarIcon({ filled, className = "" }: { filled: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="m9 1.25 2.08 4.56 4.95.58-3.68 3.38.98 4.9L9 12.18l-4.33 2.49.98-4.9-3.68-3.38 4.95-.58L9 1.25Z"
      />
      <path
        fill="rgba(255,255,255,0.22)"
        d="m9 1.25 2.08 4.56 4.95.58L9 6.9V1.25Z"
        className={filled ? "opacity-60" : "opacity-0"}
      />
    </svg>
  );
}

export default function RatingStars({
  value,
  max = 5,
  size = "sm",
  showValue = false,
  reviewCount,
  className = "",
  valueClassName = "",
  reviewClassName = "",
  interactive = false,
  onChange,
  ariaLabel,
}: RatingStarsProps) {
  const clamped = clampRating(value, max);
  const filledCount = Math.round(clamped);
  const iconSizeClass = SIZE_CLASS[size];
  const label = ariaLabel ?? `별점 ${clamped.toFixed(1)}점`;

  return (
    <span className={["inline-flex min-w-0 items-center gap-2", className].join(" ")} aria-label={label}>
      <span className="inline-flex items-center gap-1.5">
        {Array.from({ length: max }).map((_, index) => {
          const filled = index < filledCount;
          const icon = (
            <StarIcon
              filled={filled}
              className={[
                iconSizeClass,
                "transition-all",
                filled
                  ? "text-[#e8c766] drop-shadow-[0_0_7px_rgba(232,199,102,0.28)]"
                  : "text-[#303030] opacity-70",
              ].join(" ")}
            />
          );

          if (!interactive) {
            return <span key={index}>{icon}</span>;
          }

          return (
            <button
              key={index}
              type="button"
              onClick={() => onChange?.(index + 1)}
              className="rounded-[6px] p-0.5 transition-colors hover:bg-white/[0.05]"
              aria-label={`${index + 1}점 선택`}
            >
              {icon}
            </button>
          );
        })}
      </span>
      {showValue && (
        <span className={["shrink-0 text-xs font-black text-[#e8c766]", valueClassName].join(" ")}>
          {clamped.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className={["shrink-0 text-xs font-bold text-[#6f6f6f]", reviewClassName].join(" ")}>
          리뷰 {reviewCount}
        </span>
      )}
    </span>
  );
}
