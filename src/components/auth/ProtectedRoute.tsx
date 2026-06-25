'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getToken } from '@/lib/token';
import { useAuthStore } from '@/stores/authStore';
import type { User } from '@/types/user';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: User['role'][];
  loginPath?: string;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  loginPath = '/login',
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const hasAccessToken = Boolean(getToken());
  const isAuthenticated = hasHydrated && isLoggedIn && hasAccessToken;
  const hasRequiredRole =
    !allowedRoles || Boolean(user?.role && allowedRoles.includes(user.role));

  useEffect(() => {
    if (!hasHydrated) return;

    if (!isLoggedIn || !hasAccessToken) {
      const currentPath =
        typeof window === 'undefined'
          ? pathname
          : `${window.location.pathname}${window.location.search}`;
      const redirectUrl = `${loginPath}?redirect=${encodeURIComponent(currentPath)}`;
      router.replace(redirectUrl);
      return;
    }

    if (!hasRequiredRole) {
      router.replace('/unauthorized');
    }
  }, [
    hasAccessToken,
    hasHydrated,
    hasRequiredRole,
    isLoggedIn,
    loginPath,
    pathname,
    router,
  ]);

  if (!isAuthenticated || !hasRequiredRole) {
    return (
      <div
        className="min-h-screen bg-[#0d0d0d]"
        role="status"
        aria-label="접근 권한 확인 중"
      />
    );
  }

  return <>{children}</>;
}
