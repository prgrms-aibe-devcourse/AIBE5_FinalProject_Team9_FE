'use client';

import { useState, useMemo } from 'react';

type ResultType = 'clear' | 'fail' | 'noshow' | null;
type StatusType = 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'PENDING';

interface Reservation {
  id: number;
  no: string;
  theme: string;
  user: string;
  phone: string;
  date: string;
  dateDisplay: string;
  time: string;
  party: number;
  amount: number;
  status: StatusType;
  result: ResultType;
  clearTime: string | null;
}

const MOCK_RESERVATIONS: Reservation[] = [
  { id: 1, no: '#R240520-001', theme: '새벽의 저택', user: '김민수', phone: '010-1234-5678', date: '2024-05-20', dateDisplay: '2024.05.20 (월)', time: '14:00', party: 4, amount: 100000, status: 'COMPLETED', result: 'clear', clearTime: '47:32' },
  { id: 2, no: '#R240520-002', theme: '망자의 서재', user: '이서연', phone: '010-2345-6789', date: '2024-05-20', dateDisplay: '2024.05.20 (월)', time: '16:30', party: 5, amount: 125000, status: 'COMPLETED', result: 'fail', clearTime: null },
  { id: 3, no: '#R240520-003', theme: '감금된 연구소', user: '박지훈', phone: '010-3456-7890', date: '2024-05-20', dateDisplay: '2024.05.20 (월)', time: '19:00', party: 3, amount: 75000, status: 'CONFIRMED', result: null, clearTime: null },
  { id: 4, no: '#R240521-004', theme: '새벽의 저택', user: '최유나', phone: '010-4567-8901', date: '2024-05-21', dateDisplay: '2024.05.21 (화)', time: '11:00', party: 6, amount: 150000, status: 'COMPLETED', result: 'clear', clearTime: '47:32' },
  { id: 5, no: '#R240521-005', theme: '망자의 서재', user: '정현우', phone: '010-5678-9012', date: '2024-05-21', dateDisplay: '2024.05.21 (화)', time: '14:30', party: 4, amount: 100000, status: 'CANCELLED', result: null, clearTime: null },
  { id: 6, no: '#R240521-006', theme: '감금된 연구소', user: '한지민', phone: '010-6789-0123', date: '2024-05-21', dateDisplay: '2024.05.21 (화)', time: '17:00', party: 2, amount: 50000, status: 'COMPLETED', result: 'noshow', clearTime: null },
  { id: 7, no: '#R240521-007', theme: '새벽의 저택', user: '오세훈', phone: '010-7890-1234', date: '2024-05-21', dateDisplay: '2024.05.21 (화)', time: '20:00', party: 5, amount: 125000, status: 'CONFIRMED', result: null, clearTime: null },
  { id: 8, no: '#R240522-008', theme: '망자의 서재', user: '임수빈', phone: '010-8901-2345', date: '2024-05-22', dateDisplay: '2024.05.22 (수)', time: '12:00', party: 3, amount: 75000, status: 'COMPLETED', result: 'clear', clearTime: '47:32' },
  { id: 9, no: '#R240522-009', theme: '피의 연회', user: '강현우', phone: '010-9012-3456', date: '2024-05-22', dateDisplay: '2024.05.22 (수)', time: '15:00', party: 4, amount: 100000, status: 'COMPLETED', result: 'clear', clearTime: '52:18' },
  { id: 10, no: '#R240522-010', theme: '감금된 연구소', user: '윤지민', phone: '010-0123-4567', date: '2024-05-22', dateDisplay: '2024.05.22 (수)', time: '18:30', party: 2, amount: 50000, status: 'CANCELLED', result: null, clearTime: null },
  { id: 11, no: '#R240523-011', theme: '새벽의 저택', user: '장서준', phone: '010-1234-5671', date: '2024-05-23', dateDisplay: '2024.05.23 (목)', time: '13:00', party: 5, amount: 125000, status: 'COMPLETED', result: 'fail', clearTime: null },
  { id: 12, no: '#R240523-012', theme: '피의 연회', user: '배민지', phone: '010-2345-6782', date: '2024-05-23', dateDisplay: '2024.05.23 (목)', time: '16:00', party: 3, amount: 75000, status: 'CONFIRMED', result: null, clearTime: null },
  { id: 13, no: '#R240524-013', theme: '망자의 서재', user: '신원호', phone: '010-3456-7893', date: '2024-05-24', dateDisplay: '2024.05.24 (금)', time: '11:30', party: 4, amount: 100000, status: 'COMPLETED', result: 'clear', clearTime: '39:55' },
  { id: 14, no: '#R240524-014', theme: '새벽의 저택', user: '류하은', phone: '010-4567-8904', date: '2024-05-24', dateDisplay: '2024.05.24 (금)', time: '14:00', party: 6, amount: 150000, status: 'COMPLETED', result: 'clear', clearTime: '44:10' },
  { id: 15, no: '#R240524-015', theme: '감금된 연구소', user: '고세진', phone: '010-5678-9015', date: '2024-05-24', dateDisplay: '2024.05.24 (금)', time: '17:30', party: 3, amount: 75000, status: 'PENDING', result: null, clearTime: null },
  { id: 16, no: '#R240525-016', theme: '피의 연회', user: '조민아', phone: '010-6789-0126', date: '2024-05-25', dateDisplay: '2024.05.25 (토)', time: '20:00', party: 5, amount: 125000, status: 'CONFIRMED', result: null, clearTime: null },
];

