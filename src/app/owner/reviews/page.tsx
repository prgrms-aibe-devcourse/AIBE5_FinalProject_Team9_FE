import DashboardCard from '@/components/owner/DashboardCard';

// 사장님 후기 관리
export default function OwnerReviewsPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-[#f5f5f5] mb-6">후기 관리</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <DashboardCard label="전체 후기" value="152건" />
        <DashboardCard label="공개 중 후기" value="138건" color="#2ecc71" />
        <DashboardCard label="숨김 처리된 후기" value="14건" color="#e63946" />
      </div>
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
        <p className="text-[#888] text-sm">후기 목록</p>
      </div>
    </div>
  );
}
