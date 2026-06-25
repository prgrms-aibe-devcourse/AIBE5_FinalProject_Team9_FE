'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ConfirmModal from '@/components/common/ConfirmModal';
import { changePassword, getAuthErrorMessage, getMe } from '@/services/authService';
import { getMyPageProfile } from '@/services/mypageService';
import { deleteMyAccount, updateMyProfile } from '@/services/userService';
import { useAuthStore } from '@/stores/authStore';
import { getToken } from '@/lib/token';

function Toggle({ on, onToggle, disabled = false }: { on: boolean; onToggle: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={[
        'relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        on ? 'bg-[#e63946]' : 'bg-[#2a2a2a]',
      ].join(' ')}
    >
      <span
        className={[
          'absolute top-1 h-4 w-4 rounded-full bg-white transition-all',
          on ? 'left-6' : 'left-1',
        ].join(' ')}
      />
    </button>
  );
}

const normalizeGender = (value?: string) => {
  if (!value) return '';
  const upper = value.toUpperCase();
  if (upper === 'MALE' || value === '남자') return 'MALE';
  if (upper === 'FEMALE' || value === '여자') return 'FEMALE';
  return 'OTHER';
};

export default function MySettingsPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const [nickname, setNickname] = useState('');
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPwConfirm, setNewPwConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [emailPrivate, setEmailPrivate] = useState(true);
  const [agePrivate, setAgePrivate] = useState(false);
  const [genderPrivate, setGenderPrivate] = useState(false);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!isLoggedIn || !getToken()) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    Promise.allSettled([getMyPageProfile(), getMe()])
      .then(([profileResult, meResult]) => {
        if (!isMounted) return;

        if (profileResult.status === 'fulfilled') {
          const profile = profileResult.value;
          setNickname(profile.nickname ?? '');
          setAge(profile.age ? String(profile.age) : '');
          setGender(normalizeGender(profile.gender));
        }

        if (meResult.status === 'fulfilled') {
          const me = meResult.value;
          setEmail(me.email ?? '');
          setEmailPrivate(me.isEmailPublic === undefined ? true : !me.isEmailPublic);
          setAgePrivate(me.isAgePublic === undefined ? false : !me.isAgePublic);
          setGenderPrivate(me.isGenderPublic === undefined ? false : !me.isGenderPublic);

          if (profileResult.status === 'rejected') {
            setNickname(me.nickname ?? '');
            setAge(me.age ? String(me.age) : '');
            setGender(normalizeGender(me.gender));
          }
        }

        if (profileResult.status === 'rejected' && meResult.status === 'rejected') {
          setErrorMessage('설정 정보를 불러오지 못했습니다.');
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [hasHydrated, isLoggedIn]);

  const handleSave = async () => {
    setStatusMessage('');
    setErrorMessage('');

    const nextNickname = nickname.trim();
    if (!nextNickname) {
      setErrorMessage('닉네임을 입력해주세요.');
      return;
    }

    const parsedAge = age.trim() ? Number(age) : undefined;
    if (parsedAge !== undefined && (!Number.isInteger(parsedAge) || parsedAge < 1 || parsedAge > 99)) {
      setErrorMessage('나이는 1~99 사이의 숫자로 입력해주세요.');
      return;
    }

    const shouldChangePassword = Boolean(currentPw || newPw || newPwConfirm);
    if (shouldChangePassword) {
      if (!currentPw || !newPw || !newPwConfirm) {
        setErrorMessage('비밀번호 변경 항목을 모두 입력해주세요.');
        return;
      }
      if (newPw !== newPwConfirm) {
        setErrorMessage('새 비밀번호가 일치하지 않습니다.');
        return;
      }
    }

    setIsSaving(true);

    try {
      await updateMyProfile({
        nickname: nextNickname,
        age: parsedAge,
        gender: gender || undefined,
        emailVisible: !emailPrivate,
        ageVisible: !agePrivate,
        genderVisible: !genderPrivate,
      });

      if (shouldChangePassword) {
        await changePassword({
          currentPassword: currentPw,
          newPassword: newPw,
        });
        setCurrentPw('');
        setNewPw('');
        setNewPwConfirm('');
      }

      if (user) {
        setUser({
          ...user,
          nickname: nextNickname,
          age: parsedAge,
          gender: gender || undefined,
          isEmailPublic: !emailPrivate,
          isAgePublic: !agePrivate,
          isGenderPublic: !genderPrivate,
        });
      }

      setStatusMessage(shouldChangePassword ? '프로필과 비밀번호가 저장되었습니다.' : '프로필이 저장되었습니다.');
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error, '설정을 저장하지 못했습니다.'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleWithdraw = async () => {
    setIsWithdrawing(true);
    setErrorMessage('');

    try {
      await deleteMyAccount();
      logout();
      router.push('/login');
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error, '회원 탈퇴에 실패했습니다.'));
      setIsWithdrawOpen(false);
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <div className="border-b border-[#1a1a1a]">
        <div className="mx-auto max-w-lg px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-[#555]">
            <Link href="/" className="transition-colors hover:text-[#888]">홈</Link>
            <span>&gt;</span>
            <Link href="/mypage" className="transition-colors hover:text-[#888]">마이페이지</Link>
            <span>&gt;</span>
            <span className="text-[#888]">설정</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 py-8">
        <div className="mb-7 flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-black text-[#f5f5f5]">설정</h1>
        </div>

        <div className="space-y-px">
          <section className="rounded-t-xl border border-[#2a2a2a] bg-[#1a1a1a] px-5 py-5">
            <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-[#888]">닉네임</label>
            <input
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              disabled={isLoading || isSaving}
              className="w-full rounded-lg border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f5f5f5] outline-none focus:border-[#e63946] disabled:cursor-not-allowed disabled:opacity-55"
            />
          </section>

          <section className="border border-t-0 border-[#2a2a2a] bg-[#1a1a1a] px-5 py-5">
            <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-[#888]">비밀번호 변경</label>
            <div className="space-y-2">
              {[
                { placeholder: '현재 비밀번호', value: currentPw, setter: setCurrentPw },
                { placeholder: '새 비밀번호', value: newPw, setter: setNewPw },
                { placeholder: '새 비밀번호 확인', value: newPwConfirm, setter: setNewPwConfirm },
              ].map((field) => (
                <input
                  key={field.placeholder}
                  type="password"
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(event) => field.setter(event.target.value)}
                  disabled={isSaving}
                  className="w-full rounded-lg border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f5f5f5] outline-none placeholder-[#555] focus:border-[#e63946] disabled:cursor-not-allowed disabled:opacity-55"
                />
              ))}
            </div>
          </section>

          <section className="border border-t-0 border-[#2a2a2a] bg-[#1a1a1a] px-5 py-5">
            <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-[#888]">이메일</label>
            <p className="mb-1.5 text-xs text-[#555]">현재 이메일</p>
            <input
              value={email || '-'}
              readOnly
              className="mb-3 w-full cursor-not-allowed rounded-lg border border-[#1a1a1a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#666] outline-none"
            />
            <div className="flex items-center justify-between rounded-lg border border-[#2a2a2a] bg-[#0d0d0d] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-sm">🔒</span>
                <span className="text-sm text-[#888]">이메일 비공개</span>
              </div>
              <Toggle on={emailPrivate} disabled={isSaving} onToggle={() => setEmailPrivate((prev) => !prev)} />
            </div>
          </section>

          <section className="rounded-b-xl border border-t-0 border-[#2a2a2a] bg-[#1a1a1a] px-5 py-5">
            <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-[#888]">나이 · 성별</label>
            <div className="mb-3 grid grid-cols-2 gap-3">
              <div>
                <p className="mb-1.5 text-xs text-[#555]">나이</p>
                <input
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  type="number"
                  min="1"
                  max="99"
                  disabled={isSaving}
                  className="w-full rounded-lg border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f5f5f5] outline-none focus:border-[#e63946] disabled:cursor-not-allowed disabled:opacity-55"
                />
              </div>
              <div>
                <p className="mb-1.5 text-xs text-[#555]">성별</p>
                <select
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
                  disabled={isSaving}
                  className="w-full rounded-lg border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f5f5f5] outline-none focus:border-[#e63946] disabled:cursor-not-allowed disabled:opacity-55"
                >
                  <option value="">선택 안 함</option>
                  <option value="FEMALE">여자</option>
                  <option value="MALE">남자</option>
                  <option value="OTHER">기타</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: '나이 비공개', value: agePrivate, toggle: () => setAgePrivate((prev) => !prev) },
                { label: '성별 비공개', value: genderPrivate, toggle: () => setGenderPrivate((prev) => !prev) },
              ].map((field) => (
                <div key={field.label} className="flex items-center justify-between rounded-lg border border-[#2a2a2a] bg-[#0d0d0d] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🔒</span>
                    <span className="text-sm text-[#888]">{field.label}</span>
                  </div>
                  <Toggle on={field.value} disabled={isSaving} onToggle={field.toggle} />
                </div>
              ))}
            </div>
          </section>
        </div>

        {(statusMessage || errorMessage) && (
          <div
            className={[
              'mt-4 rounded-lg border px-4 py-3 text-sm font-bold',
              errorMessage
                ? 'border-[#cc2222]/45 bg-[#cc2222]/8 text-[#ef5353]'
                : 'border-[#2ecc71]/35 bg-[#2ecc71]/8 text-[#2ecc71]',
            ].join(' ')}
          >
            {errorMessage || statusMessage}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsWithdrawOpen(true)}
            disabled={isSaving || isWithdrawing}
            className="text-sm text-[#555] transition-colors hover:text-[#e63946] disabled:cursor-not-allowed disabled:opacity-45"
          >
            탈퇴하기
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => router.push('/mypage')}
              disabled={isSaving}
              className="rounded-lg border border-[#2a2a2a] px-5 py-2.5 text-sm text-[#888] transition-colors hover:border-[#444] disabled:cursor-not-allowed disabled:opacity-45"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isLoading || isSaving}
              className={[
                'rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-all disabled:cursor-not-allowed disabled:opacity-55',
                statusMessage ? 'bg-[#2ecc71]' : 'bg-[#e63946] hover:bg-[#c1121f]',
              ].join(' ')}
            >
              {isSaving ? '저장 중...' : statusMessage ? '저장됨' : '저장하기'}
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={isWithdrawOpen}
        title="회원 탈퇴"
        description={'탈퇴하면 계정과 로그인 정보가 비활성화됩니다.\n정말 탈퇴하시겠습니까?'}
        confirmText="탈퇴하기"
        cancelText="취소"
        variant="danger"
        isLoading={isWithdrawing}
        onCancel={() => {
          if (!isWithdrawing) setIsWithdrawOpen(false);
        }}
        onConfirm={handleWithdraw}
      />
    </div>
  );
}
