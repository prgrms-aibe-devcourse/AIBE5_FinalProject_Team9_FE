const FEATURES = [
  { icon: '⌚', label: '도착시간 알림' },
  { icon: '▣', label: 'CCTV 녹화 중' },
  { icon: '▤', label: '소지품 분리' },
  { icon: '⊘', label: '스포 금지' },
];

export default function FeaturesSection() {
  return (
    <section className="border-y border-[#2a2a2a] bg-[#202020] py-16 lg:py-20">
      <div className="gg-container">
        <p className="mb-7 text-center text-[10px] font-black tracking-[0.32em] text-[#cc2222]">{'// NOTICE //'}</p>
        <div className="mx-auto grid max-w-[820px] grid-cols-2 border border-[#333] sm:grid-cols-4">
          {FEATURES.map(({ icon, label }) => (
            <div key={label} className="flex h-[118px] flex-col items-center justify-center gap-3 border-[#333] text-center [&:not(:last-child)]:border-r">
              <span className="text-2xl text-[#bdbdbd]">{icon}</span>
              <span className="text-[12px] font-bold text-[#9a9a9a]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
