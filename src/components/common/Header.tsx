'use client';

import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { repairMojibake } from '@/lib/text';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { isLoggedIn, user, logout } = useAuthStore();
  const nickname = repairMojibake(user?.nickname);
    const router = useRouter();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#241414] bg-[#0c0c0c]/96 backdrop-blur">
      <div className="gg-container grid h-[52px] grid-cols-[1fr_auto_1fr] items-center">
        <Link href="/" className="justify-self-start text-[15px] font-black tracking-[0.16em] text-white transition-colors hover:text-[#cc2222]">
          GRIMGATE
        </Link>

        <nav className="hidden items-center gap-9 justify-self-center text-[12px] font-bold text-[#cfcfcf] md:flex">
          <Link href="/themes" className="transition-colors hover:text-[#cc2222]">
            전체 테마
          </Link>
          <Link href="/reservation" className="transition-colors hover:text-[#cc2222]">
            빠른예약
          </Link>
          <Link href="/mate" className="transition-colors hover:text-[#cc2222]">
            메이트 모집
          </Link>
          <Link href="/ai-recommend" className="transition-colors hover:text-[#cc2222]">
            AI 추천
          </Link>
        </nav>

        <div className="flex items-center justify-self-end gap-3 text-[12px] font-bold">
          {isLoggedIn ? (
            <>
              <Link href="/mypage" title={nickname}>
                <div
                  className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#1a1a1a] bg-cover bg-center text-[11px] text-[#f5f5f5]"
                  style={user?.profileImageUrl ? { backgroundImage: `url('${user.profileImageUrl}')` } : undefined}
                  aria-label={nickname}
                >
                  {user?.profileImageUrl ? <span className="sr-only">{nickname}</span> : nickname?.[0]?.toUpperCase() ?? 'U'}
                </div>
              </Link>
              <button  onClick={() => { logout(); router.push('/login'); }} className="text-[#9a9a9a] transition-colors hover:text-[#cc2222]">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-[#dedede] transition-colors hover:text-[#cc2222]">
                로그인
              </Link>
              <Link href="/signup" className="bg-[#cc2222] px-2 py-1 text-white transition-colors hover:bg-[#a91d1d]">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
