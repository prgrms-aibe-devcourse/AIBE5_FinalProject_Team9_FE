import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-7xl font-black text-[#e63946]">404</h1>
      <p className="text-[#f5f5f5] text-xl font-semibold">페이지를 찾을 수 없습니다</p>
      <p className="text-[#888] text-sm">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <Link href="/" className="bg-[#e63946] hover:bg-[#c1121f] text-white px-5 py-2.5 rounded text-sm transition-colors">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
