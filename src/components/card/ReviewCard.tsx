import { Review } from '@/types/review';

interface ReviewCardProps {
  review: Review;
  onReport?: (id: number) => void;
}

function StarScore({ value }: { value: number }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 text-sm font-black text-[#f2c15f]">
      <span>★</span>
      <span>{value.toFixed(1)}</span>
    </span>
  );
}

function RatingGlyphs({
  level,
  type,
  max = 5,
}: {
  level: number;
  type: 'horror' | 'difficulty';
  max?: number;
}) {
  const icon = type === 'horror' ? '💀' : '🔒';

  return (
    <span className="inline-flex items-center gap-0.5 leading-none">
      {Array.from({ length: max }).map((_, index) => (
        <span
          key={index}
          className={index < level ? 'opacity-100' : 'grayscale opacity-30'}
        >
          {icon}
        </span>
      ))}
    </span>
  );
}

export default function ReviewCard({ review, onReport }: ReviewCardProps) {
  return (
    <article className="rounded-[14px] border border-white/[0.08] bg-[#1a1a1a] p-4 shadow-[0_12px_28px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#2a2a2a] text-sm font-black text-[#d8d8d8]">
            {review.userProfileImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={review.userProfileImageUrl}
                alt={review.userNickname}
                className="h-full w-full object-cover"
              />
            ) : (
              review.userNickname[0]
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-black text-[#f5f5f5]">
              {review.userNickname}
            </p>
            <p className="mt-1 text-[11px] font-medium text-[#777]">
              {review.createdAt}
            </p>
          </div>
        </div>

        <StarScore value={review.rating} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5">
          <span className="font-bold text-[#aaa]">공포도</span>
          <RatingGlyphs level={review.horrorLevel} type="horror" />
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5">
          <span className="font-bold text-[#aaa]">난이도</span>
          <RatingGlyphs level={review.difficulty} type="difficulty" />
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-[#d4d4d4]">
        {review.content}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        {review.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {review.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.08] bg-[#222]/70 px-2.5 py-1 text-xs font-medium text-[#9a9a9a]"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : (
          <span />
        )}

        <button
          type="button"
          onClick={() => onReport?.(review.id)}
          className="ml-auto text-xs font-medium text-[#666] transition-colors hover:text-[#aaa]"
        >
          신고
        </button>
      </div>
    </article>
  );
}
