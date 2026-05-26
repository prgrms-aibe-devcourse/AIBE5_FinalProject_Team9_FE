import ReviewCard from '@/components/card/ReviewCard';
import { Review } from '@/types/review';

interface ReviewSectionProps {
  reviews: Review[];
}

export default function ReviewSection({ reviews }: ReviewSectionProps) {
  return (
    <section className="py-12">
      <h2 className="text-xl font-bold text-[#f5f5f5] mb-6">최근 후기</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
