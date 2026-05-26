'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import ThemeCard from '@/components/card/ThemeCard';
import { Theme } from '@/types/theme';

const MOCK_THEMES: Theme[] = [
  { id: 1, title: '폐병원의 저주', description: '폐허가 된 병원에서 시작되는 극한의 공포 서사.', genre: '공포/미스터리', difficulty: 4, horrorLevel: 5, minPlayers: 2, maxPlayers: 4, duration: 80, price: 28000, imageUrl: 'https://picsum.photos/seed/grimgate1/400/300', rating: 4.9, reviewCount: 342, rank: 1, isBest: true, locationName: '홍대', branchName: '홍대 1호점', clearRate: 41, createdAt: '2024-01-15' },
  { id: 2, title: '13번째 방', description: '전설의 13번째 방. 들어간 자는 돌아오지 않는다.', genre: '공포/스릴러', difficulty: 5, horrorLevel: 3, minPlayers: 3, maxPlayers: 6, duration: 90, price: 30000, imageUrl: 'https://picsum.photos/seed/grimgate2/400/300', rating: 4.9, reviewCount: 312, rank: 2, isBest: true, locationName: '홍대', branchName: '홍대 6호점', clearRate: 38, createdAt: '2024-02-01' },
  { id: 3, title: '블러드문', description: '붉은 달이 뜨는 밤, 저주가 시작된다.', genre: '공포/오컬트', difficulty: 5, horrorLevel: 5, minPlayers: 3, maxPlayers: 6, duration: 90, price: 32000, imageUrl: 'https://picsum.photos/seed/grimgate3/400/300', rating: 4.8, reviewCount: 289, isHot: true, locationName: '강남', branchName: '강남 8호점', clearRate: 57, createdAt: '2024-01-20' },
  { id: 4, title: '좀비 아포칼립스', description: '바이러스가 창궐한 도시에서 살아남아라.', genre: '액션/공포', difficulty: 3, horrorLevel: 4, minPlayers: 2, maxPlayers: 6, duration: 75, price: 26000, imageUrl: 'https://picsum.photos/seed/grimgate4/400/300', rating: 4.8, reviewCount: 275, isHot: true, locationName: '강남', branchName: '강남 3호점', clearRate: 62, createdAt: '2024-01-10' },
  { id: 5, title: '미완의 초상', description: '전체 화가의 눈이 당신을 따라온다. 저주를 풀어라.', genre: '심리/공포', difficulty: 4, horrorLevel: 4, minPlayers: 1, maxPlayers: 6, duration: 70, price: 25000, imageUrl: 'https://picsum.photos/seed/grimgate5/400/300', rating: 4.5, reviewCount: 287, rank: 1, locationName: '건대', branchName: '건대 2호점', clearRate: 44, createdAt: '2024-03-01' },
  { id: 6, title: '체이금', description: '사라진 탐정을 추적하다 발견한 잔혹 스릴러.', genre: '스릴러', difficulty: 5, horrorLevel: 5, minPlayers: 2, maxPlayers: 4, duration: 75, price: 27000, imageUrl: 'https://picsum.photos/seed/grimgate6/400/300', rating: 4.8, reviewCount: 234, isHot: true, locationName: '건대', branchName: '건대 6호점', clearRate: 41, createdAt: '2024-02-15' },
  { id: 7, title: '감옥 탈출', description: '탈출 가능하다 했지만, 시간 안에 살아 나가라.', genre: '스릴러', difficulty: 4, horrorLevel: 4, minPlayers: 2, maxPlayers: 7, duration: 60, price: 22000, imageUrl: 'https://picsum.photos/seed/grimgate7/400/300', rating: 4.5, reviewCount: 221, isHot: true, locationName: '홍대', branchName: '홍대 2호점', clearRate: 68, createdAt: '2024-01-05' },
  { id: 8, title: '사일런스', description: '소리를 내면 안 된다. 침묵 속에서 탈출하라.', genre: '공포/스릴러', difficulty: 3, horrorLevel: 4, minPlayers: 2, maxPlayers: 6, duration: 70, price: 24000, imageUrl: 'https://picsum.photos/seed/grimgate8/400/300', rating: 4.5, reviewCount: 203, locationName: '신촌', branchName: '신촌 4호점', clearRate: 72, createdAt: '2024-04-01' },
  { id: 9, title: '인형의 밤', description: '자꾸만 인형들이 움직이기 시작했다.', genre: '공포', difficulty: 4, horrorLevel: 4, minPlayers: 2, maxPlayers: 6, duration: 75, price: 25000, imageUrl: 'https://picsum.photos/seed/grimgate9/400/300', rating: 4.7, reviewCount: 198, rank: 3, locationName: '홍대', branchName: '홍대 3호점', clearRate: 55, createdAt: '2024-03-15' },
  { id: 10, title: '귀신 들린 인형', description: '완벽한 인형들이 자학하기 시작했다.', genre: '공포', difficulty: 3, horrorLevel: 4, minPlayers: 2, maxPlayers: 4, duration: 65, price: 23000, imageUrl: 'https://picsum.photos/seed/grimgate10/400/300', rating: 4.5, reviewCount: 188, rank: 4, locationName: '강남', branchName: '강남 5호점', clearRate: 61, createdAt: '2024-03-20' },
  { id: 11, title: '저주받은 산장', description: '눈 내린 산장에 서린 저주를 풀어라.', genre: '미스터리', difficulty: 3, horrorLevel: 4, minPlayers: 2, maxPlayers: 6, duration: 80, price: 25000, imageUrl: 'https://picsum.photos/seed/grimgate11/400/300', rating: 4.6, reviewCount: 180, rank: 4, locationName: '강남', branchName: '강남 1호점', clearRate: 59, createdAt: '2024-04-10' },
  { id: 12, title: '악마의 계약', description: '계약서에 서명하면 다신 돌아올 수 없다.', genre: '공포/스릴러', difficulty: 4, horrorLevel: 5, minPlayers: 2, maxPlayers: 5, duration: 75, price: 26000, imageUrl: 'https://picsum.photos/seed/grimgate12/400/300', rating: 4.4, reviewCount: 165, locationName: '건대', branchName: '건대 1호점', clearRate: 48, createdAt: '2024-04-15' },
  { id: 13, title: '어둠 속의 목소리', description: '귀에 들려오는 목소리... 탈출할 수 있을까.', genre: '공포', difficulty: 2, horrorLevel: 3, minPlayers: 2, maxPlayers: 6, duration: 60, price: 22000, imageUrl: 'https://picsum.photos/seed/grimgate13/400/300', rating: 4.3, reviewCount: 155, locationName: '신촌', branchName: '신촌 1호점', clearRate: 74, createdAt: '2024-05-01' },
  { id: 14, title: '저승사자의 초대', description: '저승으로부터 초대장이 도착했다.', genre: '공포/판타지', difficulty: 4, horrorLevel: 4, minPlayers: 2, maxPlayers: 6, duration: 85, price: 27000, imageUrl: 'https://picsum.photos/seed/grimgate14/400/300', rating: 4.6, reviewCount: 142, isNew: true, locationName: '홍대', branchName: '홍대 4호점', clearRate: 44, createdAt: '2024-06-01' },
  { id: 15, title: '비밀 연구소', description: '정부에서 숨겨온 실험실, 진실이 폭로된다.', genre: '스릴러', difficulty: 3, horrorLevel: 2, minPlayers: 2, maxPlayers: 5, duration: 70, price: 23000, imageUrl: 'https://picsum.photos/seed/grimgate15/400/300', rating: 4.2, reviewCount: 134, locationName: '강남', branchName: '강남 2호점', clearRate: 78, createdAt: '2024-05-15' },
  { id: 16, title: '고택의 원혼', description: '100년 된 고택에 서린 원혼을 달래라.', genre: '공포', difficulty: 3, horrorLevel: 5, minPlayers: 2, maxPlayers: 6, duration: 80, price: 25000, imageUrl: 'https://picsum.photos/seed/grimgate16/400/300', rating: 4.4, reviewCount: 128, locationName: '건대', branchName: '건대 3호점', clearRate: 52, createdAt: '2024-05-20' },
  { id: 17, title: '복수의 시간', description: '살인범이 당신 앞에 있다. 증거를 찾아 탈출하라.', genre: '미스터리/스릴러', difficulty: 4, horrorLevel: 3, minPlayers: 2, maxPlayers: 4, duration: 75, price: 26000, imageUrl: 'https://picsum.photos/seed/grimgate17/400/300', rating: 4.5, reviewCount: 117, isNew: true, locationName: '신촌', branchName: '신촌 2호점', clearRate: 63, createdAt: '2024-06-10' },
  { id: 18, title: '파멸의 시계', description: '시계가 멈추면 모든 것이 끝난다.', genre: '스릴러', difficulty: 5, horrorLevel: 4, minPlayers: 2, maxPlayers: 6, duration: 90, price: 29000, imageUrl: 'https://picsum.photos/seed/grimgate18/400/300', rating: 4.7, reviewCount: 109, locationName: '홍대', branchName: '홍대 5호점', clearRate: 38, createdAt: '2024-06-15' },
  { id: 19, title: '잃어버린 기억', description: '기억을 잃은 채 깨어났다. 나는 누구인가.', genre: '미스터리', difficulty: 2, horrorLevel: 2, minPlayers: 2, maxPlayers: 6, duration: 60, price: 21000, imageUrl: 'https://picsum.photos/seed/grimgate19/400/300', rating: 4.1, reviewCount: 98, locationName: '강남', branchName: '강남 7호점', clearRate: 82, createdAt: '2024-07-01' },
  { id: 20, title: '혈족의 저주', description: '대대로 내려오는 저주, 당신이 마지막 희망이다.', genre: '공포', difficulty: 4, horrorLevel: 5, minPlayers: 2, maxPlayers: 5, duration: 85, price: 27000, imageUrl: 'https://picsum.photos/seed/grimgate20/400/300', rating: 4.6, reviewCount: 87, isNew: true, locationName: '건대', branchName: '건대 4호점', clearRate: 42, createdAt: '2024-07-10' },
  { id: 21, title: '유령 병동', description: '폐쇄된 병동에서의 하룻밤, 살아남아라.', genre: '공포/스릴러', difficulty: 3, horrorLevel: 4, minPlayers: 2, maxPlayers: 6, duration: 75, price: 25000, imageUrl: 'https://picsum.photos/seed/grimgate21/400/300', rating: 4.3, reviewCount: 76, locationName: '신촌', branchName: '신촌 3호점', clearRate: 58, createdAt: '2024-07-15' },
  { id: 22, title: '사냥꾼의 덫', description: '숲 속에서 덫에 걸렸다. 사냥꾼이 오기 전에 탈출하라.', genre: '스릴러', difficulty: 4, horrorLevel: 3, minPlayers: 2, maxPlayers: 4, duration: 70, price: 24000, imageUrl: 'https://picsum.photos/seed/grimgate22/400/300', rating: 4.2, reviewCount: 65, locationName: '홍대', branchName: '홍대 7호점', clearRate: 67, createdAt: '2024-08-01' },
  { id: 23, title: '마지막 제물', description: '의식의 마지막 제물로 선택받았다.', genre: '공포', difficulty: 5, horrorLevel: 5, minPlayers: 2, maxPlayers: 6, duration: 90, price: 30000, imageUrl: 'https://picsum.photos/seed/grimgate23/400/300', rating: 4.8, reviewCount: 54, isNew: true, locationName: '강남', branchName: '강남 9호점', clearRate: 29, createdAt: '2024-08-15' },
  { id: 24, title: '폐광의 비밀', description: '금을 찾아 들어간 폐광에서 기이한 존재와 마주쳤다.', genre: '공포/미스터리', difficulty: 3, horrorLevel: 3, minPlayers: 2, maxPlayers: 6, duration: 80, price: 24000, imageUrl: 'https://picsum.photos/seed/grimgate24/400/300', rating: 4.0, reviewCount: 43, locationName: '건대', branchName: '건대 5호점', clearRate: 71, createdAt: '2024-09-01' },
];

