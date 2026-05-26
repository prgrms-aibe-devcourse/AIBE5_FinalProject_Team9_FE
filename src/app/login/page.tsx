import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-black text-[#f5f5f5] mb-8 text-center">로그인</h1>
        <LoginForm />
      </div>
    </div>
  );
}
