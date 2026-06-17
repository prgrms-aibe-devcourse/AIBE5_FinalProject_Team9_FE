'use client';

import { useState, useMemo } from 'react';
import RatingStars from '@/components/common/RatingStars';

const MOCK_REVIEWS = [
  { id: 1, no: 'RV20240520-001', theme: '새벽의 저택', user: '김민수', rating: 5, hasSpoiler: false, content: '정말 즐겁고 재있었어요! 직원분도 친절하시고 공포 연출도 완벽했습니다. 다음에 또 올게요!', date: '2024.05.20', hideRequest: null },
  { id: 2, no: 'RV20240520-002', theme: '망자의 서재', user: '이서연', rating: 5, hasSpoiler: false, content: '스토리가 탄탄하고 방도 너무 좋았습니다!!', date: '2024.05.20', hideRequest: null },
  { id: 3, no: 'RV20240520-003', theme: '감금된 연구소', user: '박지훈', rating: 4, hasSpoiler: true, content: '조금 무섭긴 한데 별로 재밌지 않아요 ㅎㅎ', date: '2024.05.19', hideRequest: null },
  { id: 4, no: 'RV20240520-004', theme: '새벽의 저택', user: '최유나', rating: 5, hasSpoiler: false, content: '분위기가 정말 최고입니다. 또 올게요!', date: '2024.05.19', hideRequest: null },
  { id: 5, no: 'RV20240520-005', theme: '망자의 서재', user: '정현우', rating: 3, hasSpoiler: true, content: '추리 요소가 조금 아쉬웠지만 재밌었어요.', date: '2024.05.18', hideRequest: null },
  { id: 6, no: 'RV20240520-006', theme: '감금된 연구소', user: '한지민', rating: 4, hasSpoiler: false, content: '장치가 신기하고 테마가 독특했어요!', date: '2024.05.18', hideRequest: null },
  { id: 7, no: 'RV20240520-007', theme: '새벽의 저택', user: '오세훈', rating: 5, hasSpoiler: false, content: '인테리어가 영화 같아요 ㅠㅠ 감동!', date: '2024.05.17', hideRequest: null },
  { id: 8, no: 'RV20240520-008', theme: '감금된 연구소', user: '임수빈', rating: 4, hasSpoiler: true, content: '난이도 적당하고 힌트도 적절했어요.', date: '2024.05.17', hideRequest: null },
  { id: 9, no: 'RV20240523-001', theme: '새벽의 저택', user: '강현우', rating: 5, hasSpoiler: false, content: '정말 즐겁고 재있었어요! 직원분도 친절하시고 공포 연출도 완벽했습니다.', date: '2024.05.23', hideRequest: '경쟁 업체의 악의적 비교 표현이 포함되어 있습니다.' },
  { id: 10, no: 'RV20240523-002', theme: '피의 연회', user: '윤지민', rating: 4, hasSpoiler: false, content: '스토리가 탄탄하고 공포도 넘 좋았습니다!!', date: '2024.05.23', hideRequest: null },
  { id: 11, no: 'RV20240523-003', theme: '감금된 연구소', user: '장서준', rating: 3, hasSpoiler: true, content: '조금 무섭긴 한데 별로 재밌지 않아요 ㅠㅠ', date: '2024.05.19', hideRequest: null },
  { id: 12, no: 'RV20240523-004', theme: '새벽의 저택', user: '배민지', rating: 4, hasSpoiler: false, content: '공포가 기대했는데 별로예요. 돈이 아깝다는 생각이...', date: '2024.05.19', hideRequest: '허위 사실 포함 (실제와 다른 내용)' },
  { id: 13, no: 'RV20240523-005', theme: '망자의 서재', user: '신원호', rating: 3, hasSpoiler: true, content: '주인 스포가 너무 많고 진행자가 마음대로 진행됨...', date: '2024.05.18', hideRequest: null },
  { id: 14, no: 'RV20240523-006', theme: '감금된 연구소', user: '류하은', rating: 4, hasSpoiler: false, content: '장치가 오작동하고 매우 불쾌한 경험을 했어요...', date: '2024.05.18', hideRequest: '허위 사실 주장 (실제로 오작동 없었음)' },
];

const THEMES_OPTS = ['전체', '새벽의 저택', '피의 연회', '망자의 서재', '감금된 연구소'];
const RATING_OPTS = ['전체', '5점', '4점', '3점', '2점', '1점'];
const PAGE_SIZES = [8, 10, 16];

type Review = typeof MOCK_REVIEWS[number];

