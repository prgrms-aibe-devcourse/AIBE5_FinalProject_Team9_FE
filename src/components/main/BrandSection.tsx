const brandValues = [
  {
    number: "01",
    title: "AI로 취향에 맞는 테마 추천",
    description:
      "공포도, 인원수, 선호 분위기를 말하면 령냥이가 어울리는 테마를 추천합니다.",
  },
  {
    number: "02",
    title: "가능한 시간을 빠르게",
    description:
      "오늘부터 3일 안에 예약 가능한 테마만 모아 남은 시간표를 바로 확인할 수 있습니다.",
  },
  {
    number: "03",
    title: "함께 갈 메이트 모집",
    description:
      "함께 갈 사람이 없다면 메이트를 모집해 같은 공포에 함께 입장할 수 있습니다.",
  },
  {
    number: "04",
    title: "실제 후기로 더 신중하게",
    description:
      "별점, 공포도, 난이도, 플레이 후기를 참고해 실패 없는 테마 선택을 도와줍니다.",
  },
];

const brandStats = ["등록 테마 120+", "누적 후기 3,400+", "제휴 지점 24곳"];

export default function BrandSection() {
  return (
    <section className="relative overflow-hidden border-t border-[#252525] bg-[#191919] py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_45%,rgba(204,34,34,0.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_38%,rgba(0,0,0,0.18))]" />

      <div className="gg-container relative grid grid-cols-1 items-center gap-14 md:grid-cols-[0.47fr_0.53fr] lg:gap-20">
        <div
          className="relative h-[450px] overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#080808] shadow-[0_22px_70px_rgba(0,0,0,0.42),0_0_34px_rgba(204,34,34,0.08)] md:h-[540px]"
          role="img"
          aria-label="GrimGate 공포 방탈출 브랜드 이미지"
        >
          <div
            className="absolute inset-0 bg-cover bg-center brightness-90 contrast-110 saturate-75"
            style={{
              backgroundImage: "url('/images/horror/about-portrait.png')",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.2)),radial-gradient(circle_at_60%_30%,transparent,rgba(0,0,0,0.3))]" />
          <span className="absolute left-4 top-4 h-9 w-9 border-l border-t border-[#e23b3b]" />
          <span className="absolute bottom-4 right-4 h-9 w-9 border-b border-r border-[#e23b3b]" />
        </div>

        <div className="max-w-[640px]">
          <p className="mb-5 text-[11px] font-black tracking-[0.24em] text-[#cc2222]">
            {"// GRIMGATE IDENTITY"}
          </p>

          <h2 className="text-[33px] font-black leading-[1.22] text-[#f5f5f5] sm:text-[40px] lg:text-[43px]">
            공포를 고르는 순간부터
            <br />
            당신의 이야기는 <span className="text-[#e23b3b]">시작됩니다.</span>
          </h2>

          <p className="mt-5 max-w-[600px] text-[14px] leading-7 text-[#b0b0b0]">
            GrimGate는 공포를 고르는 순간부터 함께할 사람, 남은 시간, 실제
            후기까지. <br /> 당신의 선택을 더 선명하게 만들어주는 공포 방탈출
            플랫폼입니다.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {brandStats.map((stat) => (
              <span
                key={stat}
                className="rounded-full border border-white/[0.08] bg-[#101010]/70 px-3.5 py-2 text-[12px] font-bold text-[#a7a7a7]"
              >
                {stat}
              </span>
            ))}
          </div>

          <ul className="mt-6 space-y-2.5">
            {brandValues.map(({ number, title, description }) => (
              <li
                key={number}
                className="rounded-r-[10px] border border-l-2 border-white/[0.07] border-l-[#e23b3b] bg-[linear-gradient(90deg,rgba(226,59,59,0.07),rgba(21,21,21,0.76)_24%,rgba(21,21,21,0.58))] px-4.5 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_10px_24px_rgba(0,0,0,0.16)]"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                  <span className="text-[11px] font-black tracking-[0.16em] text-[#e23b3b]">
                    {number}
                  </span>
                  <h3 className="text-[15px] font-black text-white">
                    {title}
                  </h3>
                </div>
                <p className="mt-1.5 text-[12px] font-medium leading-5 text-[#a6a6a6]">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
