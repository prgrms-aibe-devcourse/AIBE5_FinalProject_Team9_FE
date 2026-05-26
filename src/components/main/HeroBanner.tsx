'use client';

import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative min-h-screen flex overflow-hidden">
      {/* ── 좌측 텍스트 영역 ── */}
      <div className="relative z-10 flex flex-col justify-center w-full md:w-[55%] px-6 sm:px-10 lg:px-20 py-24 bg-[#0d0d0d]">
        {/* 붉은 라인 + 레이블 */}
        <p className="flex items-center gap-3 text-[#e63946] text-xs font-medium tracking-widest mb-6 uppercase">
          <span className="block w-8 h-px bg-[#e63946]" />
          공포 방탈출
        </p>

        {/* 헤드라인 */}
        <h1 className="font-black text-white leading-[1.05] tracking-tight mb-5">
          <span className="block text-[clamp(2.8rem,6vw,5rem)]">GrimGate,</span>
          <span className="block text-[clamp(2rem,4.5vw,3.8rem)] mt-2">
            문 너머 공포가<br />당신을 기다립니다.
          </span>
        </h1>

        {/* 서브 문구 */}
        <p className="text-sm text-[#aaa] mb-1 leading-relaxed">
          메이트와 함께 완성하는 탈출,{' '}
          <span className="text-[#e63946] font-medium">GrimGate에서</span>
        </p>
        <p className="text-sm text-[#666] mb-10 leading-relaxed">
          이 페이지를 보는 동안,<br />무언가도 당신을 보고 있다.
        </p>

        {/* CTA 버튼 */}
        <div className="flex flex-col gap-3 max-w-xs">
          <Link
            href="/reservation"
            className="flex items-center justify-between px-5 py-4 border border-[#f5f5f5]/60 text-[#f5f5f5] hover:border-[#e63946] hover:text-[#e63946] transition-colors duration-200 text-sm font-medium group"
          >
            방탈출 예약하러 가기
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/ai-recommend"
            className="flex items-center justify-between px-5 py-4 border border-[#f5f5f5]/60 text-[#f5f5f5] hover:border-[#e63946] hover:text-[#e63946] transition-colors duration-200 text-sm font-medium group"
          >
            AI 테마 추천 받기
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* ── 우측 이미지 영역 ── */}
      <div className="hidden md:block absolute right-0 top-0 w-[48%] h-full">
        {/* 이미지 placeholder — 실제 이미지 경로로 교체 */}
        <div
          className="w-full h-full bg-[#111] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/horror/hero-door.jpg')" }}
        >
          {/* 이미지 없을 때 fallback 그라데이션 */}
          <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]"
            style={{
              background: 'linear-gradient(135deg, #1a0000 0%, #0d0d0d 40%, #2a0000 100%)',
            }}
          >
            <div className="text-center select-none">
              <div className="text-[120px] opacity-10">🚪</div>
              <p className="text-[#333] text-xs mt-2 tracking-widest uppercase">CAN YOU ESCAPE?</p>
            </div>
          </div>
        </div>
        {/* 좌측 그라데이션 페이드 */}
        <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-[#0d0d0d] to-transparent pointer-events-none" />
      </div>

      {/* 모바일: 배경 오버레이 */}
      <div
        className="md:hidden absolute inset-0 bg-[#0d0d0d]/80 z-0"
        style={{ backgroundImage: "url('/images/horror/hero-door.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
    </section>
  );
}
