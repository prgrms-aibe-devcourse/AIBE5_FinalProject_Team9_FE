interface DashboardCardProps {
  label: string;
  value: number | string;
  color?: string;
}

export default function DashboardCard({ label, value, color = '#f5f5f5' }: DashboardCardProps) {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 flex flex-col gap-2">
      <p className="text-sm text-[#888]">{label}</p>
      <p className="text-3xl font-bold" style={{ color }}>{value}</p>
    </div>
  );
}
