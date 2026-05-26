const FEATURES = [
  { icon: '🔔', label: '도착시간 알림' },
  { icon: '📹', label: 'CCTV 녹화 중' },
  { icon: '🎒', label: '소지품 분리' },
  { icon: '🚫', label: '스포 금지' },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#111] border-y border-[#2a2a2a] py-10">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-[10px] text-[#555] tracking-[0.3em] uppercase font-medium mb-8">
          ◈ SERVICE
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
          {FEATURES.map(({ icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-2xl">
                {icon}
              </div>
              <span className="text-xs text-[#888] text-center">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
