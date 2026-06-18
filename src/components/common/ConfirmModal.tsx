'use client';

import { useEffect, useRef } from 'react';

type ConfirmModalVariant = 'default' | 'danger';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  variant?: ConfirmModalVariant;
  showCancel?: boolean;
}

export default function ConfirmModal({
  open,
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  isLoading = false,
  variant = 'default',
  showCancel = true,
}: ConfirmModalProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => cancelButtonRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isLoading) onCancel();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLoading, onCancel, open]);

  if (!open) return null;

  const isDanger = variant === 'danger';
  const confirmClassName = isDanger
    ? 'border-[#cc2222] bg-[#d71920] text-white shadow-[0_0_28px_rgba(215,25,32,0.24)] hover:bg-[#ef3b3f]'
    : 'border-[#cc2222] bg-[#c91f25] text-white shadow-[0_0_28px_rgba(201,31,37,0.22)] hover:bg-[#e2353b]';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      aria-describedby={description ? 'confirm-modal-description' : undefined}
    >
      <button
        type="button"
        aria-label="확인 모달 닫기"
        className="absolute inset-0 cursor-default bg-black/76 backdrop-blur-[3px]"
        onClick={() => {
          if (!isLoading) onCancel();
        }}
      />

      <div className="relative w-full max-w-[520px] overflow-hidden rounded-2xl border border-white/[0.12] bg-[radial-gradient(circle_at_50%_0%,rgba(239,59,59,0.13),transparent_28%),linear-gradient(180deg,rgba(24,24,24,0.98),rgba(12,12,12,0.98))] p-6 text-center shadow-[0_28px_90px_rgba(0,0,0,0.64)] sm:p-8">
        <div className="pointer-events-none absolute inset-x-14 top-0 h-px bg-gradient-to-r from-transparent via-[#ef3b3f] to-transparent shadow-[0_0_18px_rgba(239,59,63,0.75)]" />

        <div className="mb-6 flex items-center justify-center gap-5 text-[#e53939]">
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-[#e53939]" />
          <span className="flex h-12 w-12 rotate-45 items-center justify-center border border-[#e53939] bg-[#e53939]/8 shadow-[0_0_22px_rgba(229,57,57,0.16)]">
            <span className="-rotate-45 text-2xl font-black leading-none">!</span>
          </span>
          <span className="h-px w-20 bg-gradient-to-l from-transparent to-[#e53939]" />
        </div>

        <h2 id="confirm-modal-title" className="text-2xl font-black tracking-[-0.01em] text-[#f6f6f6] sm:text-[28px]">
          {title}
        </h2>
        {description && (
          <p id="confirm-modal-description" className="mx-auto mt-4 max-w-[390px] whitespace-pre-line text-sm font-bold leading-7 text-[#a8a8a8] sm:text-base">
            {description}
          </p>
        )}

        <div className="mt-8 h-px bg-white/[0.08]" />

        <div className={['mt-6 grid gap-3', showCancel ? 'sm:grid-cols-2' : ''].join(' ')}>
          {showCancel && (
            <button
              ref={cancelButtonRef}
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="h-12 rounded-lg border border-white/[0.12] bg-black/[0.18] text-sm font-black text-[#d6d6d6] transition-colors hover:border-white/[0.22] hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={[
              'h-12 rounded-lg border text-sm font-black transition-colors disabled:cursor-not-allowed disabled:opacity-55',
              confirmClassName,
            ].join(' ')}
          >
            {isLoading ? '처리 중...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
