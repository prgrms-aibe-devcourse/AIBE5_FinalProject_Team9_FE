'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { OwnerReservation, OwnerReservationStats } from '@/types/reservation';
import {
  getOwnerReservations,
  getOwnerReservationStats,
  recordOwnerReservationResult,
} from '@/services/ownerService';
import { getOwnerThemes } from '@/services/themeService';

const STATUS_OPTIONS = [
  { value: '', label: '상태 전체' },
  { value: 'PENDING_PAYMENT', label: '대기' },
  { value: 'CONFIRMED', label: '확정' },
  { value: 'COMPLETED', label: '완료' },
  { value: 'CANCELLED', label: '취소' },
] as const;

const STATUS_MAP: Record <string,{ label: string; cls: string }> = {
  PENDING_PAYMENT:   { label: '대기',  cls: 'bg-[#888]/15 text-[#888]' },
  CONFIRMED: { label: '확정',  cls: 'bg-[#f39c12]/15 text-[#f39c12]' },
  COMPLETED: { label: '완료',  cls: 'bg-[#2ecc71]/15 text-[#2ecc71]' },
  CANCELLED: { label: '취소',  cls: 'bg-[#e63946]/15 text-[#e63946]' },
};

const PAGE_SIZE = 8;
const TAB_OPTIONS = ['전체', '완료', '확정', '취소'] as const;
const formatReservationNo = (id: number, date: string) =>
    `RE${date.replace(/-/g, '').slice(2)}-${String(id).padStart(3, '0')}`;

