'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Button from '@/components/common/Button';
import { signupUser } from '@/services/authService';
import { useAuth } from '@/hooks/useAuth';

export default function SignupForm() {
  const { handleLogin } = useAuth();
  const [tab, setTab] = useState<'user' | 'owner'>('user');
  const [form, setForm] = useState({
    nickname: '', email: '', password: '', passwordConfirm: '',
    phone: '', gender: '', age: '',
    agreeTerms: false, agreeMarketing: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (key: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!form.agreeTerms) {
      setError('이용약관에 동의해주세요.');
      return;
    }
    setLoading(true);
    try {
      await signupUser({
        email: form.email,
        password: form.password,
        nickname: form.nickname,
        phone: form.phone,
        gender: form.gender || undefined,
        age: form.age ? Number(form.age) : undefined,
      });
      await handleLogin({ email: form.email, password: form.password });
    } catch {
      setError('회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex border-b border-[#2a2a2a] mb-6">
        {(['user', 'owner'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={[
              'flex-1 py-2.5 text-sm font-medium transition-colors',
              tab === t
                ? 'border-b-2 border-[#e63946] text-[#e63946]'
                : 'text-[#888] hover:text-[#f5f5f5]',
            ].join(' ')}
          >
            {t === 'user' ? '일반 유저 회원가입' : '지점 유저 회원가입'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="block text-sm text-[#888] mb-1">닉네임</label>
          <input
            value={form.nickname}
            onChange={(e) => set('nickname', e.target.value)}
            required
            placeholder="공포를 즐기는 닉네임"
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2.5 text-sm text-[#f5f5f5] placeholder-[#555] focus:outline-none focus:border-[#e63946]"
          />
        </div>
        <div>
          <label className="block text-sm text-[#888] mb-1">이메일</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            required
            placeholder="grimgater@example.com"
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2.5 text-sm text-[#f5f5f5] placeholder-[#555] focus:outline-none focus:border-[#e63946]"
          />
        </div>
        <div>
          <label className="block text-sm text-[#888] mb-1">비밀번호</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => set('password', e.target.value)}
            required
            minLength={8}
            placeholder="8자 이상"
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2.5 text-sm text-[#f5f5f5] placeholder-[#555] focus:outline-none focus:border-[#e63946]"
          />
        </div>
        <div>
          <label className="block text-sm text-[#888] mb-1">비밀번호 확인</label>
          <input
            type="password"
            value={form.passwordConfirm}
            onChange={(e) => set('passwordConfirm', e.target.value)}
            required
            placeholder="비밀번호 재입력"
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2.5 text-sm text-[#f5f5f5] placeholder-[#555] focus:outline-none focus:border-[#e63946]"
          />
        </div>
        <div>
          <label className="block text-sm text-[#888] mb-1">전화번호</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            required
            placeholder="-없이 입력해주세요"
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2.5 text-sm text-[#f5f5f5] placeholder-[#555] focus:outline-none focus:border-[#e63946]"
          />
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm text-[#888] mb-1">성별</label>
            <select
              value={form.gender}
              onChange={(e) => set('gender', e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2.5 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#e63946]"
            >
              <option value="">성별</option>
              <option value="남자">남자</option>
              <option value="여자">여자</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm text-[#888] mb-1">나이</label>
            <input
              type="number"
              value={form.age}
              onChange={(e) => set('age', e.target.value)}
              placeholder="나이"
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2.5 text-sm text-[#f5f5f5] placeholder-[#555] focus:outline-none focus:border-[#e63946]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 mt-1">
          <label className="flex items-center gap-2 text-sm text-[#888] cursor-pointer">
            <input
              type="checkbox"
              checked={form.agreeTerms}
              onChange={(e) => set('agreeTerms', e.target.checked)}
              className="accent-[#e63946]"
            />
            <span>이용약관 및 개인정보처리방침에 동의합니다. <span className="text-[#e63946]">(필수)</span></span>
          </label>
          <label className="flex items-center gap-2 text-sm text-[#888] cursor-pointer">
            <input
              type="checkbox"
              checked={form.agreeMarketing}
              onChange={(e) => set('agreeMarketing', e.target.checked)}
              className="accent-[#e63946]"
            />
            마케팅 정보 수신에 동의합니다. (선택)
          </label>
        </div>

        {error && <p className="text-xs text-[#e63946]">{error}</p>}

        <Button type="submit" fullWidth loading={loading} className="mt-1">
          회원가입
        </Button>

        <div className="relative text-center text-xs text-[#555]">
          <span className="relative z-10 bg-[#0d0d0d] px-2">또는</span>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#2a2a2a]" />
          </div>
        </div>

        <button type="button" className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 text-sm py-2.5 rounded hover:bg-gray-100 transition-colors">
          <span>G</span> 구글
        </button>

        <p className="text-center text-xs text-[#888]">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="text-[#e63946] hover:underline">로그인</Link>
        </p>
      </form>
    </div>
  );
}
