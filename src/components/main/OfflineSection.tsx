import Link from 'next/link';

export default function OfflineSection() {
  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10 bg-[#111] border border-[#2a2a2a] rounded-xl overflow-hidden">
          {/* 이미지 */}
          <div className="relative w-full md:w-[340px] shrink-0 h-[220px] md:h-auto md:self-stretch">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/horror/offline-bg.jpg')" }}
            />
            {/* fallback */}
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1a0a00 0%, #0d0d0d 100%)' }}>
              <span className="text-[80px] opacity-15 select-none">🎃</span>
            </div>
          </div>

          {/* 텍스트 */}
          <div className="flex-1 px-6 py-8 md:py-10 md:pr-10">
            <p className="text-[#e63946] text-[10px] tracking-[0.25em] uppercase font-medium mb-4">
              ◈ 오프라인 소개
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug mb-4">
              GrimGate는 당신이 직접 주인공이 되는{' '}
              <span className="text-[#e63946]">오프라인 방탈출</span>입니다.
            </h2>
            <p className="text-[#888] text-sm leading-relaxed mb-2">
              제한된 시간 안에 단서를 풀어 탈출구를 찾아야 합니다.
            </p>
            <p className="text-[#888] text-sm font-semibold mb-1">
              최소 2인 이상이 팀을 이뤄야 성공할 수 있습니다.
            </p>
            <p className="text-[#555] text-xs mb-6">준비가 됐다 생각은 그만.</p>
            <Link
              href="/themes"
              className="inline-flex items-center gap-2 text-[#e63946] hover:text-[#c1121f] text-sm font-medium transition-colors group"
            >
              지금 테마 확인하기
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