const LOCATIONS = ['강남', '홍대', '건대', '신촌'];
const PER_PAGE = 12;

export default function ThemesPage() {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState(0);
  const [minPlayers, setMinPlayers] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<'popular' | 'latest'>('popular');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = [...MOCK_THEMES];
    if (selectedLocations.length > 0) {
      list = list.filter(t => selectedLocations.includes(t.locationName ?? ''));
    }
    if (difficulty > 0) list = list.filter(t => t.difficulty === difficulty);
    if (minPlayers > 0) list = list.filter(t => t.maxPlayers >= minPlayers);
    if (minRating > 0) list = list.filter(t => (t.rating ?? 0) >= minRating);
    if (sort === 'popular') list.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
    else list.sort((a, b) => b.id - a.id);
    return list;
  }, [selectedLocations, difficulty, minPlayers, minRating, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleLocation = (loc: string) => {
    setSelectedLocations(prev =>
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    );
    setPage(1);
  };

  const setFilter = <T,>(setter: (v: T) => void, value: T) => {
    setter(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#888] mb-6">
          <Link href="/" className="hover:text-[#f5f5f5] transition-colors">홈</Link>
          <span>›</span>
          <span className="text-[#f5f5f5]">전체 테마</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#f5f5f5]">
            🔥 <span className="text-[#e63946]">전체</span> 테마
          </h1>
          <p className="text-[#888] text-sm mt-1">
            GrimGate의 모든 공포 방탈출 테마를 지역과 난이도로 찾아보세요.
          </p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar — hidden on mobile, visible md+ */}
          <aside className="w-52 shrink-0 hidden md:block">
            {/* Search Input */}
            <input
              type="text"
              placeholder="테마 검색"
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded px-3 py-2 placeholder-[#555] focus:border-[#e63946] outline-none mb-3 transition-colors"
            />

            {/* AI Recommend */}
            <Link
              href="/ai-recommend"
              className="block w-full text-center bg-[#e63946] hover:bg-[#c1121f] text-white text-sm font-medium py-2 rounded mb-6 transition-colors"
            >
              🤖 AI 테마 추천받기
            </Link>

            {/* 지역 */}
            <div className="mb-5">
              <h3 className="text-xs font-bold text-[#888] uppercase tracking-wider mb-2">지역</h3>
              <div className="space-y-0.5">
                {LOCATIONS.map(loc => (
                  <button
                    key={loc}
                    onClick={() => toggleLocation(loc)}
                    className={[
                      'flex items-center justify-between w-full text-sm px-2 py-1.5 rounded transition-colors',
                      selectedLocations.includes(loc)
                        ? 'text-[#e63946] bg-[#e63946]/10'
                        : 'text-[#f5f5f5] hover:bg-[#1a1a1a]',
                    ].join(' ')}
                  >
                    <span>▼ {loc}</span>
                    {selectedLocations.includes(loc) && (
                      <span className="text-xs font-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 난이도 */}
            <div className="mb-5">
              <h3 className="text-xs font-bold text-[#888] uppercase tracking-wider mb-2">난이도</h3>
              <div className="flex flex-wrap gap-1">
                {[0, 1, 2, 3, 4, 5].map(d => (
                  <button
                    key={d}
                    onClick={() => setFilter(setDifficulty, d)}
                    className={[
                      'text-xs px-2 py-1 rounded border transition-colors',
                      difficulty === d
                        ? 'border-[#e63946] text-[#e63946] bg-[#e63946]/10'
                        : 'border-[#2a2a2a] text-[#888] hover:border-[#555]',
                    ].join(' ')}
                  >
                    {d === 0 ? '전체' : '●'.repeat(d) + '○'.repeat(5 - d)}
                  </button>
                ))}
              </div>
            </div>

            {/* 인원 수 */}
            <div className="mb-5">
              <h3 className="text-xs font-bold text-[#888] uppercase tracking-wider mb-2">인원 수</h3>
              <div className="flex flex-wrap gap-1">
                {[0, 2, 3, 4].map(n => (
                  <button
                    key={n}
                    onClick={() => setFilter(setMinPlayers, n)}
                    className={[
                      'text-xs px-2 py-1 rounded border transition-colors',
                      minPlayers === n
                        ? 'border-[#e63946] text-[#e63946] bg-[#e63946]/10'
                        : 'border-[#2a2a2a] text-[#888] hover:border-[#555]',
                    ].join(' ')}
                  >
                    {n === 0 ? '전체' : `${n}인+`}
                  </button>
                ))}
              </div>
            </div>

            {/* 평점 범위 */}
            <div className="mb-5">
              <h3 className="text-xs font-bold text-[#888] uppercase tracking-wider mb-2">평점 범위</h3>
              <div className="flex flex-wrap gap-1">
                {[0, 4.0, 4.5, 4.8].map(r => (
                  <button
                    key={r}
                    onClick={() => setFilter(setMinRating, r)}
                    className={[
                      'text-xs px-2 py-1 rounded border transition-colors',
                      minRating === r
                        ? 'border-[#e63946] text-[#e63946] bg-[#e63946]/10'
                        : 'border-[#2a2a2a] text-[#888] hover:border-[#555]',
                    ].join(' ')}
                  >
                    {r === 0 ? '전체' : `${r}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* 정렬 */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-[#888] uppercase tracking-wider mb-2">정렬</h3>
              <select
                value={sort}
                onChange={e => setFilter(setSort, e.target.value as 'popular' | 'latest')}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded px-2 py-1.5 focus:border-[#e63946] outline-none transition-colors"
              >
                <option value="popular">인기순</option>
                <option value="latest">최신순</option>
              </select>
            </div>

            <button
              onClick={() => setPage(1)}
              className="w-full bg-[#e63946] hover:bg-[#c1121f] text-white text-sm font-medium py-2 rounded transition-colors"
            >
              조회하기
            </button>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter row */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 md:hidden">
              {LOCATIONS.map(loc => (
                <button
                  key={loc}
                  onClick={() => toggleLocation(loc)}
                  className={[
                    'shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors',
                    selectedLocations.includes(loc)
                      ? 'border-[#e63946] text-[#e63946] bg-[#e63946]/10'
                      : 'border-[#2a2a2a] text-[#888]',
                  ].join(' ')}
                >
                  {loc}
                </button>
              ))}
            </div>

            {/* Count + Sort toggles */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[#888]">
                <span className="text-[#f5f5f5] font-bold">{filtered.length}</span>개의 테마
              </span>
              <div className="flex gap-1.5">
                {(['popular', 'latest'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setFilter(setSort, s)}
                    className={[
                      'text-xs px-3 py-1 rounded border transition-colors',
                      sort === s
                        ? 'border-[#e63946] text-[#e63946]'
                        : 'border-[#2a2a2a] text-[#888] hover:border-[#555]',
                    ].join(' ')}
                  >
                    {s === 'popular' ? '인기순' : '최신순'}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            {paged.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {paged.map(theme => (
                  <ThemeCard key={theme.id} theme={theme} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center text-[#888]">
                <p className="text-4xl mb-4">🔍</p>
                <p>조건에 맞는 테마가 없습니다.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 mt-8">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-8 h-8 flex items-center justify-center rounded border border-[#2a2a2a] text-[#888] disabled:opacity-30 hover:border-[#e63946] hover:text-[#e63946] transition-colors"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={[
                      'w-8 h-8 flex items-center justify-center rounded border text-sm transition-colors',
                      page === i + 1
                        ? 'border-[#e63946] text-[#e63946] bg-[#e63946]/10'
                        : 'border-[#2a2a2a] text-[#888] hover:border-[#555]',
                    ].join(' ')}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded border border-[#2a2a2a] text-[#888] disabled:opacity-30 hover:border-[#e63946] hover:text-[#e63946] transition-colors"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
