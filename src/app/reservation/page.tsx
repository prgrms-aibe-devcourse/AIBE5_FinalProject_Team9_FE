'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useReservationStore } from '@/stores/reservationStore';
import { Theme } from '@/types/theme';

// ── Mock Data ──────────────────────────────────────────────────────
const MOCK_THEMES: Theme[] = [
  { id: 1, title: '폐병원의 저주', description: '폐허가 된 병원에서 시작되는 극한의 공포. 복도 끝에서 들려오는 발소리가 점점 가까워진다.', genre: '공포/미스터리', difficulty: 4, horrorLevel: 5, minPlayers: 2, maxPlayers: 4, duration: 80, price: 28000, imageUrl: 'https://picsum.photos/seed/grimgate1/400/300', rating: 4.9, reviewCount: 342, isBest: true, locationName: '홍대', branchName: '홍대 1호점', clearRate: 41 },
  { id: 2, title: '13번째 방', description: '전설의 13번째 방. 들어간 자는 돌아오지 않는다. 살아서 나올 수 있다면, 진실을 알게 될 것이다.', genre: '공포/스릴러', difficulty: 5, horrorLevel: 3, minPlayers: 3, maxPlayers: 6, duration: 90, price: 30000, imageUrl: 'https://picsum.photos/seed/grimgate2/400/300', rating: 4.9, reviewCount: 312, isBest: true, locationName: '홍대', branchName: '홍대 6호점', clearRate: 38 },
  { id: 3, title: '블러드문', description: '붉은 달이 뜨는 밤, 저주가 시작된다. 치밀하게 설계된 공포 서사 속으로 당신을 끌어들입니다.', genre: '공포/오컬트', difficulty: 5, horrorLevel: 5, minPlayers: 3, maxPlayers: 6, duration: 90, price: 32000, imageUrl: 'https://picsum.photos/seed/grimgate3/400/300', rating: 4.8, reviewCount: 289, isHot: true, locationName: '강남', branchName: '강남 8호점', clearRate: 57 },
  { id: 4, title: '좀비 아포칼립스', description: '바이러스가 창궐한 도시에서 살아남아라. 해독제를 찾아 이 도시를 빠져나가라.', genre: '액션/공포', difficulty: 3, horrorLevel: 4, minPlayers: 2, maxPlayers: 6, duration: 75, price: 26000, imageUrl: 'https://picsum.photos/seed/grimgate4/400/300', rating: 4.8, reviewCount: 275, isHot: true, locationName: '강남', branchName: '강남 3호점', clearRate: 62 },
  { id: 5, title: '미완의 초상', description: '전체 화가의 눈이 당신을 따라온다. 그림 속 저주를 풀고 살아서 나가라.', genre: '심리/공포', difficulty: 4, horrorLevel: 4, minPlayers: 1, maxPlayers: 6, duration: 70, price: 25000, imageUrl: 'https://picsum.photos/seed/grimgate5/400/300', rating: 4.5, reviewCount: 287, locationName: '건대', branchName: '건대 2호점', clearRate: 44 },
  { id: 6, title: '체이금', description: '사라진 탐정을 추적하다 발견한 잔혹 스릴러. 벽에 남겨진 단서들이 진실을 향한다.', genre: '스릴러', difficulty: 5, horrorLevel: 5, minPlayers: 2, maxPlayers: 4, duration: 75, price: 27000, imageUrl: 'https://picsum.photos/seed/grimgate6/400/300', rating: 4.8, reviewCount: 234, isHot: true, locationName: '건대', branchName: '건대 6호점', clearRate: 41 },
  { id: 7, title: '감옥 탈출', description: '탈출 가능하다 했지만, 살아 나가기는 다른 이야기. 시간이 초조함 속에 탈출의 기회는 사라진다.', genre: '스릴러', difficulty: 4, horrorLevel: 4, minPlayers: 2, maxPlayers: 7, duration: 60, price: 22000, imageUrl: 'https://picsum.photos/seed/grimgate7/400/300', rating: 4.5, reviewCount: 221, isHot: true, locationName: '건대', branchName: '건대 2호점', clearRate: 68 },
  { id: 8, title: '사일런스', description: '소리를 내면 안 된다. 침묵 속에서 탈출구를 찾아라. 단 하나의 소리가 모든 것을 끝낸다.', genre: '공포/스릴러', difficulty: 3, horrorLevel: 4, minPlayers: 2, maxPlayers: 6, duration: 70, price: 24000, imageUrl: 'https://picsum.photos/seed/grimgate8/400/300', rating: 4.5, reviewCount: 203, locationName: '신촌', branchName: '신촌 4호점', clearRate: 72 },
  { id: 9, title: '인형의 밤', description: '자꾸만 인형들이 움직이기 시작했다. 공포 속에서도 단서를 찾아야 살 수 있다.', genre: '공포', difficulty: 4, horrorLevel: 4, minPlayers: 2, maxPlayers: 6, duration: 75, price: 25000, imageUrl: 'https://picsum.photos/seed/grimgate9/400/300', rating: 4.7, reviewCount: 198, locationName: '홍대', branchName: '홍대 3호점', clearRate: 55 },
  { id: 10, title: '귀신 들린 인형', description: '완벽한 인형들이 자학하기 시작했다. 살아서 나올 수 있다면 지금 움직여라.', genre: '공포', difficulty: 3, horrorLevel: 4, minPlayers: 2, maxPlayers: 4, duration: 65, price: 23000, imageUrl: 'https://picsum.photos/seed/grimgate10/400/300', rating: 4.5, reviewCount: 188, locationName: '강남', branchName: '강남 5호점', clearRate: 61 },
  { id: 11, title: '저주받은 산장', description: '눈 내린 산장에 서린 저주를 풀어라. 창문 너머의 그것이 당신을 보고 있다.', genre: '미스터리', difficulty: 3, horrorLevel: 4, minPlayers: 2, maxPlayers: 6, duration: 80, price: 25000, imageUrl: 'https://picsum.photos/seed/grimgate11/400/300', rating: 4.6, reviewCount: 180, locationName: '강남', branchName: '강남 1호점', clearRate: 59 },
  { id: 12, title: '악마의 계약', description: '계약서에 서명하면 다신 돌아올 수 없다. 당신은 지금 어떤 선택을 하겠는가.', genre: '공포/스릴러', difficulty: 4, horrorLevel: 5, minPlayers: 2, maxPlayers: 5, duration: 75, price: 26000, imageUrl: 'https://picsum.photos/seed/grimgate12/400/300', rating: 4.4, reviewCount: 165, locationName: '건대', branchName: '건대 1호점', clearRate: 48 },
];

