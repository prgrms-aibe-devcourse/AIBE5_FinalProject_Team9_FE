"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function HeroBanner() {
    const router = useRouter();

  return (
    <section className="relative isolate flex min-h-[calc(100vh-52px)] items-center overflow-hidden border-b border-[#211313] bg-[#0d0d0d] py-12 lg:py-0">
        <div
            className="absolute top-[50%] bottom-[40%] right-[26%] w-[10%] z-20 cursor-pointer"
            onClick={() => router.push('/minigame')}
        />
        <div className="pointer-events-none absolute inset-y-0 right-[-10vw] z-0 w-[92vw] opacity-100 lg:right-[-8vw] lg:w-[78vw]">
          <div
          className="absolute inset-y-[3%] right-0 w-full bg-cover bg-[center_center] brightness-110 contrast-110 saturate-110 lg:bg-[center_center]"
          style={{
            backgroundImage: "url('/images/horror/grimgate_hero_highres.webp')",
            maskImage:
              "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 9%, black 20%, black 78%, rgba(0,0,0,0.58) 91%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 9%, black 20%, black 78%, rgba(0,0,0,0.58) 91%, transparent 100%)",
          }}
        />
        <div className="absolute inset-y-0 left-[-1px] w-[56%] bg-[linear-gradient(90deg,#0d0d0d_0%,rgba(13,13,13,0.76)_22%,rgba(13,13,13,0.28)_55%,rgba(13,13,13,0)_100%)]" />
        <div className="absolute inset-y-0 right-0 w-[24%] bg-[linear-gradient(270deg,#0d0d0d_0%,rgba(13,13,13,0.62)_20%,rgba(13,13,13,0)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[32%] bg-[linear-gradient(0deg,#0d0d0d_0%,rgba(13,13,13,0.76)_24%,rgba(13,13,13,0)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-[20%] bg-[linear-gradient(180deg,#0d0d0d_0%,rgba(13,13,13,0.46)_34%,rgba(13,13,13,0)_100%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_64%_50%,rgba(204,34,34,0.2)_0%,rgba(204,34,34,0.08)_30%,rgba(13,13,13,0)_58%)]" />

      <div className="gg-container relative z-10 flex min-h-[720px] items-center lg:min-h-[calc(100vh-52px)]">
        <div className="max-w-[640px] lg:translate-x-4">
          <p className="mb-8 flex items-center gap-4 text-[11px] font-black tracking-[0.18em] text-[#cc2222]">
            <span className="h-px w-10 bg-[#cc2222]" />
            공포 방탈출
          </p>

          <h1 className="mb-9 font-black leading-[1.08]">
            <span className="mb-6 block text-[clamp(3.35rem,4.55vw,5.25rem)] text-[#cc2222]">
              GrimGate.
            </span>
            <span className="block text-[clamp(2.75rem,4.05vw,4.75rem)] text-[#eeeeee] drop-shadow-[0_3px_18px_rgba(0,0,0,0.8)]">
              문 너머 공포가
              <br className="hidden sm:block" />
              당신을 기다립니다.
            </span>
          </h1>

          <div className="mb-11 text-[15px] leading-10 text-[#9a9a9a] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            <p>이 페이지를 보는 동안, 무언가도 당신을 보고 있다.</p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href="/reservation"
              className="group inline-flex h-14 w-full items-center justify-center gap-4 bg-[#cc2222] px-6 text-[14px] font-black text-white shadow-[0_0_0_rgba(204,34,34,0)] transition-all duration-200 hover:bg-[#e12a2a] hover:shadow-[0_0_24px_rgba(204,34,34,0.34)] sm:w-auto sm:min-w-[286px]"
            >
              <span className="whitespace-nowrap pl-2">
                방탈출 예약하러 가기
              </span>
              <span className="shrink-0 pr-2 text-base transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/mate"
              className="group inline-flex h-14 w-full items-center justify-center gap-4 border border-[#cc2222] bg-[#0d0d0d]/30 px-6 text-[14px] font-bold text-[#f5f5f5] backdrop-blur-[1px] transition-all duration-200 hover:bg-[#cc2222]/14 hover:shadow-[0_0_18px_rgba(204,34,34,0.18)] sm:w-auto sm:min-w-[266px]"
            >
              <span className="whitespace-nowrap pl-2">메이트 모집하기</span>
              <span className="shrink-0 pr-2 text-base transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
