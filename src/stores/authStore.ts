'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';
import { setToken, removeToken } from '@/lib/token';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (user, token) => {
        setToken(token);
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
