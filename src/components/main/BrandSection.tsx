export default function BrandSection() {
  return (
    <section className="border-t border-[#252525] bg-[#1b1b1b] py-20 lg:py-24">
      <div className="gg-container grid grid-cols-1 items-center gap-16 md:grid-cols-[0.42fr_0.58fr] lg:gap-24">
        <div className="relative h-[520px] overflow-hidden bg-[#080808]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/horror/about-portrait.png')",
            }}
          />
          <span className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-[#cc2222]" />
          <span className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-[#cc2222]" />
        </div>

        <div className="max-w-[560px]">
          <p className="mb-6 text-[11px] font-black tracking-[0.24em] text-[#cc2222]">
            {"// GRIMGATE"}
          </p>
          <h2 className="mb-6 text-[32px] font-black leading-[1.28] text-[#f5f5f5] sm:text-[40px]">
            GrimGate는
            <br />
            용기 있는 자만이 도전할
            <br />
            <span className="text-[#cc2222]">공포 방탈출입니다.</span>
          </h2>

          <div
            className="relative space-y-4 text-[14px] leading-7 text-[#8c8c8c]"
            style={{ paddingLeft: "26px" }}
          >
            <span
              className="absolute top-1 w-px bg-[#cc2222]/70"
              style={{ left: 0, height: "calc(100% - 8px)" }}
            />
            <p>헤어나오기 힘들 정도로 단단하게 짜인 방.</p>
            <p>당신은 어둠 속에서 무엇을 믿고, 누구를 의심해야 할까요?</p>
            <p>살아서 나올 수 있다면... 행운을 빕니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
