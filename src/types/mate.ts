export type MateStatus = 'OPEN' | 'CLOSED' | 'FULL';
export type ContactMethod = 'KAKAO' | 'COMMENT';
export type ExperienceLevel = 'ANY' | 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';

export interface MatePost {
  id: number;
  title: string;
  content: string;
  authorId: number;
  authorNickname: string;
  authorProfileImageUrl?: string;
  locationName: string;
  themeTitle: string;
  playDate: string;
  reservationTime: string;
  deadlineDate: string;
  currentMembers: number;
  totalMembers: number;
  experienceLevel: ExperienceLevel;
  atmosphereTags: string[];
  contactMethod: ContactMethod;
  contactLink?: string;
  status: MateStatus;
  isPinned?: boolean;
  commentCount?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateMatePostRequest {
  title: string;
  content: string;
  locationName: string;
  themeTitle: string;
  playDate: string;
  reservationTime: string;
  deadlineDate?: string;
  myCount: number;
  recruitCount: number;
  experienceLevel: ExperienceLevel;
  atmosphereTags: string[];
  contactMethod: ContactMethod;
  contactLink?: string;
}

export type UpdateMatePostRequest = Partial<CreateMatePostRequest> & {
  status?: MateStatus;
};

export interface MateComment {
  id: number;
  postId: number;
  userId: number;
  userNickname: string;
  userProfileImageUrl?: string;
  content: string;
  createdAt: string;
}

export interface MateFilter {
  search?: string;
  status?: MateStatus | 'ALL';
  locations?: string[];
  experienceLevel?: ExperienceLevel | '';
  tags?: string[];
  authorId?: number;
  page?: number;
  size?: number;
}

export interface MateValidationError {
  field: string;
  message: string;
}
