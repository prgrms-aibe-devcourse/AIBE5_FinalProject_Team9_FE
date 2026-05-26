// GrimGate 브랜드 소개 섹션 — 이미지 좌 / 문구 우
export default function BrandSection() {
  return (
    <section className="py-0 my-14">
      <div className="flex flex-col md:flex-row min-h-[420px]">
        {/* 좌측 이미지 */}
        <div className="relative w-full md:w-[45%] min-h-[260px] md:min-h-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/horror/brand-bg.jpg')" }}
          />
          {/* fallback */}
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(160deg, #1a0000 0%, #0d0d0d 50%, #1a0505 100%)' }}>
            <span className="text-[100px] opacity-10 select-none">👁</span>
          </div>
          {/* 우측 페이드 */}
          <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-r from-transparent to-[#131313] pointer-events-none hidden md:block" />
        </div>

        {/* 우측 텍스트 */}
        <div className="w-full md:w-[55%] bg-[#131313] flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12">
          <p className="text-[#e63946] text-xs tracking-[0.2em] uppercase font-medium mb-5">
            ◈ GRIMGATE/ABOUT
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-snug mb-4">
            GrimGate는<br />
            용기 있는 자만이<br />
            도전할{' '}
            <span className="text-[#e63946]">공포 방탈출</span>입니다.
          </h2>
          <p className="text-[#888] text-sm leading-relaxed mb-3">
            &ldquo;헤어나오기 힘들 정도로 단단하게 짜여, 숨기어 사람을 믿고<br className="hidden sm:block" />
            제게 어떻게 해줄 수 있어요? 방문은 금지되어 있어요&rdquo;
          </p>
          <p className="text-[#555] text-xs">살아서 나올 수 있다면... 행운을 빕니다.</p>
        </div>
      </div>
    </section>
  );
}
