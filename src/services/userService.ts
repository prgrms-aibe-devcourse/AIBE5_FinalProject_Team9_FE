import axiosInstance from '@/lib/axios';
import { User, UpdateProfileRequest } from '@/types/user';

// TODO: GET /api/users/:id
export const getUserProfile = async (userId: number): Promise<User> => {
  const { data } = await axiosInstance.get(`/users/${userId}`);
  return data;
};

// TODO: PUT /api/users/me
export const updateMyProfile = async (payload: UpdateProfileRequest): Promise<User> => {
  const { data } = await axiosInstance.put('/users/me', payload);
  return data;
};

// TODO: POST /api/users/me/avatar
export const uploadAvatar = async (file: File): Promise<{ imageUrl: string }> => {
  const form = new FormData();
  form.append('file', file);
  const { data } = await axiosInstance.post('/users/me/avatar', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

// TODO: DELETE /api/users/me
export const deleteMyAccount = async (): Promise<void> => {
  await axiosInstance.delete('/users/me');
};
