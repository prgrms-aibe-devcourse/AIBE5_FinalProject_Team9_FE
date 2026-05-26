'use client';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-4xl font-black text-[#e63946]">오류 발생</h1>
      <p className="text-[#888]">{error.message || '알 수 없는 오류가 발생했습니다.'}</p>
      <button
        onClick={reset}
        className="bg-[#e63946] hover:bg-[#c1121f] text-white px-5 py-2.5 rounded text-sm transition-colors"
      >
        다시 시도
      </button>
    </div>
  );
}
