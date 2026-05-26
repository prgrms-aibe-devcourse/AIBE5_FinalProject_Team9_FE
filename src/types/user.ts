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
}

export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
  phone: string;
  gender?: string;
  age?: number;
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
