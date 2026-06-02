import Link from "next/link";

export default function FooterCTA() {
  return (
    <section className="relative overflow-hidden border-t border-[#3a1717] bg-[#151515] py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_45%,rgba(204,34,34,0.24),transparent_36%),radial-gradient(circle_at_86%_52%,rgba(204,34,34,0.12),transparent_30%),linear-gradient(90deg,rgba(204,34,34,0.12),transparent_50%,rgba(0,0,0,0.32))]" />

      <div className="gg-container relative flex flex-col gap-8 lg:min-h-[180px] lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-[720px]">
          <p className="mb-3 text-[11px] font-black tracking-[0.22em] text-[#cc2222]">
            {"// QUICK RESERVATION"}
          </p>
          <h2 className="text-[32px] font-black leading-tight text-[#f5f5f5] sm:text-[40px]">
            오늘 열려 있는 문부터 확인하세요.
          </h2>
          <p className="mt-4 text-[14px] leading-7 text-[#9a9a9a]">
            오늘부터 3일 안에 예약 가능한 테마만 빠르게 모아볼 수 있습니다.
          </p>
          <p className="mt-2 text-[13px] font-bold text-[#d0d0d0]">
            남은 시간표가 있는 공포만 확인하고, 바로 예약하세요.
          </p>
        </div>

        <div className="flex lg:min-w-[260px] lg:items-center lg:justify-end">
          <Link
            href="/reservation"
            className="inline-flex h-12 min-w-[210px] items-center justify-center rounded-[8px] border border-[#cc2222] bg-[#cc2222] px-7 text-[13px] font-black text-white shadow-[0_0_34px_rgba(204,34,34,0.32)] transition-all hover:-translate-y-0.5 hover:bg-[#e12a2a] hover:shadow-[0_0_48px_rgba(204,34,34,0.46)]"
          >
            빠른 예약하러 가기
          </Link>
        </div>
      </div>
    </section>
  );
}
