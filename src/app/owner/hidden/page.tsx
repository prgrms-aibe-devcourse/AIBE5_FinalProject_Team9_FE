'use client';

import { useState, useMemo, useEffect } from 'react';
import { getOwnerReviewReports, requestHideByOwner } from '@/services/ownerService';
import { ReviewReportItem } from '@/types/review';
import { useOwnerStore } from '@/stores/ownerStore';
import { formatDate } from '@/lib/formatDate';

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
    PENDING_OWNER_REVIEW:   { label: '미처리',   cls: 'bg-[#f39c12]/15 text-[#f39c12]' },
    OWNER_RESTORED:         { label: '복구됨', cls: 'bg-[#888]/15 text-[#888]' },
    REQUESTED_ADMIN_REVIEW: { label: '요청됨', cls: 'bg-[#3498db]/15 text-[#3498db]' },
    ADMIN_APPROVED:         { label: '승인',   cls: 'bg-[#2ecc71]/15 text-[#2ecc71]' },
    ADMIN_REJECTED:         { label: '반려',   cls: 'bg-[#e63946]/15 text-[#e63946]' },
};

export default function OwnerHiddenPage() {
    const [requests, setRequests] = useState<ReviewReportItem[]>([]);
  const [themeFilter, setThemeFilter] = useState('테마 전체');
  const [statusFilter, setStatusFilter] = useState('상태 전체');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [detailTarget, setDetailTarget] = useState<ReviewReportItem | null>(null);
  const [ownerReason, setOwnerReason] = useState('');
  const { setPendingCount } = useOwnerStore();

    const formatReportNo = (createdAt: string, index: number) => {
        const date = new Date(createdAt);
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        const seq = String(index + 1).padStart(3, '0');
        return `RP${y}${m}${d}-${seq}`;
    };
    useEffect(() => {
        const fetchReports = async () => {
            const data = await getOwnerReviewReports(0, 100);
            setRequests(data.content);
            setPendingCount(data.content.filter((r: ReviewReportItem) => r.status === 'PENDING_OWNER_REVIEW').length);
        };
        fetchReports();
    }, []);

    const themes = ['테마 전체', ...Array.from(new Set(requests.map(r => r.themeTitle)))];

    const filtered = useMemo(() => {
        return requests.filter(r => {
            if (themeFilter !== '테마 전체' && r.themeTitle !== themeFilter) return false;
            if (statusFilter === '대기' && r.status !== 'PENDING_OWNER_REVIEW') return false;
            if (statusFilter === '요청됨' && r.status !== 'REQUESTED_ADMIN_REVIEW') return false;
            if (statusFilter === '승인' && r.status !== 'ADMIN_APPROVED') return false;
            if (statusFilter === '반려' && r.status !== 'ADMIN_REJECTED') return false;
            if (search && !r.reporterNickname.includes(search) && !r.themeTitle.includes(search) && !r.reason.includes(search)) return false;
            return true;
        });
    }, [requests, themeFilter, statusFilter, search]);

    const PAGE_SIZE = 8;
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleRequestHide = async () => {
        if (!detailTarget || !ownerReason.trim()) return;
        await requestHideByOwner(detailTarget.reportId, ownerReason);
        const updatedReport = { ...detailTarget, status: 'REQUESTED_ADMIN_REVIEW', ownerReason };
        setRequests(prev => prev.map(r => r.reportId === detailTarget.reportId ? updatedReport : r));
        setDetailTarget(updatedReport as ReviewReportItem);
    };

    const pending = requests.filter(r => r.status === 'PENDING_OWNER_REVIEW').length;
    const requested = requests.filter(r => r.status === 'REQUESTED_ADMIN_REVIEW').length;
    const approved = requests.filter(r => r.status === 'ADMIN_APPROVED').length;
    const rejected = requests.filter(r => r.status === 'ADMIN_REJECTED').length;

  const handleSearch = () => { setSearch(searchInput); };
  const handleReset = () => { setThemeFilter('전체'); setStatusFilter('전체'); setSearch(''); setSearchInput(''); };

  return (
    <div className="p-6 space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
            { label: '전체 요청', value: `${requests.length}건`, color: '#f5f5f5', icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                ) },
            { label: '미처리', value: `${pending}건`, color: '#f39c12', icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ) },
            { label: '승인', value: `${approved}건`, color: '#2ecc71' , icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )},
            { label: '반려', value: `${rejected}건`, color: '#e63946', icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
               ) },
        ].map(c => (
            <div key={c.label} className="bg-[#1a1a1a] border border-[#222] rounded-xl p-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${c.color}20` }}>
                        <span style={{ color: c.color }} className="[&_svg]:w-5 [&_svg]:h-5">{c.icon}</span>
                    </div>
                    <div>
                        <p className="text-xs text-[#666] mb-0">{c.label}</p>
                        <p className="text-[20px] font-black" style={{ color: c.color }}>{c.value}</p>
                    </div>
                </div>
            </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#1a1a1a] border border-[#222] rounded-xl overflow-hidden">
        {/* Filter */}
        <div className="px-5 py-4 border-b border-[#1f1f1f] flex flex-wrap items-center gap-3">
            <div className="relative">
                <select
                    value={themeFilter}
                    onChange={e => setThemeFilter(e.target.value)}
                    className="appearance-none bg-[#111] border border-[#2a2a2a] text-xs text-[#ccc] rounded px-3 pr-8 py-2 focus:outline-none focus:border-[#ffffff40] cursor-pointer"
                >
                    {themes.map(t => <option key={t}>{t}</option>)}
                </select>
                <svg className="w-3 h-3 text-[#666] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            <div className="relative">
                <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="appearance-none bg-[#111] border border-[#2a2a2a] text-xs text-[#ccc] rounded px-3 pr-8 py-2 focus:outline-none focus:border-[#ffffff40] cursor-pointer"
                >
                    {['상태 전체', '대기', '승인', '반려'].map(s => <option key={s}>{s}</option>)}
                </select>
                <svg className="w-3 h-3 text-[#666] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
          <input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="작성자 또는 요청 사유 검색"
            className="flex-1 min-w-40 bg-[#111] border border-[#2a2a2a] text-xs text-[#f5f5f5] placeholder-[#444] rounded px-3 py-2 focus:outline-none focus:border-[#ffffff40]"
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
              ) : filtered.map((r, index) => {
                const st = STATUS_MAP[r.status];
                return (
                  <tr key={r.reportId} className="border-b border-[#171717] last:border-b-0 hover:bg-[#1f1f1f] transition-colors">
                    <td className="px-4 py-3 text-xs text-[#555] font-mono whitespace-nowrap">{formatReportNo(r.createdAt, index)}</td>
                    <td className="px-4 py-3 text-xs font-medium text-[#f5f5f5] whitespace-nowrap">{r.themeTitle}</td>
                    <td className="px-4 py-3 text-xs text-[#ccc]">{r.reporterNickname}</td>
                    <td className="px-4 py-3 text-xs text-[#888] max-w-xs">
                      <p className="truncate">{r.reason}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#555] whitespace-nowrap">{formatDate(r.createdAt)}</td>
                    <td className="px-4 py-3">
                      <span className={['text-[11px] px-2 py-0.5 rounded font-medium whitespace-nowrap', st.cls].join(' ')}>{st.label}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => setDetailTarget(r)}
                          className="text-[11px] border border-[#2a2a2a] text-[#888] hover:border-[#444] hover:text-[#f5f5f5] px-2 py-1 rounded transition-colors"
                        >상세</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

          {/* Pagination */}
          <div className="px-5 py-3 border-t border-[#1f1f1f] flex items-center justify-center flex-wrap gap-2">
              <div className="flex gap-1">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                          className="text-xs px-2.5 py-1.5 rounded border border-[#888] text-white hover:border-[#444] disabled:opacity-30 transition-colors">‹</button>
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
                          className="text-xs px-2.5 py-1.5 rounded border border-[#888] text-white hover:border-[#444] disabled:opacity-30 transition-colors">›</button>
              </div>
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
                  <p className="text-[#ccc] font-mono">{formatReportNo(detailTarget.createdAt, requests.findIndex(r => r.reportId === detailTarget.reportId))}</p>
                </div>
                <div>
                  <p className="text-[#555] mb-1">상태</p>
                  <span className={['text-[11px] px-2 py-0.5 rounded font-medium', STATUS_MAP[detailTarget.status].cls].join(' ')}>
                    {STATUS_MAP[detailTarget.status].label}
                  </span>
                </div>
                <div>
                  <p className="text-[#555] mb-1">테마</p>
                  <p className="text-[#f5f5f5] font-medium">{detailTarget.themeTitle}</p>
                </div>
                <div>
                  <p className="text-[#555] mb-1">후기 작성자</p>
                  <p className="text-[#ccc]">{detailTarget.reporterNickname}</p>
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
              <div className="px-6 py-4 border-t border-[#2a2a2a] space-y-3">
                  <div>
                      <p className="text-xs text-[#555] mb-1.5">숨김 요청 사유 <span className="text-[#e63946]">*</span></p>
                      {detailTarget.status === 'PENDING_OWNER_REVIEW' ? (
                          <textarea
                              value={ownerReason}
                              onChange={e => setOwnerReason(e.target.value)}
                              placeholder="관리자에게 전달할 숨김 요청 사유를 입력해주세요."
                              className="w-full bg-[#111] border border-[#2a2a2a] text-xs text-[#f5f5f5] placeholder-[#444] rounded-lg px-3 py-2.5 outline-none focus:border-[#e63946] resize-none h-20"
                          />
                      ) : (
                          <p className="text-xs text-[#f5f5f5]">{detailTarget.ownerReason}</p>
                      )}
                  </div>
                  <div className="flex gap-2">
                      <button onClick={() => setDetailTarget(null)} className="flex-1 text-xs border border-[#2a2a2a] text-[#888] hover:border-[#444] py-2.5 rounded-lg transition-colors">닫기</button>
                      {detailTarget.status === 'PENDING_OWNER_REVIEW' && (
                          <button onClick={handleRequestHide} disabled={!ownerReason.trim()}
                                  className="flex-1 text-xs bg-[#2ecc71] hover:bg-[#27ae60] text-[#0d0d0d] font-bold py-2.5 rounded-lg transition-colors">
                              숨김 요청
                          </button>
                      )}
                  </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}
