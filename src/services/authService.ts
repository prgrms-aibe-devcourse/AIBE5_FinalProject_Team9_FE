import axiosInstance from '@/lib/axios';
import { User, LoginRequest, SignupRequest } from '@/types/user';

interface AuthResponse {
  user: User;
  token: string;
}

// TODO: POST /api/auth/login
export const loginUser = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post('/auth/login', credentials);
  return data;
};

// TODO: POST /api/auth/signup
export const signupUser = async (payload: SignupRequest): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post('/auth/signup', payload);
  return data;
};

// TODO: POST /api/auth/logout
export const logoutUser = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};

// TODO: GET /api/auth/me
export const getMe = async (): Promise<User> => {
  const { data } = await axiosInstance.get('/auth/me');
  return data;
};

// TODO: POST /api/auth/google
export const loginWithGoogle = async (code: string): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post('/auth/google', { code });
  return data;
};
