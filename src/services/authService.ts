import axios from 'axios';
import axiosInstance from '@/lib/axios';
import { getRefreshToken } from '@/lib/token';
import {
  AuthResponse,
  AuthRole,
  LoginRequest,
  SignupRequest,
  User,
} from '@/types/user';

export const getAuthErrorMessage = (
  error: unknown,
  fallbackMessage: string
): string => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data as
      | {
          message?: string;
          error?: string;
          data?: { message?: string; error?: string };
        }
      | undefined;

    return (
      responseData?.message ??
      responseData?.error ??
      responseData?.data?.message ??
      responseData?.data?.error ??
      fallbackMessage
    );
  }

  return fallbackMessage;
};

export const extractAuthPayload = (response: AuthResponse) => {
  const accessToken = response.accessToken ?? response.data?.accessToken;
  const refreshToken = response.refreshToken ?? response.data?.refreshToken;
  const user = response.user ?? response.data?.user;

  return { accessToken, refreshToken, user };
};

export const loginUser = async (
  credentials: LoginRequest,
  role: AuthRole = 'member'
): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>(
    `/api/auth/login/${role}`,
    credentials
  );
  console.log(data);
  return data;
};

export const signupUser = async (
  payload: SignupRequest,
  role: AuthRole = 'member'
): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>(
    `/api/auth/register/${role}`,
    payload
  );
  return data;
};

export const logoutUser = async (): Promise<void> => {
  await axiosInstance.post('/api/auth/logout', {
    refreshToken: getRefreshToken(),
  });
};

export const getMe = async (): Promise<User> => {
  const { data } = await axiosInstance.get<User>('/api/auth/me');
  return data;
};

export const loginWithGoogle = async (code: string): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>('/api/auth/google', {
    code,
  });
  return data;
};
