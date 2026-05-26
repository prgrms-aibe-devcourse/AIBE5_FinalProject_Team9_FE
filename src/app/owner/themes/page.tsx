// 사장님 테마 관리
export default function OwnerThemesPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-[#f5f5f5]">테마 관리</h1>
        <button className="bg-[#e63946] hover:bg-[#c1121f] text-white px-4 py-2 rounded text-sm transition-colors">
          + 테마 추가
        </button>
      </div>
      <p className="text-[#888] text-sm">등록된 테마를 관리할 수 있습니다.</p>
    </div>
  );
}
