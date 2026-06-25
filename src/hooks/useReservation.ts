'use client';

import { useReservationStore } from '@/stores/reservationStore';

export const useReservation = () => {
  const store = useReservationStore();

  const totalAmount = (price: number) => store.peopleCount * price;

  return {
    ...store,
    totalAmount,
  };
};
