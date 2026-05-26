import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-black text-[#f5f5f5] mb-2 text-center">공포의 문을 열어라.</h1>
        <p className="text-[#888] text-xs text-center mb-8">GrimGate와 함께할 용감한 탐원가를 환영합니다.</p>
        <SignupForm />
      </div>
    </div>
  );
}
