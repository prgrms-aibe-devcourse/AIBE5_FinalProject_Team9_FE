'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  getReviewReportErrorMessage,
  reportReview,
  type ReviewReportRequest,
} from '@/services/reviewService';

const REPORT_REASONS = [
  '스포일러 포함',
  '욕설/비방',
  '허위 후기',
  '부적절한 내용',
  '기타',
];

interface ReviewReportModalProps {
  open: boolean;
  reviewId?: number | null;
  onClose: () => void;
  onSuccess: (reviewId: number) => void;
}

export default function ReviewReportModal({
  open,
  reviewId,
  onClose,
  onSuccess,
}: ReviewReportModalProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const [reason, setReason] = useState(REPORT_REASONS[0]);
  const [detail, setDetail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;

    setReason(REPORT_REASONS[0]);
    setDetail('');
    setErrorMessage('');
  }, [open, reviewId]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => cancelButtonRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting) onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSubmitting, onClose, open, reviewId]);

  if (!open) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!reviewId || isSubmitting || !reason.trim()) return;

    const payload: ReviewReportRequest = {
      reason,
      detail: detail.trim() || undefined,
    };

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await reportReview(reviewId, payload);
      onSuccess(reviewId);
      onClose();
    } catch (error) {
      setErrorMessage(getReviewReportErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-report-modal-title"
    >
      <button
        type="button"
        aria-label="신고 모달 닫기"
        className="absolute inset-0 cursor-default bg-black/76 backdrop-blur-[3px]"
        onClick={() => {
          if (!isSubmitting) onClose();
        }}
      />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-[520px] overflow-hidden rounded-2xl border border-white/[0.12] bg-[radial-gradient(circle_at_50%_0%,rgba(204,34,34,0.15),transparent_30%),linear-gradient(180deg,rgba(24,24,24,0.98),rgba(12,12,12,0.98))] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.64)] sm:p-7"
      >
        <div className="pointer-events-none absolute inset-x-14 top-0 h-px bg-gradient-to-r from-transparent via-[#ef3b3f] to-transparent shadow-[0_0_18px_rgba(239,59,63,0.75)]" />

        <div>
          <p className="text-[11px] font-black tracking-[0.22em] text-[#cc2222]">
            {"// REVIEW REPORT"}
          </p>
          <h2
            id="review-report-modal-title"
            className="mt-2 text-2xl font-black tracking-[-0.01em] text-[#f6f6f6]"
          >
            후기 신고
          </h2>
          <p className="mt-3 text-sm font-bold leading-6 text-[#9a9a9a]">
            신고 내용은 운영 검토에만 사용됩니다. 문제가 있는 후기를 알려주세요.
          </p>
        </div>

        <div className="mt-6 space-y-5">
          <fieldset>
            <legend className="mb-3 text-xs font-black text-[#d8d8d8]">
              신고 사유
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {REPORT_REASONS.map((item) => (
                <label
                  key={item}
                  className={[
                    'flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border px-3 text-sm font-bold transition-colors',
                    reason === item
                      ? 'border-[#cc2222] bg-[#cc2222]/14 text-white'
                      : 'border-white/[0.08] bg-white/[0.035] text-[#b8b8b8] hover:border-[#cc2222]/45',
                  ].join(' ')}
                >
                  <input
                    type="radio"
                    name="review-report-reason"
                    value={item}
                    checked={reason === item}
                    disabled={isSubmitting}
                    onChange={(event) => setReason(event.target.value)}
                    className="h-3.5 w-3.5 accent-[#cc2222]"
                  />
                  {item}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block">
            <span className="mb-2 block text-xs font-black text-[#d8d8d8]">
              상세 내용
            </span>
            <textarea
              value={detail}
              disabled={isSubmitting}
              onChange={(event) => setDetail(event.target.value)}
              maxLength={500}
              placeholder="신고 사유를 확인할 수 있도록 상황을 간단히 적어주세요."
              className="min-h-[120px] w-full resize-none rounded-lg border border-white/[0.1] bg-[#101010] px-4 py-3 text-sm font-semibold leading-6 text-[#f0f0f0] outline-none transition-colors placeholder:text-[#666] focus:border-[#cc2222]/70 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <span className="mt-1 block text-right text-[11px] font-bold text-[#666]">
              {detail.length}/500
            </span>
          </label>

          {errorMessage && (
            <p className="rounded-lg border border-[#cc2222]/30 bg-[#cc2222]/10 px-4 py-3 text-sm font-bold leading-6 text-[#ffb0b0]">
              {errorMessage}
            </p>
          )}
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="h-12 rounded-lg border border-white/[0.12] bg-black/[0.18] text-sm font-black text-[#d6d6d6] transition-colors hover:border-white/[0.22] hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-45"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !reviewId || !reason.trim()}
            className="h-12 rounded-lg border border-[#cc2222] bg-[#d71920] text-sm font-black text-white shadow-[0_0_28px_rgba(215,25,32,0.24)] transition-colors hover:bg-[#ef3b3f] disabled:cursor-not-allowed disabled:opacity-55"
          >
            {isSubmitting ? '신고 접수 중...' : '신고 제출'}
          </button>
        </div>
      </form>
    </div>
  );
}
