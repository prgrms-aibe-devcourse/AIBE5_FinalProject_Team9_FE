import { Review } from '@/types/review';
import { formatRelativeTime } from '@/lib/formatDate';

interface ReviewCardProps {
  review: Review;
  onReport?: (id: number) => void;
}

function StarRating({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < value ? 'text-[#f39c12]' : 'text-[#2a2a2a]'}>★</span>
      ))}
    </span>
  );
}

function DifficultyDots({ level, max = 5 }: { level: number; max?: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={['w-2 h-2 rounded-full', i < level ? 'bg-[#e63946]' : 'bg-[#2a2a2a]'].join(' ')}
        />
      ))}
    </span>
  );
}

export default function ReviewCard({ review, onReport }: ReviewCardProps) {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center text-sm overflow-hidden">
            {review.userProfileImageUrl ? (
              <img src={review.userProfileImageUrl} alt={review.userNickname} className="w-full h-full object-cover" />
            ) : (
              review.userNickname[0]
            )}
          </div>
          <span className="text-sm font-medium text-[#f5f5f5]">{review.userNickname}</span>
        </div>
        <span className="text-xs text-[#888]">{formatRelativeTime(review.createdAt)}</span>
      </div>

      <StarRating value={review.rating} />

      {review.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {review.tags.map((tag) => (
            <span key={tag} className="text-xs bg-[#222] text-[#888] px-2 py-0.5 rounded-full border border-[#2a2a2a]">
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className="text-sm text-[#f5f5f5] mt-2 leading-relaxed">{review.content}</p>

      <div className="flex items-center gap-4 mt-3 text-xs text-[#888]">
        <span className="flex items-center gap-1">공포도: <DifficultyDots level={review.horrorLevel} /></span>
        <span className="flex items-center gap-1">난이도: <DifficultyDots level={review.difficulty} /></span>
        {onReport && (
          <button
            onClick={() => onReport(review.id)}
            className="ml-auto hover:text-[#e63946] transition-colors"
          >
            신고
          </button>
        )}
      </div>
    </div>
  );
}
