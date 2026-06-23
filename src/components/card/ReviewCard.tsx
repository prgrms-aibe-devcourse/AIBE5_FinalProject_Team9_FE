"use client";

import { useState } from "react";
import RatingIcons from "@/components/common/RatingIcons";
import RatingStars from "@/components/common/RatingStars";
import ReviewReportModal from "@/components/review/ReviewReportModal";
import { Review } from "@/types/review";

interface ReviewCardProps {
  review: Review;
  onReport?: (id: number) => void;
}

export default function ReviewCard({ review, onReport }: ReviewCardProps) {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [hasReported, setHasReported] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const canReport = Boolean(review.id) && !hasReported;

  const handleOpenReport = () => {
    if (!canReport) return;
    onReport?.(review.id);
    setSuccessMessage("");
    setIsReportModalOpen(true);
  };

  const handleReportSuccess = () => {
    setHasReported(true);
    setSuccessMessage("신고가 접수되었습니다.");
  };

  return (
    <>
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

          <RatingStars value={review.rating} showValue size="xs" className="shrink-0" />
        </div>

        <div className="mt-4">
          <div className="inline-flex max-w-full flex-wrap items-center justify-start gap-x-8 gap-y-2 rounded-[12px] border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs">
            <div className="inline-flex flex-none items-center gap-2">
              <span className="font-black text-[#b8b8b8]">공포도</span>
              <RatingIcons value={review.horrorLevel} type="horror" size="xs" />
            </div>
            <div className="inline-flex flex-none items-center gap-2">
              <span className="font-black text-[#b8b8b8]">난이도</span>
              <RatingIcons value={review.difficulty} type="difficulty" size="xs" />
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm leading-7 text-[#d4d4d4]">{review.content}</p>

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
            disabled={!canReport}
            onClick={handleOpenReport}
            className="ml-auto text-xs font-medium text-[#666] transition-colors hover:text-[#aaa] disabled:cursor-not-allowed disabled:text-[#444]"
          >
            {hasReported ? "신고 완료" : "신고"}
          </button>
        </div>

        {successMessage && (
          <p className="mt-3 rounded-lg border border-[#2f8f5b]/30 bg-[#10331f]/35 px-3 py-2 text-xs font-bold text-[#48d08a]">
            {successMessage}
          </p>
        )}
      </article>

      <ReviewReportModal
        open={isReportModalOpen}
        reviewId={review.id}
        onClose={() => setIsReportModalOpen(false)}
        onSuccess={handleReportSuccess}
      />
    </>
  );
}
