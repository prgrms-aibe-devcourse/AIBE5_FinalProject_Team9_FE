'use client';

import { useState, FormEvent } from 'react';
import Button from '@/components/common/Button';
import { CreateThemeRequest } from '@/types/theme';

interface ThemeFormProps {
  initial?: Partial<CreateThemeRequest>;
  onSubmit: (data: CreateThemeRequest) => Promise<void>;
  onCancel: () => void;
}

export default function ThemeForm({ initial = {}, onSubmit, onCancel }: ThemeFormProps) {
  const [form, setForm] = useState<CreateThemeRequest>({
    title: initial.title ?? '',
    description: initial.description ?? '',
    genre: initial.genre ?? '',
    difficulty: initial.difficulty ?? 1,
    horrorLevel: initial.horrorLevel ?? 1,
    minPlayers: initial.minPlayers ?? 2,
    maxPlayers: initial.maxPlayers ?? 6,
    duration: initial.duration ?? 60,
    price: initial.price ?? 25000,
    imageUrl: initial.imageUrl ?? '',
  });
  const [loading, setLoading] = useState(false);

  const set = (key: keyof CreateThemeRequest, value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm text-[#888] mb-1">테마명 *</label>
        <input
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          required
          placeholder="예) 새벽의 저택"
          className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2.5 text-sm text-[#f5f5f5] placeholder-[#555] focus:outline-none focus:border-[#e63946]"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-[#888] mb-1">최대 인원 *</label>
          <input
            type="number"
            value={form.maxPlayers}
            onChange={(e) => set('maxPlayers', Number(e.target.value))}
            required
            className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2.5 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#e63946]"
          />
        </div>
        <div>
          <label className="block text-sm text-[#888] mb-1">연령 제한 *</label>
          <input
            type="number"
            placeholder="연령 제한"
            className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2.5 text-sm text-[#f5f5f5] placeholder-[#555] focus:outline-none focus:border-[#e63946]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-[#888] mb-1">장르 *</label>
        <input
          value={form.genre}
          onChange={(e) => set('genre', e.target.value)}
          required
          placeholder="장르 선택"
          className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2.5 text-sm text-[#f5f5f5] placeholder-[#555] focus:outline-none focus:border-[#e63946]"
        />
      </div>

      <div>
        <label className="block text-sm text-[#888] mb-1">테마 설명 *</label>
        <textarea
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          required
          maxLength={200}
          rows={4}
          placeholder="테마에 대한 설명을 입력해주세요."
          className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2.5 text-sm text-[#f5f5f5] placeholder-[#555] focus:outline-none focus:border-[#e63946] resize-none"
        />
        <p className="text-right text-xs text-[#888] mt-1">{form.description.length} / 200</p>
      </div>

      <div>
        <label className="block text-sm text-[#888] mb-2">대표 이미지 *</label>
        <div className="border border-dashed border-[#2a2a2a] rounded-lg p-6 text-center text-xs text-[#555]">
          이미지 선택
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="ghost" onClick={onCancel}>취소</Button>
        <Button type="submit" loading={loading}>저장하기</Button>
      </div>
    </form>
  );
}
