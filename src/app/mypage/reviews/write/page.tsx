'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import ReviewForm from '@/components/review/ReviewForm';
import { createReview, toCreateReviewRequest } from '@/services/reviewService';
import { getThemeById, getThemes } from '@/services/themeService';
import type { ReviewFormValues } from '@/types/review';

function getApiErrorMessage(error: unknown, fallback: string) {
  if (error instanceof AxiosError) {
    const message =
      (error.response?.data as { message?: string; error?: string; data?: { message?: string } } | undefined)
        ?.message ??
      (error.response?.data as { message?: string; error?: string; data?: { message?: string } } | undefined)
        ?.data?.message ??
      (error.response?.data as { message?: string; error?: string; data?: { message?: string } } | undefined)
        ?.error;

    return message || fallback;
  }

  return fallback;
}

export default function MyReviewWritePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reservationId = Number(searchParams.get('reservationId') || 0);
  const themeId = Number(searchParams.get('themeId') || 0) || undefined;
  const themeTitle = searchParams.get('themeTitle') || '예약한 테마';
  const reservationDate = searchParams.get('reservationDate') || '예약 정보 확인';
  const [errorMessage, setErrorMessage] = useState('');
  const [themeImageUrl, setThemeImageUrl] = useState('');

  useEffect(() => {
    if (!themeId) {
      setThemeImageUrl('');
      return;
    }

    let isMounted = true;

    const loadThemeImage = async () => {
      try {
        const theme = await getThemeById(themeId);
        if (theme.imageUrl) {
          if (isMounted) setThemeImageUrl(theme.imageUrl);
          return;
        }
      } catch {
        // 상세 조회가 실패하거나 이미지가 없으면 목록 데이터로 한 번 더 보강합니다.
      }

      try {
        const themes = await getThemes();
        const listTheme = themes.find((item) => item.id === themeId);
        if (isMounted) setThemeImageUrl(listTheme?.imageUrl ?? '');
      } catch {
        if (isMounted) setThemeImageUrl('');
      }
    };

    void loadThemeImage();

    return () => {
      isMounted = false;
    };
  }, [themeId]);

  const handleSubmit = async (values: ReviewFormValues) => {
    setErrorMessage('');

    try {
      await createReview(
        toCreateReviewRequest({
          reservationId: values.reservationId,
          rating: values.rating,
          difficulty: values.difficulty,
          horrorLevel: values.horrorLevel,
          content: values.content,
          tags: values.tags,
          hasSpoiler: values.hasSpoiler,
        }),
      );

      router.replace('/mypage/reviews?created=1');
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, '후기 등록에 실패했습니다.'));
      throw error;
    }
  };

  if (!reservationId) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] px-4 py-16 text-[#f5f5f5]">
        <div className="mx-auto max-w-2xl rounded-2xl border border-white/[0.08] bg-[#141414] p-6 text-center shadow-[0_18px_42px_rgba(0,0,0,0.28)]">
          <p className="text-lg font-black">후기 작성 정보를 찾을 수 없습니다.</p>
          <p className="mt-2 text-sm font-medium text-[#8a8a8a]">
            예약 내역에서 다시 진입해 주세요.
          </p>
          <Link
            href="/mypage"
            className="mt-5 inline-flex h-10 items-center justify-center rounded-lg border border-[#cc2222]/55 px-4 text-sm font-black text-[#ef5353] transition-colors hover:bg-[#cc2222]/10 hover:text-white"
          >
            마이페이지로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-10 text-[#f5f5f5]">
      <div className="mx-auto max-w-2xl">
        <nav className="mb-6 flex items-center gap-2 text-xs font-bold text-[#777]">
          <Link href="/" className="transition-colors hover:text-[#f5f5f5]">
            홈
          </Link>
          <span>&gt;</span>
          <Link href="/mypage" className="transition-colors hover:text-[#f5f5f5]">
            마이페이지
          </Link>
          <span>&gt;</span>
          <Link href="/mypage/reviews" className="transition-colors hover:text-[#f5f5f5]">
            내 후기
          </Link>
          <span>&gt;</span>
          <span className="text-[#f5f5f5]">후기 작성</span>
        </nav>

        <section className="rounded-2xl border border-white/[0.08] bg-[radial-gradient(circle_at_12%_0%,rgba(255,255,255,0.04),transparent_34%),linear-gradient(180deg,rgba(24,24,24,0.94),rgba(18,18,18,0.91)),rgba(18,18,18,0.9)] p-6 shadow-[0_18px_42px_rgba(0,0,0,0.28)]">
          <div className="mb-6">
            <p className="text-[11px] font-black tracking-[0.22em] text-[#cc2222]">
              {'// WRITE REVIEW'}
            </p>
            <h1 className="mt-3 text-[30px] font-black leading-tight text-[#f5f5f5]">
              후기 작성
            </h1>
            <p className="mt-2 text-sm font-bold text-[#8c8c8c]">
              플레이 직후의 감정을 남겨두면 다음 메이트에게 큰 도움이 됩니다.
            </p>
          </div>

          <ReviewForm
            themeId={themeId}
            themeTitle={themeTitle}
            themeImageUrl={themeImageUrl}
            reservationId={reservationId}
            reservationDate={reservationDate}
            errorMessage={errorMessage}
            submitLabel="후기 등록"
            onSubmit={handleSubmit}
            onCancel={() => router.back()}
          />
        </section>
      </div>
    </main>
  );
}
