import axiosInstance from '@/lib/axios';
import {
  MatePost,
  MateComment,
  CreateMatePostRequest,
  UpdateMatePostRequest,
  MateFilter,
} from '@/types/mate';

interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// GET /api/mate
export const getMatePosts = async (
  filter?: MateFilter
): Promise<PaginatedResponse<MatePost>> => {
  const { data } = await axiosInstance.get('/mate', { params: filter });
  return data;
};

// GET /api/mate/:id
export const getMatePostById = async (id: number): Promise<MatePost> => {
  const { data } = await axiosInstance.get(`/mate/${id}`);
  return data;
};

// GET /api/mate/me
export const getMyMatePosts = async (): Promise<MatePost[]> => {
  const { data } = await axiosInstance.get('/mate/me');
  return data;
};

// POST /api/mate
export const createMatePost = async (
  payload: CreateMatePostRequest
): Promise<MatePost> => {
  const { data } = await axiosInstance.post('/mate', payload);
  return data;
};

// PUT /api/mate/:id
export const updateMatePost = async (
  id: number,
  payload: UpdateMatePostRequest
): Promise<MatePost> => {
  const { data } = await axiosInstance.put(`/mate/${id}`, payload);
  return data;
};

// DELETE /api/mate/:id
export const deleteMatePost = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/mate/${id}`);
};

// GET /api/mate/:id/comments
export const getMateComments = async (postId: number): Promise<MateComment[]> => {
  const { data } = await axiosInstance.get(`/mate/${postId}/comments`);
  return data;
};

// POST /api/mate/:id/comments
export const createMateComment = async (
  postId: number,
  content: string
): Promise<MateComment> => {
  const { data } = await axiosInstance.post(`/mate/${postId}/comments`, { content });
  return data;
};

// DELETE /api/mate/:postId/comments/:commentId
export const deleteMateComment = async (
  postId: number,
  commentId: number
): Promise<void> => {
  await axiosInstance.delete(`/mate/${postId}/comments/${commentId}`);
};
