type RatingIconType = "horror" | "difficulty";
type RatingIconSize = "xs" | "sm" | "md";

interface RatingIconsProps {
  value: number;
  type: RatingIconType;
  max?: number;
  size?: RatingIconSize;
  interactive?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

const SIZE_CLASS: Record<RatingIconSize, string> = {
  xs: "h-[15px] w-[15px]",
  sm: "h-4 w-4",
  md: "h-[22px] w-[22px]",
};

export function RatingSkullIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M8 1.7c-3.1 0-5.2 2.1-5.2 5.1 0 1.8.8 3.2 2 4v2.1c0 .8.6 1.4 1.4 1.4h3.6c.8 0 1.4-.6 1.4-1.4v-2.1c1.2-.8 2-2.2 2-4 0-3-2.1-5.1-5.2-5.1Zm-2.1 7.6c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4Zm2.1 1.5c-.4 0-.8-.3-.8-.7 0-.3.5-1.2.8-1.7.3.5.8 1.4.8 1.7 0 .4-.4.7-.8.7Zm2.1-1.5c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4ZM6.1 12.1h.8v1h-.8v-1Zm1.5 0h.8v1h-.8v-1Zm1.5 0h.8v1h-.8v-1Z"
      />
    </svg>
  );
}

export function RatingLockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M4.2 6.7V5.2C4.2 3 5.8 1.5 8 1.5s3.8 1.5 3.8 3.7v1.5h.4c.8 0 1.3.6 1.3 1.3v5.1c0 .8-.6 1.4-1.4 1.4H3.9c-.8 0-1.4-.6-1.4-1.4V8c0-.8.6-1.3 1.3-1.3h.4Zm1.7 0h4.2V5.2c0-1.2-.8-2-2.1-2s-2.1.8-2.1 2v1.5Z"
      />
    </svg>
  );
}

function clampRating(value: number, max: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(max, Math.round(value)));
}

export default function RatingIcons({
  value,
  type,
  max = 5,
  size = "sm",
  interactive = false,
  onChange,
  className = "",
}: RatingIconsProps) {
  const Icon = type === "horror" ? RatingSkullIcon : RatingLockIcon;
  const activeColor = type === "horror" ? "text-[#c94a4a]" : "text-[#d7b46a]";
  const activeShadow =
    type === "horror"
      ? "drop-shadow-[0_0_5px_rgba(204,34,34,0.16)]"
      : "drop-shadow-[0_0_5px_rgba(215,180,106,0.2)]";
  const selected = clampRating(value, max);
  const iconSizeClass = SIZE_CLASS[size];

  return (
    <span className={["inline-flex items-center gap-1.5", className].join(" ")}>
      {Array.from({ length: max }).map((_, index) => {
        const active = index < selected;
        const icon = (
          <Icon
            className={[
              iconSizeClass,
              "transition-all",
              active
                ? `${activeColor} ${activeShadow} opacity-100`
                : "text-[#303030] opacity-45",
            ].join(" ")}
          />
        );

        if (!interactive) return <span key={index}>{icon}</span>;

        return (
          <button
            key={index}
            type="button"
            onClick={() => onChange?.(index + 1)}
            className="rounded-[6px] p-0.5 transition-all hover:scale-110 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#cc2222]/60"
            aria-label={`${index + 1}점 선택`}
          >
            {icon}
          </button>
        );
      })}
    </span>
  );
}
