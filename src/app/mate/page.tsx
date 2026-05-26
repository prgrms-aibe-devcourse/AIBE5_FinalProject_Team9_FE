'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { MatePost } from '@/types/mate';
import { getDDay, formatRelativeTime } from '@/lib/formatDate';

// ── Mock Data ──────────────────────────────────────────────────────
const MOCK_POSTS: MatePost[] = [
  { id: 1, title: '이번 주말 강남점 체벌린 같이 가실 분?', content: '공포 방탈출을 경험 10회 이상입니다! 진지하게 공략하기보다 분위기를 즐기며 플레이하고 싶습니다. 같이 무서워해줄 분 구해요 :) 카톡으로 연락주세요', authorId: 1, authorNickname: '김공포', locationName: '강남점', themeTitle: '체벌린', playDate: '2026-05-31', reservationTime: '18:30', deadlineDate: '2026-05-29', currentMembers: 2, totalMembers: 3, experienceLevel: 'ANY', atmosphereTags: ['진지하게', '즐겁게'], contactMethod: 'KAKAO', status: 'OPEN', isPinned: true, commentCount: 5, createdAt: '2026-05-25T18:30:00' },
  { id: 2, title: '건대점 악마의 제단 고수 2명 구합니다', content: '이번이 세 번째 도전입니다. 이번엔 반드시 클리어! 방탈출 20회 이상, 공포 위주로 진행해 분 분 모집합니다. 입문자분들은 다른 곳 이용해 주세요.', authorId: 3, authorNickname: '정배관', locationName: '건대점', themeTitle: '악마의 제단', playDate: '2026-05-31', reservationTime: '19:00', deadlineDate: '2026-05-30', currentMembers: 1, totalMembers: 3, experienceLevel: 'EXPERT', atmosphereTags: ['공략 위주', '진지하게'], contactMethod: 'KAKAO', status: 'OPEN', commentCount: 18, createdAt: '2026-05-24T12:00:00' },
  { id: 3, title: '강남점 체벌린 일요일 저녁 4인 모집', content: '일요일 저녁 강남에서 체벌린 같이 보실 분 2명 모집합니다. 공포 보다는 재미 위주로 편하게 즐기고 싶어요. 부담 없이 강남에서 식사도 괜찮아요.', authorId: 4, authorNickname: '한울서울', locationName: '강남점', themeTitle: '체벌린', playDate: '2026-05-30', reservationTime: '20:00', deadlineDate: '2026-05-29', currentMembers: 2, totalMembers: 4, experienceLevel: 'INTERMEDIATE', atmosphereTags: ['즐겁게', '분위기 위주'], contactMethod: 'KAKAO', status: 'OPEN', commentCount: 3, createdAt: '2026-05-24T09:00:00' },
  { id: 4, title: '홍대점 저주받은 술 주말 오전 첫 모집', content: '주말 오전 여유롭게 즐길 분 1자리 모집합니다. 사진 찍고 가볍게 넘기는 거 즐아하는 분환영해요! 끝나고 홍대에서 브런치 같이 하실 분도 찾아요 ☆', authorId: 5, authorNickname: '그로토', locationName: '홍대점', themeTitle: '저주받은 술', playDate: '2026-05-30', reservationTime: '10:30', deadlineDate: '2026-05-29', currentMembers: 3, totalMembers: 4, experienceLevel: 'BEGINNER', atmosphereTags: ['즐겁게', '분위기 위주', '사진 촬영'], contactMethod: 'KAKAO', status: 'OPEN', commentCount: 7, createdAt: '2026-05-23T16:00:00' },
  { id: 5, title: '건대점 악마의 병원 첫 방탈을 도전해요', content: '방탈출을 처음 도전해보고 싶습니다! 저처럼 공포 방탈출 경험이 초보 환경해 주시는 분들 찾아요. 무서운 거 좀 있어도 괜찮습니다. 즐겁게 해봐요!', authorId: 6, authorNickname: '나도전서', locationName: '건대점', themeTitle: '악마의 병원', playDate: '2026-05-31', reservationTime: '14:00', deadlineDate: '2026-05-29', currentMembers: 4, totalMembers: 5, experienceLevel: 'BEGINNER', atmosphereTags: ['즐겁게', '처음 만난 팬텀'], contactMethod: 'COMMENT', status: 'OPEN', commentCount: 2, createdAt: '2026-05-23T11:00:00' },
  { id: 6, title: '강남점 살인마의 방 3인 딱 1자리 남았어요', content: '내일 강남점 살인마의 방 3인 1자리 있습니다. 난이도 최고 등급이라 공포 방탈출 어느 정도 하신분 오시면 좋겠습니다. 빠르게 결정 부탁해요!', authorId: 7, authorNickname: '최긍박', locationName: '강남점', themeTitle: '살인마의 방', playDate: '2026-05-27', reservationTime: '21:00', deadlineDate: '2026-05-26', currentMembers: 3, totalMembers: 3, experienceLevel: 'EXPERT', atmosphereTags: ['진지하게', '공략 위주'], contactMethod: 'KAKAO', status: 'FULL', commentCount: 12, createdAt: '2026-05-22T21:00:00' },
  { id: 7, title: '좀비 아포칼립스 같이 갈 사람', content: '좀비 아포칼립스 이달 2회 플레이하고 싶어 기회를 달리고있습니다. 공략 공유하며 진지하게 도전할 인원을 모십니다. 경험 10회 이상 우대해요', authorId: 8, authorNickname: '이할동', locationName: '강남점', themeTitle: '좀비 아포칼립스', playDate: '2026-06-01', reservationTime: '20:00', deadlineDate: '2026-05-31', currentMembers: 2, totalMembers: 4, experienceLevel: 'EXPERT', atmosphereTags: ['공략 위주', '진지하게'], contactMethod: 'KAKAO', status: 'OPEN', commentCount: 4, createdAt: '2026-05-22T09:00:00' },
  { id: 8, title: '홍대점 13번째 방 주말 편하게 즐겨요', content: '주말 저녁 홍대 13번째 방 같이 도전할 분 모집합니다! 공포 좋아하고 분위기 있는 방탈출 좋아하는 분들이면 환영해요. 초보도 괜찮습니다.', authorId: 9, authorNickname: '박공포', locationName: '홍대점', themeTitle: '13번째 방', playDate: '2026-06-01', reservationTime: '19:00', deadlineDate: '2026-05-30', currentMembers: 1, totalMembers: 4, experienceLevel: 'ANY', atmosphereTags: ['즐겁게', '분위기 위주'], contactMethod: 'COMMENT', status: 'OPEN', commentCount: 1, createdAt: '2026-05-21T15:00:00' },
];

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

