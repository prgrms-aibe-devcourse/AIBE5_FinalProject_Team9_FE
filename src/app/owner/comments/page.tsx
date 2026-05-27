'use client';

import { useState, useMemo } from 'react';

const MOCK_COMMENTS = [
  { id: 1, no: 'CM20240527-014', theme: '폐병원의 저주', user: '김민수', content: '이 테마 너무 무서워요! 안내원이 갑자기 튀어나올 때마다 소리를 질렀어요 ㅋㅋ', date: '2026-05-27', status: 'VISIBLE', isReported: false },
  { id: 2, no: 'CM20240527-013', theme: '악마의 제단', user: '이서연', content: '장치가 정말 독창적이에요. 마지막 퍼즐이 특히 인상적이었습니다.', date: '2026-05-27', status: 'VISIBLE', isReported: false },
  { id: 3, no: 'CM20240527-012', theme: '좀비 아포칼립스', user: '박지훈', content: '스토리가 조금 아쉬웠지만 공포 연출은 훌륭해요. 좀비 분장이 진짜같아서 놀랐어요!', date: '2026-05-27', status: 'VISIBLE', isReported: true },
  { id: 4, no: 'CM20240527-011', theme: '유령 학교', user: '최유나', content: '처음엔 쉬워 보였는데 중반부부터 갑자기 어려워져서 결국 힌트 3번이나 썼어요.', date: '2026-05-27', status: 'HIDDEN', isReported: false },
  { id: 5, no: 'CM20240526-010', theme: '급감한 연구소', user: '강현우', content: 'SF 설정이 탄탄해서 몰입감이 높았어요. 비슷한 장르 테마가 더 나왔으면 좋겠어요.', date: '2026-05-26', status: 'VISIBLE', isReported: false },
  { id: 6, no: 'CM20240526-009', theme: '폐병원의 저주', user: '윤지민', content: '무서운 건 좋은데 신체 접촉이 있어서 좀 불편했어요. 이 부분은 개선이 필요할 것 같아요.', date: '2026-05-26', status: 'VISIBLE', isReported: true },
  { id: 7, no: 'CM20240526-008', theme: '악마의 제단', user: '장서준', content: '혼자 가기엔 너무 무서워요. 꼭 친구 데려가세요. 저는 혼자 갔다가 거의 울 뻔...', date: '2026-05-26', status: 'VISIBLE', isReported: false },
  { id: 8, no: 'CM20240525-007', theme: '블랙아웃', user: '임나연', content: '암흑 속에서 진행되는 파트가 너무 무서웠어요. 실제로 손을 잡아야 해서 팀워크가 중요해요.', date: '2026-05-25', status: 'VISIBLE', isReported: false },
  { id: 9, no: 'CM20240525-006', theme: '유령 학교', user: '한도현', content: '...', date: '2026-05-25', status: 'HIDDEN', isReported: true },
  { id: 10, no: 'CM20240525-005', theme: '좀비 아포칼립스', user: '오수빈', content: '좀비 배우들이 정말 열심히 해줘서 현장감이 살아있어요. 최고의 경험이었습니다!', date: '2026-05-25', status: 'VISIBLE', isReported: false },
  { id: 11, no: 'CM20240524-004', theme: '급감한 연구소', user: '정태영', content: '장치가 가끔 오작동해서 진행이 끊겼어요. 유지보수가 필요할 것 같아요.', date: '2026-05-24', status: 'VISIBLE', isReported: true },
  { id: 12, no: 'CM20240524-003', theme: '폐병원의 저주', user: '배민지', content: '처음 방탈출인데 여기로 시작해서 너무 무서웠어요 ㅋㅋ 근데 재밌었어요 다음에 또 올게요!', date: '2026-05-24', status: 'VISIBLE', isReported: false },
];

const THEMES = ['전체', '폐병원의 저주', '악마의 제단', '좀비 아포칼립스', '유령 학교', '급감한 연구소', '블랙아웃'];
const PAGE_SIZE = 8;

