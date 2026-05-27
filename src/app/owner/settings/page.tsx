'use client';

import { useState } from 'react';

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle}
      className={['relative w-11 h-6 rounded-full transition-colors shrink-0', on ? 'bg-[#e63946]' : 'bg-[#2a2a2a]'].join(' ')}>
      <span className={['absolute top-1 w-4 h-4 rounded-full bg-white transition-all', on ? 'left-6' : 'left-1'].join(' ')} />
    </button>
  );
}

export default function OwnerSettingsPage() {
  const [nickname, setNickname] = useState('김공포');
  const [storeName] = useState('홍대점');
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPwConfirm, setNewPwConfirm] = useState('');
  const [emailPrivate, setEmailPrivate] = useState(true);
  const [agePrivate, setAgePrivate] = useState(false);
  const [genderPrivate, setGenderPrivate] = useState(false);
  const [age, setAge] = useState('24');
  const [gender, setGender] = useState('여자');
  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6">
      <div className="max-w-xl">
        <div className="mb-6">
          <p className="text-xs text-[#555] mb-0.5">계정 설정</p>
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
                <label className="block text-xs text-[#666] mb-1.5">지점명</label>
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
            <input value="kimgongpo@gmail.com" readOnly
              className="w-full bg-[#111] border border-[#1a1a1a] text-[#666] text-sm rounded-lg px-3 py-2.5 outline-none cursor-not-allowed mb-3" />
            <div className="flex items-center justify-between bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-3">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#555] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm text-[#888]">이메일 비공개</span>
              </div>
              <Toggle on={emailPrivate} onToggle={() => setEmailPrivate(p => !p)} />
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
                <div key={f.label} className="flex items-center justify-between bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#555] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-sm text-[#888]">{f.label}</span>
                  </div>
                  <Toggle on={f.v} onToggle={f.toggle} />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 mt-5">
          <button
            onClick={handleSave}
            className={['px-6 py-2.5 rounded-lg text-sm font-bold transition-all',
              saved ? 'bg-[#2ecc71] text-white' : 'bg-[#e63946] hover:bg-[#c1121f] text-white'
            ].join(' ')}>
            {saved ? '✓ 저장됨' : '저장하기'}
          </button>
        </div>
      </div>

      {/* Settings modal trigger for demo */}
      <div className="mt-8 pt-6 border-t border-[#1a1a1a]">
        <p className="text-xs text-[#444] mb-3">모달 형태 미리보기 (데모)</p>
        <button onClick={() => setShowModal(true)}
          className="text-xs border border-[#2a2a2a] text-[#888] hover:border-[#444] hover:text-[#f5f5f5] px-3 py-2 rounded-lg transition-colors">
          ⚙ 설정 모달 열기
        </button>
      </div>

      {/* Settings Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl w-full max-w-sm max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#1f1f1f]">
              <h2 className="text-sm font-bold text-[#f5f5f5] flex items-center gap-2">
                <svg className="w-4 h-4 text-[#888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                설정
              </h2>
              <button onClick={() => setShowModal(false)} className="text-[#555] hover:text-[#888] text-xl leading-none">×</button>
            </div>

            <div className="px-5 py-5 space-y-5">
              <div>
                <label className="block text-xs text-[#888] mb-1.5">닉네임</label>
                <input value={nickname} onChange={e => setNickname(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded-lg px-3 py-2.5 outline-none focus:border-[#e63946]" />
              </div>
              <div className="border-t border-[#1a1a1a]" />
              <div>
                <label className="block text-xs text-[#888] mb-1.5">비밀번호 변경</label>
                <div className="space-y-2">
                  {['현재 비밀번호', '새 비밀번호', '새 비밀번호 확인'].map(ph => (
                    <input key={ph} type="password" placeholder={ph}
                      className="w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded-lg px-3 py-2.5 outline-none focus:border-[#e63946] placeholder-[#444]" />
                  ))}
                </div>
              </div>
              <div className="border-t border-[#1a1a1a]" />
              <div>
                <label className="block text-xs text-[#888] mb-1.5">이메일</label>
                <p className="text-xs text-[#555] mb-1.5">현재 이메일</p>
                <input value="kimgongpo@gmail.com" readOnly
                  className="w-full bg-[#0d0d0d] border border-[#1a1a1a] text-[#666] text-sm rounded-lg px-3 py-2.5 outline-none cursor-not-allowed mb-2" />
                <div className="flex items-center justify-between bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg px-3 py-2.5">
                  <div className="flex items-center gap-2 text-sm text-[#888]">
                    <span className="text-xs">🔒</span>이메일 비공개
                  </div>
                  <Toggle on={emailPrivate} onToggle={() => setEmailPrivate(p => !p)} />
                </div>
              </div>
              <div className="border-t border-[#1a1a1a]" />
              <div>
                <label className="block text-xs text-[#888] mb-2">나이 · 성별</label>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <p className="text-xs text-[#555] mb-1">나이</p>
                    <input value={age} onChange={e => setAge(e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded-lg px-3 py-2.5 outline-none focus:border-[#e63946]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#555] mb-1">성별</p>
                    <select value={gender} onChange={e => setGender(e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f5f5] text-sm rounded-lg px-3 py-2.5 outline-none focus:border-[#e63946]">
                      <option value="여자">여자</option>
                      <option value="남자">남자</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>
                </div>
                {[
                  { label: '나이 비공개', v: agePrivate, toggle: () => setAgePrivate(p => !p) },
                  { label: '성별 비공개', v: genderPrivate, toggle: () => setGenderPrivate(p => !p) },
                ].map(f => (
                  <div key={f.label} className="flex items-center justify-between bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg px-3 py-2.5 mb-1.5">
                    <div className="flex items-center gap-2 text-sm text-[#888]"><span className="text-xs">🔒</span>{f.label}</div>
                    <Toggle on={f.v} onToggle={f.toggle} />
                  </div>
                ))}
              </div>
            </div>

            <div className="px-5 py-4 border-t border-[#1a1a1a] flex justify-end gap-2">
              <button onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-[#2a2a2a] text-[#888] text-sm hover:border-[#444] transition-colors">
                취소
              </button>
              <button onClick={() => { handleSave(); setShowModal(false); }}
                className="px-4 py-2 rounded-lg bg-[#e63946] hover:bg-[#c1121f] text-white text-sm font-bold transition-colors">
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
