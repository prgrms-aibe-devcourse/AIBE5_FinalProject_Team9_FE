'use client';

import { useAuthStore } from '@/stores/authStore';
import { loginUser, logoutUser } from '@/services/authService';
import { LoginRequest } from '@/types/user';

export const useAuth = () => {
  const { user, isLoggedIn, login, logout, setUser } = useAuthStore();

  const handleLogin = async (credentials: LoginRequest) => {
    const { user: userData, token } = await loginUser(credentials);
    login(userData, token);
    return userData;
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      logout();
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
