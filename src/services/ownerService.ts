import axiosInstance from '@/lib/axios';
import {
  OwnerReservation,
  OwnerReservationResultRequest,
  OwnerReservationResultResponse,
  OwnerReservationStats,
} from '@/types/reservation';
import { Review } from '@/types/review';
import { getToken } from '@/lib/token';
import { ReviewReportItem  } from '@/types/review';

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
export const getOwnerReservations = async (params?: Record<string, unknown>): Promise<PaginatedResponse<OwnerReservation>> => {
    const { data } = await axiosInstance.get('/api/owner/reservations', { params });
    return data.data; // data → data.data
};

export const getOwnerReservationStats = async (): Promise<OwnerReservationStats> => {
    const { data } = await axiosInstance.get('/api/owner/reservations/stats');
    return data.data;
};

export const recordOwnerReservationResult = async (
  reservationId: number,
  payload: OwnerReservationResultRequest,
): Promise<OwnerReservationResultResponse> => {
  const { data } = await axiosInstance.post(
    `/api/owner/reservations/${reservationId}/result`,
    payload,
  );

  return data.data ?? data;
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

export const getOwnerReviewReports = async (page = 0, limit = 3): Promise<PaginatedResponse<ReviewReportItem>> => {
    const { data } = await axiosInstance.get('/api/owner/review-reports', { params: { page, limit } });
    return data;
};

//사장님이 관리자한테 숨김 요청
export const requestHideByOwner = async (reportId: number, ownerReason: string): Promise<void> => {
    await axiosInstance.patch(`/api/owner/review-reports/${reportId}/request-hide`, { ownerReason });
};
