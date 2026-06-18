'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';
import { removeToken, setAuthTokens } from '@/lib/token';
import { logoutUser } from '@/services/authService';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User | null, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (user, accessToken, refreshToken) => {
        setAuthTokens({ accessToken, refreshToken });
        set({ user, isLoggedIn: true });
      },
      logout: () => {
        removeToken();
        set({ user: null, isLoggedIn: false });
      },
      setUser: (user) => set({ user }),
    }),
    {
      name: 'grimgate-auth',
      partialize: (state) => ({ user: state.user, isLoggedIn: state.isLoggedIn }),
    }
  )
);
