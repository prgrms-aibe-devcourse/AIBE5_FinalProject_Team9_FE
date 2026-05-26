'use client';

import { create } from 'zustand';

interface ReservationState {
  themeId: number | null;
  themeTitle: string;
  themeImageUrl: string;
  locationName: string;
  branchName: string;
  date: string;
  time: string;
  adultCount: number;
  teenCount: number;
  setTheme: (themeId: number, themeTitle: string, imageUrl?: string) => void;
  setLocation: (locationName: string, branchName: string) => void;
  setDateTime: (date: string, time: string) => void;
  setHeadcount: (adultCount: number, teenCount: number) => void;
  reset: () => void;
}

const initialState = {
  themeId: null,
  themeTitle: '',
  themeImageUrl: '',
  locationName: '',
  branchName: '',
  date: '',
  time: '',
  adultCount: 2,
  teenCount: 0,
};

export const useReservationStore = create<ReservationState>()((set) => ({
  ...initialState,
  setTheme: (themeId, themeTitle, imageUrl = '') =>
    set({ themeId, themeTitle, themeImageUrl: imageUrl }),
  setLocation: (locationName, branchName) =>
    set({ locationName, branchName }),
  setDateTime: (date, time) => set({ date, time }),
  setHeadcount: (adultCount, teenCount) => set({ adultCount, teenCount }),
  reset: () => set(initialState),
}));
