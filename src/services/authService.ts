import axios from 'axios';
import axiosInstance from '@/lib/axios';
import { getRefreshToken } from '@/lib/token';
import { repairMojibake } from '@/lib/text';
import {
  ApiResponse,
  AuthResponse,
  AuthRole,
  AuthUserPayload,
  ChangePasswordRequest,
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

const normalizeRole = (role?: string): User['role'] => {
  if (role === 'MANAGER' || role === 'OWNER') return 'OWNER';
  if (role === 'ADMIN') return 'ADMIN';
  return 'USER';
};

const createUserFromPayload = (payload?: AuthUserPayload): User | undefined => {
  if (!payload?.id || !payload.email || !payload.nickname) return undefined;

  return {
    id: payload.id,
    email: payload.email,
    nickname: repairMojibake(payload.nickname),
    role: normalizeRole(payload.role),
    profileImageUrl: payload.profileImageUrl,
    gender: payload.gender,
    age: payload.age,
    phone: payload.phone,
    isEmailPublic: payload.isEmailPublic ?? payload.emailVisible,
    isAgePublic: payload.isAgePublic ?? payload.ageVisible,
    isGenderPublic: payload.isGenderPublic ?? payload.genderVisible,
  };
};

const createPartialUserFromPayload = (payload?: AuthUserPayload): Partial<User> => {
  if (!payload) return {};

  return {
    id: payload.id,
    email: payload.email,
    nickname: payload.nickname ? repairMojibake(payload.nickname) : undefined,
    role: payload.role ? normalizeRole(payload.role) : undefined,
    profileImageUrl: payload.profileImageUrl,
    gender: payload.gender,
    age: payload.age,
    phone: payload.phone,
    isEmailPublic: payload.isEmailPublic ?? payload.emailVisible,
    isAgePublic: payload.isAgePublic ?? payload.ageVisible,
    isGenderPublic: payload.isGenderPublic ?? payload.genderVisible,
    storeName: payload.storeName
  };
};

const normalizeUser = (user?: User): User | undefined => {
  if (!user) return undefined;
  return {
    ...user,
    nickname: repairMojibake(user.nickname),
  };
};

export const extractAuthPayload = (response: AuthResponse) => {
  const accessToken = response.accessToken ?? response.data?.accessToken;
  const refreshToken = response.refreshToken ?? response.data?.refreshToken;
  const user =
    normalizeUser(response.user) ??
    normalizeUser(response.data?.user) ??
    createUserFromPayload(response.data) ??
    createUserFromPayload(response);

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

export const checkEmailDuplicate = async (email: string): Promise<string> => {
  const { data } = await axiosInstance.get<ApiResponse<null>>('/api/auth/check-email', {
    params: { email },
  });

  return data.message || '사용 가능한 이메일입니다.';
};

export const checkNicknameDuplicate = async (nickname: string): Promise<string> => {
  const { data } = await axiosInstance.get<ApiResponse<null>>('/api/auth/check-nickname', {
    params: { nickname },
  });

  return data.message || '사용 가능한 닉네임입니다.';
};

export const logoutUser = async (): Promise<void> => {
  await axiosInstance.post('/api/auth/logout', {
    refreshToken: getRefreshToken(),
  });
};

export const changePassword = async (
  payload: ChangePasswordRequest,
): Promise<void> => {
  await axiosInstance.patch('/api/auth/password', payload);
};

export const withdrawAccount = async (): Promise<void> => {
  await axiosInstance.delete('/api/auth/withdraw');
};

export const getMe = async (): Promise<Partial<User>> => {
  const { data } = await axiosInstance.get<ApiResponse<AuthUserPayload>>('/api/auth/me');
  const payload = data.data ?? data;
  return createPartialUserFromPayload(payload);
};

export const loginWithGoogle = async (code: string): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>('/api/auth/google', {
    code,
  });
  return data;
};
