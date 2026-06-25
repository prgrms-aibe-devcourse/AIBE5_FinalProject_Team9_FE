'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useReservationStore } from '@/stores/reservationStore';
import { useAuthStore } from '@/stores/authStore';
import { repairMojibake } from '@/lib/text';
import {
  CompletePaymentSession,
  getCompletePaymentSession,
} from '@/lib/reservationPaymentSession';

function StepBar() {
  const steps = [
    { n: 1, label: '지점/테마/시간 선택' },
    { n: 2, label: '결제' },
    { n: 3, label: '예약 완료' },
  ];
  return (
    <div className="relative border-b border-white/[0.08] bg-[#080808]/88 shadow-[0_10px_34px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1480px] items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center">
            <div className="flex items-center gap-2">
              <div className={[
                'flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-black transition-all',
                s.n === 3
                  ? 'border-[#e63946] bg-[linear-gradient(135deg,#e63946,#9f1d26)] text-white shadow-[0_0_22px_rgba(230,57,70,0.34)]'
                  : 'border-[#e63946] bg-[#e63946] text-white shadow-[0_0_18px_rgba(230,57,70,0.24)]',
              ].join(' ')}>
                {s.n < 3 ? '✓' : '✓'}
              </div>
              <span className={[
                'hidden text-xs sm:inline',
                s.n === 3 ? 'font-black text-[#ff7777]' : 'font-bold text-[#f5f5f5]',
              ].join(' ')}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="mx-3 h-px w-10 bg-[#e63946]/70 sm:w-20" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 flex items-center gap-3 text-[15px] font-black text-[#f5f5f5]">
      <span className="h-5 w-1 rounded-full bg-[#e63946] shadow-[0_0_16px_rgba(230,57,70,0.35)]" />
      {children}
    </h2>
  );
}

function formatKoreanDateTime(date: Date) {
  return date.toLocaleString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function formatDateWithDay(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
  return `${dateStr} (${DAYS[d.getDay()]})`;
}

function getPaymentStatusLabel(status: string) {
  const labels: Record<string, string> = {
    PAY_SUCCESS: '결제 승인 완료',
    PAY_PENDING: '결제 대기',
    PAY_FAILED: '결제 실패',
    PAY_REFUND_PENDING: '환불 대기',
    PAY_REFUNDED: '환불 완료',
  };

  return labels[status] ?? status;
}

export default function ReservationCompletePage() {
  const store = useReservationStore();
  const { user } = useAuthStore();

  const [copied, setCopied] = useState(false);
  const [reservedAt] = useState(() => formatKoreanDateTime(new Date()));
  const [completeSession, setCompleteSession] = useState<CompletePaymentSession | null>(null);

  useEffect(() => {
    setCompleteSession(getCompletePaymentSession());
  }, []);

  const reservationId = store.reservationId ?? completeSession?.reservationId ?? null;
  const paymentId = store.paymentId ?? completeSession?.paymentId ?? null;
  const orderId = store.orderId || completeSession?.orderId || '';
  const paymentStatus = store.paymentStatus || completeSession?.status || '';
  const reservationNumber = reservationId ? `GG-${reservationId}` : '예약 정보 없음';
  const themeTitle = store.themeTitle || completeSession?.themeTitle || '선택한 테마';
  const themeImageUrl = store.themeImageUrl || completeSession?.themeImageUrl || '/images/theme-placeholder.png';
  const locationName = store.locationName || completeSession?.locationName || '지점 정보 없음';
  const branchName = store.branchName || completeSession?.branchName || '';
  const date = store.date || completeSession?.date || '';
  const time = store.time || completeSession?.time || '';
  const peopleCount = store.peopleCount ?? completeSession?.peopleCount ?? 2;
  const totalAmount = store.totalAmount ?? completeSession?.amount ?? 0;

  const userName = repairMojibake(user?.nickname) || '예약자';
  const userPhone = user?.phone
    ? user.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1-****-$2')
    : '연락처 정보 없음';
  const dateLabel = formatDateWithDay(date);

  const handleCopy = () => {
    if (!reservationId) return;

    navigator.clipboard.writeText(reservationNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const NOTICES = [
    '예약 시간 10분 전 반드시 도착해주세요. 지각 시 입장이 제한될 수 있습니다.',
    '소지품은 보관함에 맡겨 주세요. 분실 시 책임지지 않습니다.',
    '스포일러 금지 — 후기 작성 시 핵심 단서 언급은 삼가주세요.',
    '심장 질환, 공포 공황 등이 있는 분은 입장 전 그레이터에게 반드시 알려 주세요.',
  ];

  const ARRIVAL_STEPS = [
    { label: '예약 시간 10분 전', desc: '현장 도착 후 프론트 데스크에서 체크인' },
    { label: `예약 번호 ${reservationNumber}`, desc: '를 마이페이지 화면 제시' },
    { label: '소지품 보관 후', desc: '게임 마스터의 브리핑 참가' },
    { label: '제한 시간 안에 탈출하세요', desc: '— 살아서 나올 수 있다면.' },
  ];

  const primaryDetails = [
    { label: '날짜', value: dateLabel || '날짜 확인 필요' },
    { label: '시간', value: time || '시간 확인 필요', accent: true },
    { label: '지점', value: branchName || locationName },
    { label: '인원', value: `${peopleCount}명` },
  ];

  const reservationRows = [
    { label: '예약자', value: userName },
    { label: '연락처', value: userPhone },
    { label: '결제 금액', value: `${totalAmount.toLocaleString('ko-KR')}원`, highlight: true },
    { label: '결제 상태', value: paymentStatus ? getPaymentStatusLabel(paymentStatus) : '확인 필요', success: paymentStatus === 'PAY_SUCCESS' },
  ];

  const paymentMetaRows = [
    ...(paymentId ? [{ label: '결제 ID', value: String(paymentId) }] : []),
    ...(orderId ? [{ label: '주문 ID', value: orderId }] : []),
    ...(completeSession?.paymentMethod ? [{ label: '결제 수단', value: completeSession.paymentMethod }] : []),
    { label: '예약 시각', value: completeSession?.paidAt ? formatKoreanDateTime(new Date(completeSession.paidAt)) : reservedAt },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#090909]">
      <StepBar />

      <main className="relative mx-auto w-full max-w-[1120px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-x-[-18%] top-[-120px] h-[360px] bg-[radial-gradient(circle_at_50%_0%,rgba(230,57,70,0.24),rgba(230,57,70,0.08)_34%,transparent_72%)]" />
        <div className="pointer-events-none absolute left-[-20%] top-[220px] h-[420px] w-[420px] rounded-full bg-[#cc2222]/10 blur-[120px]" />

        <section className="relative mb-7 overflow-hidden rounded-[18px] border border-[#e63946]/20 bg-[linear-gradient(145deg,#171717_0%,#101010_54%,rgba(230,57,70,0.13)_100%)] shadow-[0_24px_70px_rgba(0,0,0,0.38),0_0_34px_rgba(230,57,70,0.08)]">
          <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
            <div className="flex min-w-0 flex-col justify-between">
              <div>
                <p className="mb-3 text-[11px] font-black tracking-[0.28em] text-[#e63946]">
                  RESERVATION CONFIRMED
                </p>
                <h1 className="text-3xl font-black leading-tight text-[#f5f5f5] sm:text-5xl">
                  공포의 문이 <span className="text-[#e63946]">열렸습니다.</span>
                </h1>
                <p className="mt-4 max-w-[560px] text-sm font-semibold leading-6 text-[#9a9a9a]">
                  결제가 승인되었고 예약이 확정되었습니다. 입장 시 예약 번호를 제시해주세요.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[14px] border border-white/[0.08] bg-[#0b0b0b]/70 px-4 py-3">
                  <p className="text-[11px] font-black tracking-[0.18em] text-[#777]">STATUS</p>
                  <p className="mt-2 text-sm font-black text-[#9ad8c0]">예약 확정</p>
                </div>
                <div className="rounded-[14px] border border-white/[0.08] bg-[#0b0b0b]/70 px-4 py-3">
                  <p className="text-[11px] font-black tracking-[0.18em] text-[#777]">CHECK-IN CODE</p>
                  <p className="mt-2 text-sm font-black text-[#cfcfcf]">상단 예약 번호 제시</p>
                  <p className="mt-1 break-all text-[11px] font-bold text-[#666]">{reservationNumber}</p>
                </div>
              </div>
            </div>

            <div className="self-start rounded-[16px] border border-white/[0.08] bg-[#0d0d0d]/74 p-4 lg:self-center">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-[#888]">예약 번호</p>
                  <p className="mt-2 break-all text-4xl font-black tracking-wide text-[#f0c674]">
                    {reservationNumber}
                  </p>
                </div>
                <button
                  onClick={handleCopy}
                  disabled={!reservationId}
                  className="h-10 shrink-0 rounded-[10px] border border-white/[0.1] px-3 text-xs font-black text-[#d8d8d8] transition-all hover:border-[#e63946]/55 hover:bg-[#e63946]/10 hover:text-white disabled:cursor-not-allowed disabled:text-[#555]"
                >
                  {copied ? '복사됨' : '번호 복사'}
                </button>
              </div>
              <div className="mt-5 rounded-[12px] border border-[#e63946]/20 bg-[#e63946]/10 px-4 py-3 text-xs font-bold leading-5 text-[#ff8a8a]">
                입장 당일 프론트 데스크에서 이 번호 또는 마이페이지 예약 화면을 보여주세요.
              </div>
            </div>
          </div>
        </section>

        {/* 예약 상세 정보 */}
        <section className="relative mb-7 rounded-[18px] border border-white/[0.08] bg-[#151515]/92 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:p-6">
          <SectionTitle>예약 상세 정보</SectionTitle>

          <div className="overflow-hidden rounded-[16px] border border-white/[0.08] bg-[#0f0f0f]">
            <div className="grid gap-0 lg:grid-cols-[260px_1fr]">
              <div className="relative min-h-[220px] bg-[#080808]">
                <Image src={themeImageUrl} alt={themeTitle} fill className="object-cover opacity-60" sizes="(max-width: 1024px) 100vw, 260px" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.34)_45%,rgba(0,0,0,0.92)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-[radial-gradient(circle_at_50%_100%,rgba(230,57,70,0.24),transparent_68%)]" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-black text-[#d0d0d0] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">{locationName}{branchName ? ` · ${branchName}` : ''}</p>
                  <p className="mt-1 text-xl font-black text-[#f5f5f5] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">{themeTitle}</p>
                </div>
              </div>

              <div className="p-4 sm:p-5 lg:flex lg:min-h-[220px]">
                <div className="grid w-full gap-3 sm:grid-cols-2 lg:flex-1">
                  {primaryDetails.map((item) => (
                    <div key={item.label} className="flex min-h-[82px] flex-col justify-center rounded-[14px] border border-white/[0.08] bg-[#0b0b0b]/70 px-4 py-4 sm:min-h-[92px]">
                      <p className="text-xs font-bold text-[#777]">{item.label}</p>
                      <p className={['mt-2 text-base font-black', item.accent ? 'text-[#e63946]' : 'text-[#f5f5f5]'].join(' ')}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {reservationRows.map((row) => (
              <div key={row.label} className="rounded-[14px] border border-white/[0.08] bg-[#0f0f0f] px-4 py-3">
                <p className="text-xs font-bold text-[#777]">{row.label}</p>
                <p className={[
                  'mt-2 break-all text-sm font-black',
                  row.success ? 'inline-flex rounded-full border border-[#e63946]/30 bg-[#e63946]/10 px-3 py-1 text-[#ff8a8a]' : row.highlight ? 'text-[#e63946]' : 'text-[#f5f5f5]',
                ].join(' ')}>
                  {row.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[14px] border border-white/[0.05] bg-[#080808]/35 px-4 py-3">
            <p className="mb-1 text-[10px] font-black tracking-[0.2em] text-[#555]">결제 상세 정보</p>
            {paymentMetaRows.map((row) => (
              <div key={row.label} className="grid gap-1 border-b border-white/[0.035] py-2 text-[11px] last:border-b-0 sm:grid-cols-[120px_1fr] sm:gap-4">
                <span className="font-bold text-[#555]">{row.label}</span>
                <span className="break-all font-semibold text-[#707070] sm:text-right">{row.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 입장 전 필독 사항 */}
        <section className="mb-7 rounded-[18px] border border-[#e63946]/25 bg-[linear-gradient(135deg,#151515_0%,#111_68%,rgba(230,57,70,0.08)_100%)] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:p-6">
          <SectionTitle>입장 전 필독 사항</SectionTitle>
          <ul className="space-y-2">
            {NOTICES.map((n, i) => (
              <li key={i} className="flex gap-3 rounded-[12px] border border-white/[0.06] bg-[#0b0b0b]/50 px-4 py-3 text-sm font-semibold text-[#a8a8a8]">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e63946]" />
                <span className="leading-5">{n}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 입장 당일 안내 */}
        <section className="mb-8 rounded-[18px] border border-white/[0.08] bg-[#151515]/92 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:p-6">
          <SectionTitle>입장 당일 안내</SectionTitle>
          <ol className="grid gap-3 sm:grid-cols-2">
            {ARRIVAL_STEPS.map((step, i) => (
              <li key={i} className="flex gap-3 rounded-[14px] border border-white/[0.08] bg-[#0f0f0f] p-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e63946] text-xs font-black text-white shadow-[0_0_16px_rgba(230,57,70,0.24)]">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-black text-[#f5f5f5]">{step.label}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-[#888]">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Action buttons */}
        <div className="relative flex flex-col gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/mypage"
              className="rounded-[14px] bg-[#e63946] px-5 py-4 text-center text-sm font-black text-white shadow-[0_18px_42px_rgba(230,57,70,0.18)] transition-all hover:bg-[#ff4654] hover:shadow-[0_20px_52px_rgba(230,57,70,0.28)]"
            >
              마이페이지에서 확인
            </Link>
            <Link
              href="/"
              className="rounded-[14px] border border-white/[0.1] px-5 py-4 text-center text-sm font-black text-[#f5f5f5] transition-colors hover:border-white/[0.18] hover:bg-white/[0.05]"
            >
              메인으로 돌아가기
            </Link>
          </div>
          <Link
            href="/themes"
            className="block w-full rounded-[14px] border border-[#e4b660]/25 bg-[#e4b660]/10 px-5 py-4 text-center text-sm font-black text-[#f0c674] transition-all hover:border-[#e4b660]/45 hover:bg-[#e4b660]/15"
          >
            다른 테마도 둘러보기
          </Link>
        </div>
      </main>
    </div>
  );
}
