'use client';

import { getAdminReviewReports, approveReviewReport, rejectReviewReport } from '@/services/adminService';
import { AdminReviewReportItem } from '@/types/admin';
import { useAdminStore } from '@/stores/adminStore';
import { formatDate } from '@/lib/formatDate';
import { useState, useMemo, useEffect } from 'react';
import RatingStars from '@/components/common/RatingStars';
import { useAuthStore } from '@/stores/authStore';

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
    REQUESTED_ADMIN_REVIEW: { label: '대기', cls: 'bg-[#f39c12]/15 text-[#f39c12]' },
    ADMIN_APPROVED: { label: '승인', cls: 'bg-[#2ecc71]/15 text-[#2ecc71]' },
    ADMIN_REJECTED: { label: '반려', cls: 'bg-[#e63946]/15 text-[#e63946]' },
};

const formatReportNo = (createdAt: string, index: number) => {
    const date = new Date(createdAt);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const seq = String(index + 1).padStart(3, '0');
    return `RP${y}${m}${d}-${seq}`;
};

export default function AdminReviewsPage() {
    const { user } = useAuthStore();
    const [reports, setReports] = useState<AdminReviewReportItem[]>([]);
    const [statusFilter, setStatusFilter] = useState('전체');
    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [viewTarget, setViewTarget] = useState<AdminReviewReportItem | null>(null);
    const [adminReason, setAdminReason] = useState('');
    const { setPendingCount } = useAdminStore();
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const pending = reports.filter(r => r.status === 'REQUESTED_ADMIN_REVIEW').length;
    const approved = reports.filter(r => r.status === 'ADMIN_APPROVED').length;
    const rejected = reports.filter(r => r.status === 'ADMIN_REJECTED').length;

    useEffect(() => {
        if (!user || user.role !== 'ADMIN') return;
        const fetchData = async () => {
            const reportData = await getAdminReviewReports(0, 100);
            setReports(reportData.content);
            setPendingCount(reportData.content.filter((r: AdminReviewReportItem) => r.status === 'REQUESTED_ADMIN_REVIEW').length);
        };
        fetchData();
    }, []);

    const filtered = useMemo(() => reports.filter(r => {
        if (statusFilter === '대기' && r.status !== 'REQUESTED_ADMIN_REVIEW') return false;
        if (statusFilter === '승인' && r.status !== 'ADMIN_APPROVED') return false;
        if (statusFilter === '반려' && r.status !== 'ADMIN_REJECTED') return false;
        if (search && !r.reporterNickname.includes(search) && !r.reviewContent.includes(search)) return false;
        if (dateFrom && r.createdAt.slice(0, 10) < dateFrom) return false;
        if (dateTo && r.createdAt.slice(0, 10) > dateTo) return false;
        return true;
    }), [reports, statusFilter, search, dateFrom, dateTo]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / 8));
    const paged = filtered.slice((page - 1) * 8, page * 8);

    const handleSearch = () => { setSearch(searchInput); setPage(1); };
    const handleReset = () => { setStatusFilter('전체'); setSearch(''); setSearchInput(''); setPage(1); setDateFrom('');
        setDateTo('');};

    const handleApprove = async () => {
        if (!viewTarget || !adminReason.trim()) return;
        await approveReviewReport(viewTarget.id, adminReason);
        setReports(prev => prev.map(r => r.id === viewTarget.id ? { ...r, status: 'ADMIN_APPROVED' } : r));
        setViewTarget(null);
        setAdminReason('');
    };

    const handleReject = async () => {
        if (!viewTarget) return;
        await rejectReviewReport(viewTarget.id, adminReason);
        setReports(prev => prev.map(r => r.id === viewTarget.id ? { ...r, status: 'ADMIN_REJECTED' } : r));
        setViewTarget(null);
        setAdminReason('');
    };

    return (
        <div className="p-6 space-y-5">
            {/* Stat cards */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
                {[
                    {
                        label: '전체 후기', value: `${reports.length}건`, sub: '신고 접수된 후기',
                        color: '#3498db', bg: 'bg-[#3498db]/15',
                        icon: (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        ),
                    },
                    {
                        label: '대기 중인 후기', value: `${pending}건`, sub: '처리 대기 중',
                        color: '#f39c12', bg: 'bg-[#f39c12]/15',
                        icon: (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        ),
                    },
                    { label: '승인된 후기', value: `${approved}건`, sub: '숨김 처리된 후기',
                        color: '#2ecc71', bg: 'bg-[#2ecc71]/15',
                        icon: (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ),
                    },
                    {
                        label: '반려된 후기', value: `${rejected}건`, sub: '반려된 후기',
                        color: '#e63946', bg: 'bg-[#e63946]/15',
                        icon: (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
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
                <div className="px-6 py-5 border-b border-[#1f1f1f] flex flex-wrap items-center gap-3">
                    <div className="relative">
                    <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
                            className="bg-[#111] border border-[#2a2a2a] text-xs text-[#ccc] rounded px-3 pr-8 py-2 focus:outline-none focus:border-[#ffffff40] appearance-none cursor-pointer">
                        {['전체', '대기', '승인', '반려'].map(s => <option key={s}>{s}</option>)}
                    </select>
                    <svg className="w-3 h-3 text-[#666] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    </div>
                    <div className="flex items-center gap-1">
                        <input type="date" value={dateFrom} onChange={e => { setDateFrom(e.target.value); setPage(1); }}
                               className="bg-[#111] border border-[#2a2a2a] text-xs text-[#ccc] rounded px-3 py-2 focus:outline-none focus:border-[#ffffff40] [color-scheme:dark]" />
                        <span className="text-[#aaa] text-xs">~</span>
                        <input type="date" value={dateTo} onChange={e => { setDateTo(e.target.value); setPage(1); }}
                               className="bg-[#111] border border-[#2a2a2a] text-xs text-[#ccc] rounded px-3 py-2 focus:outline-none focus:border-[#ffffff40] [color-scheme:dark]" />
                    </div>
                    <input value={searchInput} onChange={e => setSearchInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()}
                           placeholder="닉네임 또는 내용을 검색해주세요"
                           className="flex-1 min-w-44 bg-[#111] border border-[#2a2a2a] text-xs text-[#f5f5f5] placeholder-[#444] rounded px-3 py-2 focus:outline-none focus:border-[#ffffff40]" />
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
                            {['신고 번호', '테마', '작성자', '평점', '내용', '사장님 요청 사유', '작성일', '상태', '관리'].map(h => (
                                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-[#555] whitespace-nowrap">{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {paged.length === 0 ? (
                            <tr><td colSpan={9} className="px-4 py-10 text-center text-sm text-[#555]">검색 결과가 없습니다.</td></tr>
                        ) : paged.map((r,index) => {
                            const st = STATUS_MAP[r.status] ?? { label: r.status, cls: 'text-[#888]' };
                            return (
                                <tr key={r.id} className="border-b border-[#171717] last:border-b-0 hover:bg-[#1f1f1f] transition-colors">
                                    <td className="px-4 py-3 text-xs text-[#888] font-mono whitespace-nowrap">{formatReportNo(r.createdAt, index)}</td>
                                    <td className="px-4 py-3 text-xs font-bold text-[#f5f5f5] whitespace-nowrap">{r.themeTitle}</td>
                                    <td className="px-4 py-3 text-xs text-[#ccc]">{r.reporterNickname}</td>
                                    <td className="px-4 py-3"><RatingStars value={r.rating} /></td>
                                    <td className="px-4 py-3 max-w-xs">
                                        <p className="truncate text-xs text-[#888]">{r.reviewContent}</p>
                                    </td>

                                    <td className="px-4 py-3 max-w-xs">
                                        <p className="truncate text-xs text-[#888]">{r.ownerReason}</p>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-[#555] whitespace-nowrap">{formatDate(r.createdAt)}</td>
                                    <td className="px-4 py-3">
                                        <span className={['text-[11px] px-2 py-0.5 rounded font-medium whitespace-nowrap', st.cls].join(' ')}>{st.label}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button onClick={() => { setViewTarget(r); setAdminReason(''); }}
                                                className="text-xs border border-[#2a2a2a] text-[#888] hover:border-[#e63946] hover:text-[#e63946] px-3 py-1.5 rounded transition-colors">보기</button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-5 py-3 border-t border-[#1f1f1f] flex items-center justify-center">
          <span className="text-xs text-[#555]">
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
                    </div>
                </div>
            </div>

            {/* Detail modal */}
            {viewTarget && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setViewTarget(null)}>
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-gray-900">신고 상세</h3>
                            <button onClick={() => setViewTarget(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-6 py-5 space-y-4">
                            <div className="grid grid-cols-[90px_1fr] gap-y-3 text-sm">
                                {[
                                    { label: '신고 번호', value: String(viewTarget.id) },
                                    { label: '테마', value: viewTarget.themeTitle },
                                    { label: '작성자', value: viewTarget.reporterNickname },
                                    { label: '작성일', value: formatDate(viewTarget.createdAt) },
                                ].map(row => (
                                    <div key={row.label} className="contents">
                                        <span className="text-gray-500">{row.label}</span>
                                        <span className="text-gray-900 font-medium">{row.value}</span>
                                    </div>
                                ))}
                                <span className="text-gray-500">평점</span>
                                <span><RatingStars value={viewTarget.rating} /></span>
                                <span className="text-gray-500 pt-1">후기 내용</span>
                                <p className="text-gray-700 leading-relaxed">{viewTarget.reviewContent}</p>
                            </div>
                            {viewTarget.ownerReason && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3.5">
                                    <p className="text-[#e63946] text-xs font-bold mb-1.5">사장님 숨김 요청 사유</p>
                                    <p className="text-sm text-gray-600">{viewTarget.ownerReason}</p>
                                </div>
                            )}
                            {viewTarget.status === 'REQUESTED_ADMIN_REVIEW' && (
                                <div>
                                    <p className="text-xs text-gray-500 mb-1.5">관리자 처리 사유 <span className="text-[#e63946]">*</span></p>
                                    <textarea
                                        value={adminReason}
                                        onChange={e => setAdminReason(e.target.value)}
                                        placeholder="처리 사유를 입력해주세요."
                                        className="w-full border border-gray-200 text-xs text-gray-800 rounded-lg px-3 py-2.5 outline-none focus:border-[#e63946] resize-none h-20"
                                    />
                                </div>
                            )}
                            {viewTarget.adminReason && (
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3.5">
                                    <p className="text-gray-700 text-xs font-bold mb-1.5">관리자 처리 사유</p>
                                    <p className="text-sm text-gray-600">{viewTarget.adminReason}</p>
                                </div>
                            )}
                        </div>
                        <div className="px-6 py-4 border-t border-gray-100 flex justify-between gap-2">
                            <button onClick={() => setViewTarget(null)}
                                    className="text-sm border border-gray-300 text-gray-600 hover:border-gray-400 px-5 py-2 rounded-lg transition-colors">닫기</button>
                            <div className="flex gap-2">
                            {viewTarget.status === 'REQUESTED_ADMIN_REVIEW' && (
                                <>
                                    <button onClick={handleReject} disabled={false}
                                            className="text-sm border border-gray-300 text-gray-600 hover:border-gray-400 disabled:opacity-40 px-5 py-2 rounded-lg transition-colors">거절</button>
                                    <button onClick={handleApprove} disabled={false}
                                            className="text-sm bg-[#e63946] hover:bg-[#c1121f] disabled:opacity-40 text-white font-bold px-5 py-2 rounded-lg transition-colors">승인</button>
                                </>
                            )}
                        </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
