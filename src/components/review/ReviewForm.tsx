'use client';

import { useState, FormEvent } from 'react';
import Button from '@/components/common/Button';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import RatingIcons from '@/components/common/RatingIcons';
import RatingStars from '@/components/common/RatingStars';
import { ReviewFormValues } from '@/types/review';

interface ReviewFormProps {
  themeId?: number;
  themeTitle: string;
  themeImageUrl?: string;
  reservationId: number;
  reservationDate: string;
  initialValues?: Partial<ReviewFormValues>;
  submitLabel?: string;
  errorMessage?: string;
  onSubmit: (data: ReviewFormValues) => Promise<void>;
  onCancel: () => void;
}

const TAGS = ['무서워요', '퍼즐이 좋아요', '스토리가 좋아요', '팀워크 필요', '스피디해요', '연출이 좋아요', '재관람 추천', '혼자서 추천'];

export default function ReviewForm({
  themeId,
  themeTitle,
  themeImageUrl,
  reservationId,
  reservationDate,
  initialValues,
  submitLabel = '후기 등록',
  errorMessage,
  onSubmit,
  onCancel,
}: ReviewFormProps) {
  const [rating, setRating] = useState(initialValues?.rating ?? 0);
  const [difficulty, setDifficulty] = useState(initialValues?.difficulty ?? 0);
  const [horrorLevel, setHorrorLevel] = useState(initialValues?.horrorLevel ?? 0);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialValues?.tags ?? []);
  const [content, setContent] = useState(initialValues?.content ?? '');
  const [hasSpoiler, setHasSpoiler] = useState(initialValues?.hasSpoiler ?? false);
  const [loading, setLoading] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!rating || !difficulty || !horrorLevel) {
      setValidationMessage('별점, 난이도, 공포도를 모두 선택해주세요.');
      return;
    }
    if (!content.trim()) {
      setValidationMessage('후기 내용을 입력해주세요.');
      return;
    }

    setValidationMessage('');
    setLoading(true);
    try {
      await onSubmit({
        themeId,
        reservationId,
        rating,
        difficulty,
        horrorLevel,
        content: content.trim(),
        tags: selectedTags,
        hasSpoiler,
      });
    } catch {
      // Parent component owns API error messaging.
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {(errorMessage || validationMessage) && (
        <div className="rounded-lg border border-[#e63946]/25 bg-[#e63946]/10 px-3 py-2 text-sm font-medium text-[#ff8a8a]">
          {errorMessage || validationMessage}
        </div>
      )}

      <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#101010] p-3">
        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-white/[0.08] bg-[#1a1a1a]">
          <ImageWithFallback
            src={themeImageUrl}
            fallbackSrc="/images/theme-placeholder.png"
            alt={themeTitle}
            fill
            sizes="80px"
            className="object-cover object-center"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-black text-[#f5f5f5]">{themeTitle}</p>
          <p className="mt-1 text-xs font-bold text-[#888]">{reservationDate}</p>
        </div>
      </div>

      <section className="rounded-xl border border-white/[0.07] bg-black/[0.16] p-4">
        <p className="mb-3 text-xs font-black text-[#8f8f8f]">평가</p>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-white/[0.055] bg-[#111]/75 px-3 py-3">
            <p className="mb-2 text-xs font-black text-[#888]">별점</p>
            <RatingStars value={rating} size="md" interactive onChange={setRating} />
          </div>
          <div className="rounded-lg border border-white/[0.055] bg-[#111]/75 px-3 py-3">
            <p className="mb-2 text-xs font-black text-[#888]">공포도</p>
            <RatingIcons
              value={horrorLevel}
              type="horror"
              size="md"
              interactive
              onChange={setHorrorLevel}
            />
          </div>
          <div className="rounded-lg border border-white/[0.055] bg-[#111]/75 px-3 py-3">
            <p className="mb-2 text-xs font-black text-[#888]">난이도</p>
            <RatingIcons
              value={difficulty}
              type="difficulty"
              size="md"
              interactive
              onChange={setDifficulty}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-2 flex items-end gap-2">
          <p className="text-xs font-black text-[#9a9a9a]">느낌 태그</p>
          <span className="text-[11px] font-bold text-[#666]">복수 선택 가능</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={[
                'h-8 rounded-full border px-3 text-xs font-bold transition-all',
                selectedTags.includes(tag)
                  ? 'border-[#e63946] bg-[#e63946]/18 text-[#ff7b82] shadow-[0_0_16px_rgba(230,57,70,0.12)]'
                  : 'border-white/[0.09] bg-white/[0.025] text-[#888] hover:border-[#e63946]/55 hover:text-[#d6d6d6]',
              ].join(' ')}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="text-xs font-black text-[#9a9a9a]">후기 내용</p>
          <p className="text-xs font-bold text-[#777]">{content.length} / 500</p>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          maxLength={500}
          rows={4}
          placeholder="테마에 대한 솔직한 후기를 남겨주세요."
          className="min-h-[132px] w-full resize-none rounded-xl border border-white/[0.08] bg-[#0d0d0d] px-4 py-3 text-sm leading-7 text-[#f5f5f5] placeholder-[#555] outline-none transition-colors focus:border-[#e63946]/70"
        />

        <label className="mt-2.5 flex cursor-pointer items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.025] px-3 py-2 text-sm font-bold text-[#9a9a9a] transition-colors hover:border-white/[0.11] hover:text-[#d0d0d0]">
          <input
            type="checkbox"
            checked={hasSpoiler}
            onChange={(e) => setHasSpoiler(e.target.checked)}
            className="h-4 w-4 accent-[#e63946]"
          />
          스포일러가 포함되어 있습니다.
        </label>
      </section>

      <div className="-mx-1 flex justify-end gap-2 border-t border-white/[0.07] pt-4">
        <Button type="button" variant="ghost" onClick={onCancel} className="h-10 px-4">취소</Button>
        <Button type="submit" loading={loading} className="h-10 px-5 font-black">{submitLabel}</Button>
      </div>
    </form>
  );
}
