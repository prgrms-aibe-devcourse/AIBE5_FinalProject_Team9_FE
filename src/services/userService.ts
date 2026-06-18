import axiosInstance from '@/lib/axios';
import { UpdateProfileRequest } from '@/types/user';
import { withdrawAccount } from '@/services/authService';

export const updateMyProfile = async (
  payload: UpdateProfileRequest,
): Promise<void> => {
  await axiosInstance.patch('/api/mypage/profile', payload);
};

export const deleteMyAccount = async (): Promise<void> => {
  await withdrawAccount();
};
