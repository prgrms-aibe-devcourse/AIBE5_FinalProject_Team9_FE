import axiosInstance from '@/lib/axios';
import { Review, CreateReviewRequest, UpdateReviewRequest, ReviewFilter } from '@/types/review';

interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
}

// TODO: GET /api/reviews
export const getReviews = async (filter?: ReviewFilter): Promise<PaginatedResponse<Review>> => {
  const { data } = await axiosInstance.get('/reviews', { params: filter });
  return data;
};

// TODO: GET /api/reviews/me
export const getMyReviews = async (): Promise<Review[]> => {
  const { data } = await axiosInstance.get('/reviews/me');
  return data;
};

// TODO: POST /api/reviews
export const createReview = async (payload: CreateReviewRequest): Promise<Review> => {
  const { data } = await axiosInstance.post('/reviews', payload);
  return data;
};

// TODO: PUT /api/reviews/:id
export const updateReview = async (id: number, payload: UpdateReviewRequest): Promise<Review> => {
  const { data } = await axiosInstance.put(`/reviews/${id}`, payload);
  return data;
};

// TODO: DELETE /api/reviews/:id
export const deleteReview = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/reviews/${id}`);
};

// TODO: POST /api/reviews/:id/hide-request
export const requestHideReview = async (id: number, reason: string): Promise<void> => {
  await axiosInstance.post(`/reviews/${id}/hide-request`, { reason });
};
