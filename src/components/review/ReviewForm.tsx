'use client';

import { useState, FormEvent } from 'react';
import Button from '@/components/common/Button';
import RatingStars from '@/components/common/RatingStars';
import { ReviewFormValues } from '@/types/review';

interface ReviewFormProps {
  themeId?: number;
  themeTitle: string;
  reservationId: number;
  reservationDate: string;
  initialValues?: Partial<ReviewFormValues>;
  submitLabel?: string;
  errorMessage?: string;
  onSubmit: (data: ReviewFormValues) => Promise<void>;
  onCancel: () => void;
}

const TAGS = ['무서워요', '퍼즐이 좋아요', '스토리가 좋아요', '팀워크 필요', '스피디해요', '연출이 좋아요', '재관람 추천', '혼자서 추천'];

function DotRating({ value, onChange, color = '#e63946' }: { value: number; onChange: (v: number) => void; color?: string }) {
  return (
    <span className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          className="w-4 h-4 rounded-full border-2 transition-colors"
          style={{
            backgroundColor: i < value ? color : 'transparent',
            borderColor: color,
          }}
        />
      ))}
    </span>
  );
}

export default function ReviewForm({
  themeId,
  themeTitle,
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {(errorMessage || validationMessage) && (
        <div className="rounded-lg border border-[#e63946]/25 bg-[#e63946]/10 px-3 py-2 text-sm font-medium text-[#ff8a8a]">
          {errorMessage || validationMessage}
        </div>
      )}

      {/* Theme info */}
      <div className="flex items-center gap-3 p-3 bg-[#111] rounded-lg border border-[#2a2a2a]">
        <div className="w-10 h-10 bg-[#2a2a2a] rounded flex items-center justify-center text-lg">🚪</div>
        <div>
          <p className="font-medium text-sm text-[#f5f5f5]">{themeTitle}</p>
          <p className="text-xs text-[#888]">{reservationDate}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-4 flex-wrap">
        <div>
          <p className="text-xs text-[#888] mb-1">별점</p>
          <RatingStars value={rating} size="lg" interactive onChange={setRating} />
        </div>
        <div>
          <p className="text-xs text-[#888] mb-1">난이도</p>
          <DotRating value={difficulty} onChange={setDifficulty} color="#2ecc71" />
        </div>
        <div>
          <p className="text-xs text-[#888] mb-1">공포도</p>
          <DotRating value={horrorLevel} onChange={setHorrorLevel} color="#e63946" />
        </div>
      </div>

      {/* Tags */}
      <div>
        <p className="text-xs text-[#888] mb-2">느낌 태그 (복수 선택)</p>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={[
                'text-xs px-3 py-1.5 rounded-full border transition-colors',
                selectedTags.includes(tag)
                  ? 'bg-[#e63946] border-[#e63946] text-white'
                  : 'border-[#2a2a2a] text-[#888] hover:border-[#e63946]',
              ].join(' ')}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          maxLength={500}
          rows={4}
          placeholder="테마에 대한 솔직한 후기를 남겨주세요."
          className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2.5 text-sm text-[#f5f5f5] placeholder-[#555] focus:outline-none focus:border-[#e63946] resize-none"
        />
        <p className="text-right text-xs text-[#888] mt-1">{content.length} / 500</p>
      </div>

      {/* Spoiler */}
      <label className="flex items-center gap-2 text-sm text-[#888] cursor-pointer">
        <input type="checkbox" checked={hasSpoiler} onChange={(e) => setHasSpoiler(e.target.checked)} className="accent-[#e63946]" />
        이 후기에는 스포일러가 포함되어 있습니다.
      </label>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="ghost" onClick={onCancel}>취소</Button>
        <Button type="submit" loading={loading}>{submitLabel}</Button>
      </div>
    </form>
  );
}