const THEMES_OPTS = ['전체', '새벽의 저택', '피의 연회', '망자의 서재', '감금된 연구소'];
const STATUS_OPTS = ['전체', '대기', '확정', '완료', '취소'];
const STATUS_CODES: Record<string, StatusType | ''> = { '전체': '', '대기': 'PENDING', '확정': 'CONFIRMED', '완료': 'COMPLETED', '취소': 'CANCELLED' };

const STATUS_MAP: Record<StatusType, { label: string; cls: string }> = {
  PENDING:   { label: '대기',  cls: 'bg-[#888]/15 text-[#888]' },
  CONFIRMED: { label: '확정',  cls: 'bg-[#f39c12]/15 text-[#f39c12]' },
  COMPLETED: { label: '완료',  cls: 'bg-[#2ecc71]/15 text-[#2ecc71]' },
  CANCELLED: { label: '취소',  cls: 'bg-[#e63946]/15 text-[#e63946]' },
};

const PAGE_SIZE = 8;
const TAB_OPTIONS = ['전체', '완료', '확정', '취소'] as const;

export default function OwnerReservationsPage() {
  const [themeFilter, setThemeFilter] = useState('전체');
  const [statusFilter, setStatusFilter] = useState('전체');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<typeof TAB_OPTIONS[number]>('전체');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return MOCK_RESERVATIONS.filter(r => {
      if (themeFilter !== '전체' && r.theme !== themeFilter) return false;
      const code = STATUS_CODES[statusFilter];
      if (code && r.status !== code) return false;
      if (dateFrom && r.date < dateFrom) return false;
      if (dateTo && r.date > dateTo) return false;
      if (search && !r.user.includes(search) && !r.no.includes(search) && !r.theme.includes(search)) return false;
      // Tab filter
      if (activeTab === '완료' && r.status !== 'COMPLETED') return false;
      if (activeTab === '확정' && r.status !== 'CONFIRMED') return false;
      if (activeTab === '취소' && r.status !== 'CANCELLED') return false;
      return true;
    });
  }, [themeFilter, statusFilter, dateFrom, dateTo, search, activeTab]);

  const tabCounts = useMemo(() => ({
    전체: MOCK_RESERVATIONS.length,
    완료: MOCK_RESERVATIONS.filter(r => r.status === 'COMPLETED').length,
    확정: MOCK_RESERVATIONS.filter(r => r.status === 'CONFIRMED').length,
    취소: MOCK_RESERVATIONS.filter(r => r.status === 'CANCELLED').length,
  }), []);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = () => { setSearch(searchInput); setPage(1); };
  const handleReset = () => { setThemeFilter('전체'); setStatusFilter('전체'); setDateFrom(''); setDateTo(''); setSearch(''); setSearchInput(''); setActiveTab('전체'); setPage(1); };

  const stats = useMemo(() => ({
    total: MOCK_RESERVATIONS.length,
    today: MOCK_RESERVATIONS.filter(r => r.date === '2024-05-20').length,
    completed: MOCK_RESERVATIONS.filter(r => r.status === 'COMPLETED').length,
    confirmed: MOCK_RESERVATIONS.filter(r => r.status === 'CONFIRMED').length,
    cancelled: MOCK_RESERVATIONS.filter(r => r.status === 'CANCELLED').length,
  }), []);

  return (
    <div className="p-6 space-y-5">
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
              className="bg-[#111] border border-[#2a2a2a] text-xs text-[#ccc] rounded px-3 py-2 focus:outline-none focus:border-[#e63946]" />
            <span className="text-[#555] text-xs">~</span>
            <input type="date" value={dateTo} onChange={e => { setDateTo(e.target.value); setPage(1); }}
              className="bg-[#111] border border-[#2a2a2a] text-xs text-[#ccc] rounded px-3 py-2 focus:outline-none focus:border-[#e63946]" />
          </div>
          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
            className="bg-[#111] border border-[#2a2a2a] text-xs text-[#ccc] rounded px-3 py-2 focus:outline-none focus:border-[#e63946]">
            {STATUS_OPTS.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={themeFilter} onChange={e => { setThemeFilter(e.target.value); setPage(1); }}
            className="bg-[#111] border border-[#2a2a2a] text-xs text-[#ccc] rounded px-3 py-2 focus:outline-none focus:border-[#e63946]">
            {THEMES_OPTS.map(t => <option key={t}>{t}</option>)}
          </select>
          <input value={searchInput} onChange={e => setSearchInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="닉네임 또는 내용을 검색해주세요"
            className="flex-1 min-w-44 bg-[#111] border border-[#2a2a2a] text-xs text-[#f5f5f5] placeholder-[#444] rounded px-3 py-2 focus:outline-none focus:border-[#e63946]" />
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
                {['예약 번호', '예약 날짜', '시간', '테마', '예약자', '연락처', '인원', '상태', '결과'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-[#555] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr><td colSpan={9} className="px-4 py-10 text-center text-sm text-[#555]">검색 결과가 없습니다.</td></tr>
              ) : paged.map(r => {
                const st = STATUS_MAP[r.status];
                return (
                  <tr key={r.id} className="border-b border-[#171717] last:border-b-0 hover:bg-[#1f1f1f] transition-colors">
                    <td className="px-4 py-3 text-xs text-[#555] font-mono whitespace-nowrap">{r.no}</td>
                    <td className="px-4 py-3 text-xs text-[#ccc] whitespace-nowrap">{r.dateDisplay}</td>
                    <td className="px-4 py-3 text-xs text-[#888]">{r.time}</td>
                    <td className="px-4 py-3 text-xs font-bold text-[#f5f5f5] whitespace-nowrap">{r.theme}</td>
                    <td className="px-4 py-3 text-xs text-[#ccc]">{r.user}</td>
                    <td className="px-4 py-3 text-xs text-[#666] font-mono whitespace-nowrap">{r.phone}</td>
                    <td className="px-4 py-3 text-xs text-[#888]">{r.party}명</td>
                    <td className="px-4 py-3">
                      <span className={['text-[11px] px-2 py-0.5 rounded font-medium whitespace-nowrap', st.cls].join(' ')}>{st.label}</span>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {r.result === 'clear' && (
                        <span className="flex items-center gap-1 text-[#e63946] whitespace-nowrap font-medium">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z" /></svg>
                          클리어 타임 {r.clearTime}
                        </span>
                      )}
                      {r.result === 'fail' && <span className="text-[#e63946] font-medium">실패</span>}
                      {r.result === 'noshow' && <span className="text-[#f39c12] font-medium">노쇼</span>}
                      {!r.result && <span className="text-[#444]">—</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 border-t border-[#1f1f1f] flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs text-[#555]">
            {filtered.length}건 중 {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} 표시
          </span>
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
  );
}
