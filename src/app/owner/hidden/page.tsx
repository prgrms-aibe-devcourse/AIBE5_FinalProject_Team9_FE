'use client';

import { useState, useMemo } from 'react';

const MOCK_REQUESTS = [
  { id: 1, no: 'HR20240527-003', reviewId: 'RV20240527-008', theme: '폐병원의 저주', reviewer: '오완률', requester: '폐병원의 저주 사장', reason: '개인 정보 노출 우려 (장치 상세 묘사)', reviewContent: '안내원이가 행동 방식이 너무 무서워요. 특히 2번 방의 트리거 장치를 누르면...', date: '2026-05-27', status: 'PENDING' },
  { id: 2, no: 'HR20240527-002', reviewId: 'RV20240526-006', theme: '급감한 연구소', reviewer: '전지인', requester: '급감한 연구소 사장', reason: '허위 사실 포함 (장치 오작동은 사실과 다름)', reviewContent: '장치가 오작동하고 매우 불쾌한 경험을 했어요. 환불 요청했는데 거절당했습니다.', date: '2026-05-27', status: 'PENDING' },
  { id: 3, no: 'HR20240527-001', reviewId: 'RV20240524-004', theme: '악마의 제단', reviewer: '류수진', requester: '악마의 제단 사장', reason: '스포일러 포함', reviewContent: '남자친구 데려오면 완전 도망갈 정도입니다. 마지막 방에서 제단에 사람 모형이...', date: '2026-05-26', status: 'APPROVED' },
  { id: 4, no: 'HR20240525-004', reviewId: 'RV20240522-012', theme: '좀비 아포칼립스', reviewer: '박지훈', requester: '좀비 아포칼립스 사장', reason: '악의적 비방 (사실 확인 불가)', reviewContent: '직원이 너무 불친절하고 환경이 매우 불량합니다. 위생 상태도 엉망이에요.', date: '2026-05-25', status: 'REJECTED' },
  { id: 5, no: 'HR20240524-003', reviewId: 'RV20240520-009', theme: '유령 학교', reviewer: '최유나', requester: '유령 학교 사장', reason: '개인 정보 노출 (배우 이름 직접 언급)', reviewContent: '홍길동 배우님이 너무 열심히 해주셨어요. 얼굴도 기억에 남아요.', date: '2026-05-24', status: 'APPROVED' },
  { id: 6, no: 'HR20240523-002', reviewId: 'RV20240518-007', theme: '폐병원의 저주', reviewer: '강현우', requester: '폐병원의 저주 사장', reason: '상업적 경쟁 업체 홍보 포함', reviewContent: '다른 탈출방과 비교하면 OO방탈출이 훨씬 낫던데 이건 가격 대비 별로예요.', date: '2026-05-23', status: 'APPROVED' },
  { id: 7, no: 'HR20240522-001', reviewId: 'RV20240515-003', theme: '블랙아웃', reviewer: '임나연', requester: '블랙아웃 사장', reason: '근거 없는 안전 위협 주장', reviewContent: '장치가 갑자기 폭발할 것 같이 느껴졌어요. 안전 기준이 의심스럽습니다.', date: '2026-05-22', status: 'REJECTED' },
];

const THEMES = ['전체', '폐병원의 저주', '악마의 제단', '좀비 아포칼립스', '유령 학교', '급감한 연구소', '블랙아웃'];
const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  PENDING:  { label: '대기',    cls: 'bg-[#f39c12]/15 text-[#f39c12]' },
  APPROVED: { label: '승인',    cls: 'bg-[#2ecc71]/15 text-[#2ecc71]' },
  REJECTED: { label: '반려',    cls: 'bg-[#e63946]/15 text-[#e63946]' },
};

type Request = typeof MOCK_REQUESTS[number];

