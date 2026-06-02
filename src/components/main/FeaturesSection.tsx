const FEATURES = [
  {
    icon: "◷",
    label: "도착시간 알림",
    description: "예약 시간 15분 전 도착을 권장합니다.",
  },
  {
    icon: "▣",
    label: "CCTV 녹화 중",
    description: "안전 관리를 위해 일부 구역이 녹화됩니다.",
  },
  {
    icon: "▤",
    label: "소지품 분리",
    description: "플레이 전 소지품은 보관함에 맡겨주세요.",
  },
  {
    icon: "⊘",
    label: "스포 방지",
    description: "후기 작성 시 스포일러가 있을 경우 가릴 수 있습니다.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative overflow-hidden border-y border-[#252525] bg-[#151515] py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(204,34,34,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_42%)]" />

      <div className="gg-container relative">
        <div className="mb-10 text-center">
          <p className="mb-3 text-[10px] font-black tracking-[0.32em] text-[#cc2222]">
            {"// NOTICE //"}
          </p>
          <h2 className="text-[24px] font-black text-[#f4f4f4]">
            플레이 전 안내
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon, label, description }) => (
            <article
              key={label}
              className="group min-h-[168px] rounded-[14px] border border-white/[0.08] bg-[#1b1b1b] p-5 shadow-[0_14px_34px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-[#cc2222]/55 hover:bg-[#1f1f1f] hover:shadow-[0_18px_44px_rgba(204,34,34,0.12)]"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.1] bg-[#111] text-[21px] text-[#d8d8d8] transition-colors group-hover:border-[#cc2222]/50 group-hover:text-white">
                {icon}
              </div>
              <h3 className="text-[16px] font-black text-[#f4f4f4]">{label}</h3>
              <p className="mt-3 text-[13px] leading-6 text-[#8d8d8d]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
