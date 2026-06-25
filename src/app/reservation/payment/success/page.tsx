'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { confirmPayment } from '@/services/paymentService';
import { cancelReservation } from '@/services/reservationService';
import { useReservationStore } from '@/stores/reservationStore';
import {
  clearPendingPaymentSession,
  getPendingPaymentSession,
  saveCompletePaymentSession,
} from '@/lib/reservationPaymentSession';

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const didRunRef = useRef(false);
  const { setTheme, setLocation, setDateTime, setPeopleCount, setReservationResult } =
    useReservationStore();
  const [message, setMessage] = useState('결제 승인을 확인하는 중입니다.');
  const [error, setError] = useState('');
  const [isConfirmationUncertain, setIsConfirmationUncertain] = useState(false);

  useEffect(() => {
    if (didRunRef.current) return;
    didRunRef.current = true;

    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const rawAmount = searchParams.get('amount');
    const amount = rawAmount ? Number(rawAmount) : NaN;
    const pending = getPendingPaymentSession();

    const cancelPendingReservation = async () => {
      if (!pending?.reservationId) return;

      try {
        await cancelReservation(pending.reservationId);
      } catch {
        // confirm 전 단계 정리 실패는 백엔드 상태 확인이 필요합니다.
      }
    };

    const runConfirm = async () => {
      if (!paymentKey || !orderId || !Number.isFinite(amount)) {
        setError('결제 승인에 필요한 정보가 부족합니다.');
        await cancelPendingReservation();
        return;
      }

      if (!pending || pending.orderId !== orderId) {
        setIsConfirmationUncertain(true);
        setError(
          '결제 확인 중 문제가 발생했습니다. 관리자에게 문의하거나 잠시 후 예약 내역을 확인해주세요.',
        );
        return;
      }

      if (pending.amount !== amount) {
        setError('결제 금액이 예약 금액과 일치하지 않습니다.');
        await cancelPendingReservation();
        return;
      }

      try {
        const confirmed = await confirmPayment({ paymentKey, orderId, amount });
        saveCompletePaymentSession(confirmed, pending);
        clearPendingPaymentSession();

        setTheme(pending.themeId, pending.themeTitle, pending.themeImageUrl);
        setLocation(pending.locationName ?? '', pending.branchName ?? '');
        setDateTime(pending.date, pending.time, pending.timeSlotId);
        setPeopleCount(pending.peopleCount);
        setReservationResult({
          reservationId: confirmed.reservationId,
          paymentId: confirmed.paymentId,
          orderId: confirmed.orderId,
          paymentStatus: confirmed.status,
          totalAmount: confirmed.amount,
        });

        setMessage('결제 승인이 완료되었습니다. 예약 완료 화면으로 이동합니다.');
        router.replace('/reservation/complete');
      } catch {
        // success callback 이후에는 결제가 서버에서 승인됐지만 응답만 유실됐을 수 있습니다.
        // 승인 상태가 불명확한 경우 예약을 취소하지 않고 백엔드 상태 확인을 기다립니다.
        setIsConfirmationUncertain(true);
        setError(
          '결제 확인 중 문제가 발생했습니다. 관리자에게 문의하거나 잠시 후 예약 내역을 확인해주세요.',
        );
      }
    };

    runConfirm();
  }, [router, searchParams, setDateTime, setLocation, setPeopleCount, setReservationResult, setTheme]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] px-4 py-16 text-[#f5f5f5]">
      <div className="mx-auto max-w-xl rounded-[16px] border border-white/[0.08] bg-[#151515] p-6 text-center">
        <p className="text-[11px] font-black tracking-[0.24em] text-[#cc2222]">
          {'// PAYMENT CONFIRM'}
        </p>
        <h1 className="mt-3 text-2xl font-black">결제 승인 처리</h1>
        <p className="mt-3 text-sm font-bold text-[#999]">{error || message}</p>
        {error && (
          <Link
            href={isConfirmationUncertain ? '/mypage?tab=reservation' : '/reservation'}
            className="mt-6 inline-flex h-11 items-center justify-center rounded-[10px] bg-[#e63946] px-5 text-sm font-black text-white"
          >
            {isConfirmationUncertain ? '예약 내역 확인하기' : '예약 다시 진행하기'}
          </Link>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d0d0d]" />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
