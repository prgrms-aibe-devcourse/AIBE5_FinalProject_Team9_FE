'use client';

import StatePage from '@/components/common/StatePage';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <StatePage
      eyebrow="ERROR"
      title="문 너머에서 문제가 생겼어요"
      description="령냥이가 길을 다시 찾고 있어요. 잠시 후 다시 시도해주세요."
      actions={[
        { label: '다시 시도', onClick: reset },
        { label: '홈으로 가기', href: '/', variant: 'secondary' },
      ]}
    >
      {isDevelopment && (
        <details className="max-w-[560px] rounded-[8px] border border-white/10 bg-black/30 px-4 py-3 text-left text-xs text-[#9a9a9a]">
          <summary className="cursor-pointer font-bold text-[#d8d8d8]">
            개발자용 오류 정보
          </summary>
          <pre className="mt-3 whitespace-pre-wrap break-words leading-6">
            {error.message || '알 수 없는 오류'}
            {error.digest ? `\nDigest: ${error.digest}` : ''}
          </pre>
        </details>
      )}
    </StatePage>
  );
}
