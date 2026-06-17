'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import RatingStars from '@/components/common/RatingStars';
import ReviewForm from '@/components/review/ReviewForm';
import { enrichMyPageReviewsWithThemeImages, parseReviewTags } from '@/lib/myPageReview';
import { getMyPageReviews, type MyPageReview } from '@/services/mypageService';
import {
  deleteReview,
  toUpdateReviewRequest,
  updateReview,
} from '@/services/reviewService';
import type { ReviewFormValues } from '@/types/review';
import { AxiosError } from 'axios';

const REVIEW_ID_MISSING_MESSAGE = '후기 정보를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.';

function getApiErrorMessage(error: unknown, fallback: string) {
  if (error instanceof AxiosError) {
    const body = error.response?.data as
      | { message?: string; error?: string; data?: { message?: string } }
      | undefined;

    return body?.message ?? body?.data?.message ?? body?.error ?? fallback;
  }

  return fallback;
}

function formatReviewDate(value: string) {
  if (!value) return '-';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 10).replaceAll('-', '.');

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('.');
}

function DotRating({
  level,
  max = 5,
  color = '#e63946',
}: {
  level: number;
  max?: number;
  color?: string;
}) {
  return (
    <span className="flex gap-1">
      {Array.from({ length: max }).map((_, index) => (
        <span
          key={index}
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: index < level ? color : '#2a2a2a' }}
        />
      ))}
    </span>
  );
}

