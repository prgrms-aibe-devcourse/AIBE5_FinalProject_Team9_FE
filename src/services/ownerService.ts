import axiosInstance from '@/lib/axios';
import { Reservation } from '@/types/reservation';
import { Review } from '@/types/review';

interface DashboardStats {
  totalReservations: number;
  todayReservations: number;
  completedReservations: number;
  confirmedReservations: number;
  cancelledReservations: number;
}

interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
}

// TODO: GET /api/owner/dashboard
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const { data } = await axiosInstance.get('/owner/dashboard');
  return data;
};

// TODO: GET /api/owner/reservations
export const getOwnerReservations = async (params?: Record<string, unknown>): Promise<PaginatedResponse<Reservation>> => {
  const { data } = await axiosInstance.get('/owner/reservations', { params });
  return data;
};

// TODO: PUT /api/owner/reservations/:id/status
export const updateReservationStatus = async (id: number, status: string): Promise<void> => {
  await axiosInstance.put(`/owner/reservations/${id}/status`, { status });
};

// TODO: GET /api/owner/reviews
export const getOwnerReviews = async (params?: Record<string, unknown>): Promise<PaginatedResponse<Review>> => {
  const { data } = await axiosInstance.get('/owner/reviews', { params });
  return data;
};

// TODO: POST /api/owner/reviews/:id/approve-hide
export const approveHideReview = async (id: number): Promise<void> => {
  await axiosInstance.post(`/owner/reviews/${id}/approve-hide`);
};

// TODO: POST /api/owner/reviews/:id/reject-hide
export const rejectHideReview = async (id: number): Promise<void> => {
  await axiosInstance.post(`/owner/reviews/${id}/reject-hide`);
};
