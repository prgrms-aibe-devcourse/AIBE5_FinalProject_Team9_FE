'use client';

import { useState, FormEvent } from 'react';
import Button from '@/components/common/Button';

interface PasswordFormProps {
  onSubmit: (currentPassword: string, newPassword: string) => Promise<void>;
}

export default function PasswordForm({ onSubmit }: PasswordFormProps) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (next !== confirm) {
      setError('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    setLoading(true);
    try {
      await onSubmit(current, next);
      setCurrent(''); setNext(''); setConfirm('');
    } catch {
      setError('비밀번호 변경에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {[
        { label: '현재 비밀번호', value: current, set: setCurrent, placeholder: '현재 비밀번호' },
        { label: '새 비밀번호', value: next, set: setNext, placeholder: '새 비밀번호' },
        { label: '새 비밀번호 확인', value: confirm, set: setConfirm, placeholder: '새 비밀번호 확인' },
      ].map(({ label, value, set: setter, placeholder }) => (
        <div key={label}>
          <label className="block text-sm text-[#888] mb-1">{label}</label>
          <input
            type="password"
            value={value}
            onChange={(e) => setter(e.target.value)}
            required
            placeholder={placeholder}
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2.5 text-sm text-[#f5f5f5] placeholder-[#555] focus:outline-none focus:border-[#e63946]"
          />
        </div>
      ))}
      {error && <p className="text-xs text-[#e63946]">{error}</p>}
      <Button type="submit" loading={loading}>변경하기</Button>
    </form>
  );
}
