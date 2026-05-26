export type MateStatus = 'OPEN' | 'CLOSED' | 'FULL';
export type ContactMethod = 'KAKAO' | 'COMMENT';

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
  experienceLevel: 'ANY' | 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';
  atmosphereTags: string[];
  contactMethod: ContactMethod;
  contactLink?: string;
  status: MateStatus;
  isPinned?: boolean;
  commentCount?: number;
  createdAt: string;
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
  experienceLevel: string;
  atmosphereTags: string[];
  contactMethod: ContactMethod;
  contactLink?: string;
}

export interface MateComment {
  id: number;
  postId: number;
  userId: number;
  userNickname: string;
  userProfileImageUrl?: string;
  content: string;
  createdAt: string;
}
