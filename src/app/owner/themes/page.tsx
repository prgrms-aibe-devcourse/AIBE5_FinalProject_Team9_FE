'use client';

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import {
  createTheme,
  deleteTheme,
  getOwnerThemes,
  updateTheme,
} from '@/services/themeService';
import { OwnerTheme, OwnerThemeRequest } from '@/types/theme';
import imageCompression from 'browser-image-compression';

type FormState = {
  title: string;
  difficulty: number;
  horrorLevel: number;
  minPeople: string;
  maxPeople: string;
  ageLimit: string;
  playTime: string;
  tags: string;
  price: string;
  description: string;
  thumbnail: File | null;
};

const EMPTY_FORM: FormState = {
  title: '',
  difficulty: 1,
  horrorLevel: 1,
  minPeople: '1',
  maxPeople: '4',
  ageLimit: '0',
  playTime: '60',
  tags: '',
  price: '0',
  description: '',
  thumbnail: null,
};

const getDateText = (value?: string) => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 10);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

const createFormFromTheme = (theme: OwnerTheme): FormState => ({
  title: theme.title,
  difficulty: theme.difficulty,
  horrorLevel: theme.horrorLevel,
  minPeople: String(theme.minPeople),
  maxPeople: String(theme.maxPeople),
  ageLimit: String(theme.ageLimit ?? 0),
  playTime: String(theme.playTime),
  tags: theme.tags,
  price: String(theme.price),
  description: theme.description,
  thumbnail: null,
});

const toRequest = (form: FormState): OwnerThemeRequest => ({
  title: form.title.trim(),
  difficulty: form.difficulty,
  horrorLevel: form.horrorLevel,
  minPeople: Number(form.minPeople),
  maxPeople: Number(form.maxPeople),
  ageLimit: Number(form.ageLimit),
  playTime: Number(form.playTime),
  tags: form.tags.trim(),
  price: Number(form.price),
  description: form.description.trim(),
  thumbnailUrl: '',
});

function RatingDots({
  value,
  onClick,
  label,
}: {
  value: number;
  onClick?: (v: number) => void;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2" aria-label={label}>
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onClick?.(i + 1)}
          disabled={!onClick}
          className={[
            'h-3.5 w-3.5 rounded-full transition-colors',
            i < value ? 'bg-[#e63946]' : 'bg-[#3a3a3a]',
            onClick ? 'cursor-pointer hover:bg-[#ff5a66]' : 'cursor-default',
          ].join(' ')}
          title={`${label} ${i + 1}`}
        />
      ))}
    </div>
  );
}

