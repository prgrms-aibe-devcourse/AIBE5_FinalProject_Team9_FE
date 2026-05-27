'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle}
      className={['relative w-11 h-6 rounded-full transition-colors shrink-0', on ? 'bg-[#e63946]' : 'bg-[#2a2a2a]'].join(' ')}>
      <span className={['absolute top-1 w-4 h-4 rounded-full bg-white transition-all', on ? 'left-6' : 'left-1'].join(' ')} />
    </button>
  );
}

export default function MySettingsPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState('김공포');
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPwConfirm, setNewPwConfirm] = useState('');
  const [emailPrivate, setEmailPrivate] = useState(true);
  const [agePrivate, setAgePrivate] = useState(false);
  const [genderPrivate, setGenderPrivate] = useState(false);
  const [age, setAge] = useState('24');
  const [gender, setGender] = useState('여자');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <div className="border-b border-[#1a1a1a]">
        <div className="max-w-lg mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-[#555]">
            <Link href="/" className="hover:text-[#888] transition-colors">홈</Link>
            <span>›</span>
            <Link href="/mypage" className="hover:text-[#888] transition-colors">마이페이지</Link>
            <span>›</span>
            <span className="text-[#888]">설정</span>
          </nav>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-7">
          <h1 className="text-xl font-black text-[#f5f5f5] flex items-center gap-2">⚙ 설정</h1>
        </div>

        <div className="space-y-px">
          {/* 닉네임 */}
          <section className="bg-[#1a1a1a] rounded-t-xl px-5 py-5 border border-[#2a2a2a]">
            <label className="block text-xs font-bold text-[#888] uppercase tracking-wider mb-3">닉네임</label>
            <input value={nickname} onChange={e => setNickname(e.target.value)}
              className="w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded-lg px-3 py-2.5 outline-none focus:border-[#e63946]" />
          </section>

          {/* 비밀번호 변경 */}
          <section className="bg-[#1a1a1a] px-5 py-5 border border-[#2a2a2a] border-t-0">
            <label className="block text-xs font-bold text-[#888] uppercase tracking-wider mb-3">비밀번호 변경</label>
            <div className="space-y-2">
              {[
                { ph: '현재 비밀번호', v: currentPw, s: setCurrentPw },
                { ph: '새 비밀번호', v: newPw, s: setNewPw },
                { ph: '새 비밀번호 확인', v: newPwConfirm, s: setNewPwConfirm },
              ].map(f => (
                <input key={f.ph} type="password" placeholder={f.ph} value={f.v} onChange={e => f.s(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded-lg px-3 py-2.5 outline-none focus:border-[#e63946] placeholder-[#555]" />
              ))}
            </div>
          </section>

          {/* 이메일 */}
          <section className="bg-[#1a1a1a] px-5 py-5 border border-[#2a2a2a] border-t-0">
            <label className="block text-xs font-bold text-[#888] uppercase tracking-wider mb-3">이메일</label>
            <p className="text-xs text-[#555] mb-1.5">현재 이메일</p>
            <input value="kimgongpo@gmail.com" readOnly
              className="w-full bg-[#0d0d0d] border border-[#1a1a1a] text-[#666] text-sm rounded-lg px-3 py-2.5 outline-none cursor-not-allowed mb-3" />
            <div className="flex items-center justify-between bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-sm">🔒</span>
                <span className="text-sm text-[#888]">이메일 비공개</span>
              </div>
              <Toggle on={emailPrivate} onToggle={() => setEmailPrivate(p => !p)} />
            </div>
          </section>

          {/* 나이 · 성별 */}
          <section className="bg-[#1a1a1a] rounded-b-xl px-5 py-5 border border-[#2a2a2a] border-t-0">
            <label className="block text-xs font-bold text-[#888] uppercase tracking-wider mb-3">나이 · 성별</label>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-xs text-[#555] mb-1.5">나이</p>
                <input value={age} onChange={e => setAge(e.target.value)} type="number" min="1" max="99"
                  className="w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded-lg px-3 py-2.5 outline-none focus:border-[#e63946]" />
              </div>
              <div>
                <p className="text-xs text-[#555] mb-1.5">성별</p>
                <select value={gender} onChange={e => setGender(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded-lg px-3 py-2.5 outline-none focus:border-[#e63946]">
                  <option value="여자">여자</option>
                  <option value="남자">남자</option>
                  <option value="기타">기타</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: '나이 비공개', v: agePrivate, toggle: () => setAgePrivate(p => !p) },
                { label: '성별 비공개', v: genderPrivate, toggle: () => setGenderPrivate(p => !p) },
              ].map(f => (
                <div key={f.label} className="flex items-center justify-between bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🔒</span>
                    <span className="text-sm text-[#888]">{f.label}</span>
                  </div>
                  <Toggle on={f.v} onToggle={f.toggle} />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => {}}
            className="text-sm text-[#555] hover:text-[#e63946] transition-colors">
            탈퇴하기
          </button>
          <div className="flex gap-2">
            <button onClick={() => router.push('/mypage')}
              className="px-5 py-2.5 rounded-lg border border-[#2a2a2a] text-[#888] text-sm hover:border-[#444] transition-colors">
              취소
            </button>
            <button onClick={handleSave}
              className={['px-5 py-2.5 rounded-lg text-sm font-bold transition-all',
                saved ? 'bg-[#2ecc71] text-white' : 'bg-[#e63946] hover:bg-[#c1121f] text-white'
              ].join(' ')}>
              {saved ? '✓ 저장됨' : '저장하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