export default function OwnerHiddenPage() {
  const [themeFilter, setThemeFilter] = useState('전체');
  const [statusFilter, setStatusFilter] = useState('전체');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [detailTarget, setDetailTarget] = useState<Request | null>(null);

  const filtered = useMemo(() => {
    return requests.filter(r => {
      if (themeFilter !== '전체' && r.theme !== themeFilter) return false;
      if (statusFilter === '대기' && r.status !== 'PENDING') return false;
      if (statusFilter === '승인' && r.status !== 'APPROVED') return false;
      if (statusFilter === '반려' && r.status !== 'REJECTED') return false;
      if (search && !r.reviewer.includes(search) && !r.theme.includes(search) && !r.reason.includes(search)) return false;
      return true;
    });
  }, [requests, themeFilter, statusFilter, search]);

  const approve = (id: number) => setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'APPROVED' } : r));
  const reject = (id: number) => setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'REJECTED' } : r));

  const handleSearch = () => { setSearch(searchInput); };
  const handleReset = () => { setThemeFilter('전체'); setStatusFilter('전체'); setSearch(''); setSearchInput(''); };

  const pending = requests.filter(r => r.status === 'PENDING').length;
  const approved = requests.filter(r => r.status === 'APPROVED').length;
  const rejected = requests.filter(r => r.status === 'REJECTED').length;

  return (
    <div className="p-6 space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: '전체 요청', value: `${requests.length}건`, color: '#f5f5f5' },
          { label: '대기', value: `${pending}건`, color: '#f39c12' },
          { label: '승인 (숨김 처리)', value: `${approved}건`, color: '#2ecc71' },
          { label: '반려', value: `${rejected}건`, color: '#e63946' },
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
            onChange={e => setThemeFilter(e.target.value)}
            className="bg-[#111] border border-[#2a2a2a] text-xs text-[#ccc] rounded px-3 py-2 focus:outline-none focus:border-[#e63946]"
          >
            {THEMES.map(t => <option key={t}>{t}</option>)}
          </select>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-[#111] border border-[#2a2a2a] text-xs text-[#ccc] rounded px-3 py-2 focus:outline-none focus:border-[#e63946]"
          >
            {['전체', '대기', '승인', '반려'].map(s => <option key={s}>{s}</option>)}
          </select>
          <input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="작성자 또는 요청 사유 검색"
            className="flex-1 min-w-40 bg-[#111] border border-[#2a2a2a] text-xs text-[#f5f5f5] placeholder-[#444] rounded px-3 py-2 focus:outline-none focus:border-[#e63946]"
          />
          <button onClick={handleReset} className="text-xs text-[#666] hover:text-[#f5f5f5] border border-[#2a2a2a] hover:border-[#444] px-3 py-2 rounded transition-colors">초기화</button>
          <button onClick={handleSearch} className="text-xs bg-[#e63946] hover:bg-[#c1121f] text-white px-4 py-2 rounded transition-colors font-medium">검색</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1f1f1f]">
                {['요청번호', '테마', '후기 작성자', '요청 사유', '요청일', '상태', '관리'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-[#555] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-sm text-[#555]">검색 결과가 없습니다.</td></tr>
              ) : filtered.map(r => {
                const st = STATUS_MAP[r.status];
                return (
                  <tr key={r.id} className="border-b border-[#171717] last:border-b-0 hover:bg-[#1f1f1f] transition-colors">
                    <td className="px-4 py-3 text-xs text-[#555] font-mono whitespace-nowrap">{r.no}</td>
                    <td className="px-4 py-3 text-xs font-medium text-[#f5f5f5] whitespace-nowrap">{r.theme}</td>
                    <td className="px-4 py-3 text-xs text-[#ccc]">{r.reviewer}</td>
                    <td className="px-4 py-3 text-xs text-[#888] max-w-xs">
                      <p className="truncate">{r.reason}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#555] whitespace-nowrap">{r.date}</td>
                    <td className="px-4 py-3">
                      <span className={['text-[11px] px-2 py-0.5 rounded font-medium whitespace-nowrap', st.cls].join(' ')}>{st.label}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => setDetailTarget(r)}
                          className="text-[11px] border border-[#2a2a2a] text-[#888] hover:border-[#444] hover:text-[#f5f5f5] px-2 py-1 rounded transition-colors"
                        >상세</button>
                        {r.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => approve(r.id)}
                              className="text-[11px] bg-[#2ecc71]/15 text-[#2ecc71] hover:bg-[#2ecc71]/25 px-2 py-1 rounded transition-colors font-medium"
                            >승인</button>
                            <button
                              onClick={() => reject(r.id)}
                              className="text-[11px] bg-[#e63946]/15 text-[#e63946] hover:bg-[#e63946]/25 px-2 py-1 rounded transition-colors font-medium"
                            >반려</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-[#1f1f1f]">
          <span className="text-xs text-[#555]">총 {filtered.length}건</span>
        </div>
      </div>

      {/* Detail modal */}
      {detailTarget && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setDetailTarget(null)}>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-[#2a2a2a] flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#f5f5f5]">숨김 요청 상세</h3>
              <button onClick={() => setDetailTarget(null)} className="text-[#555] hover:text-[#f5f5f5] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-[#555] mb-1">요청번호</p>
                  <p className="text-[#ccc] font-mono">{detailTarget.no}</p>
                </div>
                <div>
                  <p className="text-[#555] mb-1">상태</p>
                  <span className={['text-[11px] px-2 py-0.5 rounded font-medium', STATUS_MAP[detailTarget.status].cls].join(' ')}>
                    {STATUS_MAP[detailTarget.status].label}
                  </span>
                </div>
                <div>
                  <p className="text-[#555] mb-1">테마</p>
                  <p className="text-[#f5f5f5] font-medium">{detailTarget.theme}</p>
                </div>
                <div>
                  <p className="text-[#555] mb-1">후기 작성자</p>
                  <p className="text-[#ccc]">{detailTarget.reviewer}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[#555] mb-1">요청 사유</p>
                  <p className="text-[#f5f5f5]">{detailTarget.reason}</p>
                </div>
              </div>
              <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-4">
                <p className="text-[10px] text-[#555] mb-2">문제 후기 내용</p>
                <p className="text-xs text-[#888] leading-relaxed">{detailTarget.reviewContent}</p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#2a2a2a] flex gap-2">
              <button onClick={() => setDetailTarget(null)} className="flex-1 text-xs border border-[#2a2a2a] text-[#888] hover:border-[#444] py-2.5 rounded-lg transition-colors">닫기</button>
              {detailTarget.status === 'PENDING' && (
                <>
                  <button
                    onClick={() => { reject(detailTarget.id); setDetailTarget(null); }}
                    className="flex-1 text-xs bg-[#e63946]/15 text-[#e63946] hover:bg-[#e63946]/25 font-bold py-2.5 rounded-lg transition-colors"
                  >반려</button>
                  <button
                    onClick={() => { approve(detailTarget.id); setDetailTarget(null); }}
                    className="flex-1 text-xs bg-[#2ecc71] hover:bg-[#27ae60] text-[#0d0d0d] font-bold py-2.5 rounded-lg transition-colors"
                  >승인 (후기 숨김)</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
