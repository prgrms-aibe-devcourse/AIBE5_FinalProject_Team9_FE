'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { MatePost, MateStatus, ExperienceLevel } from '@/types/mate';
import { getDDay } from '@/lib/formatDate';
import { useMateStore } from '@/stores/mateStore';
import { useAuthStore } from '@/stores/authStore';

// ── Constants ─────────────────────────────────────────────────────
const AVATAR_COLORS = [
  'bg-[#e63946]', 'bg-[#f39c12]', 'bg-[#2ecc71]',
  'bg-[#3498db]', 'bg-[#9b59b6]', 'bg-[#e67e22]',
];

const EXPERIENCE_MAP = {
  ANY:          { label: '무관',       cls: 'border-[#2a2a2a] text-[#888]' },
  BEGINNER:     { label: '입문자 환영', cls: 'border-[#2ecc71] text-[#2ecc71]' },
  INTERMEDIATE: { label: '중급자 우대', cls: 'border-[#f39c12] text-[#f39c12]' },
  EXPERT:       { label: '경험자 우대', cls: 'border-[#e63946] text-[#e63946]' },
};

const LOCATION_CLS: Record<string, string> = {
  '강남점': 'bg-[#e63946]/10 text-[#e63946] border-[#e63946]/40',
  '홍대점': 'bg-[#9b59b6]/10 text-[#9b59b6] border-[#9b59b6]/40',
  '건대점': 'bg-[#3498db]/10 text-[#3498db] border-[#3498db]/40',
  '신촌점': 'bg-[#2ecc71]/10 text-[#2ecc71] border-[#2ecc71]/40',
};

const ALL_TAGS = ['진지하게', '즐겁게', '공략 위주', '분위기 위주', '처음 만난 팬텀', '여성만', '사진 촬영'];
const PER_PAGE = 6;

// ── Helpers ───────────────────────────────────────────────────────
function getDDayLabel(dateStr: string) {
  const d = getDDay(dateStr);
  if (d < 0) return { text: '마감', cls: 'text-[#888]' };
  if (d === 0) return { text: 'D-Day', cls: 'text-[#e63946] font-bold' };
  return { text: `D-${d}`, cls: 'text-[#f39c12] font-bold' };
}

// ── Sub-components ────────────────────────────────────────────────
function MemberDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1 flex-wrap justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={['w-3 h-3 rounded-full border', i < current ? 'bg-[#e63946] border-[#e63946]' : 'bg-transparent border-[#444]'].join(' ')} />
      ))}
    </div>
  );
}