function ReviewEditModal({
  review,
  isSubmitting,
  errorMessage,
  onClose,
  onSubmit,
}: {
  review: MyPageReview;
  isSubmitting: boolean;
  errorMessage: string;
  onClose: () => void;
  onSubmit: (values: ReviewFormValues) => Promise<void>;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-white/[0.08] bg-[#141414] p-6 shadow-[0_28px_64px_rgba(0,0,0,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-black tracking-[0.22em] text-[#cc2222]">
              {'// EDIT REVIEW'}
            </p>
            <h2 className="mt-2 text-2xl font-black text-[#f5f5f5]">후기 수정</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl leading-none text-[#666] transition-colors hover:text-[#f5f5f5]"
          >
            ×
          </button>
        </div>

        <ReviewForm
          themeId={review.themeId}
          themeTitle={review.themeTitle}
          reservationId={0}
          reservationDate={formatReviewDate(review.createdAt)}
          initialValues={{
            rating: review.rating,
            difficulty: review.difficultyRating,
            horrorLevel: review.horrorRating,
            tags: parseReviewTags(review.tags),
            content: review.content,
            hasSpoiler: review.spoiler,
          }}
          submitLabel={isSubmitting ? '저장 중...' : '저장하기'}
          errorMessage={errorMessage}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}

export default function MyReviewsPage() {
  const searchParams = useSearchParams();
  const [reviews, setReviews] = useState<MyPageReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [editTarget, setEditTarget] = useState<MyPageReview | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');
  const handledQueryAction = useRef(false);

  const loadReviews = useCallback(async () => {
    setIsLoading(true);
    setPageError('');

    try {
      const reviewItems = await getMyPageReviews();
      setReviews(reviewItems);

      void enrichMyPageReviewsWithThemeImages(reviewItems).then((enriched) => {
        setReviews(enriched);
      });
    } catch (error) {
      setPageError(getApiErrorMessage(error, '내 후기를 불러오지 못했습니다.'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadReviews();
  }, [loadReviews]);

  const openEditModal = useCallback((review: MyPageReview) => {
    setModalError('');
    setPageError('');
    if (!review.reviewId) {
      setPageError(REVIEW_ID_MISSING_MESSAGE);
      return;
    }

    setEditTarget(review);
  }, []);

  const handleDelete = useCallback(
    async (review: MyPageReview) => {
      setActionMessage('');
      setPageError('');

      try {
        if (!review.reviewId) {
          setPageError(REVIEW_ID_MISSING_MESSAGE);
          return;
        }

        const confirmed = window.confirm('이 후기를 삭제할까요? 삭제 후에는 되돌릴 수 없습니다.');
        if (!confirmed) return;

        await deleteReview(review.reviewId);
        setActionMessage('후기를 삭제했습니다.');
        await loadReviews();
      } catch (error) {
        setPageError(getApiErrorMessage(error, '후기 삭제에 실패했습니다.'));
      }
    },
    [loadReviews],
  );

  useEffect(() => {
    if (handledQueryAction.current || isLoading || reviews.length === 0) return;

    const action = searchParams.get('action');
    const themeId = Number(searchParams.get('themeId') || 0);
    const createdAt = searchParams.get('createdAt') || '';
    const created = searchParams.get('created');

    if (created === '1') {
      setActionMessage('후기가 등록되었습니다.');
    }

    if (!action || !themeId || !createdAt) {
      handledQueryAction.current = true;
      return;
    }

    const target = reviews.find(
      (review) => review.themeId === themeId && review.createdAt === createdAt,
    );

    handledQueryAction.current = true;

    if (!target) return;

    if (action === 'edit') {
      openEditModal(target);
      return;
    }

    if (action === 'delete') {
      void handleDelete(target);
    }
  }, [handleDelete, isLoading, openEditModal, reviews, searchParams]);

  const reviewCards = useMemo(
    () =>
      reviews.map((review) => ({
        ...review,
        parsedTags: parseReviewTags(review.tags),
        imageUrl: review.imageUrls[0] || '/images/theme-placeholder.png',
      })),
    [reviews],
  );

  const handleUpdateSubmit = async (values: ReviewFormValues) => {
    if (!editTarget) return;
    if (!editTarget.reviewId) {
      setModalError(REVIEW_ID_MISSING_MESSAGE);
      return;
    }

    setIsSubmitting(true);
    setModalError('');

    try {
      await updateReview(
        editTarget.reviewId,
        toUpdateReviewRequest({
          rating: values.rating,
          difficulty: values.difficulty,
          horrorLevel: values.horrorLevel,
          content: values.content,
          tags: values.tags,
          hasSpoiler: values.hasSpoiler,
        }),
      );

      setActionMessage('후기를 수정했습니다.');
      setEditTarget(null);
      await loadReviews();
    } catch (error) {
      const message = getApiErrorMessage(error, '후기 수정에 실패했습니다.');
      setModalError(message);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-[#f5f5f5]">
      <div className="border-b border-[#1a1a1a]">
        <div className="mx-auto max-w-5xl px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-[#555]">
            <Link href="/" className="transition-colors hover:text-[#888]">
              홈
            </Link>
            <span>›</span>
            <Link href="/mypage" className="transition-colors hover:text-[#888]">
              마이페이지
            </Link>
            <span>›</span>
            <span className="text-[#888]">내 후기</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#f5f5f5]">내 후기</h1>
            <p className="mt-1 text-sm font-medium text-[#8a8a8a]">
              작성한 후기를 수정하거나 정리할 수 있습니다.
            </p>
          </div>
          <span className="rounded-full border border-white/[0.08] bg-[#181818] px-3 py-1 text-xs font-black text-[#888]">
            {reviews.length}개
          </span>
        </div>

        {actionMessage && (
          <div className="mb-4 rounded-xl border border-[#2ecc71]/20 bg-[#2ecc71]/10 px-4 py-3 text-sm font-bold text-[#8ee0a8]">
            {actionMessage}
          </div>
        )}

        {pageError && (
          <div className="mb-4 rounded-xl border border-[#e63946]/20 bg-[#e63946]/10 px-4 py-3 text-sm font-bold text-[#ff8a8a]">
            {pageError}
          </div>
        )}

        {isLoading ? (
          <div className="rounded-2xl border border-white/[0.08] bg-[#151515] px-6 py-16 text-center text-[#8a8a8a]">
            내 후기를 불러오는 중입니다.
          </div>
        ) : reviewCards.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.08] bg-[#151515] px-6 py-16 text-center">
            <p className="text-lg font-black text-[#f5f5f5]">아직 작성한 후기가 없습니다.</p>
            <p className="mt-2 text-sm font-medium text-[#8a8a8a]">
              지난 예약에서 후기 쓰기를 누르면 이곳에 쌓입니다.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviewCards.map((review) => (
              <article
                key={`${review.themeId}-${review.createdAt}-${review.content.slice(0, 20)}`}
                className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[radial-gradient(circle_at_10%_0%,rgba(255,255,255,0.04),transparent_34%),linear-gradient(180deg,rgba(24,24,24,0.94),rgba(18,18,18,0.91)),rgba(18,18,18,0.9)] shadow-[0_18px_42px_rgba(0,0,0,0.28)]"
              >
                <div className="grid gap-0 md:grid-cols-[220px_1fr]">
                  <div className="relative min-h-[150px] overflow-hidden border-b border-white/[0.06] md:border-b-0 md:border-r">
                    <ImageWithFallback
                      src={review.imageUrl}
                      fallbackSrc="/images/theme-placeholder.png"
                      alt={review.themeTitle}
                      fill
                      sizes="220px"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.58))]" />
                  </div>

                  <div className="p-5">
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-black text-[#f5f5f5]">{review.themeTitle}</p>
                        <p className="mt-1 text-xs font-bold text-[#777]">
                          {formatReviewDate(review.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(review)}
                          disabled={isSubmitting}
                          className="rounded-lg border border-white/[0.11] bg-[#101010]/55 px-3 py-2 text-xs font-black text-[#aaa] transition-all hover:border-white/[0.2] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          수정
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleDelete(review)}
                          disabled={isSubmitting}
                          className="rounded-lg border border-[#cc2222]/45 bg-[#101010]/55 px-3 py-2 text-xs font-black text-[#ef5353] transition-all hover:border-[#cc2222]/80 hover:bg-[#cc2222]/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          삭제
                        </button>
                      </div>
                    </div>

                    <div className="mb-3 flex flex-wrap items-center gap-5 rounded-xl border border-white/[0.06] bg-black/[0.16] px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <RatingStars value={review.rating} showValue size="xs" />
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#8b8b8b]">
                        <span>공포도</span>
                        <DotRating level={review.horrorRating} color="#e63946" />
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#8b8b8b]">
                        <span>난이도</span>
                        <DotRating level={review.difficultyRating} color="#d4af55" />
                      </div>
                    </div>

                    <p className="text-sm leading-7 text-[#cacaca]">{review.content}</p>

                    {review.parsedTags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {review.parsedTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/[0.08] bg-white/[0.035] px-2.5 py-1 text-xs font-bold text-[#8f8f8f]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {editTarget && (
        <ReviewEditModal
          review={editTarget}
          isSubmitting={isSubmitting}
          errorMessage={modalError}
          onClose={() => {
            setEditTarget(null);
            setModalError('');
          }}
          onSubmit={handleUpdateSubmit}
        />
      )}
    </main>
  );
}
