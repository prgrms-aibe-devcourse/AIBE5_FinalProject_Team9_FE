'use client';

import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';

export default function Header() {
  const { isLoggedIn, user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d0d0d]/95 border-b border-[#2a2a2a] backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-white font-black tracking-wider text-lg">
          GRIMGATE
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-[#f5f5f5]">
          <Link href="/themes" className="hover:text-[#e63946] transition-colors">
            GATE 소개
          </Link>
          <Link href="/reservation" className="hover:text-[#e63946] transition-colors">
            빠른예약
          </Link>
          <Link href="/mate" className="hover:text-[#e63946] transition-colors">
            메이트 모집
          </Link>
          <Link href="/ai-recommend" className="hover:text-[#e63946] transition-colors">
            AI 추천
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link href="/mypage" title={user?.nickname}>
                <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center text-xs text-[#f5f5f5] overflow-hidden">
                  {user?.profileImageUrl ? (
                    <img src={user.profileImageUrl} alt={user.nickname} className="w-full h-full object-cover" />
                  ) : (
                    user?.nickname?.[0]?.toUpperCase() ?? 'U'
                  )}
                </div>
              </Link>
              <button
                onClick={logout}
                className="text-[#888] hover:text-[#f5f5f5] text-sm transition-colors"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-[#f5f5f5] hover:text-[#e63946] transition-colors"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="text-sm bg-[#e63946] hover:bg-[#c1121f] text-white px-3 py-1.5 rounded transition-colors"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
