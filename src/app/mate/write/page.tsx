'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMateStore, MateValidationException, MateForbiddenError, MateNotFoundError } from '@/stores/mateStore';
import { useAuthStore } from '@/stores/authStore';
import {
  validateMatePost,
  toFieldErrorMap,
  MATE_CONSTRAINTS,
  canEditOrDelete,
} from '@/lib/mateValidation';
import {
  CreateMatePostRequest,
  ContactMethod,
  ExperienceLevel,
} from '@/types/mate';

// ── Constants ─────────────────────────────────────────────────────
const LOCATIONS = ['강남점', '홍대점', '건대점', '신촌점'];

const THEMES_BY_LOCATION: Record<string, string[]> = {
  '강남점': ['체벌린', '살인마의 방', '좀비 아포칼립스', '블러드문'],
  '홍대점': ['저주받은 술', '13번째 방', '악몽의 연구실', '유령 병원'],
  '건대점': ['악마의 제단', '악마의 병원', '공포의 지하실', '어둠의 복도'],
  '신촌점': ['잊혀진 기억', '검은 거울', '저주의 집', '망자의 서'],
};

const TIME_SLOTS = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00', '20:30', '22:00'];

const ALL_TAGS = ['진지하게', '즐겁게', '공략 위주', '분위기 위주', '처음 만난 팬텀', '여성만', '사진 촬영'];

const EXPERIENCE_OPTIONS: { value: ExperienceLevel; label: string; desc: string }[] = [
  { value: 'ANY', label: '무관 (누구나 환영)', desc: '경험 여부에 관계없이 모집합니다' },
  { value: 'BEGINNER', label: '입문자 환영', desc: '처음 도전하는 분도 환영합니다' },
  { value: 'INTERMEDIATE', label: '중급자 우대', desc: '어느 정도 경험이 있는 분 선호' },
  { value: 'EXPERT', label: '경험자 우대', desc: '방탈출 다수 경험자 선호' },
];

