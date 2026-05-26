import { Reservation } from '@/types/reservation';

interface ReservationTableProps {
  reservations: Reservation[];
  onStatusChange?: (id: number, status: string) => void;
}

const statusLabel: Record<string, { text: string; color: string }> = {
  PENDING: { text: '확정 대기', color: 'text-[#f39c12]' },
  CONFIRMED: { text: '확정', color: 'text-[#2ecc71]' },
  COMPLETED: { text: '완료', color: 'text-[#888]' },
  CANCELLED: { text: '취소', color: 'text-[#e63946]' },
};

export default function ReservationTable({ reservations, onStatusChange }: ReservationTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#2a2a2a] text-[#888] text-xs">
            {['예약 번호', '예약 날짜', '시간', '테마', '예약자', '연락처', '인원', '상태', '결과'].map((h) => (
              <th key={h} className="px-3 py-3 text-left font-medium whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => {
            const s = statusLabel[r.status];
            return (
              <tr key={r.id} className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a] transition-colors">
                <td className="px-3 py-3 text-[#888] text-xs">{r.reservationNumber}</td>
                <td className="px-3 py-3 whitespace-nowrap">{r.date}</td>
                <td className="px-3 py-3">{r.time}</td>
                <td className="px-3 py-3 font-medium">{r.themeTitle}</td>
                <td className="px-3 py-3">{r.id}</td>
                <td className="px-3 py-3 text-[#888]">-</td>
                <td className="px-3 py-3">{r.adultCount}명</td>
                <td className="px-3 py-3">
                  <span className={['text-xs font-medium', s.color].join(' ')}>{s.text}</span>
                </td>
                <td className="px-3 py-3 text-xs text-[#e63946]">
                  {r.clearTime ? `클리어 타임 ${r.clearTime}` : '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