export default function OwnerReservationsPage() {
  const [themeFilter, setThemeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<typeof TAB_OPTIONS[number]>('전체');
  const [page, setPage] = useState(1)
    const [themeOpts, setThemeOpts] = useState<string[]>(['테마 전체']);

    const [reservations, setReservations] = useState<OwnerReservation[]>([]);
    const [statsData, setStatsData] = useState<OwnerReservationStats | null>(null);
    const [totalElements, setTotalElements] = useState(0);
    const [resultTarget, setResultTarget] = useState<OwnerReservation | null>(null);
    const [isCleared, setIsCleared] = useState(true);
    const [clearTime, setClearTime] = useState('');
    const [isSavingResult, setIsSavingResult] = useState(false);
    const [resultError, setResultError] = useState('');
    const [pageError, setPageError] = useState('');

    const fetchData = useCallback(async () => {
        setPageError('');
        try {
            const [resData, stats] = await Promise.all([
                getOwnerReservations({ page:0, size: 9999 }),
                getOwnerReservationStats(),
            ]);
            setReservations(resData.content);
            setTotalElements(resData.totalElements);
            setStatsData(stats);
        } catch {
            setPageError('예약 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
        }
    }, []);

    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    useEffect(() => {
        getOwnerThemes().then(themes => {
            setThemeOpts(['테마 전체', ...themes.map(t => t.title)]);
        });
    }, []);

    const filtered = useMemo(() => {
        return reservations.filter(r => {
            if (themeFilter && r.themeTitle !== themeFilter) return false;
            if (statusFilter && r.status !== statusFilter) return false;
            if (dateFrom && r.reservationDate < dateFrom) return false;
            if (dateTo && r.reservationDate > dateTo) return false;
            if (search && !r.nickname.includes(search) && !r.themeTitle.includes(search)) return false;
            if (activeTab === '완료' && r.status !== 'COMPLETED') return false;
            if (activeTab === '확정' && r.status !== 'CONFIRMED') return false;
            if (activeTab === '취소' && r.status !== 'CANCELLED') return false;
            return true;
        });
    }, [reservations, themeFilter, statusFilter, dateFrom, dateTo, search, activeTab]);
    const totalPages = useMemo(() => Math.ceil(filtered.length / PAGE_SIZE), [filtered]);
    const tabCounts = useMemo(() => ({
        전체: reservations.length,
        완료: reservations.filter(r => r.status === 'COMPLETED').length,
        확정: reservations.filter(r => r.status === 'CONFIRMED').length,
        취소: reservations.filter(r => r.status === 'CANCELLED').length,
    }), [reservations]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = () => { setSearch(searchInput); setPage(1); };
  const handleReset = () => { setThemeFilter(''); setStatusFilter(''); setDateFrom(''); setDateTo(''); setSearch(''); setSearchInput(''); setActiveTab('전체'); setPage(1); };

  const openResultModal = (reservation: OwnerReservation) => {
    setResultTarget(reservation);
    const successfulResult = reservation.escapeResult?.startsWith('성공');
    setIsCleared(successfulResult || !reservation.escapeResult || reservation.escapeResult === '결과 미입력');
    setClearTime(
      successfulResult
        ? reservation.escapeResult.replace('성공 (', '').replace(')', '')
        : '',
    );
    setResultError('');
  };

  const closeResultModal = () => {
    if (isSavingResult) return;
    setResultTarget(null);
    setResultError('');
  };

  const handleSaveResult = async () => {
    if (!resultTarget || isSavingResult) return;

    const normalizedClearTime = clearTime.trim();
    if (isCleared) {
      const match = normalizedClearTime.match(/^(\d{1,3}):([0-5]\d)$/);
      if (!match) {
        setResultError('클리어 기록을 분:초 형식으로 입력해주세요. 예: 55:10');
        return;
      }
    }

    setIsSavingResult(true);
    setResultError('');
    try {
      await recordOwnerReservationResult(resultTarget.reservationId, {
        isCleared,
        clearTime: isCleared ? normalizedClearTime : undefined,
      });
      await fetchData();
      setResultTarget(null);
      setClearTime('');
    } catch {
      setResultError('결과를 저장하지 못했습니다. 입력값과 예약 상태를 확인해주세요.');
    } finally {
      setIsSavingResult(false);
    }
  };

  const stats = {
      total: statsData?.total_count ?? 0,
      today: statsData?.today_count ?? 0,
      completed: statsData?.completed_count ?? 0,
      confirmed: statsData?.confirmed_count ?? 0,
      cancelled: statsData?.cancelled_count ?? 0,
  };

  return (
    <div className="p-6 space-y-5">
      {pageError && (
        <div className="rounded-lg border border-[#e63946]/35 bg-[#e63946]/10 px-4 py-3 text-sm text-[#ff7b84]">
          {pageError}
        </div>
      )}
      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
        {[
          { label: '전체 예약', value: `${stats.total}건`, sub: '총 예약 건수', color: '#f5f5f5', bg: 'bg-white/5',
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
          { label: '오늘 예약', value: `${stats.today}건`, sub: '오늘 예약 건수', color: '#f39c12', bg: 'bg-[#f39c12]/10',
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07l-.71.71M6.34 17.66l-.71.71m12.73 0l-.71-.71M6.34 6.34l-.71-.71M12 7a5 5 0 110 10A5 5 0 0112 7z" /></svg> },
          { label: '완료 예약', value: `${stats.completed}건`, sub: '완료된 예약', color: '#2ecc71', bg: 'bg-[#2ecc71]/10',
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
          { label: '확정 예약', value: `${stats.confirmed}건`, sub: '확정된 예약', color: '#3498db', bg: 'bg-[#3498db]/10',
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
          { label: '취소 예약', value: `${stats.cancelled}건`, sub: '취소된 예약', color: '#e63946', bg: 'bg-[#e63946]/10',
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" /></svg> },
        ].map(c => (
          <div key={c.label} className="bg-[#1a1a1a] border border-[#222] rounded-xl p-4 flex items-center gap-3">
            <div className={['w-10 h-10 rounded-lg flex items-center justify-center shrink-0', c.bg].join(' ')} style={{ color: c.color }}>
              {c.icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#666] truncate">{c.label}</p>
              <p className="text-xl font-black" style={{ color: c.color }}>{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-[#1a1a1a] border border-[#222] rounded-xl overflow-hidden">
        {/* Filter */}
        <div className="px-5 py-4 border-b border-[#1f1f1f] flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1">
            <input type="date" value={dateFrom} onChange={e => { setDateFrom(e.target.value); setPage(1); }}
              className="bg-[#111] border border-[#2a2a2a] text-xs text-[#ccc] rounded px-3 py-2 focus:outline-none focus:border-[#ffffff40] [color-scheme:dark]" />
            <span className="text-[#aaa] text-xs">~</span>
            <input type="date" value={dateTo} onChange={e => { setDateTo(e.target.value); setPage(1); }}
              className="bg-[#111] border border-[#2a2a2a] text-xs text-[#ccc] rounded px-3 py-2 focus:outline-none focus:border-[#ffffff40] [color-scheme:dark]" />
          </div>
            <div className="relative">
                <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
                        className="appearance-none bg-[#111] border border-[#2a2a2a] text-xs text-[#ccc] rounded px-3 pr-8 py-2 focus:outline-none focus:border-[#ffffff40] cursor-pointer">
                    {STATUS_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                </select>
                <svg className="w-3 h-3 text-[#666] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            <div className="relative">
                <select value={themeFilter} onChange={e => { setThemeFilter(e.target.value); setPage(1); }}
                        className="appearance-none bg-[#111] border border-[#2a2a2a] text-xs text-[#ccc] rounded px-3 pr-8 py-2 focus:outline-none focus:border-[#ffffff40] cursor-pointer">
                    <option value="">테마 전체</option>
                    {themeOpts.filter(t => t !== '테마 전체').map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <svg className="w-3 h-3 text-[#666] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
          <input value={searchInput} onChange={e => setSearchInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="닉네임 또는 내용을 검색해주세요"
            className="flex-1 min-w-44 bg-[#111] border border-[#2a2a2a] text-xs text-[#f5f5f5] placeholder-[#444] rounded px-3 py-2 focus:outline-none focus:border-[#ffffff40]" />
          <button onClick={handleReset} className="text-xs text-[#666] hover:text-[#f5f5f5] border border-[#2a2a2a] hover:border-[#444] px-3 py-2 rounded transition-colors">초기화</button>
          <button onClick={handleSearch} className="text-xs bg-[#e63946] hover:bg-[#c1121f] text-white px-4 py-2 rounded transition-colors font-medium">검색</button>
        </div>

        {/* Status tabs + excel */}
        <div className="px-5 border-b border-[#1f1f1f] flex items-center justify-between">
          <div className="flex">
            {TAB_OPTIONS.map(tab => (
              <button key={tab} onClick={() => { setActiveTab(tab); setPage(1); }}
                className={[
                  'px-4 py-3 text-xs font-medium transition-colors border-b-2',
                  activeTab === tab
                    ? 'text-[#e63946] border-[#e63946]'
                    : 'text-[#666] border-transparent hover:text-[#f5f5f5]',
                ].join(' ')}>
                {tab}
                <span className={['ml-1.5 text-[10px] font-black px-1.5 py-0.5 rounded-full', activeTab === tab ? 'bg-[#e63946] text-white' : 'bg-[#2a2a2a] text-[#888]'].join(' ')}>
                  {tabCounts[tab]}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled
            title="준비 중인 기능입니다."
            className="flex cursor-not-allowed items-center gap-1.5 text-xs text-[#444] opacity-60"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            엑셀 다운로드 · 준비 중
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1f1f1f]">
                {['예약 번호', '예약 날짜', '시간', '테마', '예약자', '연락처', '인원', '상태', '결과'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-[#555] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr><td colSpan={9} className="px-4 py-10 text-center text-sm text-[#555]">검색 결과가 없습니다.</td></tr>
              ) : paged.map(r => {
                const st = STATUS_MAP[r.status] ?? {
                  label: r.status || '알 수 없음',
                  cls: 'bg-white/5 text-[#888]',
                };
                const canRecordResult =
                  r.status === 'CONFIRMED' ||
                  (r.status === 'COMPLETED' &&
                    (!r.escapeResult || r.escapeResult === '결과 미입력'));
                return (
                  <tr key={r.reservationId} className="border-b border-[#171717] last:border-b-0 hover:bg-[#1f1f1f] transition-colors">
                    <td className="px-4 py-3 text-xs text-[#888] font-mono whitespace-nowrap">{formatReservationNo(r.reservationId, r.reservationDate)}</td>
                    <td className="px-4 py-3 text-xs text-[#ccc] whitespace-nowrap">{r.reservationDate}</td>
                    <td className="px-4 py-3 text-xs text-[#888]">{r.reservationTime}</td>
                    <td className="px-4 py-3 text-xs font-bold text-[#f5f5f5] whitespace-nowrap">{r.themeTitle}</td>
                    <td className="px-4 py-3 text-xs text-[#ccc]">{r.nickname}</td>
                    <td className="px-4 py-3 text-xs text-[#666] font-mono whitespace-nowrap">{r.phone}</td>
                    <td className="px-4 py-3 text-xs text-[#888]">{r.peopleCount}명</td>
                    <td className="px-4 py-3">
                      <span className={['text-[11px] px-2 py-0.5 rounded font-medium whitespace-nowrap', st.cls].join(' ')}>{st.label}</span>
                    </td>
                      <td className="px-4 py-3 text-xs">
                        <div className="flex min-w-[120px] items-center justify-between gap-2">
                          {r.escapeResult === '결과 미입력' || !r.escapeResult ? (
                              <span className="text-[#444]">—</span>
                          ) : r.escapeResult.startsWith('성공') ? (
                              <span className="flex items-center gap-1 text-[#e63946] whitespace-nowrap font-medium">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z" /></svg>
      클리어 타임 {r.escapeResult.replace('성공 (', '').replace(')', '')}
    </span>
                          ) : (
                              <span className="text-[#e63946] font-medium">{r.escapeResult}</span>
                          )}
                          {canRecordResult && (
                            <button
                              type="button"
                              onClick={() => openResultModal(r)}
                              className="shrink-0 rounded border border-[#e63946]/55 px-2.5 py-1.5 text-[11px] font-bold text-[#ef5353] transition-colors hover:bg-[#e63946]/10"
                            >
                              결과 입력
                            </button>
                          )}
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
              className="text-xs px-2.5 py-1.5 rounded border border-[#555] text-[#ddd] hover:border-[#444] disabled:opacity-30 transition-colors">‹</button>
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
              className="text-xs px-2.5 py-1.5 rounded border border-[#555] text-[#ddd] hover:border-[#444] disabled:opacity-30 transition-colors">›</button>
          </div>
        </div>
      </div>

      {resultTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={closeResultModal}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.1] bg-[#171717] shadow-[0_28px_80px_rgba(0,0,0,0.55)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-white/[0.07] px-6 py-5">
              <p className="text-xs font-black tracking-[0.18em] text-[#e63946]">RESERVATION RESULT</p>
              <h2 className="mt-2 text-xl font-black text-white">예약 결과 입력</h2>
              <p className="mt-1 text-sm text-[#777]">
                {resultTarget.themeTitle} · {resultTarget.reservationDate} {resultTarget.reservationTime}
              </p>
            </div>

            <div className="space-y-5 px-6 py-5">
              <fieldset>
                <legend className="mb-2 text-xs font-bold text-[#888]">클리어 여부</legend>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: true, label: '클리어' },
                    { value: false, label: '실패' },
                  ].map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setIsCleared(option.value)}
                      disabled={isSavingResult}
                      className={[
                        'rounded-lg border px-4 py-3 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                        isCleared === option.value
                          ? 'border-[#e63946] bg-[#e63946]/12 text-[#ff727b]'
                          : 'border-white/[0.08] bg-[#101010] text-[#777] hover:border-white/[0.18]',
                      ].join(' ')}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-[#888]">
                  클리어 기록 {isCleared && <span className="text-[#e63946]">*</span>}
                </span>
                <input
                  value={clearTime}
                  onChange={(event) => setClearTime(event.target.value)}
                  disabled={!isCleared || isSavingResult}
                  placeholder="예: 55:10"
                  className="w-full rounded-lg border border-white/[0.1] bg-[#0f0f0f] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#444] focus:border-[#e63946] disabled:cursor-not-allowed disabled:opacity-35"
                />
                <span className="mt-1.5 block text-[11px] text-[#555]">분:초 형식으로 입력해주세요.</span>
              </label>

              {resultError && (
                <p className="rounded-lg border border-[#e63946]/30 bg-[#e63946]/10 px-3 py-2 text-xs text-[#ff727b]">
                  {resultError}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 border-t border-white/[0.07] px-6 py-4">
              <button
                type="button"
                onClick={closeResultModal}
                disabled={isSavingResult}
                className="rounded-lg border border-white/[0.1] px-4 py-2.5 text-sm font-bold text-[#888] hover:border-white/[0.2] disabled:opacity-40"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSaveResult}
                disabled={isSavingResult}
                className="min-w-[96px] rounded-lg bg-[#e63946] px-4 py-2.5 text-sm font-black text-white transition-colors hover:bg-[#c1121f] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSavingResult ? '저장 중...' : '결과 저장'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