const LOCATIONS = ['강남', '홍대', '건대', '신촌'];
const BASE_TIMES = ['11:00', '13:00', '15:00', '17:00', '19:00', '21:00'];
const PER_PAGE = 5;
const TEEN_PRICE = 20000;

// ── Helpers ───────────────────────────────────────────────────────
function getUpcomingDates(count = 3) {
  const today = new Date();
  const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i + 1);
    const m = d.getMonth() + 1;
    const dt = d.getDate();
    return {
      dateStr: `${d.getFullYear()}-${String(m).padStart(2, '0')}-${String(dt).padStart(2, '0')}`,
      label: `${m}.${dt}(${DAYS[d.getDay()]})`,
    };
  });
}

function getSlots(themeId: number, dateIdx: number) {
  const s1 = (themeId + dateIdx * 2) % 6;
  const s2 = (themeId * 3 + dateIdx + 4) % 6;
  const soldOut = new Set([s1, s2]);
  return BASE_TIMES.map((time, i) => ({ time, soldOut: soldOut.has(i) }));
}

function formatDateLabel(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
  return `${dateStr} (${DAYS[d.getDay()]})`;
}

function formatPrice(n: number) {
  return n.toLocaleString('ko-KR') + '원';
}

// ── Sub-components ────────────────────────────────────────────────
function StepBar({ step }: { step: 1 | 2 }) {
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
                step > s.n
                  ? 'bg-[#2ecc71] border-[#2ecc71] text-white'
                  : step === s.n
                    ? 'bg-[#e63946] border-[#e63946] text-white'
                    : 'bg-transparent border-[#444] text-[#444]',
              ].join(' ')}>
                {step > s.n ? '✓' : s.n}
              </div>
              <span className={[
                'text-xs hidden sm:inline',
                step === s.n ? 'text-[#f5f5f5] font-medium' : 'text-[#444]',
              ].join(' ')}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={['mx-3 h-px w-12 sm:w-20', step > s.n ? 'bg-[#2ecc71]' : 'bg-[#2a2a2a]'].join(' ')} />
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

