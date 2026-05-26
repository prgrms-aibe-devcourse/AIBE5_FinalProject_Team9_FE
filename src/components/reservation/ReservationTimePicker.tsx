'use client';

interface ReservationTimePickerProps {
  times: string[];
  selectedTime: string;
  onSelect: (time: string) => void;
}

export default function ReservationTimePicker({ times, selectedTime, onSelect }: ReservationTimePickerProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      {times.map((time) => (
        <button
          key={time}
          onClick={() => onSelect(time)}
          className={[
            'py-2 text-sm rounded border transition-colors',
            selectedTime === time
              ? 'bg-[#e63946] border-[#e63946] text-white'
              : 'bg-transparent border-[#2a2a2a] text-[#f5f5f5] hover:border-[#e63946]',
          ].join(' ')}
        >
          {time}
        </button>
      ))}
    </div>
  );
}
