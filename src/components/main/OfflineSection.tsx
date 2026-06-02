import Link from "next/link";

const STEPS = [
  {
    step: "01",
    title: "테마 찾기",
    description: "공포도, 난이도, 지역을 기준으로 원하는 테마를 찾아보세요.",
  },
  {
    step: "02",
    title: "예약 또는 메이트 모집",
    description: "함께 갈 사람이 없다면 메이트를 찾고, 준비됐다면 바로 예약하세요.",
  },
  {
    step: "03",
    title: "현장 플레이",
    description: "정해진 시간 안에 단서를 찾고 방을 탈출하세요.",
  },
  {
    step: "04",
    title: "후기와 기록 남기기",
    description: "플레이 후 공포도, 난이도, 후기를 남겨 다음 도전자에게 기록을 남기세요.",
  },
];

export default function OfflineSection() {
  return (
    <section className="relative overflow-hidden bg-[#0d0d0d] py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_42%,rgba(204,34,34,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_48%)]" />

      <div className="gg-container relative">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-[700px]">
            <p className="mb-4 text-[11px] font-black tracking-[0.24em] text-[#cc2222]">
              {"// HOW TO ENTER"}
            </p>
            <h2 className="text-[32px] font-black leading-[1.32] text-white sm:text-[40px]">
              공포에 입장하는
              <br />
              <span className="text-[#f5f5f5]">GrimGate 이용 흐름</span>
            </h2>
          </div>

          <Link
            href="/themes"
            className="inline-flex items-center text-[13px] font-black text-[#cc2222] transition-colors hover:text-white"
          >
            테마 먼저 둘러보기 <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STEPS.map(({ step, title, description }) => (
            <article
              key={step}
              className="group relative min-h-[220px] overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#1b1b1b] p-6 shadow-[0_16px_42px_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-1 hover:border-[#cc2222]/60 hover:bg-[#1f1f1f] hover:shadow-[0_20px_52px_rgba(204,34,34,0.13)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(204,34,34,0.12),transparent_32%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <span className="mb-8 inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-[#cc2222]/35 bg-[#cc2222]/10 px-3 text-[12px] font-black text-[#cc2222]">
                  {step}
                </span>
                <h3 className="text-[19px] font-black text-[#f4f4f4]">
                  {title}
                </h3>
                <p className="mt-4 text-[13px] leading-6 text-[#919191]">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