// ── Page ──────────────────────────────────────────────────────────
export default function MateWritePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  const isEditMode = !!editId;

  const { user, isLoggedIn } = useAuthStore();
  const { createPost, updatePost, getPost } = useMateStore();

  // ── 폼 상태 ──
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [theme, setTheme] = useState('');
  const [playDate, setPlayDate] = useState('');
  const [playTime, setPlayTime] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [myCount, setMyCount] = useState(1);
  const [recruitCount, setRecruitCount] = useState(1);
  const [expLevel, setExpLevel] = useState<ExperienceLevel>('ANY');
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [contactMethod, setContactMethod] = useState<ContactMethod>('KAKAO');
  const [contactLink, setContactLink] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  // ── 수정 모드: 기존 글 로딩 + 권한 확인 ──
  useEffect(() => {
    if (!isEditMode) return;
    const id = Number(editId);
    if (!Number.isFinite(id)) {
      setPermissionError('잘못된 접근입니다.');
      return;
    }
    const post = getPost(id);
    if (!post) {
      setPermissionError('존재하지 않는 모집글입니다.');
      return;
    }
    if (!canEditOrDelete(post, user?.id ?? null)) {
      setPermissionError('본인의 글만 수정할 수 있습니다.');
      return;
    }
    setTitle(post.title);
    setLocation(post.locationName);
    setTheme(post.themeTitle);
    setPlayDate(post.playDate);
    setPlayTime(post.reservationTime);
    setDeadlineDate(post.deadlineDate ?? '');
    setMyCount(post.currentMembers);
    setRecruitCount(Math.max(1, post.totalMembers - post.currentMembers));
    setExpLevel(post.experienceLevel);
    setTags(post.atmosphereTags);
    setContent(post.content);
    setContactMethod(post.contactMethod);
    setContactLink(post.contactLink ?? '');
  }, [isEditMode, editId, getPost, user?.id]);

  const themes = location ? THEMES_BY_LOCATION[location] ?? [] : [];
  const totalMembers = myCount + recruitCount;

  // ── 실시간 검증 ──
  const buildPayload = (): CreateMatePostRequest => ({
    title,
    content,
    locationName: location,
    themeTitle: theme,
    playDate,
    reservationTime: playTime,
    deadlineDate: deadlineDate || undefined,
    myCount,
    recruitCount,
    experienceLevel: expLevel,
    atmosphereTags: tags,
    contactMethod,
    contactLink: contactLink || undefined,
  });

  const liveErrors = useMemo(
    () => toFieldErrorMap(validateMatePost(buildPayload())),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [title, location, theme, playDate, playTime, deadlineDate, myCount, recruitCount, expLevel, tags, contactMethod, contactLink, content]
  );

  const showError = (field: string) =>
    (touched[field] || fieldErrors[field]) ? (fieldErrors[field] || liveErrors[field]) : '';

  const isValid = Object.keys(liveErrors).length === 0;

  const toggleTag = (tag: string) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleLocationChange = (loc: string) => {
    setLocation(loc);
    setTheme('');
  };

  const handleSubmit = () => {
    setSubmitError(null);
    setTouched({
      title: true, content: true, locationName: true, themeTitle: true,
      playDate: true, reservationTime: true, deadlineDate: true,
      atmosphereTags: true, contactMethod: true, contactLink: true,
    });

    if (!isLoggedIn || !user) {
      setSubmitError('로그인이 필요합니다.');
      setTimeout(() => router.push('/login'), 800);
      return;
    }

    const payload = buildPayload();
    const errors = validateMatePost(payload);
    if (errors.length > 0) {
      setFieldErrors(toFieldErrorMap(errors));
      setSubmitError('입력값을 확인해주세요.');
      return;
    }

    setSubmitting(true);
    try {
      if (isEditMode) {
        updatePost(Number(editId), payload, user.id);
      } else {
        createPost(payload, {
          id: user.id,
          nickname: user.nickname,
          profileImageUrl: user.profileImageUrl,
        });
      }
      setSubmitted(true);
      setTimeout(() => router.push('/mate'), 1200);
    } catch (e) {
      if (e instanceof MateValidationException) {
        setFieldErrors(toFieldErrorMap(e.errors));
        setSubmitError('입력값을 확인해주세요.');
      } else if (e instanceof MateForbiddenError) {
        setSubmitError(e.message);
      } else if (e instanceof MateNotFoundError) {
        setSubmitError(e.message);
      } else {
        setSubmitError('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // ── Render ──
  if (permissionError) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#e63946]/20 border border-[#e63946]/40 flex items-center justify-center mx-auto mb-4 text-2xl">⚠</div>
          <p className="text-[#e63946] font-bold text-lg mb-1">접근 권한 없음</p>
          <p className="text-[#888] text-sm mb-4">{permissionError}</p>
          <Link href="/mate" className="text-xs text-[#888] underline hover:text-[#e63946]">메이트 모집 페이지로</Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#2ecc71]/20 border border-[#2ecc71]/40 flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
          <p className="text-[#2ecc71] font-bold text-lg mb-1">
            {isEditMode ? '모집 글이 수정되었습니다!' : '모집 글이 등록되었습니다!'}
          </p>
          <p className="text-[#888] text-sm">메이트 모집 페이지로 이동합니다...</p>
        </div>
      </div>
    );
  }

  const fieldErrorEl = (field: string) => {
    const msg = showError(field);
    return msg ? <p className="text-xs text-[#e63946] mt-1">{msg}</p> : null;
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] pb-24">
      <div className="border-b border-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-[#555]">
            <Link href="/" className="hover:text-[#888] transition-colors">홈</Link>
            <span>›</span>
            <Link href="/mate" className="hover:text-[#888] transition-colors">메이트 모집</Link>
            <span>›</span>
            <span className="text-[#888]">{isEditMode ? '글 수정' : '글쓰기'}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-black text-[#f5f5f5] mb-1">
          {isEditMode ? '메이트 모집 글 수정' : '메이트 모집 글쓰기'}
        </h1>
        <p className="text-sm text-[#888] mb-8">
          함께할 메이트를 모집해보세요. 테마, 날짜, 분위기를 상세히 적을수록 좋은 메이트를 만날 수 있어요.
        </p>

        {/* ── Section 1: 기본 정보 ── */}
        <section className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 mb-5">
          <h2 className="text-sm font-bold text-[#f5f5f5] mb-5 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#e63946] text-white text-xs flex items-center justify-center font-bold">1</span>
            기본 정보
          </h2>

          {/* 제목 */}
          <div className="mb-5">
            <label className="block text-xs text-[#888] mb-2">
              모집 제목 <span className="text-[#e63946]">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, title: true }))}
              placeholder="예) 강남점 체벌린 주말 저녁 2명 모집합니다"
              maxLength={MATE_CONSTRAINTS.TITLE_MAX}
              className="w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded px-3 py-2.5 placeholder-[#555] focus:border-[#e63946] outline-none"
            />
            <p className="text-xs text-[#555] mt-1 text-right">{title.length}/{MATE_CONSTRAINTS.TITLE_MAX}</p>
            {fieldErrorEl('title')}
          </div>

          {/* 지점 + 테마 */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-xs text-[#888] mb-2">
                지점 <span className="text-[#e63946]">*</span>
              </label>
              <select
                value={location}
                onChange={e => handleLocationChange(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, locationName: true }))}
                className="w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded px-3 py-2.5 outline-none focus:border-[#e63946]"
              >
                <option value="">지점 선택</option>
                {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
              {fieldErrorEl('locationName')}
            </div>
            <div>
              <label className="block text-xs text-[#888] mb-2">
                테마 <span className="text-[#e63946]">*</span>
              </label>
              <select
                value={theme}
                onChange={e => setTheme(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, themeTitle: true }))}
                disabled={!location}
                className="w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded px-3 py-2.5 outline-none focus:border-[#e63946] disabled:opacity-40"
              >
                <option value="">테마 선택</option>
                {themes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              {fieldErrorEl('themeTitle')}
            </div>
          </div>

          {/* 날짜 + 시간 + 마감일 */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div>
              <label className="block text-xs text-[#888] mb-2">
                플레이 날짜 <span className="text-[#e63946]">*</span>
              </label>
              <input
                type="date"
                value={playDate}
                onChange={e => setPlayDate(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, playDate: true }))}
                className="w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded px-3 py-2.5 outline-none focus:border-[#e63946] [color-scheme:dark]"
              />
              {fieldErrorEl('playDate')}
            </div>
            <div>
              <label className="block text-xs text-[#888] mb-2">
                예약 시간 <span className="text-[#e63946]">*</span>
              </label>
              <select
                value={playTime}
                onChange={e => setPlayTime(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, reservationTime: true }))}
                className="w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded px-3 py-2.5 outline-none focus:border-[#e63946]"
              >
                <option value="">시간 선택</option>
                {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              {fieldErrorEl('reservationTime')}
            </div>
            <div>
              <label className="block text-xs text-[#888] mb-2">모집 마감일</label>
              <input
                type="date"
                value={deadlineDate}
                onChange={e => setDeadlineDate(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, deadlineDate: true }))}
                className="w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded px-3 py-2.5 outline-none focus:border-[#e63946] [color-scheme:dark]"
              />
              {fieldErrorEl('deadlineDate')}
            </div>
          </div>

          {/* 파티 인원 구성 */}
          <div>
            <label className="block text-xs text-[#888] mb-3">파티 인원 구성</label>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#f5f5f5] w-20">내 인원</span>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setMyCount(n => Math.max(1, n - 1))} className="w-8 h-8 rounded border border-[#2a2a2a] text-[#888] hover:border-[#e63946] hover:text-[#e63946] flex items-center justify-center transition-colors">−</button>
                  <span className="w-8 text-center text-sm font-bold text-[#f5f5f5]">{myCount}</span>
                  <button type="button" onClick={() => setMyCount(n => Math.min(MATE_CONSTRAINTS.MEMBER_MAX, n + 1))} className="w-8 h-8 rounded border border-[#2a2a2a] text-[#888] hover:border-[#e63946] hover:text-[#e63946] flex items-center justify-center transition-colors">+</button>
                </div>
                <span className="text-xs text-[#555]">명</span>
              </div>

              <span className="text-[#333] text-sm">+</span>

              <div className="flex items-center gap-3">
                <span className="text-sm text-[#f5f5f5] w-20">모집 인원</span>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setRecruitCount(n => Math.max(1, n - 1))} className="w-8 h-8 rounded border border-[#2a2a2a] text-[#888] hover:border-[#e63946] hover:text-[#e63946] flex items-center justify-center transition-colors">−</button>
                  <span className="w-8 text-center text-sm font-bold text-[#f5f5f5]">{recruitCount}</span>
                  <button type="button" onClick={() => setRecruitCount(n => Math.min(MATE_CONSTRAINTS.MEMBER_MAX, n + 1))} className="w-8 h-8 rounded border border-[#2a2a2a] text-[#888] hover:border-[#e63946] hover:text-[#e63946] flex items-center justify-center transition-colors">+</button>
                </div>
                <span className="text-xs text-[#555]">명</span>
              </div>

              <div className="flex items-center gap-2 bg-[#0d0d0d] border border-[#2a2a2a] rounded px-3 py-1.5">
                <span className="text-xs text-[#888]">총</span>
                <span className={[
                  'text-sm font-bold',
                  totalMembers > MATE_CONSTRAINTS.TOTAL_MAX ? 'text-[#e63946]' : 'text-[#e63946]',
                ].join(' ')}>{totalMembers}명</span>
              </div>
            </div>
            {fieldErrorEl('recruitCount')}
            {fieldErrorEl('myCount')}
          </div>
        </section>

        {/* ── Section 2: 모집 내용 ── */}
        <section className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 mb-5">
          <h2 className="text-sm font-bold text-[#f5f5f5] mb-5 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#e63946] text-white text-xs flex items-center justify-center font-bold">2</span>
            모집 내용
          </h2>

          <div className="mb-5">
            <label className="block text-xs text-[#888] mb-3">경험 레벨</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {EXPERIENCE_OPTIONS.map(opt => (
                <label
                  key={opt.value}
                  className={[
                    'flex flex-col gap-1 p-3 rounded-lg border cursor-pointer transition-colors',
                    expLevel === opt.value ? 'border-[#e63946] bg-[#e63946]/10' : 'border-[#2a2a2a] hover:border-[#333]',
                  ].join(' ')}
                >
                  <input type="radio" name="expLevel" value={opt.value} checked={expLevel === opt.value} onChange={() => setExpLevel(opt.value)} className="sr-only" />
                  <span className={['text-xs font-medium', expLevel === opt.value ? 'text-[#e63946]' : 'text-[#f5f5f5]'].join(' ')}>{opt.label}</span>
                  <span className="text-xs text-[#555] leading-tight">{opt.desc}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-xs text-[#888] mb-3">
              분위기 태그 (최대 {MATE_CONSTRAINTS.TAG_MAX}개)
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map(tag => {
                const selected = tags.includes(tag);
                const disabled = !selected && tags.length >= MATE_CONSTRAINTS.TAG_MAX;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    disabled={disabled}
                    className={[
                      'text-sm px-3 py-1.5 rounded-full border transition-colors',
                      selected ? 'border-[#e63946] text-[#e63946] bg-[#e63946]/10' : 'border-[#2a2a2a] text-[#888] hover:border-[#444]',
                      disabled ? 'opacity-30 cursor-not-allowed' : '',
                    ].join(' ')}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
            {fieldErrorEl('atmosphereTags')}
          </div>

          <div>
            <label className="block text-xs text-[#888] mb-2">
              상세 내용 <span className="text-[#e63946]">*</span>
            </label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, content: true }))}
              placeholder="본인 소개, 원하는 플레이 스타일, 주의사항 등을 자유롭게 적어주세요. (최소 10자)"
              rows={6}
              maxLength={MATE_CONSTRAINTS.CONTENT_MAX}
              className="w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded px-3 py-2.5 placeholder-[#555] focus:border-[#e63946] outline-none resize-none"
            />
            <p className="text-xs text-[#555] mt-1 text-right">{content.length}/{MATE_CONSTRAINTS.CONTENT_MAX}</p>
            {fieldErrorEl('content')}
          </div>
        </section>

        {/* ── Section 3: 연락 방법 ── */}
        <section className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 mb-8">
          <h2 className="text-sm font-bold text-[#f5f5f5] mb-5 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#e63946] text-white text-xs flex items-center justify-center font-bold">3</span>
            연락 방법
          </h2>

          <div className="flex gap-3 mb-4">
            {[
              { value: 'KAKAO' as const, label: '카카오톡 오픈채팅', icon: '💬' },
              { value: 'COMMENT' as const, label: '댓글로 연락', icon: '📝' },
            ].map(opt => (
              <label
                key={opt.value}
                className={[
                  'flex-1 flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors',
                  contactMethod === opt.value ? 'border-[#e63946] bg-[#e63946]/10' : 'border-[#2a2a2a] hover:border-[#333]',
                ].join(' ')}
              >
                <input type="radio" name="contact" value={opt.value} checked={contactMethod === opt.value} onChange={() => setContactMethod(opt.value)} className="sr-only" />
                <span>{opt.icon}</span>
                <span className={['text-sm font-medium', contactMethod === opt.value ? 'text-[#e63946]' : 'text-[#f5f5f5]'].join(' ')}>{opt.label}</span>
              </label>
            ))}
          </div>

          {contactMethod === 'KAKAO' && (
            <div>
              <label className="block text-xs text-[#888] mb-2">
                오픈채팅 링크 <span className="text-[#e63946]">*</span>
              </label>
              <input
                type="url"
                value={contactLink}
                onChange={e => setContactLink(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, contactLink: true }))}
                placeholder="https://open.kakao.com/o/..."
                className="w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded px-3 py-2.5 placeholder-[#555] focus:border-[#e63946] outline-none"
              />
              <p className="text-xs text-[#555] mt-1">링크는 참가 신청 후 공개됩니다.</p>
              {fieldErrorEl('contactLink')}
            </div>
          )}

          {contactMethod === 'COMMENT' && (
            <p className="text-xs text-[#888] bg-[#0d0d0d] border border-[#2a2a2a] rounded px-3 py-2.5">
              신청자가 이 글의 댓글로 연락합니다. 댓글 알림을 켜두세요.
            </p>
          )}
        </section>

        {submitError && (
          <div className="mb-4 px-4 py-3 bg-[#e63946]/10 border border-[#e63946]/40 rounded text-xs text-[#e63946]">
            ⚠ {submitError}
          </div>
        )}

        <div className="flex gap-3">
          <Link href="/mate" className="px-5 py-3 rounded border border-[#2a2a2a] text-[#888] hover:border-[#444] text-sm transition-colors">
            취소
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid || submitting}
            className="flex-1 py-3 rounded bg-[#e63946] hover:bg-[#c1121f] disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold transition-colors"
          >
            {submitting ? '등록 중...' : isEditMode ? '수정 완료' : '모집 글 등록하기'}
          </button>
        </div>

        {!isValid && (
          <p className="text-xs text-[#555] text-center mt-3">
            * 필수 항목(제목, 지점, 테마, 날짜, 시간, 상세 내용)을 모두 입력해주세요
          </p>
        )}
      </div>
    </div>
  );
}
