'use client';

export default function OwnerError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h2 className="text-2xl font-bold text-[#e63946]">오류가 발생했습니다</h2>
      <p className="text-[#888]">{error.message}</p>
      <button onClick={reset} className="bg-[#e63946] text-white px-4 py-2 rounded text-sm">다시 시도</button>
    </div>
  );
}