export default function OwnerReviewsPage() {
  const [themeFilter, setThemeFilter] = useState('전체');
  const [ratingFilter, setRatingFilter] = useState('전체');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [viewTarget, setViewTarget] = useState<Review | null>(null);

  const ratingVal = ratingFilter === '전체' ? 0 : parseInt(ratingFilter);

  const filtered = useMemo(() => MOCK_REVIEWS.filter(r => {
    if (themeFilter !== '전체' && r.theme !== themeFilter) return false;
    if (ratingVal > 0 && r.rating !== ratingVal) return false;
    if (search && !r.user.includes(search) && !r.content.includes(search) && !r.theme.includes(search)) return false;
    return true;
  }), [themeFilter, ratingVal, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSearch = () => { setSearch(searchInput); setPage(1); };
  const handleReset = () => { setThemeFilter('전체'); setRatingFilter('전체'); setDateFrom(''); setDateTo(''); setSearch(''); setSearchInput(''); setPage(1); };

  const hiddenCount = MOCK_REVIEWS.filter(r => r.hideRequest).length;

  return (
    <div className="p-6 space-y-5">
      {/* Stat cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {[
          {
            label: '전체 후기', value: `${MOCK_REVIEWS.length}건`, sub: '등록된 전체 후기',
            color: '#3498db', bg: 'bg-[#3498db]/15',
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            ),
          },
          {
            label: '공개 중 후기', value: `${MOCK_REVIEWS.length - hiddenCount}건`, sub: '현재 공개 중인 후기',
            color: '#2ecc71', bg: 'bg-[#2ecc71]/15',
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ),
          },
          {
            label: '숨김 처리된 후기', value: `${hiddenCount}건`, sub: '스포일러 또는 부적절한 후기',
            color: '#e63946', bg: 'bg-[#e63946]/15',
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ),
          },
        ].map(c => (
          <div key={c.label} className="bg-[#1a1a1a] border border-[#222] rounded-xl p-5 flex items-center gap-5">
            <div className={['w-14 h-14 rounded-xl flex items-center justify-center shrink-0', c.bg].join(' ')} style={{ color: c.color }}>
              {c.icon}
            </div>
            <div>
              <p className="text-xs text-[#888] mb-0.5">{c.label}</p>
              <p className="text-3xl font-black text-white">{c.value}</p>
              <p className="text-xs text-[#555] mt-0.5">{c.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-[#1a1a1a] border border-[#222] rounded-xl overflow-hidden">
        {/* Filter */}
        <div className="px-5 py-4 border-b border-[#1f1f1f] flex flex-wrap items-center gap-3">
          <select value={themeFilter} onChange={e => { setThemeFilter(e.target.value); setPage(1); }}
            className="bg-[#111] border border-[#2a2a2a] text-xs text-[#ccc] rounded px-3 py-2 focus:outline-none focus:border-[#e63946]">
            {THEMES_OPTS.map(t => <option key={t}>{t}</option>)}
          </select>
          <select value={ratingFilter} onChange={e => { setRatingFilter(e.target.value); setPage(1); }}
            className="bg-[#111] border border-[#2a2a2a] text-xs text-[#ccc] rounded px-3 py-2 focus:outline-none focus:border-[#e63946]">
            {RATING_OPTS.map(r => <option key={r}>{r}</option>)}
          </select>
          <div className="flex items-center gap-1">
            <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
              className="bg-[#111] border border-[#2a2a2a] text-xs text-[#ccc] rounded px-3 py-2 focus:outline-none focus:border-[#e63946]" />
            <span className="text-[#555] text-xs">~</span>
            <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
              className="bg-[#111] border border-[#2a2a2a] text-xs text-[#ccc] rounded px-3 py-2 focus:outline-none focus:border-[#e63946]" />
          </div>
          <input value={searchInput} onChange={e => setSearchInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="닉네임 또는 내용을 검색해주세요"
            className="flex-1 min-w-44 bg-[#111] border border-[#2a2a2a] text-xs text-[#f5f5f5] placeholder-[#444] rounded px-3 py-2 focus:outline-none focus:border-[#e63946]" />
          <button onClick={handleReset} className="text-xs text-[#666] hover:text-[#f5f5f5] border border-[#2a2a2a] hover:border-[#444] px-3 py-2 rounded transition-colors">초기화</button>
          <button onClick={handleSearch} className="text-xs bg-[#e63946] hover:bg-[#c1121f] text-white px-4 py-2 rounded transition-colors font-medium">검색</button>
        </div>

        {/* Table meta */}
        <div className="px-5 py-3 border-b border-[#1f1f1f] flex items-center justify-between">
          <span className="text-xs text-[#888]">전체 <span className="text-[#f5f5f5] font-bold">{filtered.length}건</span></span>
          <button className="flex items-center gap-1.5 text-xs text-[#555] hover:text-[#888] transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            엑셀 다운로드
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1f1f1f]">
                {['후기 번호', '테마', '작성자', '평점', '내용', '작성일', '관리'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-[#555] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-sm text-[#555]">검색 결과가 없습니다.</td></tr>
              ) : paged.map(r => (
                <tr key={r.id} className="border-b border-[#171717] last:border-b-0 hover:bg-[#1f1f1f] transition-colors">
                  <td className="px-4 py-3 text-xs text-[#555] font-mono whitespace-nowrap">{r.no}</td>
                  <td className="px-4 py-3 text-xs font-bold text-[#f5f5f5] whitespace-nowrap">{r.theme}</td>
                  <td className="px-4 py-3 text-xs text-[#ccc]">{r.user}</td>
                  <td className="px-4 py-3"><RatingStars value={r.rating} size="xs" /></td>
                  <td className="px-4 py-3 max-w-xs">
                    <div className="flex items-center gap-2 text-xs text-[#888]">
                      {r.hasSpoiler && (
                        <span className="shrink-0 text-[10px] bg-[#f39c12]/20 text-[#f39c12] border border-[#f39c12]/40 px-1.5 py-0.5 rounded font-medium whitespace-nowrap">스포일러 포함</span>
                      )}
                      <p className="truncate">{r.content}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#555] whitespace-nowrap">{r.date}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => setViewTarget(r)}
                      className="text-xs border border-[#2a2a2a] text-[#888] hover:border-[#e63946] hover:text-[#e63946] px-3 py-1.5 rounded transition-colors">보기</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 border-t border-[#1f1f1f] flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs text-[#555]">
            {filtered.length}건 중 {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} 표시
          </span>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="text-xs px-2.5 py-1.5 rounded border border-[#2a2a2a] text-[#666] hover:border-[#444] disabled:opacity-30 transition-colors">‹</button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setPage(n)}
                  className={['text-xs px-2.5 py-1.5 rounded border transition-colors', n === page ? 'bg-[#e63946] border-[#e63946] text-white font-bold' : 'border-[#2a2a2a] text-[#666] hover:border-[#444]'].join(' ')}>{n}</button>
              ))}
              {totalPages > 5 && <span className="text-xs text-[#555] self-center">...</span>}
              {totalPages > 5 && (
                <button onClick={() => setPage(totalPages)}
                  className={['text-xs px-2.5 py-1.5 rounded border transition-colors', totalPages === page ? 'bg-[#e63946] border-[#e63946] text-white font-bold' : 'border-[#2a2a2a] text-[#666] hover:border-[#444]'].join(' ')}>{totalPages}</button>
              )}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="text-xs px-2.5 py-1.5 rounded border border-[#2a2a2a] text-[#666] hover:border-[#444] disabled:opacity-30 transition-colors">›</button>
            </div>
            <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="bg-[#111] border border-[#2a2a2a] text-xs text-[#888] rounded px-2 py-1.5 focus:outline-none focus:border-[#e63946]">
              {PAGE_SIZES.map(n => <option key={n} value={n}>{n}개씩 보기</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Detail modal — white */}
      {viewTarget && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setViewTarget(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">숨김 요청 상세</h3>
              <button onClick={() => setViewTarget(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-[90px_1fr] gap-y-3 text-sm">
                {[
                  { label: '후기 번호', value: viewTarget.no },
                  { label: '테마', value: viewTarget.theme },
                  { label: '작성자', value: viewTarget.user },
                  { label: '작성일', value: viewTarget.date },
                ].map(row => (
                  <div key={row.label} className="contents">
                    <span className="text-gray-500">{row.label}</span>
                    <span className="text-gray-900 font-medium">{row.value}</span>
                  </div>
                ))}
                <span className="text-gray-500">평점</span>
                <span><RatingStars value={viewTarget.rating} size="xs" /></span>
                <span className="text-gray-500 pt-1">후기 내용</span>
                <p className="text-gray-700 leading-relaxed">{viewTarget.content}</p>
              </div>
              {viewTarget.hideRequest && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3.5">
                  <p className="text-[#e63946] text-xs font-bold mb-1.5 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    사장님 숨김 요청 사유
                  </p>
                  <p className="text-sm text-gray-600">{viewTarget.hideRequest}</p>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
              <button onClick={() => setViewTarget(null)}
                className="text-sm border border-gray-300 text-gray-600 hover:border-gray-400 px-5 py-2 rounded-lg transition-colors">거절</button>
              <button onClick={() => setViewTarget(null)}
                className="text-sm bg-[#e63946] hover:bg-[#c1121f] text-white font-bold px-5 py-2 rounded-lg transition-colors">승인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
