'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Button from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';

export default function LoginForm() {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await handleLogin({ email, password });
    } catch {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm text-[#888] mb-1">이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="grimgater@example.com"
          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2.5 text-sm text-[#f5f5f5] placeholder-[#555] focus:outline-none focus:border-[#e63946]"
        />
      </div>

      <div>
        <label className="block text-sm text-[#888] mb-1">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="비밀번호 입력"
          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2.5 text-sm text-[#f5f5f5] placeholder-[#555] focus:outline-none focus:border-[#e63946]"
        />
      </div>

      {error && <p className="text-xs text-[#e63946]">{error}</p>}

      <Button type="submit" fullWidth loading={loading}>
        로그인
      </Button>

      <div className="relative text-center text-xs text-[#555]">
        <span className="relative z-10 bg-[#0d0d0d] px-2">또는</span>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#2a2a2a]" />
        </div>
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 text-sm py-2.5 rounded hover:bg-gray-100 transition-colors"
      >
        <span className="w-4 h-4">G</span>
        구글로 로그인
      </button>

      <p className="text-center text-xs text-[#888]">
        계정이 없으신가요?{' '}
        <Link href="/signup" className="text-[#e63946] hover:underline">
          회원가입
        </Link>
      </p>
    </form>
  );
}