// ── ThemeListRow ──────────────────────────────────────────────────
function ThemeListRow({
  theme,
  dates,
  onQuickBook,
}: {
  theme: Theme;
  dates: { dateStr: string; label: string }[];
  onQuickBook: (theme: Theme, date: string, time: string) => void;
}) {
  const [activeDateIdx, setActiveDateIdx] = useState(0);
  const [selectedTime, setSelectedTime] = useState('');

  const slots = getSlots(theme.id, activeDateIdx);

  const handleBook = () => {
    if (!selectedTime) return;
    onQuickBook(theme, dates[activeDateIdx].dateStr, selectedTime);
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden hover:border-[#333] transition-colors">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative w-full md:w-36 h-36 md:h-auto shrink-0 bg-[#111]">
          {theme.isHot && (
            <span className="absolute top-2 left-2 z-10 bg-[#e63946] text-white text-xs font-bold px-2 py-0.5 rounded">HOT</span>
          )}
          {theme.isBest && (
            <span className="absolute top-2 left-2 z-10 bg-[#f39c12] text-white text-xs font-bold px-2 py-0.5 rounded">BEST</span>
          )}
          <Image
            src={theme.imageUrl || 'https://picsum.photos/seed/default/400/300'}
            alt={theme.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 144px"
          />
        </div>

        {/* Info + Date/Time */}
        <div className="flex flex-col md:flex-row flex-1">
          {/* Info */}
          <div className="flex-1 p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs bg-[#222] border border-[#2a2a2a] rounded px-1.5 py-0.5 text-[#888]">
                {theme.locationName}
              </span>
              <span className="text-xs text-[#888]">{theme.branchName}</span>
            </div>
            <h3 className="text-base font-bold text-[#f5f5f5] mb-2">{theme.title}</h3>
            <div className="flex items-center gap-3 text-xs text-[#888] mb-2 flex-wrap">
              <span className="flex items-center gap-1">
                <span className="text-[#f39c12]">★</span>
                <span className="text-[#f5f5f5]">{theme.rating?.toFixed(1)}</span>
                <span>({theme.reviewCount})</span>
              </span>
              <span className="flex items-center gap-1">난이도 <DotRating level={theme.difficulty} /></span>
              <span className="flex items-center gap-1">공포도 <DotRating level={theme.horrorLevel} /></span>
              <span>● {theme.duration}분</span>
            </div>
            <p className="text-xs text-[#888] leading-relaxed line-clamp-2">{theme.description}</p>
          </div>

          {/* Date + Time selector */}
          <div className="w-full md:w-64 shrink-0 p-4 border-t md:border-t-0 md:border-l border-[#2a2a2a]">
            {/* Date tabs */}
            <div className="flex gap-1 mb-3">
              {dates.map((d, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveDateIdx(i); setSelectedTime(''); }}
                  className={[
                    'flex-1 py-1 text-xs rounded border transition-colors',
                    activeDateIdx === i
                      ? 'border-[#e63946] text-[#e63946] bg-[#e63946]/10'
                      : 'border-[#2a2a2a] text-[#888] hover:border-[#444]',
                  ].join(' ')}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Time slots */}
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              {slots.map(slot => (
                <button
                  key={slot.time}
                  disabled={slot.soldOut}
                  onClick={() => !slot.soldOut && setSelectedTime(slot.time)}
                  className={[
                    'py-1.5 text-xs rounded border transition-colors',
                    slot.soldOut
                      ? 'border-[#1a1a1a] text-[#333] line-through cursor-not-allowed'
                      : selectedTime === slot.time
                        ? 'border-[#e63946] bg-[#e63946] text-white'
                        : 'border-[#2a2a2a] text-[#f5f5f5] hover:border-[#e63946]',
                  ].join(' ')}
                >
                  {slot.time}
                </button>
              ))}
            </div>

            <button
              onClick={handleBook}
              className={[
                'w-full py-2 rounded text-sm font-medium transition-colors',
                selectedTime
                  ? 'bg-[#e63946] hover:bg-[#c1121f] text-white'
                  : 'bg-[#e63946]/60 text-white/60 cursor-not-allowed',
              ].join(' ')}
            >
              빠른 예약하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── BrowseStep ────────────────────────────────────────────────────
function BrowseStep({ onBook }: { onBook: (theme: Theme, date: string, time: string) => void }) {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState(0);
  const [minPlayers, setMinPlayers] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<'popular' | 'latest'>('popular');
  const [page, setPage] = useState(1);

  const dates = useMemo(() => getUpcomingDates(), []);

  const locationCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    MOCK_THEMES.forEach(t => {
      if (t.locationName) counts[t.locationName] = (counts[t.locationName] || 0) + 1;
    });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    let list = [...MOCK_THEMES];
    if (selectedLocations.length > 0) list = list.filter(t => selectedLocations.includes(t.locationName ?? ''));
    if (difficulty > 0) list = list.filter(t => t.difficulty === difficulty);
    if (minPlayers > 0) list = list.filter(t => (t.maxPlayers ?? 0) >= minPlayers);
    if (minRating > 0) list = list.filter(t => (t.rating ?? 0) >= minRating);
    if (sort === 'popular') list.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
    else list.sort((a, b) => b.id - a.id);
    return list;
  }, [selectedLocations, difficulty, minPlayers, minRating, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleLocation = (loc: string) => {
    setSelectedLocations(prev => prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]);
    setPage(1);
  };

  const setF = <T,>(setter: (v: T) => void, v: T) => { setter(v); setPage(1); };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-1.5 text-xs text-[#888] mb-6">
        <Link href="/" className="hover:text-[#f5f5f5]">홈</Link>
        <span>›</span>
        <span className="text-[#f5f5f5]">전체 테마</span>
      </nav>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#f5f5f5]">🔥 <span className="text-[#e63946]">빠른</span> 예약</h1>
        <p className="text-[#888] text-sm mt-1">GrimGate의 모든 공포 방탈출 테마를 지역과 난이도로 찾아보세요.</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-52 shrink-0 hidden md:block">
          <input
            type="text"
            placeholder="테마명 검색..."
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded px-3 py-2 placeholder-[#555] focus:border-[#e63946] outline-none mb-4 transition-colors"
          />

          {/* 지역 */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-[#888] uppercase tracking-wider">지역</h3>
              <span className="text-xs text-[#555]">전체 초기화</span>
            </div>
            <button
              onClick={() => { setSelectedLocations([]); setPage(1); }}
              className={[
                'flex items-center justify-between w-full text-sm px-2 py-1.5 rounded mb-0.5 transition-colors',
                selectedLocations.length === 0 ? 'text-[#e63946] bg-[#e63946]/10' : 'text-[#f5f5f5] hover:bg-[#1a1a1a]',
              ].join(' ')}
            >
              <span>전체</span>
              <span className="text-xs text-[#555]">{MOCK_THEMES.length}</span>
            </button>
            {LOCATIONS.map(loc => (
              <button
                key={loc}
                onClick={() => toggleLocation(loc)}
                className={[
                  'flex items-center justify-between w-full text-sm px-2 py-1.5 rounded mb-0.5 transition-colors',
                  selectedLocations.includes(loc) ? 'text-[#e63946] bg-[#e63946]/10' : 'text-[#f5f5f5] hover:bg-[#1a1a1a]',
                ].join(' ')}
              >
                <span>▲ {loc}</span>
                <span className="text-xs text-[#555]">{locationCounts[loc] ?? 0}</span>
              </button>
            ))}
          </div>

          {/* 난이도 */}
          <div className="mb-5">
            <h3 className="text-xs font-bold text-[#888] uppercase tracking-wider mb-2">난이도</h3>
            <div className="flex flex-wrap gap-1">
              {[0, 1, 2, 3, 4, 5].map(d => (
                <button key={d} onClick={() => setF(setDifficulty, d)}
                  className={['text-xs px-2 py-1 rounded border transition-colors', difficulty === d ? 'border-[#e63946] text-[#e63946] bg-[#e63946]/10' : 'border-[#2a2a2a] text-[#888] hover:border-[#555]'].join(' ')}>
                  {d === 0 ? '전체' : '●'.repeat(d) + '○'.repeat(5 - d)}
                </button>
              ))}
            </div>
          </div>

          {/* 최소 인원 */}
          <div className="mb-5">
            <h3 className="text-xs font-bold text-[#888] uppercase tracking-wider mb-2">최소 인원</h3>
            <div className="flex flex-wrap gap-1">
              {[0, 2, 3, 4].map(n => (
                <button key={n} onClick={() => setF(setMinPlayers, n)}
                  className={['text-xs px-2 py-1 rounded border transition-colors', minPlayers === n ? 'border-[#e63946] text-[#e63946] bg-[#e63946]/10' : 'border-[#2a2a2a] text-[#888] hover:border-[#555]'].join(' ')}>
                  {n === 0 ? '전체' : `${n}인+`}
                </button>
              ))}
            </div>
          </div>

          {/* 최저 평점 */}
          <div className="mb-5">
            <h3 className="text-xs font-bold text-[#888] uppercase tracking-wider mb-2">최저 평점</h3>
            <div className="flex flex-wrap gap-1">
              {[0, 4.0, 4.5, 4.8].map(r => (
                <button key={r} onClick={() => setF(setMinRating, r)}
                  className={['text-xs px-2 py-1 rounded border transition-colors', minRating === r ? 'border-[#e63946] text-[#e63946] bg-[#e63946]/10' : 'border-[#2a2a2a] text-[#888] hover:border-[#555]'].join(' ')}>
                  {r === 0 ? '전체' : `★${r}+`}
                </button>
              ))}
            </div>
          </div>

          {/* 정렬 */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-[#888] uppercase tracking-wider mb-2">정렬</h3>
            <select value={sort} onChange={e => setF(setSort, e.target.value as 'popular' | 'latest')}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded px-2 py-1.5 focus:border-[#e63946] outline-none">
              <option value="popular">인기순</option>
              <option value="latest">최신순</option>
            </select>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-[#888]">
              <span className="text-[#f5f5f5] font-bold">{filtered.length}</span>개의 테마
            </span>
          </div>

          <div className="space-y-4">
            {paged.map(theme => (
              <ThemeListRow key={theme.id} theme={theme} dates={dates} onQuickBook={onBook} />
            ))}
            {paged.length === 0 && (
              <div className="py-20 text-center text-[#888]">
                <p className="text-3xl mb-3">🔍</p>
                <p>조건에 맞는 테마가 없습니다.</p>
              </div>
            )}
          </div>

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
  );
}

// ── PaymentStep ───────────────────────────────────────────────────
function PaymentStep({
  theme, date, time, onBack,
}: {
  theme: Theme; date: string; time: string; onBack: () => void;
}) {
  const router = useRouter();
  const { setTheme, setLocation, setDateTime, setHeadcount } = useReservationStore();

  const [adultCount, setAdultCount] = useState(2);
  const [teenCount, setTeenCount] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeCancellation, setAgreeCancellation] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const requiredAgreed = agreeTerms && agreePrivacy && agreeCancellation;
  const agreeAll = requiredAgreed && agreeMarketing;
  const totalPlayers = adultCount + teenCount;
  const totalAmount = adultCount * (theme.price ?? 25000) + teenCount * TEEN_PRICE;

  const handleAgreeAll = (v: boolean) => {
    setAgreeTerms(v); setAgreePrivacy(v); setAgreeCancellation(v); setAgreeMarketing(v);
  };

  const handlePay = () => {
    if (!requiredAgreed) return;
    setTheme(theme.id, theme.title, theme.imageUrl);
    setLocation(theme.locationName ?? '', theme.branchName ?? '');
    setDateTime(date, time);
    setHeadcount(adultCount, teenCount);
    router.push('/reservation/complete');
  };

  const dateLabel = formatDateLabel(date);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* 예약 정보 확인 */}
        <section className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-5">
          <h2 className="text-sm font-bold text-[#f5f5f5] flex items-center gap-2 mb-4">
            <span className="w-1 h-4 bg-[#e63946] rounded-full" />
            예약 정보 확인
          </h2>
          <div className="flex gap-4">
            <div className="relative w-24 h-20 shrink-0 rounded overflow-hidden bg-[#111]">
              <Image src={theme.imageUrl || 'https://picsum.photos/seed/default/400/300'} alt={theme.title} fill className="object-cover" sizes="96px" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-[#222] border border-[#2a2a2a] rounded px-1.5 py-0.5 text-[#888]">{theme.locationName}</span>
              </div>
              <h3 className="text-base font-bold text-[#f5f5f5] mb-2">{theme.title}</h3>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-[#0d0d0d] border border-[#2a2a2a] rounded px-2 py-0.5 text-[#f5f5f5]">📅 {dateLabel}</span>
                <span className="text-xs bg-[#0d0d0d] border border-[#e63946]/40 rounded px-2 py-0.5 text-[#e63946]">● {time}</span>
                <span className="text-xs bg-[#0d0d0d] border border-[#2a2a2a] rounded px-2 py-0.5 text-[#888]">{theme.branchName}</span>
                <span className="text-xs bg-[#0d0d0d] border border-[#2a2a2a] rounded px-2 py-0.5 text-[#888]">● {theme.duration}분</span>
              </div>
              <button onClick={onBack} className="mt-2 text-xs text-[#888] hover:text-[#e63946] transition-colors">
                ← 시간 변경
              </button>
            </div>
          </div>
        </section>

        {/* 인원 선택 */}
        <section className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-5">
          <h2 className="text-sm font-bold text-[#f5f5f5] flex items-center gap-2 mb-4">
            <span className="w-1 h-4 bg-[#e63946] rounded-full" />
            인원 선택
          </h2>
          {[
            { label: '성인', sub: `1인 ${formatPrice(theme.price ?? 25000)}`, count: adultCount, set: setAdultCount, min: 0 },
            { label: '청소년', sub: `1인 ${formatPrice(TEEN_PRICE)} · 만 14~18세`, count: teenCount, set: setTeenCount, min: 0 },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between py-3 border-b border-[#2a2a2a] last:border-b-0">
              <div>
                <p className="text-sm text-[#f5f5f5]">{row.label}</p>
                <p className="text-xs text-[#888]">{row.sub}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => row.set(Math.max(row.min, row.count - 1))}
                  className="w-7 h-7 rounded border border-[#2a2a2a] text-[#f5f5f5] hover:border-[#e63946] transition-colors flex items-center justify-center text-lg leading-none"
                >−</button>
                <span className="w-5 text-center text-sm text-[#f5f5f5] font-medium">{row.count}</span>
                <button
                  onClick={() => row.set(row.count + 1)}
                  disabled={totalPlayers >= (theme.maxPlayers ?? 6)}
                  className="w-7 h-7 rounded border border-[#2a2a2a] text-[#f5f5f5] hover:border-[#e63946] transition-colors flex items-center justify-center text-lg leading-none disabled:opacity-30"
                >+</button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between mt-3 text-xs text-[#888]">
            <span>최소 {theme.minPlayers}인 · 최대 {theme.maxPlayers}인</span>
            <span>총 <span className="text-[#f5f5f5] font-bold">{totalPlayers}</span>명</span>
          </div>
        </section>

        {/* 이용약관 동의 */}
        <section className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-5">
          <h2 className="text-sm font-bold text-[#f5f5f5] flex items-center gap-2 mb-4">
            <span className="w-1 h-4 bg-[#e63946] rounded-full" />
            이용약관 동의
          </h2>
          <label className="flex items-center gap-2 py-2 border-b border-[#2a2a2a] mb-2 cursor-pointer">
            <input type="checkbox" checked={agreeAll} onChange={e => handleAgreeAll(e.target.checked)} className="accent-[#e63946]" />
            <span className="text-sm text-[#f5f5f5] font-medium">전체 동의</span>
          </label>
          {[
            { label: '[필수] 이용약관에 동의합니다.', checked: agreeTerms, set: setAgreeTerms },
            { label: '[필수] 개인정보 수집 및 이용에 동의합니다.', checked: agreePrivacy, set: setAgreePrivacy },
            { label: '[필수] 취소·환불 규정을 확인하고 동의합니다.', checked: agreeCancellation, set: setAgreeCancellation },
            { label: '[선택] 마케팅 정보 수신에 동의합니다.', checked: agreeMarketing, set: setAgreeMarketing },
          ].map(item => (
            <label key={item.label} className="flex items-center gap-2 py-1.5 cursor-pointer">
              <input type="checkbox" checked={item.checked} onChange={e => item.set(e.target.checked)} className="accent-[#e63946]" />
              <span className="text-xs text-[#888]">{item.label}</span>
            </label>
          ))}
        </section>

        {/* 취소·환불 규정 */}
        <section className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-5">
          <h2 className="text-sm font-bold text-[#f5f5f5] flex items-center gap-2 mb-4">
            <span className="w-1 h-4 bg-[#e63946] rounded-full" />
            취소·환불 규정
          </h2>
          <table className="w-full text-sm mb-3">
            <thead>
              <tr className="border-b border-[#2a2a2a]">
                <th className="text-left py-2 text-xs text-[#888] font-medium">취소 시점</th>
                <th className="text-right py-2 text-xs text-[#888] font-medium">환불 금액</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#1a1a1a]">
                <td className="py-2.5 text-xs text-[#f5f5f5]">예약일 7일 전까지</td>
                <td className="py-2.5 text-xs text-[#2ecc71] text-right font-medium">100% 환불</td>
              </tr>
              <tr className="border-b border-[#1a1a1a]">
                <td className="py-2.5 text-xs text-[#f5f5f5]">예약일 3일 전까지</td>
                <td className="py-2.5 text-xs text-[#f39c12] text-right font-medium">50% 환불</td>
              </tr>
              <tr>
                <td className="py-2.5 text-xs text-[#f5f5f5]">예약일 당일 / 노쇼</td>
                <td className="py-2.5 text-xs text-[#e63946] text-right font-medium">환불 불가</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-[#555]">
            환불된 캐시는 마이페이지 → 캐시 내역에서 확인할 수 있습니다. 동전 캐시의 직접 카드사 환불은 고객 센터를 통해 요청 가능합니다.
          </p>
        </section>

        {/* 결제 금액 요약 */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 flex items-center justify-between">
          <span className="text-sm text-[#888]">최종 결제 금액</span>
          <span className="text-xl font-black text-[#e63946]">{formatPrice(totalAmount)}</span>
        </div>

        {/* 결제하기 */}
        <button
          onClick={handlePay}
          disabled={!requiredAgreed || totalPlayers === 0}
          className={[
            'w-full py-4 rounded-lg text-base font-bold transition-colors',
            requiredAgreed && totalPlayers > 0
              ? 'bg-[#e63946] hover:bg-[#c1121f] text-white'
              : 'bg-[#2a2a2a] text-[#555] cursor-not-allowed',
          ].join(' ')}
        >
          결제하기
        </button>
      </div>
    </div>
  );
}

// ── Main (with Suspense for useSearchParams) ──────────────────────
function ReservationContent() {
  const searchParams = useSearchParams();
  const urlThemeId = searchParams.get('themeId');
  const urlDate = searchParams.get('date');
  const urlTime = searchParams.get('time');

  const initialTheme = urlThemeId ? MOCK_THEMES.find(t => t.id === parseInt(urlThemeId)) : null;
  const hasUrlParams = !!(initialTheme && urlDate && urlTime);

  const [step, setStep] = useState<'select' | 'payment'>(hasUrlParams ? 'payment' : 'select');
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(initialTheme ?? null);
  const [selectedDate, setSelectedDate] = useState(urlDate ?? '');
  const [selectedTime, setSelectedTime] = useState(urlTime ?? '');

  const handleBook = (theme: Theme, date: string, time: string) => {
    setSelectedTheme(theme);
    setSelectedDate(date);
    setSelectedTime(time);
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <StepBar step={step === 'select' ? 1 : 2} />
      {step === 'select' && <BrowseStep onBook={handleBook} />}
      {step === 'payment' && selectedTheme && selectedDate && selectedTime && (
        <PaymentStep
          theme={selectedTheme}
          date={selectedDate}
          time={selectedTime}
          onBack={() => setStep('select')}
        />
      )}
    </div>
  );
}

export default function ReservationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d0d0d]" />}>
      <ReservationContent />
    </Suspense>
  );
}
