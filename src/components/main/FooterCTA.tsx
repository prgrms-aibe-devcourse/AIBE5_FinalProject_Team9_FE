import Link from 'next/link';

export default function FooterCTA() {
  return (
    <section className="border-t border-[#3a1717] bg-[#1c1c1c]">
      <div className="gg-container flex flex-col items-center justify-between gap-8 py-12 sm:flex-row">
        <div className="flex items-center gap-5">
          <span className="text-4xl">🎭</span>
          <div>
            <p className="mb-1 text-[11px] font-black tracking-[0.18em] text-[#cc2222]">5월 예약 혜택</p>
            <p className="text-[17px] leading-7 text-[#dcdcdc]">
              당신을 부르는 공포의 현장으로<br className="hidden sm:block" />
              초대합니다.
            </p>
          </div>
        </div>
        <Link
          href="/reservation"
          className="flex h-12 min-w-[210px] items-center justify-center border border-[#cc2222] px-7 text-[13px] font-bold text-[#f5f5f5] transition-colors hover:bg-[#cc2222]"
        >
          방탈출 예약하러 가기
        </Link>
      </div>
    </section>
  );
}