export default function OwnerThemesPage() {
  const [themes, setThemes] = useState<OwnerTheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<OwnerTheme | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<OwnerTheme | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  const imagePreview = useMemo(() => {
    if (form.thumbnail) return URL.createObjectURL(form.thumbnail);
    return editTarget?.thumbnailUrl ?? '';
  }, [editTarget?.thumbnailUrl, form.thumbnail]);

  useEffect(() => {
    return () => {
      if (imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const fetchThemes = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getOwnerThemes();
      setThemes(data);
    } catch {
      setError('테마 목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditTarget(null);
    setShowModal(true);
  };

  const openEdit = (theme: OwnerTheme) => {
    setForm(createFormFromTheme(theme));
    setEditTarget(theme);
    setShowModal(true);
  };

  const setText = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const setNumber = (key: 'difficulty' | 'horrorLevel', value: number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const setThumbnail =async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const compressed = await imageCompression(file, {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1280,
      });

      setForm((prev) => ({ ...prev, thumbnail: event.target.files?.[0] ?? null }));
  };

  const isValid =
    form.title.trim() &&
    form.tags.trim() &&
    form.description.trim() &&
    Number(form.minPeople) > 0 &&
    Number(form.maxPeople) >= Number(form.minPeople) &&
    Number(form.playTime) > 0 &&
    Number(form.price) >= 0 &&
    (editTarget || form.thumbnail);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isValid || saving) return;

    setSaving(true);
    setError('');
    try {
      if (editTarget) {
        await updateTheme(editTarget.id, toRequest(form), form.thumbnail ?? undefined);
      } else if (form.thumbnail) {
        await createTheme(toRequest(form), form.thumbnail);
      }

      setShowModal(false);
      await fetchThemes();
    } catch {
      setError(editTarget ? '테마 수정에 실패했습니다.' : '테마 등록에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget || deleting) return;

    setDeleting(true);
    setError('');
    try {
      await deleteTheme(deleteTarget.id);
      setDeleteTarget(null);
      await fetchThemes();
    } catch {
      setError('테마 삭제에 실패했습니다.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="flex items-center gap-1.5 rounded-lg bg-[#e63946] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#c1121f]"
        >
          <span className="text-base leading-none">+</span>
          테마 추가
        </button>
      </div>

      {error && (
        <div className="rounded border border-[#e63946]/30 bg-[#e63946]/10 px-4 py-3 text-sm text-[#ff7b84]">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-lg border border-[#222] bg-[#1a1a1a] p-10 text-center text-sm text-[#777]">
          테마 목록을 불러오는 중입니다.
        </div>
      ) : themes.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[#333] bg-[#171717] p-10 text-center">
          <p className="text-sm font-bold text-[#ddd]">등록된 테마가 없습니다.</p>
          <p className="mt-1 text-xs text-[#777]">첫 테마를 추가해 owner 페이지를 채워보세요.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {themes.slice(0, 3).map((theme) => (
              <article key={theme.id} className="overflow-hidden rounded-lg border border-[#222] bg-[#1a1a1a]">
                <div className="relative h-52 bg-[#111]">
                  {theme.thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={theme.thumbnailUrl}
                      alt={theme.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-[#666]">
                      이미지 없음
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-4">
                    <p className="text-xs text-[#bbb]">{theme.branchName}</p>
                    <h2 className="text-sm font-black text-white">{theme.title}</h2>
                  </div>
                </div>
                <div className="space-y-3 p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#777]">난이도</span>
                    <RatingDots value={theme.difficulty} label="난이도" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-[#888]">
                    <span>공포도 {theme.horrorLevel}</span>
                    <span>{theme.minPeople}-{theme.maxPeople}명</span>
                    <span>{theme.playTime}분</span>
                    <span>{theme.price ? theme.price.toLocaleString() : '0'}원</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(theme)}
                      className="flex-1 rounded border border-[#333] py-2 text-xs text-[#ccc] transition-colors hover:border-[#555] hover:text-white"
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(theme)}
                      className="flex-1 rounded border border-[#e63946]/30 py-2 text-xs text-[#ff6b75] transition-colors hover:bg-[#e63946]/10"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="overflow-hidden rounded-lg border border-[#222] bg-[#1a1a1a]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#242424]">
                    {['테마명', '난이도', '공포도', '인원', '태그', '등록일', '관리'].map((head) => (
                      <th key={head} className="whitespace-nowrap px-5 py-3 text-left text-xs font-medium text-[#666]">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {themes.map((theme) => (
                    <tr key={theme.id} className="border-b border-[#171717] last:border-b-0 hover:bg-[#202020]">
                      <td className="px-5 py-3.5">
                        <p className="text-xs font-bold text-[#f5f5f5]">{theme.title}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <RatingDots value={theme.difficulty} label="난이도" />
                      </td>
                      <td className="px-5 py-3.5">
                        <RatingDots value={theme.horrorLevel} label="공포도" />
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-xs text-[#888]">
                        {theme.minPeople}-{theme.maxPeople}명
                      </td>
                      <td className="px-5 py-3.5 text-xs text-[#888]">{theme.tags}</td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-xs text-[#666]">{getDateText(theme.createdAt)}</td>
                      <td className="whitespace-nowrap px-5 py-3.5">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => openEdit(theme)}
                            className="rounded border border-[#333] px-3 py-1.5 text-xs text-[#ccc] hover:border-[#555] hover:text-white"
                          >
                            수정
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(theme)}
                            className="rounded border border-[#e63946]/30 px-3 py-1.5 text-xs text-[#ff6b75] hover:bg-[#e63946]/10"
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h3 className="text-sm font-bold text-gray-900">
                {editTarget ? '테마 수정' : '테마 추가'}
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-xl leading-none text-gray-400 hover:text-gray-600"
                aria-label="닫기"
              >
                x
              </button>
            </div>

            <div className="max-h-[72vh] space-y-4 overflow-y-auto px-6 py-5">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">테마명 *</label>
                <input
                  value={form.title}
                  onChange={(event) => setText('title', event.target.value)}
                  required
                  className="w-full rounded border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#e63946] focus:outline-none"
                  placeholder="예) 공포의 폐차장"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-700">난이도 *</label>
                  <RatingDots
                    value={form.difficulty}
                    onClick={(value) => setNumber('difficulty', value)}
                    label="난이도"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-700">공포도 *</label>
                  <RatingDots
                    value={form.horrorLevel}
                    onClick={(value) => setNumber('horrorLevel', value)}
                    label="공포도"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <NumberInput label="최소 인원 *" value={form.minPeople} min={1} onChange={(value) => setText('minPeople', value)} />
                <NumberInput label="최대 인원 *" value={form.maxPeople} min={1} onChange={(value) => setText('maxPeople', value)} />
                <NumberInput label="연령 제한 *" value={form.ageLimit} min={0} onChange={(value) => setText('ageLimit', value)} />
                <NumberInput label="소요 시간 *" value={form.playTime} min={1} onChange={(value) => setText('playTime', value)} suffix="분" />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">태그 *</label>
                  <input
                    value={form.tags}
                    onChange={(event) => setText('tags', event.target.value)}
                    required
                    className="w-full rounded border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#e63946] focus:outline-none"
                    placeholder="공포, 미스터리"
                  />
                </div>
                <NumberInput label="가격 *" value={form.price} min={0} onChange={(value) => setText('price', value)} suffix="원" />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">테마 설명 *</label>
                <textarea
                  value={form.description}
                  onChange={(event) => setText('description', event.target.value)}
                  required
                  rows={4}
                  maxLength={500}
                  className="w-full resize-none rounded border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#e63946] focus:outline-none"
                  placeholder="테마에 대한 설명을 입력해주세요."
                />
                <p className="mt-1 text-right text-xs text-gray-400">{form.description.length} / 500</p>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  대표 이미지 {editTarget ? '' : '*'}
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="h-28 w-full overflow-hidden rounded border border-gray-200 bg-gray-100 sm:w-36">
                    {imagePreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imagePreview} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-gray-400">
                        미리보기
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={setThumbnail}
                    required={!editTarget}
                    className="text-sm text-gray-700 file:mr-3 file:rounded file:border-0 file:bg-[#222] file:px-3 file:py-2 file:text-xs file:font-bold file:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-gray-100 px-6 py-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded border border-gray-300 px-5 py-2 text-sm text-gray-600 hover:border-gray-400"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={!isValid || saving}
                className="rounded bg-[#e63946] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#c1121f] disabled:opacity-40"
              >
                {saving ? '저장 중...' : '저장하기'}
              </button>
            </div>
          </form>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-80 overflow-hidden rounded-lg bg-white shadow-2xl">
            <div className="px-6 py-5">
              <h3 className="mb-2 text-sm font-bold text-gray-900">테마 삭제</h3>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-[#e63946]">{deleteTarget.title}</span> 테마를 삭제하시겠습니까?
              </p>
            </div>
            <div className="flex gap-2 px-6 pb-5">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 rounded border border-gray-300 py-2.5 text-sm text-gray-600 hover:border-gray-400"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 rounded bg-[#e63946] py-2.5 text-sm font-bold text-white hover:bg-[#c1121f] disabled:opacity-50"
              >
                {deleting ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NumberInput({
  label,
  value,
  min,
  suffix,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  suffix?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-gray-700">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          min={min}
          onChange={(event) => onChange(event.target.value)}
          required
          className="w-full rounded border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:border-[#e63946] focus:outline-none"
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
