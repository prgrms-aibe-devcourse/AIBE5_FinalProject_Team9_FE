'use client';

import { useState } from 'react';

interface Theme {
  id: number;
  title: string;
  difficulty: number;
  maxParty: number;
  ageLimit: string;
  genre: string;
  description: string;
  date: string;
  gradient: string;
}

const INITIAL_THEMES: Theme[] = [
  { id: 1, title: '새벽의 저택', difficulty: 4, maxParty: 6, ageLimit: '15세 이상', genre: '공포 / 미스터리', description: '깊은 숲 속을 지나 도착한 오래된 저택, 그곳에 깨어난 당신은 알 수 없는 기운에 둘러싸이게 됩니다.', date: '2024.05.20', gradient: 'from-[#1a0000] via-[#2d1010] to-[#0a0000]' },
  { id: 2, title: '피의 연회', difficulty: 3, maxParty: 5, ageLimit: '12세 이상', genre: '공포 / 미스터리', description: '화려한 연회장, 그러나 손님들이 하나둘 사라지기 시작합니다. 당신만이 진실을 밝힐 수 있습니다.', date: '2024.05.18', gradient: 'from-[#1a0030] via-[#30104a] to-[#0a001a]' },
  { id: 3, title: '망자의 서재', difficulty: 4, maxParty: 5, ageLimit: '15세 이상', genre: '공포 / 미스터리', description: '수백 년 전 사라진 학자의 서재에 봉인된 비밀을 풀어 저주를 끊어야 합니다.', date: '2024.05.15', gradient: 'from-[#000a1a] via-[#0d1a2d] to-[#000]' },
  { id: 4, title: '감금된 연구소', difficulty: 4, maxParty: 4, ageLimit: '12세 이상', genre: '공포 / 탈출', description: '폐쇄된 연구소에서 실험 도중 탈출한 생체 실험체들, 당신은 살아 나올 수 있을까요?', date: '2024.05.10', gradient: 'from-[#001a0d] via-[#0a2010] to-[#000a05]' },
];

type FormState = { title: string; difficulty: number; maxParty: string; ageLimit: string; genre: string; description: string };
const EMPTY_FORM: FormState = { title: '', difficulty: 0, maxParty: '', ageLimit: '', genre: '', description: '' };

function DifficultyDots({ value, onClick }: { value: number; onClick?: (v: number) => void }) {
  return (
    <span className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onClick?.(i + 1)}
          className={[
            'w-4 h-4 rounded-full transition-colors',
            i < value ? 'bg-[#e63946]' : 'bg-[#ddd]',
            onClick ? 'cursor-pointer hover:opacity-80' : 'cursor-default',
          ].join(' ')}
        />
      ))}
    </span>
  );
}

