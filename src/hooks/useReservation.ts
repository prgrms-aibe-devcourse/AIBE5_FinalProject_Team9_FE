'use client';

import { useReservationStore } from '@/stores/reservationStore';

export const useReservation = () => {
  const store = useReservationStore();

  const totalAmount = (adultPrice: number, teenPrice: number) =>
    store.adultCount * adultPrice + store.teenCount * teenPrice;

  return {
    ...store,
    totalAmount,
  };
};
