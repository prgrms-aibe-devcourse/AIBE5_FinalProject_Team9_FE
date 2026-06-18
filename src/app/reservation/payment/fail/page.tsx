'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { cancelReservation } from '@/services/reservationService';
import {
  clearPendingPaymentSession,
  getPendingPaymentSession,
} from '@/lib/reservationPaymentSession';

function PaymentFailContent() {
  const searchParams = useSearchParams();
  const didRunRef = useRef(false);
  const [isCleaning, setIsCleaning] = useState(true);
  const [cleanupError, setCleanupError] = useState('');

  const code = searchParams.get('code') ?? 'PAYMENT_FAILED';
  const message = searchParams.get('message') ?? '결제가 취소되었거나 실패했습니다.';
  const reservationIdParam = searchParams.get('reservationId');

  useEffect(() => {
    if (didRunRef.current) return;
    didRunRef.current = true;

    const cleanup = async () => {
      const pending = getPendingPaymentSession();
      const reservationId = reservationIdParam
        ? Number(reservationIdParam)
        : pending?.reservationId;

      if (reservationId && Number.isFinite(reservationId)) {
        try {
          await cancelReservation(reservationId);
          clearPendingPaymentSession();
        } catch (error) {
          setCleanupError(
            error instanceof Error
              ? error.message
              : '예약 대기 상태 정리에 실패했습니다.',
          );
        }
      }

      setIsCleaning(false);
    };

    cleanup();
  }, [reservationIdParam]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] px-4 py-16 text-[#f5f5f5]">
      <div className="mx-auto max-w-xl rounded-[16px] border border-[#e63946]/25 bg-[#151515] p-6 text-center">
        <p className="text-[11px] font-black tracking-[0.24em] text-[#cc2222]">
          {'// PAYMENT FAILED'}
        </p>
        <h1 className="mt-3 text-2xl font-black">결제가 완료되지 않았습니다.</h1>
        <p className="mt-3 text-sm font-bold text-[#999]">{message}</p>
        <p className="mt-2 text-xs font-bold text-[#666]">오류 코드: {code}</p>
        <p className="mt-5 rounded-[12px] border border-white/[0.08] bg-[#0b0b0b] px-4 py-3 text-xs font-bold text-[#888]">
          {isCleaning
            ? '예약 대기 상태를 정리하는 중입니다.'
            : cleanupError || '예약 대기 상태를 정리했습니다.'}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/reservation"
            className="h-11 flex-1 rounded-[10px] bg-[#e63946] text-center text-sm font-black leading-[44px] text-white"
          >
            예약 다시 진행하기
          </Link>
          <Link
            href="/themes"
            className="h-11 flex-1 rounded-[10px] border border-white/[0.12] text-center text-sm font-black leading-[44px] text-[#d8d8d8]"
          >
            테마 둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d0d0d]" />}>
      <PaymentFailContent />
    </Suspense>
  );
}