export default function OwnerCommentsPage() {
  const [themeFilter, setThemeFilter] = useState('전체');
  const [statusFilter, setStatusFilter] = useState('전체');
  const [reportedOnly, setReportedOnly] = useState(false);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState(MOCK_COMMENTS);

  const filtered = useMemo(() => {
    return comments.filter(c => {
      if (themeFilter !== '전체' && c.theme !== themeFilter) return false;
      if (statusFilter === '공개' && c.status !== 'VISIBLE') return false;
      if (statusFilter === '숨김' && c.status !== 'HIDDEN') return false;
      if (reportedOnly && !c.isReported) return false;
      if (search && !c.user.includes(search) && !c.content.includes(search)) return false;
      return true;
    });
  }, [comments, themeFilter, statusFilter, reportedOnly, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleStatus = (id: number) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'VISIBLE' ? 'HIDDEN' : 'VISIBLE' } : c));
  };

  const handleSearch = () => { setSearch(searchInput); setPage(1); };
  const handleReset = () => { setThemeFilter('전체'); setStatusFilter('전체'); setReportedOnly(false); setSearch(''); setSearchInput(''); setPage(1); };

  const reportCount = comments.filter(c => c.isReported).length;
  const hiddenCount = comments.filter(c => c.status === 'HIDDEN').length;

  return (
    <div className="p-6 space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: '전체 댓글', value: `${comments.length}건`, color: '#f5f5f5' },
          { label: '공개 댓글', value: `${comments.length - hiddenCount}건`, color: '#2ecc71' },
          { label: '숨김 댓글', value: `${hiddenCount}건`, color: '#888' },
          { label: '신고된 댓글', value: `${reportCount}건`, color: '#e63946' },
        ].map(c => (
          <div key={c.label} className="bg-[#1a1a1a] border border-[#222] rounded-xl p-4">
            <p className="text-xs text-[#666] mb-1">{c.label}</p>
            <p className="text-2xl font-black" style={{ color: c.color }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#1a1a1a] border border-[#222] rounded-xl overflow-hidden">
        {/* Filter */}
        <div className="px-5 py-4 border-b border-[#1f1f1f] flex flex-wrap items-center gap-3">
          <select
            value={themeFilter}
            onChange={e => { setThemeFilter(e.target.value); setPage(1); }}
            className="bg-[#111] border border-[#2a2a2a] text-xs text-[#ccc] rounded px-3 py-2 focus:outline-none focus:border-[#e63946]"
          >
            {THEMES.map(t => <option key={t}>{t}</option>)}
          </select>
          <select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
            className="bg-[#111] border border-[#2a2a2a] text-xs text-[#ccc] rounded px-3 py-2 focus:outline-none focus:border-[#e63946]"
          >
            {['전체', '공개', '숨김'].map(s => <option key={s}>{s}</option>)}
          </select>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={reportedOnly}
              onChange={e => { setReportedOnly(e.target.checked); setPage(1); }}
              className="w-3.5 h-3.5 accent-[#e63946]"
            />
            <span className="text-xs text-[#888]">신고된 댓글만</span>
          </label>
          <input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="작성자 또는 내용 검색"
            className="flex-1 min-w-40 bg-[#111] border border-[#2a2a2a] text-xs text-[#f5f5f5] placeholder-[#444] rounded px-3 py-2 focus:outline-none focus:border-[#e63946]"
          />
          <button onClick={handleReset} className="text-xs text-[#666] hover:text-[#f5f5f5] border border-[#2a2a2a] hover:border-[#444] px-3 py-2 rounded transition-colors">초기화</button>
          <button onClick={handleSearch} className="text-xs bg-[#e63946] hover:bg-[#c1121f] text-white px-4 py-2 rounded transition-colors font-medium">검색</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1f1f1f]">
                {['댓글번호', '테마', '작성자', '내용', '작성일', '상태', '관리'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-[#555] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-sm text-[#555]">검색 결과가 없습니다.</td></tr>
              ) : paged.map(c => (
                <tr key={c.id} className="border-b border-[#171717] last:border-b-0 hover:bg-[#1f1f1f] transition-colors">
                  <td className="px-4 py-3 text-xs text-[#555] font-mono whitespace-nowrap">{c.no}</td>
                  <td className="px-4 py-3 text-xs font-medium text-[#f5f5f5] whitespace-nowrap">{c.theme}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-[#ccc]">{c.user}</span>
                      {c.isReported && (
                        <span className="text-[10px] bg-[#e63946]/20 text-[#e63946] border border-[#e63946]/40 px-1 py-0.5 rounded font-medium">신고</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#888] max-w-xs">
                    <p className="truncate">{c.content}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#555] whitespace-nowrap">{c.date}</td>
                  <td className="px-4 py-3">
                    <span className={[
                      'text-[11px] px-2 py-0.5 rounded font-medium',
                      c.status === 'VISIBLE' ? 'bg-[#2ecc71]/15 text-[#2ecc71]' : 'bg-[#888]/15 text-[#888]',
                    ].join(' ')}>
                      {c.status === 'VISIBLE' ? '공개' : '숨김'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="text-[11px] border border-[#2a2a2a] text-[#888] hover:border-[#444] hover:text-[#f5f5f5] px-2 py-1 rounded transition-colors">보기</button>
                      <button
                        onClick={() => toggleStatus(c.id)}
                        className={[
                          'text-[11px] px-2 py-1 rounded transition-colors font-medium',
                          c.status === 'VISIBLE'
                            ? 'bg-[#e63946]/15 text-[#e63946] hover:bg-[#e63946]/25'
                            : 'bg-[#2ecc71]/15 text-[#2ecc71] hover:bg-[#2ecc71]/25',
                        ].join(' ')}
                      >
                        {c.status === 'VISIBLE' ? '숨김' : '공개'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 border-t border-[#1f1f1f] flex items-center justify-between">
          <span className="text-xs text-[#555]">
            {filtered.length}건 중 {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, filtered.length)} 표시
          </span>
          <div className="flex gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="text-xs px-2.5 py-1.5 rounded border border-[#2a2a2a] text-[#666] hover:border-[#444] disabled:opacity-30 transition-colors">‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)} className={['text-xs px-2.5 py-1.5 rounded border transition-colors', n === page ? 'bg-[#e63946] border-[#e63946] text-white font-bold' : 'border-[#2a2a2a] text-[#666] hover:border-[#444]'].join(' ')}>{n}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="text-xs px-2.5 py-1.5 rounded border border-[#2a2a2a] text-[#666] hover:border-[#444] disabled:opacity-30 transition-colors">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}
