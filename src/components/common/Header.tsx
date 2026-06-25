'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { repairMojibake } from '@/lib/text';
import {
  DEFAULT_PROFILE_AVATAR,
  getProfileAvatar,
} from '@/lib/profileAvatar';
import { getMyPageProfile } from '@/services/mypageService';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/token';

export default function Header() {
  const { isLoggedIn, hasHydrated, user, logout } = useAuthStore();
  const showAuthenticatedUi = hasHydrated && isLoggedIn;
  const nickname = repairMojibake(user?.nickname);
  const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImageUrl);
  const avatarUrl = getProfileAvatar(profileImageUrl);
  const router = useRouter();

  useEffect(() => {
    setProfileImageUrl(user?.profileImageUrl);
    if (!hasHydrated || !isLoggedIn || !getToken()) return;

    let isMounted = true;

    getMyPageProfile()
      .then((profile) => {
        if (isMounted) setProfileImageUrl(profile.profileCharacterImageUrl);
      })
      .catch(() => {
        if (isMounted) setProfileImageUrl(undefined);
      });

    return () => {
      isMounted = false;
    };
  }, [hasHydrated, isLoggedIn, user?.profileImageUrl]);

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
          {showAuthenticatedUi ? (
            <>
              <Link href="/mypage" title={nickname}>
                <div
                  className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-black text-[11px] text-[#f5f5f5]"
                  aria-label={nickname}
                >
                  <ImageWithFallback
                    src={avatarUrl}
                    fallbackSrc={DEFAULT_PROFILE_AVATAR}
                    alt=""
                    fill
                    sizes="28px"
                    className="object-cover p-0.5"
                  />
                  <span className="sr-only">{nickname}</span>
                </div>
              </Link>
              <button  onClick={() => { logout(); router.push('/'); }} className="text-[#9a9a9a] transition-colors hover:text-[#cc2222]">
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
