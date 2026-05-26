import DashboardCard from '@/components/owner/DashboardCard';

// 사장님 대시보드
export default function OwnerDashboardPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-[#f5f5f5]">예약 관리</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <DashboardCard label="전체 예약" value="128건" />
        <DashboardCard label="오늘 예약" value="12건" color="#f39c12" />
        <DashboardCard label="완료 예약" value="96건" color="#2ecc71" />
        <DashboardCard label="확정 예약" value="18건" color="#888" />
        <DashboardCard label="취소 예약" value="14건" color="#e63946" />
      </div>
    </div>
  );
}
