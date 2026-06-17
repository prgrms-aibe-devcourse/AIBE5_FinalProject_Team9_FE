'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getDDay } from '@/lib/formatDate';

interface MockReservation {
  id: number;
  themeTitle: string;
  difficulty: number;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'cleared' | 'failed';
  clearTime?: string;
  hasReview?: boolean;
}

const MOCK_UPCOMING: MockReservation[] = [
  { id: 1, themeTitle: '폐병원 공포탈출', difficulty: 5, date: '2026-06-02', time: '20:00', location: '강남점', status: 'upcoming' },
  { id: 2, themeTitle: '묘지의 저주', difficulty: 4, date: '2026-06-17', time: '17:00', location: '신촌점', status: 'upcoming' },
];

const MOCK_PAST: MockReservation[] = [
  { id: 3, themeTitle: '좀비 아포칼립스', difficulty: 5, date: '2026-04-30', time: '16:00', location: '강남점', status: 'cleared', clearTime: '47:32', hasReview: true },
  { id: 4, themeTitle: '악마의 제단', difficulty: 5, date: '2026-04-05', time: '21:00', location: '신촌점', status: 'failed', hasReview: false },
  { id: 5, themeTitle: '유령 학교', difficulty: 4, date: '2026-03-22', time: '19:30', location: '홍대점', status: 'cleared', clearTime: '52:18', hasReview: false },
];

function DotRating({ level, max = 5 }: { level: number; max?: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={['w-2.5 h-2.5 rounded-full', i < level ? 'bg-[#e63946]' : 'bg-[#2a2a2a]'].join(' ')} />
      ))}
    </span>
  );
}

function getDDayBadge(dateStr: string) {
  const d = getDDay(dateStr);
  if (d < 0) return null;
  if (d === 0) return { text: 'D-Day', cls: 'bg-[#e63946] text-white' };
  return { text: `D-${d}`, cls: 'bg-[#f39c12]/20 text-[#f39c12] border border-[#f39c12]/40' };
}

export default function MyReservationsPage() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <div className="border-b border-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-[#555]">
            <Link href="/" className="hover:text-[#888] transition-colors">홈</Link>
            <span>›</span>
            <Link href="/mypage" className="hover:text-[#888] transition-colors">마이페이지</Link>
            <span>›</span>
            <span className="text-[#888]">내 예약</span>
          </nav>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-black text-[#f5f5f5]">내 예약</h1>
          <Link href="/reservation" className="text-xs bg-[#e63946] hover:bg-[#c1121f] text-white px-3 py-2 rounded-lg transition-colors font-medium">
            + 새 예약
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex border-b border-[#2a2a2a] mb-6">
          {[
            { key: 'all' as const, label: '전체', count: MOCK_UPCOMING.length + MOCK_PAST.length },
            { key: 'upcoming' as const, label: '예정된 예약', count: MOCK_UPCOMING.length },
            { key: 'past' as const, label: '지난 예약', count: MOCK_PAST.length },
          ].map(t => (
            <button key={t.key} onClick={() => setFilter(t.key)}
              className={['flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors',
                filter === t.key ? 'text-[#e63946] border-b-2 border-[#e63946]' : 'text-[#888] hover:text-[#f5f5f5]'
              ].join(' ')}>
              {t.label}
              <span className={['text-xs rounded-full px-1.5 py-0.5', filter === t.key ? 'bg-[#e63946] text-white' : 'bg-[#2a2a2a] text-[#888]'].join(' ')}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-7">
          {/* 예정된 예약 */}
          {(filter === 'all' || filter === 'upcoming') && (
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-[#f5f5f5] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2ecc71]" />
                  예정된 예약
                </h2>
                <span className="text-xs bg-[#1a1a1a] text-[#888] px-2 py-0.5 rounded">{MOCK_UPCOMING.length}건</span>
              </div>
              <div className="space-y-2">
                {MOCK_UPCOMING.map(r => {
                  const badge = getDDayBadge(r.date);
                  return (
                    <div key={r.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#111] flex items-center justify-center text-xl shrink-0">🏚</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="text-sm font-semibold text-[#f5f5f5]">{r.themeTitle}</span>
                          {badge && <span className={['text-xs px-1.5 py-0.5 rounded font-bold', badge.cls].join(' ')}>{badge.text}</span>}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <DotRating level={r.difficulty} />
                          <span className="text-xs text-[#888]">📅 {r.date}</span>
                          <span className="text-xs text-[#888]">🕐 {r.time}</span>
                          <span className="text-xs text-[#888]">📍 {r.location}</span>
                        </div>
                      </div>
                      <button className="shrink-0 text-xs bg-[#e63946] hover:bg-[#c1121f] text-white px-3 py-2 rounded-lg transition-colors font-medium">
                        취소/환불 요청
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* 지난 예약 */}
          {(filter === 'all' || filter === 'past') && (
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-[#f5f5f5] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#555]" />
                  지난 예약
                </h2>
                <span className="text-xs bg-[#1a1a1a] text-[#888] px-2 py-0.5 rounded">{MOCK_PAST.length}건</span>
              </div>
              <div className="space-y-2">
                {MOCK_PAST.map(r => (
                  <div key={r.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#111] flex items-center justify-center text-xl shrink-0 opacity-50">🏚</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-sm font-semibold text-[#f5f5f5]">{r.themeTitle}</span>
                        <span className={['text-xs px-1.5 py-0.5 rounded font-medium',
                          r.status === 'cleared' ? 'bg-[#2ecc71]/15 text-[#2ecc71]' : 'bg-[#e63946]/15 text-[#e63946]'
                        ].join(' ')}>
                          {r.status === 'cleared' ? '✓ 클리어' : '✗ 실패'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <DotRating level={r.difficulty} />
                        <span className="text-xs text-[#888]">📅 {r.date}</span>
                        <span className="text-xs text-[#888]">🕐 {r.time}</span>
                        <span className="text-xs text-[#888]">📍 {r.location}</span>
                        {r.clearTime && <span className="text-xs text-[#2ecc71]">⏱ {r.clearTime}</span>}
                      </div>
                    </div>
                    <div className="shrink-0">
                      {r.hasReview
                        ? <span className="text-xs text-[#555] px-2">후기 작성됨</span>
                        : <Link href="/mypage/reviews" className="text-xs bg-[#e63946] hover:bg-[#c1121f] text-white px-3 py-2 rounded-lg transition-colors font-medium">후기 쓰기</Link>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
