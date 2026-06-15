'use client';

import { useEffect, useMemo, useState } from 'react';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createMatePost, getMatePostById, updateMatePost } from '@/services/mateService';
import { getThemes } from '@/services/themeService';
import { MateExperienceLevel } from '@/types/mate';
import { Theme } from '@/types/theme';

const ALL_TAGS = ['진지하게', '즐겁게', '공략 위주', '분위기 위주', '처음 만난 팬텀', '여성만', '사진 촬영'];

const EXPERIENCE_OPTIONS: { value: MateExperienceLevel; label: string; desc: string }[] = [
  { value: 'ANY', label: '무관', desc: '경험 여부에 관계없이 모집합니다' },
  { value: 'BEGINNER', label: '초보', desc: '처음 도전하는 분도 환영합니다' },
  { value: 'INTERMEDIATE', label: '중급', desc: '어느 정도 경험이 있는 분 선호' },
  { value: 'EXPERT', label: '숙련자', desc: '방탈출 다수 경험자 선호' },
];

function toIsoString(date: string, time: string) {
  if (!date || !time) return '';
  return new Date(`${date}T${time}:00`).toISOString();
}

function splitDateTime(value?: string) {
  if (!value) return { date: '', time: '' };
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    const [rawDate, rawTime = ''] = value.split('T');
    return { date: rawDate ?? '', time: rawTime.slice(0, 5) };
  }

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');

  return { date: `${yyyy}-${mm}-${dd}`, time: `${hh}:${mi}` };
}

function getApiErrorMessage(error: unknown, fallback: string) {
  const axiosError = error as AxiosError<{ message?: string; data?: { message?: string } }>;
  return axiosError.response?.data?.message ?? axiosError.response?.data?.data?.message ?? fallback;
}

