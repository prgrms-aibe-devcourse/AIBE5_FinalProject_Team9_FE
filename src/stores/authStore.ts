'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';
import { getRefreshToken, getToken, removeToken, setAuthTokens } from '@/lib/token';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  hasHydrated: boolean;
  login: (user: User | null, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      hasHydrated: false,
      login: (user, accessToken, refreshToken) => {
        setAuthTokens({ accessToken, refreshToken });
        set({ user, isLoggedIn: true });
      },
      logout: () => {
        if (getToken() || getRefreshToken()) removeToken();
        set((state) => {
          if (!state.user && !state.isLoggedIn) return state;
          return { user: null, isLoggedIn: false };
        });
      },
      setUser: (user) => set({ user }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: 'grimgate-auth',
      partialize: (state) => ({ user: state.user, isLoggedIn: state.isLoggedIn }),
      onRehydrateStorage: () => (state) => {
        if (!getToken()) state?.logout();
        state?.setHasHydrated(true);
      },
    }
  )
);
