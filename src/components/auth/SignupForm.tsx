'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import ConfirmModal from '@/components/common/ConfirmModal';
import {
  checkEmailDuplicate,
  checkNicknameDuplicate,
  getAuthErrorMessage,
  signupUser,
} from '@/services/authService';

type DuplicateCheckStatus = 'idle' | 'checking' | 'available' | 'duplicate' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getStatusClassName = (status: DuplicateCheckStatus) => {
  if (status === 'available') return 'text-[#48d08a]';
  if (status === 'duplicate' || status === 'error') return 'text-[#e63946]';
  return 'text-[#777]';
};

export default function SignupForm() {
  const router = useRouter();
  const [tab, setTab] = useState<'user' | 'owner'>('user');
  const [form, setForm] = useState({
    nickname: '', email: '', password: '', passwordConfirm: '',
    phone: '', gender: '', age: '',
    agreeTerms: false, agreeMarketing: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupComplete, setSignupComplete] = useState(false);
  const [emailCheck, setEmailCheck] = useState<{
    status: DuplicateCheckStatus;
    message: string;
    value: string;
  }>({ status: 'idle', message: '', value: '' });
  const [nicknameCheck, setNicknameCheck] = useState<{
    status: DuplicateCheckStatus;
    message: string;
    value: string;
  }>({ status: 'idle', message: '', value: '' });

  const set = (key: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleFieldChange = (key: string, value: string | boolean) => {
    set(key, value);
    if (key === 'email') {
      setEmailCheck({ status: 'idle', message: '', value: '' });
    }
    if (key === 'nickname') {
      setNicknameCheck({ status: 'idle', message: '', value: '' });
    }
  };

  const handleCheckEmail = async () => {
    const email = form.email.trim();
    setError('');

    if (!EMAIL_PATTERN.test(email)) {
      setEmailCheck({
        status: 'error',
        message: '유효한 이메일 형식으로 입력해주세요.',
        value: '',
      });
      return;
    }

    setEmailCheck({ status: 'checking', message: '이메일을 확인 중입니다.', value: email });

    try {
      const message = await checkEmailDuplicate(email);
      setEmailCheck({ status: 'available', message, value: email });
    } catch (checkError) {
      const message = getAuthErrorMessage(checkError, '이메일 중복 확인에 실패했습니다.');
      setEmailCheck({
        status: message.includes('이미') ? 'duplicate' : 'error',
        message,
        value: email,
      });
    }
  };

  const handleCheckNickname = async () => {
    const nickname = form.nickname.trim();
    setError('');

    if (nickname.length < 2) {
      setNicknameCheck({
        status: 'error',
        message: '닉네임은 2자 이상 입력해주세요.',
        value: '',
      });
      return;
    }

    setNicknameCheck({ status: 'checking', message: '닉네임을 확인 중입니다.', value: nickname });

    try {
      const message = await checkNicknameDuplicate(nickname);
      setNicknameCheck({ status: 'available', message, value: nickname });
    } catch (checkError) {
      const message = getAuthErrorMessage(checkError, '닉네임 중복 확인에 실패했습니다.');
      setNicknameCheck({
        status: message.includes('이미') ? 'duplicate' : 'error',
        message,
        value: nickname,
      });
    }
  };

  const validateForm = () => {
    if (form.nickname.length < 2 || form.nickname.length > 20) {
      return '닉네임은 2자 이상 20자 이하로 입력해주세요.';
    }
    if (!EMAIL_PATTERN.test(form.email.trim())) {
      return '유효한 이메일 형식으로 입력해주세요.';
    }
    if (form.password.length < 8) {
      return '비밀번호는 8자 이상이어야 합니다.';
    }
    if (!/\d/.test(form.password)) {
      return '비밀번호에는 숫자가 1개 이상 포함되어야 합니다.';
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(form.password)) {
      return '비밀번호에는 특수문자가 1개 이상 포함되어야 합니다.';
    }
    if (form.password !== form.passwordConfirm) {
      return '비밀번호가 일치하지 않습니다.';
    }
    if (!/^010\d{8}$/.test(form.phone)) {
      return '전화번호는 01012345678 형식으로 입력해주세요.';
    }
    if (!form.agreeTerms) {
      return '필수 약관에 동의해주세요.';
    }
    if (emailCheck.status !== 'available' || emailCheck.value !== form.email.trim()) {
      return '이메일 중복 확인을 완료해주세요.';
    }
    if (nicknameCheck.status !== 'available' || nicknameCheck.value !== form.nickname.trim()) {
      return '닉네임 중복 확인을 완료해주세요.';
    }
    return '';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const validationMessage = validateForm();
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setLoading(true);
    try {
      await signupUser({
        nickname: form.nickname.trim(),
        email: form.email.trim(),
        password: form.password,
        passwordConfirm: form.passwordConfirm,
        phone: form.phone.trim(),
        gender: form.gender as 'MALE' | 'FEMALE' | undefined,
        age: form.age ? Number(form.age) : undefined,
        termsAgreed: form.agreeTerms,
        marketingAgreed: form.agreeMarketing,
      }, tab === 'owner' ? 'manager' : 'member');
      setSignupComplete(true);
    } catch (signupError) {
      const message = getAuthErrorMessage(signupError, '회원가입에 실패했습니다.');
      if (message.includes('이메일')) {
        setEmailCheck({ status: 'duplicate', message, value: form.email.trim() });
      }
      if (message.includes('닉네임')) {
        setNicknameCheck({ status: 'duplicate', message, value: form.nickname.trim() });
      }
      setError(message);
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
          <div className="flex gap-2">
            <input
              value={form.nickname}
              onChange={(e) => handleFieldChange('nickname', e.target.value)}
              required
              placeholder="공포를 즐기는 닉네임"
              className="min-w-0 flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2.5 text-sm text-[#f5f5f5] placeholder-[#555] focus:outline-none focus:border-[#e63946]"
            />
            <button
              type="button"
              onClick={handleCheckNickname}
              disabled={nicknameCheck.status === 'checking' || loading || form.nickname.trim().length < 2}
              className="shrink-0 rounded border border-[#e63946]/65 px-3 text-xs font-bold text-[#e63946] transition-colors hover:bg-[#e63946]/10 disabled:cursor-not-allowed disabled:border-[#444] disabled:text-[#555]"
            >
              {nicknameCheck.status === 'checking' ? '확인 중' : '중복 확인'}
            </button>
          </div>
          {nicknameCheck.message && (
            <p className={['mt-1 text-xs font-medium', getStatusClassName(nicknameCheck.status)].join(' ')}>
              {nicknameCheck.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm text-[#888] mb-1">이메일</label>
          <div className="flex gap-2">
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              required
              placeholder="grimgater@example.com"
              className="min-w-0 flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2.5 text-sm text-[#f5f5f5] placeholder-[#555] focus:outline-none focus:border-[#e63946]"
            />
            <button
              type="button"
              onClick={handleCheckEmail}
              disabled={emailCheck.status === 'checking' || loading || !EMAIL_PATTERN.test(form.email.trim())}
              className="shrink-0 rounded border border-[#e63946]/65 px-3 text-xs font-bold text-[#e63946] transition-colors hover:bg-[#e63946]/10 disabled:cursor-not-allowed disabled:border-[#444] disabled:text-[#555]"
            >
              {emailCheck.status === 'checking' ? '확인 중' : '중복 확인'}
            </button>
          </div>
          {emailCheck.message && (
            <p className={['mt-1 text-xs font-medium', getStatusClassName(emailCheck.status)].join(' ')}>
              {emailCheck.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm text-[#888] mb-1">비밀번호</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => handleFieldChange('password', e.target.value)}
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
            onChange={(e) => handleFieldChange('passwordConfirm', e.target.value)}
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
            onChange={(e) => handleFieldChange('phone', e.target.value)}
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
              onChange={(e) => handleFieldChange('gender', e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2.5 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#e63946]"
            >
              <option value="">성별</option>
              <option value="MALE">남자</option>
              <option value="FEMALE">여자</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm text-[#888] mb-1">나이</label>
            <input
              type="number"
              value={form.age}
              onChange={(e) => handleFieldChange('age', e.target.value)}
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
              onChange={(e) => handleFieldChange('agreeTerms', e.target.checked)}
              className="accent-[#e63946]"
            />
            <span>이용약관 및 개인정보처리방침에 동의합니다. <span className="text-[#e63946]">(필수)</span></span>
          </label>
          <label className="flex items-center gap-2 text-sm text-[#888] cursor-pointer">
            <input
              type="checkbox"
              checked={form.agreeMarketing}
              onChange={(e) => handleFieldChange('agreeMarketing', e.target.checked)}
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
      <ConfirmModal
        open={signupComplete}
        title="회원가입이 완료되었습니다"
        description="로그인 후 GrimGate의 예약과 메이트 기능을 이용할 수 있습니다."
        confirmText="로그인하러 가기"
        cancelText="닫기"
        onCancel={() => router.push('/login')}
        onConfirm={() => router.push('/login')}
        showCancel={false}
      />
    </div>
  );
}
