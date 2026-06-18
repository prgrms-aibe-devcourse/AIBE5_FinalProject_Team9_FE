'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import {
  extractAuthPayload,
  getMe,
  loginUser,
  logoutUser,
} from '@/services/authService';
import { AuthRole, LoginRequest, User } from '@/types/user';

export const useAuth = () => {
  const router = useRouter();
  const { user, isLoggedIn, login, logout, setUser } = useAuthStore();

  const handleLogin = async (
    credentials: LoginRequest,
    role: AuthRole = 'member'
  ) => {
    const response = await loginUser(credentials, role);
    const { accessToken, refreshToken, user: userData } =
      extractAuthPayload(response);

    if (!accessToken || !refreshToken) {
      throw new Error('로그인 응답에 토큰이 없습니다.');
    }

    const fallbackUser: User = {
      id: 0,
      email: credentials.email,
      nickname: credentials.email.split('@')[0],
      role: role === 'manager' ? 'OWNER' : 'USER',
    };

    const initialUser = userData ?? fallbackUser;
    login(initialUser, accessToken, refreshToken);

    let currentUser = initialUser;
    try {
      const profile = await getMe();
      currentUser = { ...initialUser, ...profile };
      setUser(currentUser);
    } catch {
      currentUser = initialUser;
    }

      if (currentUser.role === 'OWNER') {
          router.push('/owner/dashboard');
      } else if (currentUser.role === 'ADMIN') {
          router.push('/admin/reviews');
      } else {
          router.push('/');
      }

    return currentUser;
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      logout();
      router.push('/login');
    }
  };

  return {
    user,
    isLoggedIn,
    handleLogin,
    handleLogout,
    setUser,
  };
};
