import { Reservation } from '@/types/reservation';
import { formatDate, getDDay } from '@/lib/formatDate';

interface ReservationCardProps {
  reservation: Reservation;
  onCancel?: (id: number) => void;
  onWriteReview?: (reservation: Reservation) => void;
}

const statusLabel: Record<string, { text: string; color: string }> = {
  PENDING: { text: '확정 대기', color: 'text-[#f39c12]' },
  CONFIRMED: { text: '예약 확정', color: 'text-[#2ecc71]' },
  COMPLETED: { text: '완료', color: 'text-[#888]' },
  CANCELLED: { text: '취소', color: 'text-[#e63946]' },
};

export default function ReservationCard({ reservation, onCancel, onWriteReview }: ReservationCardProps) {
  const status = statusLabel[reservation.status];
  const dDay = getDDay(reservation.date);

  return (
    <div className="flex items-center gap-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 hover:border-[#3a3a3a] transition-colors">
      <div className="w-10 h-10 rounded bg-[#111] flex items-center justify-center overflow-hidden shrink-0">
        {reservation.themeImageUrl ? (
          <img src={reservation.themeImageUrl} alt={reservation.themeTitle} className="w-full h-full object-cover" />
        ) : (
          <span className="text-lg">🚪</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-sm text-[#f5f5f5] truncate">{reservation.themeTitle}</span>
          {reservation.status === 'CONFIRMED' && dDay >= 0 && (
            <span className="text-xs bg-[#e63946]/20 text-[#e63946] px-2 py-0.5 rounded">
              D-{dDay === 0 ? 'Day' : dDay}
            </span>
          )}
        </div>
        <p className="text-xs text-[#888] mt-0.5">
          {formatDate(reservation.date)} {reservation.time} · {reservation.locationName}
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className={['text-xs font-medium', status.color].join(' ')}>{status.text}</span>
        {reservation.status === 'CONFIRMED' && onCancel && (
          <button
            onClick={() => onCancel(reservation.id)}
            className="text-xs text-[#888] hover:text-[#e63946] transition-colors border border-[#2a2a2a] px-2 py-1 rounded"
          >
            취소/환불 요청
          </button>
        )}
        {reservation.status === 'COMPLETED' && !reservation.hasReview && onWriteReview && (
          <button
            onClick={() => onWriteReview(reservation)}
            className="text-xs bg-[#e63946] hover:bg-[#c1121f] text-white px-3 py-1 rounded transition-colors"
          >
            후기 쓰기
          </button>
        )}
      </div>
    </div>
  );
}
