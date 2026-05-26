import DashboardCard from '@/components/owner/DashboardCard';
import ReservationTable from '@/components/owner/ReservationTable';
import { Reservation } from '@/types/reservation';

// Mock data — replace with API
const mockReservations: Reservation[] = [
  { id: 1, reservationNumber: '#R240520-001', themeId: 1, themeTitle: '새벽의 저택', date: '2024.05.20 (월)', time: '14:00', adultCount: 4, totalAmount: 100000, status: 'COMPLETED', clearTime: '47:32', createdAt: '' },
  { id: 2, reservationNumber: '#R240520-002', themeId: 2, themeTitle: '망자의 서재', date: '2024.05.20 (월)', time: '16:30', adultCount: 5, totalAmount: 125000, status: 'COMPLETED', createdAt: '' },
  { id: 3, reservationNumber: '#R240520-003', themeId: 3, themeTitle: '감금된 연구소', date: '2024.05.20 (월)', time: '19:00', adultCount: 3, totalAmount: 75000, status: 'CONFIRMED', createdAt: '' },
];

export default function OwnerReservationsPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-[#f5f5f5] mb-6">예약 관리</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <DashboardCard label="전체 예약" value="128건" />
        <DashboardCard label="오늘 예약" value="12건" color="#f39c12" />
        <DashboardCard label="완료 예약" value="96건" color="#2ecc71" />
        <DashboardCard label="확정 예약" value="18건" color="#888" />
        <DashboardCard label="취소 예약" value="14건" color="#e63946" />
      </div>
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
        <div className="p-4 border-b border-[#2a2a2a] flex flex-wrap gap-3">
          <input
            placeholder="닉네임 또는 내용을 검색해주세요"
            className="flex-1 bg-[#111] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-[#f5f5f5] placeholder-[#555] focus:outline-none focus:border-[#e63946]"
          />
          <button className="bg-[#e63946] hover:bg-[#c1121f] text-white px-4 py-2 rounded text-sm transition-colors">검색</button>
        </div>
        <ReservationTable reservations={mockReservations} />
      </div>
    </div>
  );
}
