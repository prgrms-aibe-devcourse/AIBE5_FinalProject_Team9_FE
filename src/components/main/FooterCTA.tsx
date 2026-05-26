import Link from 'next/link';

export default function FooterCTA() {
  return (
    <section className="border-t border-[#2a2a2a] bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xl">🚪</span>
          <p className="text-sm text-[#888] leading-snug">
            당신을 부르는 공포의 현장으로<br className="hidden sm:block" />
            <span className="text-[#f5f5f5] font-medium">초대합니다.</span>
          </p>
        </div>
        <Link
          href="/reservation"
          className="shrink-0 px-6 py-3 border border-[#f5f5f5]/50 text-[#f5f5f5] hover:border-[#e63946] hover:text-[#e63946] text-sm font-medium transition-colors duration-200"
        >
          방탈출 예약하러 가기 →
        </Link>
      </div>
    </section>
  );
}
