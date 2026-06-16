'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getToken } from '@/lib/token';
import { ReviewReportItem } from '@/types/review';

const RECENT_RESERVATIONS = [
  { id: '#R20240527-042', theme: '폐병원의 저주', user: '김민수', date: '2026-05-27', time: '20:00', status: 'CONFIRMED', amount: '112,000₩' },
  { id: '#R20240527-041', theme: '악마의 제단', user: '이서연', date: '2026-05-27', time: '19:00', status: 'CONFIRMED', amount: '84,000₩' },
  { id: '#R20240527-040', theme: '좀비 아포칼립스', user: '박지훈', date: '2026-05-27', time: '17:30', status: 'COMPLETED', amount: '70,000₩' },
  { id: '#R20240527-039', theme: '유령 학교', user: '최유나', date: '2026-05-27', time: '16:00', status: 'COMPLETED', amount: '56,000₩' },
  { id: '#R20240527-038', theme: '폐병원의 저주', user: '강현우', date: '2026-05-27', time: '14:30', status: 'CANCELLED', amount: '112,000₩' },
];

const PENDING_REVIEWS = [
  { id: 'RV20240527-008', theme: '폐병원의 저주', user: '오완률', rating: 5, hasSpoiler: false, content: '안내원이가 행동 방식이 너무 무서워요 ㅠㅠ 공포!!...', date: '2026-05-27' },
  { id: 'RV20240527-007', theme: '악마의 제단', user: '류수진', rating: 4, hasSpoiler: true, content: '남자친구 데려오면 완전 도망갈 정도입니다...', date: '2026-05-27' },
  { id: 'RV20240527-006', theme: '급감한 연구소', user: '전지인', rating: 4, hasSpoiler: false, content: '장치가 오작동하고 매우 불쾌한 경험을 했어요...', date: '2026-05-26' },
];

const QUICK_LINKS = [
  { href: '/owner/reservations', label: '예약 관리', sub: '오늘 23건', color: '#f39c12' },
  { href: '/owner/hidden', label: '요청 관리', sub: '대기 14건', color: '#e63946' },
  { href: '/owner/themes', label: '테마 관리', sub: '총 8개', color: '#3498db' },

];

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  CONFIRMED: { label: '확정', cls: 'bg-[#f39c12]/15 text-[#f39c12]' },
  COMPLETED: { label: '완료', cls: 'bg-[#2ecc71]/15 text-[#2ecc71]' },
  CANCELLED: { label: '취소', cls: 'bg-[#e63946]/15 text-[#e63946]' },
  PENDING:   { label: '대기', cls: 'bg-[#888]/15 text-[#888]' },
};

function StarDisplay({ value }: { value: number }) {
  return (
    <span className="flex gap-px">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={['text-sm', i < value ? 'text-[#f39c12]' : 'text-[#333]'].join(' ')}>★</span>
      ))}
    </span>
  );
}

