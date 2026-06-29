'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { changePassword, getAuthErrorMessage } from '@/services/authService';
import { updateMyProfile } from '@/services/userService';

function Toggle({ on, onToggle, disabled = false }: { on: boolean; onToggle: () => void; disabled?: boolean }) {
  return (
    <button type="button" onClick={onToggle} disabled={disabled}
      className={['relative w-11 h-6 rounded-full transition-colors shrink-0 disabled:cursor-not-allowed disabled:opacity-45', on ? 'bg-[#e63946]' : 'bg-[#2a2a2a]'].join(' ')}>
      <span className={['absolute top-1 w-4 h-4 rounded-full bg-white transition-all', on ? 'left-6' : 'left-1'].join(' ')} />
    </button>
  );
}

export default function OwnerSettingsPage() {
    const { user, setUser } = useAuthStore();
  const [nickname, setNickname] = useState(user?.nickname ??'');
  const [storeName, setStoreName] = useState(user?.storeName ??'');
    const [email, setEmail] = useState(user?.email ?? '');
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPwConfirm, setNewPwConfirm] = useState('');
  const [emailPrivate, setEmailPrivate] = useState(user?.isEmailPublic === undefined ? true : !user.isEmailPublic);
  const [agePrivate, setAgePrivate] = useState(user?.isAgePublic === undefined ? false : !user.isAgePublic);
  const [genderPrivate, setGenderPrivate] = useState(user?.isGenderPublic === undefined ? false : !user.isGenderPublic);
  const [age, setAge] = useState(user?.age ? String(user.age) : '');
  const [gender, setGender] = useState(user?.gender ?? '');
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (user?.nickname) setNickname(user.nickname);
        if (user?.storeName) setStoreName(user.storeName);
        if (user?.email) setEmail(user.email);
        setAge(user?.age ? String(user.age) : '');
        setGender(user?.gender ?? '');
        setEmailPrivate(user?.isEmailPublic === undefined ? true : !user.isEmailPublic);
        setAgePrivate(user?.isAgePublic === undefined ? false : !user.isAgePublic);
        setGenderPrivate(user?.isGenderPublic === undefined ? false : !user.isGenderPublic);
    }, [user]);

  const handleSave = async () => {
      if (isSaving) return;
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
      if (shouldChangePassword && (!currentPw || !newPw || !newPwConfirm)) {
          setErrorMessage('비밀번호 변경 항목을 모두 입력해주세요.');
          return;
      }
      if (shouldChangePassword && newPw !== newPwConfirm) {
          setErrorMessage('새 비밀번호가 일치하지 않습니다.');
          return;
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
          await changePassword({ currentPassword: currentPw, newPassword: newPw });
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
        setStatusMessage(shouldChangePassword ? '계정 정보와 비밀번호가 저장되었습니다.' : '계정 정보가 저장되었습니다.');
      } catch (error) {
        setErrorMessage(getAuthErrorMessage(error, '설정을 저장하지 못했습니다.'));
      } finally {
        setIsSaving(false);
      }
  };

  return (
    <div className="p-6">
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <p className="text-xs text-[#aaa] mb-0.5">계정 설정</p>
          <p className="text-xs text-[#444]">관리자 계정 정보와 보안 설정을 관리합니다.</p>
        </div>

        <div className="space-y-px">
          {/* 계정 정보 */}
          <section className="bg-[#1a1a1a] border border-[#222] rounded-t-xl px-5 py-5">
            <h2 className="text-xs font-bold text-[#888] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1 h-3 bg-[#e63946] rounded-full" />
              계정 정보
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#666] mb-1.5">닉네임</label>
                <input value={nickname} onChange={e => setNickname(e.target.value)}
                  className="w-full bg-[#111] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded-lg px-3 py-2.5 outline-none focus:border-[#e63946] transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-[#666] mb-1.5">가게명</label>
                <input value={storeName} readOnly
                  className="w-full bg-[#111] border border-[#1a1a1a] text-[#555] text-sm rounded-lg px-3 py-2.5 outline-none cursor-not-allowed" />
              </div>
            </div>
          </section>

          {/* 비밀번호 */}
          <section className="bg-[#1a1a1a] border border-[#222] border-t-0 px-5 py-5">
            <h2 className="text-xs font-bold text-[#888] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1 h-3 bg-[#e63946] rounded-full" />
              비밀번호 변경
            </h2>
            <div className="space-y-2">
              {[
                { ph: '현재 비밀번호', v: currentPw, s: setCurrentPw },
                { ph: '새 비밀번호', v: newPw, s: setNewPw },
                { ph: '새 비밀번호 확인', v: newPwConfirm, s: setNewPwConfirm },
              ].map(f => (
                <input key={f.ph} type="password" placeholder={f.ph} value={f.v} onChange={e => f.s(e.target.value)}
                  className="w-full bg-[#111] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded-lg px-3 py-2.5 outline-none focus:border-[#e63946] placeholder-[#444] transition-colors" />
              ))}
            </div>
          </section>

          {/* 이메일 */}
          <section className="bg-[#1a1a1a] border border-[#222] border-t-0 px-5 py-5">
            <h2 className="text-xs font-bold text-[#888] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1 h-3 bg-[#e63946] rounded-full" />
              이메일
            </h2>
            <p className="text-xs text-[#555] mb-1.5">현재 이메일</p>
            <input value={email} readOnly
              className="w-full bg-[#111] border border-[#1a1a1a] text-[#666] text-sm rounded-lg px-3 py-2.5 outline-none cursor-not-allowed mb-3" />
            <div className="flex items-center justify-between bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-3">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#555] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm text-[#888]">이메일 비공개</span>
              </div>
              <Toggle on={emailPrivate} disabled={isSaving} onToggle={() => setEmailPrivate(p => !p)} />
            </div>
          </section>

          {/* 나이 · 성별 */}
          <section className="bg-[#1a1a1a] border border-[#222] border-t-0 rounded-b-xl px-5 py-5">
            <h2 className="text-xs font-bold text-[#888] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1 h-3 bg-[#e63946] rounded-full" />
              나이 · 성별
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-xs text-[#555] mb-1.5">나이</p>
                <input value={age} onChange={e => setAge(e.target.value)} type="number" min="1" max="99"
                  className="w-full bg-[#111] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded-lg px-3 py-2.5 outline-none focus:border-[#e63946] transition-colors" />
              </div>
              <div>
                <p className="text-xs text-[#555] mb-1.5">성별</p>
                <select value={gender} onChange={e => setGender(e.target.value)}
                  className="w-full bg-[#111] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded-lg px-3 py-2.5 outline-none focus:border-[#e63946] transition-colors">
                  <option value="">선택 안 함</option>
                  <option value="FEMALE">여자</option>
                  <option value="MALE">남자</option>
                  <option value="OTHER">기타</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: '나이 비공개', v: agePrivate, toggle: () => setAgePrivate(p => !p) },
                { label: '성별 비공개', v: genderPrivate, toggle: () => setGenderPrivate(p => !p) },
              ].map(f => (
                <div key={f.label} className="flex items-center justify-between bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#555] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-sm text-[#888]">{f.label}</span>
                  </div>
                  <Toggle on={f.v} disabled={isSaving} onToggle={f.toggle} />
                </div>
              ))}
            </div>

              {/* 여기 추가 */}
              <div className="flex justify-end pt-4 mt-4 border-t border-[#222]">
                  <div className="mr-auto self-center">
                    {statusMessage && <p className="text-xs font-bold text-[#2ecc71]">{statusMessage}</p>}
                    {errorMessage && <p className="text-xs font-bold text-[#ff727b]">{errorMessage}</p>}
                  </div>
                  <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-6 py-2.5 rounded-lg text-sm font-bold transition-all bg-[#e63946] hover:bg-[#c1121f] text-white disabled:cursor-not-allowed disabled:opacity-50">
                      {isSaving ? '저장 중...' : '저장하기'}
                  </button>
              </div>

          </section>
        </div>


      </div>

    </div>
  );
}