function PostCard({ post }: { post: MatePost }) {
  const avatarColor = AVATAR_COLORS[(post.authorId - 1) % AVATAR_COLORS.length];
  const exp = EXPERIENCE_MAP[post.experienceLevel];
  const locCls = LOCATION_CLS[post.locationName] ?? 'bg-[#1a1a1a] text-[#888] border-[#2a2a2a]';
  const { text: ddayText, cls: ddayCls } = getDDayLabel(post.deadlineDate);
  const isFull = post.status === 'FULL' || post.status === 'CLOSED';

  return (
    <Link href={`/mate/${post.id}`} className="block">
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:border-[#333] transition-colors overflow-hidden">
        <div className="flex">
          {/* Main content */}
          <div className="flex-1 p-4 min-w-0">
            {/* Header row */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <div className={['w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0', avatarColor].join(' ')}>
                {post.authorNickname[0]}
              </div>
              {post.isPinned && (
                <span className="text-xs bg-[#f39c12]/20 text-[#f39c12] border border-[#f39c12]/40 rounded px-1.5 py-0.5">고정</span>
              )}
              <span className={['text-xs border rounded px-1.5 py-0.5', locCls].join(' ')}>
                {post.locationName}
              </span>
              {post.experienceLevel !== 'ANY' && (
                <span className={['text-xs border rounded px-1.5 py-0.5', exp.cls].join(' ')}>
                  {exp.label}
                </span>
              )}
              <span className={['text-xs rounded px-1.5 py-0.5 font-medium', isFull ? 'bg-[#2a2a2a] text-[#888]' : 'bg-[#e63946] text-white'].join(' ')}>
                {isFull ? '마감' : '모집 중'}
              </span>
            </div>

            <h3 className="text-sm font-bold text-[#f5f5f5] mb-1.5 leading-snug">{post.title}</h3>
            <p className="text-xs text-[#888] leading-relaxed line-clamp-2 mb-2">{post.content}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              <span className="text-xs bg-[#0d0d0d] border border-[#2a2a2a] rounded-full px-2 py-0.5 text-[#888]">
                🎭 {post.themeTitle}
              </span>
              {post.atmosphereTags.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs bg-[#0d0d0d] border border-[#2a2a2a] rounded-full px-2 py-0.5 text-[#888]">
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer row */}
            <div className="flex items-center gap-3 text-xs text-[#555]">
              <span>{post.playDate} {post.reservationTime}</span>
              <span className={ddayCls}>[{ddayText}]</span>
              <span className="text-[#444]">·</span>
              <span>{post.authorNickname}</span>
              {post.authorId === 1 && (
                <span className="bg-[#e63946]/20 text-[#e63946] text-xs px-1.5 py-0.5 rounded">내 글</span>
              )}
              {(post.commentCount ?? 0) > 0 && (
                <span className="ml-auto text-[#555]">💬 {post.commentCount}</span>
              )}
            </div>
          </div>

          {/* Right panel */}
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
  const [activeTab, setActiveTab] = useState<'all' | 'mine'>('all');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'OPEN'>('OPEN');
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [expFilter, setExpFilter] = useState<string>('');
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = [...MOCK_POSTS];
    if (activeTab === 'mine') list = list.filter(p => p.authorId === 1);
    if (search) list = list.filter(p => p.title.includes(search) || p.content.includes(search) || p.locationName.includes(search));
    if (statusFilter === 'OPEN') list = list.filter(p => p.status === 'OPEN');
    if (locationFilter.length > 0) list = list.filter(p => locationFilter.includes(p.locationName));
    if (expFilter) list = list.filter(p => p.experienceLevel === expFilter);
    if (tagFilter.length > 0) list = list.filter(p => tagFilter.every(t => p.atmosphereTags.includes(t)));
    list.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
    return list;
  }, [activeTab, search, statusFilter, locationFilter, expFilter, tagFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleLocation = (loc: string) => {
    setLocationFilter(prev => prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]);
    setPage(1);
  };
  const toggleTag = (tag: string) => {
    setTagFilter(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    setPage(1);
  };
  const resetFilters = () => {
    setLocationFilter([]); setExpFilter(''); setTagFilter([]); setPage(1);
  };

  const openCount = MOCK_POSTS.filter(p => p.status === 'OPEN').length;

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {/* Hero Section */}
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
              { value: 8, label: '오늘 새글', color: 'text-[#2ecc71]' },
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
            {/* My post card */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 mb-4">
              <p className="text-xs text-[#888] mb-2">내 모집 현황</p>
              <p className="text-xs text-[#f5f5f5] leading-snug mb-1 line-clamp-1">{MOCK_POSTS[0].title}</p>
              <p className="text-xs text-[#888]">
                {getDDayLabel(MOCK_POSTS[0].deadlineDate).text} · {MOCK_POSTS[0].locationName} · {MOCK_POSTS[0].currentMembers}/{MOCK_POSTS[0].totalMembers}명 모집 중
              </p>
            </div>
            <Link
              href="/mate/write"
              className="flex items-center justify-center gap-1 w-full py-2 rounded bg-[#e63946] hover:bg-[#c1121f] text-white text-sm font-medium mb-5 transition-colors"
            >
              + 메이트 모집 글쓰기
            </Link>

            {/* Filters */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#888] uppercase tracking-wider">필터</span>
                <button onClick={resetFilters} className="text-xs text-[#555] hover:text-[#e63946] transition-colors">초기화</button>
              </div>

              {/* 지점 */}
              <div className="mb-4">
                <p className="text-xs text-[#555] mb-2">지점</p>
                {['강남점', '홍대점', '건대점'].map(loc => (
                  <label key={loc} className="flex items-center gap-2 py-1 cursor-pointer">
                    <input type="checkbox" checked={locationFilter.includes(loc)} onChange={() => toggleLocation(loc)} className="accent-[#e63946]" />
                    <span className="text-sm text-[#f5f5f5]">{loc}</span>
                  </label>
                ))}
              </div>

              {/* 경험 레벨 */}
              <div className="mb-4">
                <p className="text-xs text-[#555] mb-2">경험 레벨</p>
                {[
                  { value: '', label: '무관 (누구나)' },
                  { value: 'BEGINNER', label: '입문자 환영' },
                  { value: 'EXPERT', label: '경험자 우대' },
                ].map(opt => (
                  <label key={opt.value} className="flex items-center gap-2 py-1 cursor-pointer">
                    <input type="radio" name="exp" checked={expFilter === opt.value} onChange={() => { setExpFilter(opt.value); setPage(1); }} className="accent-[#e63946]" />
                    <span className="text-sm text-[#f5f5f5]">{opt.label}</span>
                  </label>
                ))}
              </div>

              {/* 분위기 태그 */}
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
            {/* Notice banner */}
            <div className="flex items-start gap-2 bg-[#f39c12]/10 border border-[#f39c12]/30 rounded-lg px-4 py-3 mb-4 text-xs text-[#f39c12]">
              <span className="shrink-0">📢 모집 알리미:</span>
              <span>신청 후 약력이 없는 노소는 신참도 필수가 참여할니다. 참여가 어려워지면 마감 알려주세요.</span>
            </div>

            {/* Tab bar */}
            <div className="flex border-b border-[#2a2a2a] mb-4">
              {[
                { id: 'all' as const, label: '전체', count: MOCK_POSTS.length },
                { id: 'mine' as const, label: '참여/모집', count: MOCK_POSTS.filter(p => p.authorId === 1).length },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setPage(1); }}
                  className={['flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors', activeTab === tab.id ? 'text-[#e63946] border-b-2 border-[#e63946]' : 'text-[#888] hover:text-[#f5f5f5]'].join(' ')}
                >
                  {tab.label}
                  <span className={['text-xs rounded-full px-1.5 py-0.5', activeTab === tab.id ? 'bg-[#e63946] text-white' : 'bg-[#2a2a2a] text-[#888]'].join(' ')}>{tab.count}</span>
                </button>
              ))}
            </div>

            {/* Search + filter row */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="테마명, 지점, 내용 검색..."
                className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded px-3 py-2 placeholder-[#555] focus:border-[#e63946] outline-none"
              />
              <select
                value={statusFilter}
                onChange={e => { setStatusFilter(e.target.value as 'all' | 'OPEN'); setPage(1); }}
                className="bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded px-2 py-2 outline-none focus:border-[#e63946]"
              >
                <option value="OPEN">모집 중</option>
                <option value="all">전체</option>
              </select>
              <span className="flex items-center text-xs text-[#888] whitespace-nowrap">
                {filtered.length}개의 모집 글
              </span>
            </div>

            {/* Post list */}
            <div className="space-y-3">
              {paged.map(post => <PostCard key={post.id} post={post} />)}
              {paged.length === 0 && (
                <div className="py-16 text-center text-[#888]">
                  <p className="text-3xl mb-3">🔍</p>
                  <p>조건에 맞는 모집 글이 없습니다.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 mt-8">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="w-8 h-8 flex items-center justify-center rounded border border-[#2a2a2a] text-[#888] disabled:opacity-30 hover:border-[#e63946] hover:text-[#e63946] transition-colors">‹</button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)}
                    className={['w-8 h-8 flex items-center justify-center rounded border text-sm transition-colors', page === i + 1 ? 'border-[#e63946] text-[#e63946] bg-[#e63946]/10' : 'border-[#2a2a2a] text-[#888] hover:border-[#555]'].join(' ')}>
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded border border-[#2a2a2a] text-[#888] disabled:opacity-30 hover:border-[#e63946] hover:text-[#e63946] transition-colors">›</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
