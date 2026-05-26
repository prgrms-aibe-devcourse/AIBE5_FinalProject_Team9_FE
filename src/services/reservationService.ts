import axiosInstance from '@/lib/axios';
import { Reservation, CreateReservationRequest, ReservationFilter } from '@/types/reservation';

interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
}

// TODO: GET /api/reservations/me
export const getMyReservations = async (filter?: ReservationFilter): Promise<PaginatedResponse<Reservation>> => {
  const { data } = await axiosInstance.get('/reservations/me', { params: filter });
  return data;
};

// TODO: GET /api/reservations/:id
export const getReservationById = async (id: number): Promise<Reservation> => {
  const { data } = await axiosInstance.get(`/reservations/${id}`);
  return data;
};

// TODO: POST /api/reservations
export const createReservation = async (payload: CreateReservationRequest): Promise<Reservation> => {
  const { data } = await axiosInstance.post('/reservations', payload);
  return data;
};

// TODO: DELETE /api/reservations/:id
export const cancelReservation = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/reservations/${id}`);
};

// TODO: GET /api/themes/:themeId/available-times
export const getAvailableTimes = async (themeId: number, date: string): Promise<string[]> => {
  const { data } = await axiosInstance.get(`/themes/${themeId}/available-times`, { params: { date } });
  return data;
};