export default function OwnerThemesPage() {
  const [themes, setThemes] = useState(INITIAL_THEMES);
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Theme | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Theme | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [descCount, setDescCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setDescCount(0);
    setEditTarget(null);
    setShowModal(true);
  };

  const openEdit = (t: Theme) => {
    setForm({ title: t.title, difficulty: t.difficulty, maxParty: String(t.maxParty), ageLimit: t.ageLimit, genre: t.genre, description: t.description });
    setDescCount(t.description.length);
    setEditTarget(t);
    setShowModal(true);
    setDropdownOpen(null);
  };

  const handleSave = () => {
    if (!form.title || !form.difficulty || !form.maxParty || !form.genre) return;
    if (editTarget) {
      setThemes(prev => prev.map(t => t.id === editTarget.id ? { ...t, ...form, maxParty: Number(form.maxParty) } : t));
    } else {
      const gradients = ['from-[#1a0000] via-[#2d1010] to-[#0a0000]', 'from-[#1a0030] via-[#30104a] to-[#0a001a]', 'from-[#000a1a] via-[#0d1a2d] to-[#000]', 'from-[#001a0d] via-[#0a2010] to-[#000a05]'];
      setThemes(prev => [...prev, { id: Date.now(), ...form, maxParty: Number(form.maxParty), date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace('.', '.'), gradient: gradients[prev.length % gradients.length] }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setThemes(prev => prev.filter(t => t.id !== id));
    setDeleteTarget(null);
  };

  const isValid = form.title && form.difficulty > 0 && form.maxParty && form.genre && form.description;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-black text-[#f5f5f5]">테마 관리</h1>
          <p className="text-xs text-[#555] mt-0.5">등록된 테마를 관리할 수 있습니다.</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-1.5 bg-[#e63946] hover:bg-[#c1121f] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          + 테마 추가
        </button>
      </div>

      {/* Image card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {themes.slice(0, 3).map(t => (
          <div key={t.id} className="bg-[#1a1a1a] border border-[#222] rounded-xl overflow-hidden">
            <div className={['h-52 bg-linear-to-br flex items-end p-0 relative overflow-hidden', t.gradient].join(' ')}>
              <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="absolute bg-white/5 rounded-full"
                    style={{ width: `${60 + i * 40}px`, height: `${60 + i * 40}px`, top: `${i * 15}%`, left: `${(i * 37) % 80}%`, transform: 'translate(-50%, -50%)' }} />
                ))}
              </div>
              <div className="relative z-10 p-4 w-full bg-linear-to-t from-black/60 to-transparent">
                <h3 className="text-sm font-black text-white">{t.title}</h3>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-[#555]">난이도</span>
                <DifficultyDots value={t.difficulty} />
              </div>
              <div className="space-y-1 mb-4">
                <p className="text-xs text-[#666]">최대인원 <span className="text-[#ccc] ml-1">{t.maxParty}명</span></p>
                <p className="text-xs text-[#666]">장르 <span className="text-[#ccc] ml-1">{t.genre}</span></p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => openEdit(t)}
                  className="flex items-center justify-center gap-1.5 text-xs text-[#888] hover:text-[#f5f5f5] border border-[#2a2a2a] hover:border-[#444] py-2 rounded-lg transition-colors">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  수정
                </button>
                <button onClick={() => setDeleteTarget(t)}
                  className="flex items-center justify-center gap-1.5 text-xs text-[#e63946]/70 hover:text-[#e63946] border border-[#2a2a2a] hover:border-[#e63946]/40 py-2 rounded-lg transition-colors">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#1a1a1a] border border-[#222] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1f1f1f]">
                {['테마명', '난이도', '최대 인원', '장르', '등록일', '관리'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-medium text-[#555] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {themes.map(t => (
                <tr key={t.id} className="border-b border-[#171717] last:border-b-0 hover:bg-[#1f1f1f] transition-colors">
                  <td className="px-5 py-3.5 text-xs font-bold text-[#f5f5f5]">{t.title}</td>
                  <td className="px-5 py-3.5"><DifficultyDots value={t.difficulty} /></td>
                  <td className="px-5 py-3.5 text-xs text-[#888]">{t.maxParty}명</td>
                  <td className="px-5 py-3.5 text-xs text-[#888]">{t.genre}</td>
                  <td className="px-5 py-3.5 text-xs text-[#555]">{t.date}</td>
                  <td className="px-5 py-3.5 relative">
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === t.id ? null : t.id)}
                      className="text-xs border border-[#2a2a2a] text-[#666] hover:border-[#444] hover:text-[#f5f5f5] px-2 py-1.5 rounded transition-colors font-bold tracking-widest"
                    >···</button>
                    {dropdownOpen === t.id && (
                      <div className="absolute right-5 top-full mt-1 bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg overflow-hidden z-10 shadow-xl min-w-24">
                        <button onClick={() => openEdit(t)}
                          className="w-full text-left text-xs text-[#ccc] hover:bg-[#2a2a2a] px-4 py-2.5 transition-colors">수정</button>
                        <button onClick={() => { setDeleteTarget(t); setDropdownOpen(null); }}
                          className="w-full text-left text-xs text-[#e63946] hover:bg-[#2a2a2a] px-4 py-2.5 transition-colors">삭제</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {dropdownOpen !== null && (
        <div className="fixed inset-0 z-5" onClick={() => setDropdownOpen(null)} />
      )}

      {/* Add/Edit modal — white */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">{editTarget ? '테마 수정' : '테마 추가'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* 테마명 */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">테마명 <span className="text-[#e63946]">*</span></label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder={editTarget ? undefined : '예) 새벽의 저택'}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#e63946] placeholder-gray-400" />
              </div>

              {/* 난이도 */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">난이도 <span className="text-[#e63946]">*</span></label>
                <div className="flex items-center gap-3">
                  <DifficultyDots value={form.difficulty} onClick={v => setForm(f => ({ ...f, difficulty: v }))} />
                  {form.difficulty > 0 && (
                    <span className="text-xs text-gray-500">({['', '매우 쉬움', '쉬움', '보통', '어려움', '매우 어려움'][form.difficulty]})</span>
                  )}
                </div>
              </div>

              {/* 최대 인원 + 연령 제한 */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">최대 인원 <span className="text-[#e63946]">*</span></label>
                  <input value={form.maxParty} onChange={e => setForm(f => ({ ...f, maxParty: e.target.value }))}
                    placeholder="인원 선택"
                    type="number" min={2} max={10}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#e63946] placeholder-gray-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">연령 제한 <span className="text-[#e63946]">*</span></label>
                  <input value={form.ageLimit} onChange={e => setForm(f => ({ ...f, ageLimit: e.target.value }))}
                    placeholder="연령 제한"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#e63946] placeholder-gray-400" />
                </div>
              </div>

              {/* 장르 */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">장르 <span className="text-[#e63946]">*</span></label>
                <input value={form.genre} onChange={e => setForm(f => ({ ...f, genre: e.target.value }))}
                  placeholder="장르 선택"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#e63946] placeholder-gray-400" />
              </div>

              {/* 테마 설명 */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">테마 설명 <span className="text-[#e63946]">*</span></label>
                <textarea value={form.description}
                  onChange={e => { if (e.target.value.length <= 200) { setForm(f => ({ ...f, description: e.target.value })); setDescCount(e.target.value.length); } }}
                  placeholder="테마에 대한 설명을 입력해주세요."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#e63946] placeholder-gray-400 resize-none" />
                <p className="text-right text-xs text-gray-400 mt-1">{descCount} / 200</p>
              </div>

              {/* 대표 이미지 */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">대표 이미지 <span className="text-[#e63946]">*</span></label>
                {editTarget ? (
                  <div className="flex items-center gap-3">
                    <div className={['w-20 h-20 rounded-lg bg-linear-to-br flex items-center justify-center shrink-0', editTarget.gradient].join(' ')}>
                      <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500">권장 사이즈: 1200 x 800px (최대 5MB)</p>
                      <div className="flex gap-2">
                        <button className="text-xs border border-gray-300 text-gray-600 hover:border-gray-400 px-3 py-1.5 rounded-lg transition-colors">이미지 변경</button>
                        <button className="text-xs bg-[#e63946]/10 text-[#e63946] hover:bg-[#e63946]/20 border border-[#e63946]/30 px-3 py-1.5 rounded-lg transition-colors">이미지 삭제</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-200 rounded-xl h-28 flex items-center justify-center cursor-pointer hover:border-gray-300 transition-colors">
                    <span className="text-sm text-gray-400">이미지 선택</span>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
              <button onClick={() => setShowModal(false)}
                className="text-sm border border-gray-300 text-gray-600 hover:border-gray-400 px-5 py-2 rounded-lg transition-colors">취소</button>
              <button onClick={handleSave} disabled={!isValid}
                className="text-sm bg-[#e63946] hover:bg-[#c1121f] disabled:opacity-40 text-white font-bold px-5 py-2 rounded-lg transition-colors">저장하기</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setDeleteTarget(null)}>
          <div className="bg-white rounded-2xl w-80 shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-5">
              <h3 className="text-sm font-bold text-gray-900 mb-2">테마 삭제</h3>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-[#e63946]">{deleteTarget.title}</span> 테마를 삭제하시겠습니까?<br />
                <span className="text-xs text-gray-400">삭제 후에는 복구할 수 없습니다.</span>
              </p>
            </div>
            <div className="px-6 pb-5 flex gap-2">
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 text-sm border border-gray-300 text-gray-600 hover:border-gray-400 py-2.5 rounded-lg transition-colors">취소</button>
              <button onClick={() => handleDelete(deleteTarget.id)}
                className="flex-1 text-sm bg-[#e63946] hover:bg-[#c1121f] text-white font-bold py-2.5 rounded-lg transition-colors">삭제</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