function PostCard({ post, currentUserId }: { post: MatePost; currentUserId?: number }) {
  const avatarColor = AVATAR_COLORS[(post.authorId - 1) % AVATAR_COLORS.length];
  const exp = EXPERIENCE_MAP[post.experienceLevel];
  const locCls = LOCATION_CLS[post.locationName] ?? 'bg-[#1a1a1a] text-[#888] border-[#2a2a2a]';
  const { text: ddayText, cls: ddayCls } = getDDayLabel(post.deadlineDate);
  const isFull = post.status === 'FULL' || post.status === 'CLOSED';
  const isMine = currentUserId != null && post.authorId === currentUserId;

  return (
    <Link href={`/mate/${post.id}`} className="block">
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:border-[#333] transition-colors overflow-hidden">
        <div className="flex">
          <div className="flex-1 p-4 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <div className={['w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0', avatarColor].join(' ')}>
                {post.authorNickname[0]}
              </div>
              {post.isPinned && (
                <span className="text-xs bg-[#f39c12]/20 text-[#f39c12] border border-[#f39c12]/40 rounded px-1.5 py-0.5">고정</span>
              )}
              <span className={['text-xs border rounded px-1.5 py-0.5', locCls].join(' ')}>{post.locationName}</span>
              {post.experienceLevel !== 'ANY' && (
                <span className={['text-xs border rounded px-1.5 py-0.5', exp.cls].join(' ')}>{exp.label}</span>
              )}
              <span className={['text-xs rounded px-1.5 py-0.5 font-medium', isFull ? 'bg-[#2a2a2a] text-[#888]' : 'bg-[#e63946] text-white'].join(' ')}>
                {isFull ? '마감' : '모집 중'}
              </span>
            </div>

            <h3 className="text-sm font-bold text-[#f5f5f5] mb-1.5 leading-snug">{post.title}</h3>
            <p className="text-xs text-[#888] leading-relaxed line-clamp-2 mb-2">{post.content}</p>

            <div className="flex flex-wrap gap-1 mb-3">
              <span className="text-xs bg-[#0d0d0d] border border-[#2a2a2a] rounded-full px-2 py-0.5 text-[#888]">
                🎭 {post.themeTitle}
              </span>
              {post.atmosphereTags.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs bg-[#0d0d0d] border border-[#2a2a2a] rounded-full px-2 py-0.5 text-[#888]">{tag}</span>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs text-[#555]">
              <span>{post.playDate} {post.reservationTime}</span>
              <span className={ddayCls}>[{ddayText}]</span>
              <span className="text-[#444]">·</span>
              <span>{post.authorNickname}</span>
              {isMine && (
                <span className="bg-[#e63946]/20 text-[#e63946] text-xs px-1.5 py-0.5 rounded">내 글</span>
              )}
              {(post.commentCount ?? 0) > 0 && (
                <span className="ml-auto text-[#555]">💬 {post.commentCount}</span>
              )}
            </div>
          </div>

          <div className="w-24 shrink-0 flex flex-col items-center justify-between p-3 border-l border-[#2a2a2a]">
            <div className="text-center">
              <p className="text-xs text-[#555] mb-2">참여 현황</p>
              <MemberDots current={post.currentMembers} total={post.totalMembers} />
              <p className="text-xs text-[#888] mt-2">
                {post.totalMembers - post.currentMembers}자리 남음/{post.totalMembers}명
              </p>
            </div>
            <span className={['text-xs px-2 py-1 rounded border mt-2', isFull ? 'border-[#333] text-[#555]' : 'border-[#e63946] text-[#e63946]'].join(' ')}>
              {isFull ? '마감' : '모집중'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function MatePage() {
  const { user } = useAuthStore();
  const posts = useMateStore(s => s.posts);
  const listPosts = useMateStore(s => s.listPosts);

  // SSR/hydration mismatch 방지를 위한 mount 가드
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [activeTab, setActiveTab] = useState<'all' | 'mine'>('all');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<MateStatus | 'ALL'>('OPEN');
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [expFilter, setExpFilter] = useState<ExperienceLevel | ''>('');
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  // ── 필터링된 결과 ──
  // posts는 스토어 변경 시 재계산 트리거 목적으로 의존성에 포함
  const { items: paged, total, totalPages, page: safePage } = useMemo(() => {
    void posts; // 스토어 변경 추적용
    return listPosts({
      search,
      status: statusFilter,
      locations: locationFilter,
      experienceLevel: expFilter,
      tags: tagFilter,
      authorId: activeTab === 'mine' && user ? user.id : undefined,
      page,
      size: PER_PAGE,
    });
  }, [posts, listPosts, search, statusFilter, locationFilter, expFilter, tagFilter, activeTab, user, page]);

  // 필터 변경 시 페이지 1로
  useEffect(() => { setPage(1); }, [search, statusFilter, locationFilter, expFilter, tagFilter, activeTab]);

  const toggleLocation = (loc: string) => {
    setLocationFilter(prev => prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]);
  };
  const toggleTag = (tag: string) => {
    setTagFilter(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };
  const resetFilters = () => {
    setLocationFilter([]); setExpFilter(''); setTagFilter([]); setSearch('');
  };

  const openCount = mounted ? posts.filter(p => p.status === 'OPEN').length : 0;
  const allCount = mounted ? posts.length : 0;
  const myCount = mounted && user ? posts.filter(p => p.authorId === user.id).length : 0;
  const mySummary = mounted && user ? posts.find(p => p.authorId === user.id && p.status === 'OPEN') : undefined;

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {/* Hero */}
      <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <p className="text-xs text-[#e63946] font-bold tracking-widest mb-2">MATE RECRUITMENT</p>
          <h1 className="text-3xl font-black text-[#f5f5f5] mb-2">
            공포를 함께 즐길<br />메이트를 찾아보세요
          </h1>
          <p className="text-[#888] text-sm mb-6">
            혼자 가기 무서운 테마도 메이트와 함께라면 두 배로 재미있어요.<br className="hidden sm:block" />
            원하는 테마, 날짜, 분위기에 맞는 파티를 찾아 신청해보세요.
          </p>
          <div className="flex gap-8">
            {[
              { value: openCount, label: '현재 모집 중', color: 'text-[#f39c12]' },
              { value: allCount, label: '전체 모집', color: 'text-[#2ecc71]' },
              { value: '1,247', label: '누적 성사', color: 'text-[#3498db]' },
            ].map(stat => (
              <div key={stat.label}>
                <p className={['text-2xl font-black', stat.color].join(' ')}>{stat.value}</p>
                <p className="text-xs text-[#888] mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-56 shrink-0 hidden md:block">
            {mySummary && (
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 mb-4">
                <p className="text-xs text-[#888] mb-2">내 모집 현황</p>
                <p className="text-xs text-[#f5f5f5] leading-snug mb-1 line-clamp-1">{mySummary.title}</p>
                <p className="text-xs text-[#888]">
                  {getDDayLabel(mySummary.deadlineDate).text} · {mySummary.locationName} · {mySummary.currentMembers}/{mySummary.totalMembers}명
                </p>
              </div>
            )}
            <Link href="/mate/write" className="flex items-center justify-center gap-1 w-full py-2 rounded bg-[#e63946] hover:bg-[#c1121f] text-white text-sm font-medium mb-5 transition-colors">
              + 메이트 모집 글쓰기
            </Link>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#888] uppercase tracking-wider">필터</span>
                <button onClick={resetFilters} className="text-xs text-[#555] hover:text-[#e63946] transition-colors">초기화</button>
              </div>

              <div className="mb-4">
                <p className="text-xs text-[#555] mb-2">지점</p>
                {['강남점', '홍대점', '건대점', '신촌점'].map(loc => (
                  <label key={loc} className="flex items-center gap-2 py-1 cursor-pointer">
                    <input type="checkbox" checked={locationFilter.includes(loc)} onChange={() => toggleLocation(loc)} className="accent-[#e63946]" />
                    <span className="text-sm text-[#f5f5f5]">{loc}</span>
                  </label>
                ))}
              </div>

              <div className="mb-4">
                <p className="text-xs text-[#555] mb-2">경험 레벨</p>
                {[
                  { value: '', label: '무관 (누구나)' },
                  { value: 'BEGINNER', label: '입문자 환영' },
                  { value: 'INTERMEDIATE', label: '중급자 우대' },
                  { value: 'EXPERT', label: '경험자 우대' },
                ].map(opt => (
                  <label key={opt.value} className="flex items-center gap-2 py-1 cursor-pointer">
                    <input type="radio" name="exp" checked={expFilter === opt.value} onChange={() => setExpFilter(opt.value as ExperienceLevel | '')} className="accent-[#e63946]" />
                    <span className="text-sm text-[#f5f5f5]">{opt.label}</span>
                  </label>
                ))}
              </div>

              <div>
                <p className="text-xs text-[#555] mb-2">분위기 태그</p>
                <div className="flex flex-wrap gap-1">
                  {ALL_TAGS.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={['text-xs px-2 py-1 rounded-full border transition-colors', tagFilter.includes(tag) ? 'border-[#e63946] text-[#e63946] bg-[#e63946]/10' : 'border-[#2a2a2a] text-[#888] hover:border-[#444]'].join(' ')}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 bg-[#f39c12]/10 border border-[#f39c12]/30 rounded-lg px-4 py-3 mb-4 text-xs text-[#f39c12]">
              <span className="shrink-0">📢 모집 알리미:</span>
              <span>신청 후 일정 변동이 생기면 빠르게 마감 처리해주세요. 노쇼는 신고 대상입니다.</span>
            </div>

            <div className="flex border-b border-[#2a2a2a] mb-4">
              {[
                { id: 'all' as const, label: '전체', count: allCount },
                { id: 'mine' as const, label: '내 모집글', count: myCount },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={['flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors', activeTab === tab.id ? 'text-[#e63946] border-b-2 border-[#e63946]' : 'text-[#888] hover:text-[#f5f5f5]'].join(' ')}
                >
                  {tab.label}
                  <span className={['text-xs rounded-full px-1.5 py-0.5', activeTab === tab.id ? 'bg-[#e63946] text-white' : 'bg-[#2a2a2a] text-[#888]'].join(' ')}>{tab.count}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-2 mb-4 flex-wrap">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="제목, 테마명, 지점, 내용 검색..."
                className="flex-1 min-w-[200px] bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded px-3 py-2 placeholder-[#555] focus:border-[#e63946] outline-none"
              />
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as MateStatus | 'ALL')}
                className="bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded px-2 py-2 outline-none focus:border-[#e63946]"
              >
                <option value="OPEN">모집 중</option>
                <option value="FULL">마감</option>
                <option value="CLOSED">종료</option>
                <option value="ALL">전체</option>
              </select>
              <span className="flex items-center text-xs text-[#888] whitespace-nowrap">
                {total}개의 모집 글
              </span>
            </div>

            <div className="space-y-3">
              {paged.map(post => <PostCard key={post.id} post={post} currentUserId={user?.id} />)}
              {paged.length === 0 && (
                <div className="py-16 text-center text-[#888]">
                  <p className="text-3xl mb-3">🔍</p>
                  <p>조건에 맞는 모집 글이 없습니다.</p>
                  {activeTab === 'mine' && !user && (
                    <p className="text-xs text-[#555] mt-2">로그인하면 내가 작성한 모집글을 볼 수 있어요.</p>
                  )}
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 mt-8">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safePage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded border border-[#2a2a2a] text-[#888] disabled:opacity-30 hover:border-[#e63946] hover:text-[#e63946] transition-colors">‹</button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)}
                    className={['w-8 h-8 flex items-center justify-center rounded border text-sm transition-colors', safePage === i + 1 ? 'border-[#e63946] text-[#e63946] bg-[#e63946]/10' : 'border-[#2a2a2a] text-[#888] hover:border-[#555]'].join(' ')}>
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={safePage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded border border-[#2a2a2a] text-[#888] disabled:opacity-30 hover:border-[#e63946] hover:text-[#e63946] transition-colors">›</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