export default function OwnerDashboardPage() {
  const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
    const [reportCount, setReportCount] = useState(0);
    const [pendingReviews, setPendingReviews] = useState<ReviewReportItem[]>([]);


    // ── Mock Data ──────────────────────────────────────────────────────
    const STAT_CARDS = [
        { label: '오늘 예약', value: '23건', sub: '어제 대비 +3건', color: '#f39c12', bg: 'bg-[#f39c12]/10', icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )},
        { label: '이번달 예약', value: '312건', sub: '지난달 대비 +28건', color: '#3498db', bg: 'bg-[#3498db]/10', icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )},
        { label: '미승인 후기', value: `${reportCount}건`, sub: '승인 대기 중', color: '#e63946', bg: 'bg-[#e63946]/10', icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg> //admin
            )},
    ];


    return (
    <div className="p-6 space-y-6">
      {/* Welcome */}
      <div>
        <p className="text-xs text-[#555] mb-0.5">{today}</p>
        <p className="text-sm text-[#888]">
          처리 대기 중인 <span className="text-[#e63946] font-bold">후기 14건</span>과
          <span className="text-[#9b59b6] font-bold"> 숨김 요청 3건</span>이 있습니다.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4">
        {STAT_CARDS.map(card => (
          <div key={card.label} className="bg-[#1a1a1a] border border-[#222] rounded-xl p-5 flex items-center gap-4 min-h-[140px]">
            <div className={['w-12 h-12 rounded-lg flex items-center justify-center shrink-0', card.bg].join(' ')} style={{ color: card.color }}>
              {card.icon}
            </div>
            <div className="min-w-0">
              <p className="text-sm text-[#888] mb-0.5">{card.label}</p>
              <p className="text-3xl font-black" style={{ color: card.color }}>{card.value}</p>
              <p className="text-xs text-[#444] mt-0.5">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-3 gap-3">
        {QUICK_LINKS.map(link => (
          <Link key={link.href} href={link.href}
            className="bg-[#1a1a1a] border border-[#222] rounded-xl px-4 py-3 flex items-center justify-between hover:border-[#333] transition-colors group">
            <div>
              <p className="text-xs font-bold text-[#f5f5f5] group-hover:text-white transition-colors">{link.label}</p>
              <p className="text-xs mt-0.5" style={{ color: link.color }}>{link.sub}</p>
            </div>
            <span className="text-[#444] group-hover:text-[#666] transition-colors text-lg">›</span>
          </Link>
        ))}
      </div>

      {/* Two-column content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent reservations */}
        <section className="bg-[#1a1a1a] border border-[#222] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1f1f1f]">
            <h2 className="text-sm font-bold text-[#f5f5f5]">최근 예약</h2>
            <Link href="/owner/reservations" className="text-xs text-[#555] hover:text-[#e63946] transition-colors">전체 보기 →</Link>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1f1f1f]">
                {['예약 번호', '테마', '이용자', '상태', '금액'].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-[#555]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_RESERVATIONS.map((r, i) => {
                const st = STATUS_MAP[r.status] ?? STATUS_MAP.PENDING;
                return (
                  <tr key={r.id} className={['border-b border-[#171717] last:border-b-0 hover:bg-[#1f1f1f] transition-colors', i % 2 === 0 ? '' : ''].join(' ')}>
                    <td className="px-4 py-3 text-xs text-[#555] font-mono">{r.id}</td>
                    <td className="px-4 py-3 text-xs font-medium text-[#f5f5f5]">{r.theme}</td>
                    <td className="px-4 py-3 text-xs text-[#888]">{r.user}</td>
                    <td className="px-4 py-3">
                      <span className={['text-[11px] px-1.5 py-0.5 rounded font-medium', st.cls].join(' ')}>{st.label}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#888]">{r.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* Pending reviews */}
        <section className="bg-[#1a1a1a] border border-[#222] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1f1f1f]">
            <h2 className="text-sm font-bold text-[#f5f5f5] flex items-center gap-2">
              후기 신고 접수
              <span className="text-[11px] bg-[#e63946] text-white rounded-full px-1.5 py-0.5 font-black">14</span>
            </h2>
            <Link href="/owner/hidden" className="text-xs text-[#555] hover:text-[#e63946] transition-colors">전체 보기 →</Link>
          </div>
          <div className="divide-y divide-[#171717]">
            {PENDING_REVIEWS.map(r => (
              <div key={r.id} className="px-5 py-4 hover:bg-[#1f1f1f] transition-colors">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-[#f5f5f5]">{r.theme}</span>
                    <StarDisplay value={r.rating} />
                    {r.hasSpoiler && (
                      <span className="text-[10px] bg-[#f39c12]/20 text-[#f39c12] border border-[#f39c12]/40 px-1.5 py-0.5 rounded font-medium">스포일러</span>
                    )}
                  </div>
                  <span className="text-xs text-[#555] shrink-0">{r.date}</span>
                </div>
                <p className="text-xs text-[#888] mb-3 line-clamp-1">{r.content}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#555]">{r.user}</span>
                  <div className="flex gap-1.5">
                    <button className="text-[11px] bg-[#2ecc71]/15 text-[#2ecc71] hover:bg-[#2ecc71]/25 px-2.5 py-1 rounded transition-colors font-medium">승인</button>
                    <button className="text-[11px] bg-[#e63946]/15 text-[#e63946] hover:bg-[#e63946]/25 px-2.5 py-1 rounded transition-colors font-medium">숨김</button>
                    <button className="text-[11px] border border-[#2a2a2a] text-[#888] hover:border-[#444] px-2.5 py-1 rounded transition-colors">보기</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Secondary stats */}
      <section className="bg-[#1a1a1a] border border-[#222] rounded-xl p-5">
        <h2 className="text-sm font-bold text-[#f5f5f5] mb-4">이번달 테마별 예약 현황</h2>
        <div className="space-y-3">
          {[
            { theme: '폐병원의 저주', count: 89, total: 120, pct: 74 },
            { theme: '악마의 제단', count: 72, total: 100, pct: 72 },
            { theme: '좀비 아포칼립스', count: 61, total: 90, pct: 68 },
            { theme: '유령 학교', count: 55, total: 80, pct: 69 },
            { theme: '급감한 연구소', count: 35, total: 60, pct: 58 },
          ].map(row => (
            <div key={row.theme} className="flex items-center gap-4">
              <span className="text-xs text-[#888] w-36 shrink-0 truncate">{row.theme}</span>
              <div className="flex-1 bg-[#111] rounded-full h-1.5 overflow-hidden">
                <div className="h-full bg-[#e63946] rounded-full transition-all" style={{ width: `${row.pct}%` }} />
              </div>
              <span className="text-xs text-[#555] w-16 text-right shrink-0">{row.count}/{row.total}건</span>
              <span className="text-xs font-bold text-[#f5f5f5] w-8 text-right shrink-0">{row.pct}%</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
