export interface User {
  id: number;
  email: string;
  nickname: string;
  role: 'USER' | 'OWNER' | 'ADMIN';
  profileImageUrl?: string;
  gender?: string;
  age?: number;
  phone?: string;
  isEmailPublic?: boolean;
  isAgePublic?: boolean;
  isGenderPublic?: boolean;
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupRequest {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  gender?: 'MALE' | 'FEMALE';
  age?: number;
  termsAgreed: boolean;
  marketingAgreed?: boolean;
}

export type AuthRole = 'member' | 'manager';

export interface AuthResponse {
  user?: User;
  accessToken?: string;
  refreshToken?: string;
  data?: {
    user?: User;
    accessToken?: string;
    refreshToken?: string;
  };
}

export interface UpdateProfileRequest {
  nickname?: string;
  currentPassword?: string;
  newPassword?: string;
  isEmailPublic?: boolean;
  isAgePublic?: boolean;
  isGenderPublic?: boolean;
  age?: number;
  gender?: string;
}
