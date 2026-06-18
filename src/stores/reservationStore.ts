'use client';

import { create } from 'zustand';

interface ReservationState {
  themeId: number | null;
  themeTitle: string;
  themeImageUrl: string;
  locationName: string;
  branchName: string;
  timeSlotId: number | null;
  date: string;
  time: string;
  adultCount: number;
  teenCount: number;
  reservationId: number | null;
  paymentId: number | null;
  orderId: string;
  paymentStatus: string;
  totalAmount: number | null;
  setTheme: (themeId: number, themeTitle: string, imageUrl?: string) => void;
  setLocation: (locationName: string, branchName: string) => void;
  setDateTime: (date: string, time: string, timeSlotId?: number | null) => void;
  setHeadcount: (adultCount: number, teenCount: number) => void;
  setReservationResult: (payload: {
    reservationId: number;
    paymentId?: number | null;
    orderId?: string;
    paymentStatus?: string;
    totalAmount: number;
  }) => void;
  reset: () => void;
}

const initialState = {
  themeId: null,
  themeTitle: '',
  themeImageUrl: '',
  locationName: '',
  branchName: '',
  timeSlotId: null,
  date: '',
  time: '',
  adultCount: 2,
  teenCount: 0,
  reservationId: null,
  paymentId: null,
  orderId: '',
  paymentStatus: '',
  totalAmount: null,
};

export const useReservationStore = create<ReservationState>()((set) => ({
  ...initialState,
  setTheme: (themeId, themeTitle, imageUrl = '') =>
    set({ themeId, themeTitle, themeImageUrl: imageUrl }),
  setLocation: (locationName, branchName) =>
    set({ locationName, branchName }),
  setDateTime: (date, time, timeSlotId = null) => set({ date, time, timeSlotId }),
  setHeadcount: (adultCount, teenCount) => set({ adultCount, teenCount }),
  setReservationResult: ({
    reservationId,
    paymentId = null,
    orderId = '',
    paymentStatus = '',
    totalAmount,
  }) =>
    set({
      reservationId,
      paymentId,
      orderId,
      paymentStatus,
      totalAmount,
    }),
  reset: () => set(initialState),
}));
