import Link from 'next/link';

export default function OfflineSection() {
  return (
    <section className="bg-[#0d0d0d] py-20 lg:py-24">
      <div className="gg-container grid grid-cols-1 items-center gap-16 md:grid-cols-[0.38fr_0.62fr] lg:gap-24">
        <div className="relative h-[260px] overflow-hidden bg-[#111]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/horror/offline-scene.png')" }}
          />
        </div>

        <div>
          <p className="mb-4 text-[11px] font-black tracking-[0.24em] text-[#cc2222]">{'// 방탈출 안내'}</p>
          <h2 className="mb-5 text-[29px] font-black leading-[1.35] text-white sm:text-[36px]">
            GrimGate는 당신이 직접 주인공이 되는
            <br />
            오프라인 방탈출입니다.
          </h2>
          <div className="mb-6 space-y-2 text-[14px] leading-7 text-[#8f8f8f]">
            <p>제한된 시간 안에 단서를 풀어 탈출구를 찾아야 합니다.</p>
            <p className="font-bold text-[#d9d9d9]">최소 2인 이상 예약해야 성공할 수 있습니다.</p>
            <p>혼자서는 살아 나올 수 없습니다.</p>
          </div>
          <Link href="/themes" className="text-[13px] font-bold text-[#cc2222] transition-colors hover:text-white">
            자세한 내용 확인하기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
