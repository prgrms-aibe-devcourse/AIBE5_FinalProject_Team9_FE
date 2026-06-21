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
  storeName?: string;
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

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthUserPayload {
  id?: number;
  email?: string;
  nickname?: string;
  role?: string;
  profileImageUrl?: string;
  gender?: string;
  age?: number;
  phone?: string;
  emailVisible?: boolean;
  ageVisible?: boolean;
  genderVisible?: boolean;
  isEmailPublic?: boolean;
  isAgePublic?: boolean;
  isGenderPublic?: boolean;
  storeName?: string;
}

export interface AuthResponse {
  user?: User;
  accessToken?: string;
  refreshToken?: string;
  id?: number;
  email?: string;
  nickname?: string;
  role?: string;
  profileImageUrl?: string;
  gender?: string;
  age?: number;
  phone?: string;
  emailVisible?: boolean;
  ageVisible?: boolean;
  genderVisible?: boolean;
  data?: {
    user?: User;
    accessToken?: string;
    refreshToken?: string;
  } & AuthUserPayload;
}

export interface UpdateProfileRequest {
  nickname?: string;
  age?: number;
  gender?: string;
  emailVisible?: boolean;
  ageVisible?: boolean;
  genderVisible?: boolean;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