export default function MateWritePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = Number(searchParams.get('editId'));
  const isEditMode = Number.isFinite(editId) && editId > 0;
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isThemesLoading, setIsThemesLoading] = useState(true);
  const [isPostLoading, setIsPostLoading] = useState(isEditMode);
  const [title, setTitle] = useState('');
  const [themeId, setThemeId] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');
  const [maxPeople, setMaxPeople] = useState(2);
  const [experienceLevel, setExperienceLevel] = useState<MateExperienceLevel>('ANY');
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [openChatUrl, setOpenChatUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getThemes()
      .then((data) => {
        if (isMounted) setThemes(data);
      })
      .finally(() => {
        if (isMounted) setIsThemesLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isEditMode) return;
    let isMounted = true;

    setIsPostLoading(true);
    setErrorMessage('');

    getMatePostById(editId)
      .then((post) => {
        if (!isMounted) return;
        const meeting = splitDateTime(post.meetingTime);
        const deadlineValue = splitDateTime(post.deadline);
        setTitle(post.title);
        setThemeId(String(post.themeId));
        setMeetingDate(meeting.date);
        setMeetingTime(meeting.time);
        setDeadlineDate(deadlineValue.date);
        setDeadlineTime(deadlineValue.time);
        setMaxPeople(Math.max(2, post.maxPeople));
        setExperienceLevel(post.experienceLevel);
        setTags(post.tags);
        setContent(post.content);
        setOpenChatUrl(post.openChatUrl ?? '');
        setImageUrl(post.imageUrl ?? '');
      })
      .catch((error) => {
        if (isMounted) setErrorMessage(getApiErrorMessage(error, '모집 글을 불러오지 못했습니다.'));
      })
      .finally(() => {
        if (isMounted) setIsPostLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [editId, isEditMode]);

  const selectedTheme = useMemo(
    () => themes.find((theme) => theme.id === Number(themeId)),
    [themeId, themes],
  );

  const toggleTag = (tag: string) => {
    setTags((prev) => prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]);
  };

  const validationMessage = useMemo(() => {
    if (!themeId) return '테마를 선택해주세요.';
    if (!title.trim()) return '제목을 입력해주세요.';
    if (!content.trim()) return '내용을 입력해주세요.';
    if (!meetingDate || !meetingTime) return '모임 날짜와 시간을 입력해주세요.';
    if (!deadlineDate || !deadlineTime) return '모집 마감 날짜와 시간을 입력해주세요.';
    if (maxPeople < 2) return '최대 인원은 2명 이상이어야 합니다.';
    if (!openChatUrl.trim()) return '오픈채팅 링크를 입력해주세요.';
    return '';
  }, [content, deadlineDate, deadlineTime, maxPeople, meetingDate, meetingTime, openChatUrl, themeId, title]);

  const isValid = !validationMessage;

  const handleSubmit = async () => {
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        themeId: Number(themeId),
        title: title.trim(),
        content: content.trim(),
        meetingTime: toIsoString(meetingDate, meetingTime),
        deadline: toIsoString(deadlineDate, deadlineTime),
        maxPeople,
        tags,
        experienceLevel,
        openChatUrl: openChatUrl.trim(),
        imageUrl: imageUrl.trim() || undefined,
      };
      if (isEditMode) await updateMatePost(editId, payload);
      else await createMatePost(payload);
      setSubmitted(true);
      window.setTimeout(() => router.push(isEditMode ? `/mate/${editId}` : '/mate'), 900);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, isEditMode ? '모집 글 수정에 실패했습니다.' : '모집 글 등록에 실패했습니다.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d0d0d]">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#2ecc71]/40 bg-[#2ecc71]/20 text-2xl text-[#2ecc71]">
            ✓
          </div>
          <p className="mb-1 text-lg font-bold text-[#2ecc71]">
            모집 글이 {isEditMode ? '수정' : '등록'}되었습니다.
          </p>
          <p className="text-sm text-[#888]">잠시 후 이동합니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] pb-24">
      <div className="border-b border-[#1a1a1a]">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-[#555]">
            <Link href="/" className="transition-colors hover:text-[#888]">홈</Link>
            <span>›</span>
            <Link href="/mate" className="transition-colors hover:text-[#888]">메이트 모집</Link>
            <span>›</span>
            <span className="text-[#888]">글쓰기</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-1 text-2xl font-black text-[#f5f5f5]">
          {isEditMode ? '메이트 모집 글 수정' : '메이트 모집 글쓰기'}
        </h1>
        <p className="mb-8 text-sm text-[#888]">실제 테마와 시간 정보를 기준으로 함께할 메이트를 모집해보세요.</p>

        {isPostLoading ? (
          <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] py-20 text-center text-sm font-bold text-[#888]">
            모집 글을 불러오는 중입니다.
          </div>
        ) : (
        <>
        <section className="mb-5 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-sm font-bold text-[#f5f5f5]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e63946] text-xs font-bold text-white">1</span>
            기본 정보
          </h2>

          <div className="mb-5">
            <label className="mb-2 block text-xs text-[#888]">모집 제목 <span className="text-[#e63946]">*</span></label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="예) 강남점 공포 테마 같이 가실 분"
              maxLength={80}
              className="w-full rounded border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f5f5f5] outline-none placeholder:text-[#555] focus:border-[#e63946]"
            />
            <p className="mt-1 text-right text-xs text-[#555]">{title.length}/80</p>
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-xs text-[#888]">테마 <span className="text-[#e63946]">*</span></label>
            <select
              value={themeId}
              onChange={(event) => setThemeId(event.target.value)}
              className="w-full rounded border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f5f5f5] outline-none focus:border-[#e63946]"
            >
              <option value="">{isThemesLoading ? '테마 불러오는 중' : '테마 선택'}</option>
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  #{theme.id} {theme.title}{theme.branchName ? ` · ${theme.branchName}` : ''}
                </option>
              ))}
            </select>
            {selectedTheme && (
              <p className="mt-2 text-xs text-[#777]">
                {selectedTheme.branchName || '지점 정보 없음'} · {selectedTheme.minPlayers}~{selectedTheme.maxPlayers}인 · {selectedTheme.duration}분
              </p>
            )}
          </div>

          <div className="mb-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs text-[#888]">모임 날짜 <span className="text-[#e63946]">*</span></label>
              <input
                type="date"
                value={meetingDate}
                onChange={(event) => setMeetingDate(event.target.value)}
                className="w-full rounded border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f5f5f5] outline-none [color-scheme:dark] focus:border-[#e63946]"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs text-[#888]">모임 시간 <span className="text-[#e63946]">*</span></label>
              <input
                type="time"
                value={meetingTime}
                onChange={(event) => setMeetingTime(event.target.value)}
                className="w-full rounded border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f5f5f5] outline-none [color-scheme:dark] focus:border-[#e63946]"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs text-[#888]">모집 마감일 <span className="text-[#e63946]">*</span></label>
              <input
                type="date"
                value={deadlineDate}
                onChange={(event) => setDeadlineDate(event.target.value)}
                className="w-full rounded border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f5f5f5] outline-none [color-scheme:dark] focus:border-[#e63946]"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs text-[#888]">마감 시간 <span className="text-[#e63946]">*</span></label>
              <input
                type="time"
                value={deadlineTime}
                onChange={(event) => setDeadlineTime(event.target.value)}
                className="w-full rounded border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f5f5f5] outline-none [color-scheme:dark] focus:border-[#e63946]"
              />
            </div>
          </div>

          <div>
            <label className="mb-3 block text-xs text-[#888]">최대 인원 <span className="text-[#e63946]">*</span></label>
            <div className="flex items-center gap-2">
              <button onClick={() => setMaxPeople((value) => Math.max(2, value - 1))} className="flex h-8 w-8 items-center justify-center rounded border border-[#2a2a2a] text-[#888] transition-colors hover:border-[#e63946] hover:text-[#e63946]">−</button>
              <span className="w-10 text-center text-sm font-bold text-[#f5f5f5]">{maxPeople}</span>
              <button onClick={() => setMaxPeople((value) => Math.min(10, value + 1))} className="flex h-8 w-8 items-center justify-center rounded border border-[#2a2a2a] text-[#888] transition-colors hover:border-[#e63946] hover:text-[#e63946]">+</button>
              <span className="text-xs text-[#555]">명</span>
            </div>
          </div>
        </section>

        <section className="mb-5 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-sm font-bold text-[#f5f5f5]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e63946] text-xs font-bold text-white">2</span>
            모집 내용
          </h2>

          <div className="mb-5">
            <label className="mb-3 block text-xs text-[#888]">경험 레벨</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {EXPERIENCE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={[
                    'flex cursor-pointer flex-col gap-1 rounded-lg border p-3 transition-colors',
                    experienceLevel === option.value ? 'border-[#e63946] bg-[#e63946]/10' : 'border-[#2a2a2a] hover:border-[#333]',
                  ].join(' ')}
                >
                  <input
                    type="radio"
                    name="experienceLevel"
                    value={option.value}
                    checked={experienceLevel === option.value}
                    onChange={() => setExperienceLevel(option.value)}
                    className="sr-only"
                  />
                  <span className={['text-xs font-medium', experienceLevel === option.value ? 'text-[#e63946]' : 'text-[#f5f5f5]'].join(' ')}>
                    {option.label}
                  </span>
                  <span className="text-xs leading-tight text-[#555]">{option.desc}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <label className="mb-3 block text-xs text-[#888]">태그</label>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={[
                    'rounded-full border px-3 py-1.5 text-sm transition-colors',
                    tags.includes(tag) ? 'border-[#e63946] bg-[#e63946]/10 text-[#e63946]' : 'border-[#2a2a2a] text-[#888] hover:border-[#444]',
                  ].join(' ')}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs text-[#888]">상세 내용 <span className="text-[#e63946]">*</span></label>
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="본인 소개, 원하는 플레이 스타일, 주의사항 등을 자유롭게 적어주세요."
              rows={6}
              maxLength={1000}
              className="w-full resize-none rounded border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f5f5f5] outline-none placeholder:text-[#555] focus:border-[#e63946]"
            />
            <p className="mt-1 text-right text-xs text-[#555]">{content.length}/1000</p>
          </div>
        </section>

        <section className="mb-8 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-sm font-bold text-[#f5f5f5]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e63946] text-xs font-bold text-white">3</span>
            연락 정보
          </h2>
          <div className="mb-4">
            <label className="mb-2 block text-xs text-[#888]">오픈채팅 링크 <span className="text-[#e63946]">*</span></label>
            <input
              type="url"
              value={openChatUrl}
              onChange={(event) => setOpenChatUrl(event.target.value)}
              placeholder="https://open.kakao.com/o/..."
              className="w-full rounded border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f5f5f5] outline-none placeholder:text-[#555] focus:border-[#e63946]"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs text-[#888]">이미지 URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="https://..."
              className="w-full rounded border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f5f5f5] outline-none placeholder:text-[#555] focus:border-[#e63946]"
            />
          </div>
        </section>

        {errorMessage && <p className="mb-3 text-center text-xs font-bold text-[#ef5353]">{errorMessage}</p>}

        <div className="flex gap-3">
          <Link href="/mate" className="rounded border border-[#2a2a2a] px-5 py-3 text-sm text-[#888] transition-colors hover:border-[#444]">취소</Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className="flex-1 rounded bg-[#e63946] py-3 text-sm font-bold text-white transition-colors hover:bg-[#c1121f] disabled:cursor-not-allowed disabled:opacity-30"
          >
            {isSubmitting ? '저장 중...' : isEditMode ? '모집 글 수정하기' : '모집 글 등록하기'}
          </button>
        </div>

        {!isValid && (
          <p className="mt-3 text-center text-xs text-[#555]">
            * {validationMessage}
          </p>
        )}
        </>
        )}
      </div>
    </div>
  );
}
