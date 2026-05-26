'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useReservationStore } from '@/stores/reservationStore';
import { useAuthStore } from '@/stores/authStore';

function StepBar() {
  const steps = [
    { n: 1, label: '지점/테마/시간 선택' },
    { n: 2, label: '결제' },
    { n: 3, label: '예약 완료' },
  ];
  return (
    <div className="border-b border-[#1a1a1a] bg-[#0d0d0d]">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-center gap-0">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center">
            <div className="flex items-center gap-2">
              <div className={[
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border',
                s.n === 3
                  ? 'bg-[#2ecc71] border-[#2ecc71] text-white'
                  : 'bg-[#e63946] border-[#e63946] text-white',
              ].join(' ')}>
                {s.n < 3 ? '✓' : '✓'}
              </div>
              <span className={[
                'text-xs hidden sm:inline',
                s.n === 3 ? 'text-[#2ecc71] font-medium' : 'text-[#888]',
              ].join(' ')}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="mx-3 h-px w-12 sm:w-20 bg-[#e63946]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DotRating({ level, max = 5 }: { level: number; max?: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={['w-2 h-2 rounded-full', i < level ? 'bg-[#e63946]' : 'bg-[#2a2a2a]'].join(' ')} />
      ))}
    </span>
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

export default function ReservationCompletePage() {
  const store = useReservationStore();
  const { user } = useAuthStore();

  const [copied, setCopied] = useState(false);
  const [reservationNumber] = useState(() => {
    const n = Math.floor(100000 + Math.random() * 900000);
    return `GG-${n}`;
  });
  const [reservedAt] = useState(() => formatKoreanDateTime(new Date()));

  // Use store data if available, otherwise show mock defaults
  const themeTitle = store.themeTitle || '블러드문';
  const themeImageUrl = store.themeImageUrl || 'https://picsum.photos/seed/grimgate3/400/300';
  const locationName = store.locationName || '강남';
  const branchName = store.branchName || '강남 8호점';
  const date = store.date || '2026-05-27';
  const time = store.time || '19:00';
  const adultCount = store.adultCount ?? 2;
  const teenCount = store.teenCount ?? 0;
  const adultPrice = 28000;
  const totalAmount = adultCount * adultPrice + teenCount * 20000;

  const userName = user?.nickname || '김공포';
  const userPhone = user?.phone
    ? user.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1-****-$2')
    : '010-****-1921';
  const dateLabel = formatDateWithDay(date);

  const handleCopy = () => {
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
    { label: `제한 시간 ${store.themeTitle ? '90' : '90'}분 안에 탈출하세요`, desc: '— 살아서 나올 수 있다면.' },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <StepBar />

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full border-2 border-[#2ecc71] flex items-center justify-center mx-auto mb-4 text-3xl bg-[#1a1a1a]">
            👻
          </div>
          <p className="text-xs text-[#e63946] tracking-widest mb-2">// 예약이 확정되었습니다 //</p>
          <h1 className="text-3xl font-black text-[#f5f5f5] mb-1">
            공포의 문이 <span className="text-[#e63946]">열렸습니다.</span>
          </h1>
          <p className="text-sm text-[#888]">당신의 예약이 완료되었습니다.</p>
        </div>

        {/* 예약 번호 */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-5 mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#888] mb-1">예약 번호</p>
            <p className="text-2xl font-black text-[#f39c12] tracking-wider">{reservationNumber}</p>
            <p className="text-xs text-[#888] mt-1">입장 시 이 번호를 보여주세요</p>
          </div>
          <button
            onClick={handleCopy}
            className="text-xs border border-[#2a2a2a] hover:border-[#f39c12] hover:text-[#f39c12] text-[#888] px-3 py-1.5 rounded transition-colors"
          >
            {copied ? '✓ 복사됨' : '번호 복사'}
          </button>
        </div>

        {/* 예약 상세 정보 */}
        <section className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-5 mb-6">
          <h2 className="text-sm font-bold text-[#f5f5f5] flex items-center gap-2 mb-4">
            🎫 예약 상세 정보
          </h2>

          {/* Theme info */}
          <div className="flex gap-4 mb-4 pb-4 border-b border-[#2a2a2a]">
            <div className="relative w-16 h-14 shrink-0 rounded overflow-hidden bg-[#111]">
              <Image src={themeImageUrl} alt={themeTitle} fill className="object-cover" sizes="64px" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[#888] mb-1">{locationName} · {branchName}</p>
              <p className="text-sm font-bold text-[#f5f5f5] mb-2">{themeTitle}</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs bg-[#0d0d0d] border border-[#2a2a2a] rounded px-1.5 py-0.5 text-[#f5f5f5]">📅 {dateLabel}</span>
                <span className="text-xs bg-[#0d0d0d] border border-[#e63946]/40 rounded px-1.5 py-0.5 text-[#e63946]">● {time}</span>
                <span className="flex items-center gap-1 text-xs bg-[#0d0d0d] border border-[#2a2a2a] rounded px-1.5 py-0.5">
                  <DotRating level={5} />
                </span>
                <span className="text-xs bg-[#0d0d0d] border border-[#2a2a2a] rounded px-1.5 py-0.5 text-[#888]">{adultCount + teenCount}명</span>
              </div>
            </div>
          </div>

          {/* Detail rows */}
          <table className="w-full text-sm">
            <tbody>
              {[
                { label: '예약자', value: userName },
                { label: '연락처', value: userPhone },
                { label: '인원', value: `성인 ${adultCount}명${teenCount > 0 ? ` · 청소년 ${teenCount}명` : ''}` },
                { label: '결제 금액', value: `${totalAmount.toLocaleString('ko-KR')}₩`, highlight: true },
                { label: '결제 상태', value: '✓ 결제 완료', green: true },
                { label: '예약 시각', value: reservedAt },
              ].map(row => (
                <tr key={row.label} className="border-b border-[#111] last:border-b-0">
                  <td className="py-2.5 text-[#888] w-24 text-xs">{row.label}</td>
                  <td className={[
                    'py-2.5 text-right text-xs',
                    row.green ? 'text-[#2ecc71] font-medium' : row.highlight ? 'text-[#e63946] font-bold' : 'text-[#f5f5f5]',
                  ].join(' ')}>
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 입장 전 필독 사항 */}
        <section className="bg-[#1a1a1a] border border-[#e63946]/30 rounded-lg p-5 mb-6">
          <h2 className="text-sm font-bold text-[#e63946] flex items-center gap-2 mb-3">
            ▲ 입장 전 필독 사항
          </h2>
          <ul className="space-y-2">
            {NOTICES.map((n, i) => (
              <li key={i} className="text-xs text-[#888] flex gap-2">
                <span className="text-[#e63946] shrink-0">·</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 입장 당일 안내 */}
        <section className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-5 mb-8">
          <h2 className="text-sm font-bold text-[#f5f5f5] mb-4">입장 당일 안내</h2>
          <ol className="space-y-3">
            {ARRIVAL_STEPS.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-[#e63946] text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <span className="text-xs text-[#f5f5f5] font-medium">{step.label}</span>
                  <span className="text-xs text-[#888]"> / {step.desc}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <Link
              href="/mypage"
              className="flex-1 text-center py-3 rounded bg-[#e63946] hover:bg-[#c1121f] text-white text-sm font-medium transition-colors"
            >
              🎭 마이페이지에서 확인
            </Link>
            <Link
              href="/"
              className="flex-1 text-center py-3 rounded border border-[#2a2a2a] hover:border-[#444] text-[#f5f5f5] text-sm font-medium transition-colors"
            >
              🏠 메인으로 돌아가기
            </Link>
          </div>
          <Link
            href="/themes"
            className="block w-full text-center py-3 rounded bg-[#f39c12] hover:bg-[#e67e22] text-white text-sm font-medium transition-colors"
          >
            다른 테마도 둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
}
