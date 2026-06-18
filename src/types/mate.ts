export type MatePostStatus =
  | 'DRAFT'
  | 'RECRUITING'
  | 'CLOSING_SOON'
  | 'MATCHED'
  | 'CLOSED'
  | 'DELETED';

export type MateExperienceLevel = 'ANY' | 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';

export interface MatePost {
  id: number;
  memberId: number;
  authorNickname: string;
  themeId: number;
  themeTitle: string;
  title: string;
  content: string;
  imageUrl?: string;
  meetingTime: string;
  deadline: string;
  currentPeople: number;
  maxPeople: number;
  tags: string[];
  experienceLevel: MateExperienceLevel;
  openChatUrl?: string;
  status: MatePostStatus;
  createdAt: string;
  updatedAt?: string;
  branchName?: string;
  storeName?: string;
  region?: string;
}

export interface MatePostListResponse {
  items: MatePost[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

export interface MatePostListParams {
  tab?: 'all' | 'mine' | string;
  keyword?: string;
  status?: MatePostStatus | '';
  themeId?: number;
  experienceLevel?: MateExperienceLevel | '';
  sort?: 'latest' | 'deadline' | 'meetingTime' | string;
  page?: number;
  size?: number;
}

export interface CreateMatePostRequest {
  themeId: number;
  title: string;
  content: string;
  meetingTime: string;
  deadline: string;
  maxPeople: number;
  tags: string[];
  experienceLevel: MateExperienceLevel;
  openChatUrl: string;
  imageUrl?: string;
}

export type UpdateMatePostRequest = Partial<CreateMatePostRequest>;

export interface MateParticipant {
  id?: number;
  memberId: number;
  nickname: string;
  status?: 'JOINED' | 'CANCELLED' | 'KICKED' | string;
  profileImageUrl?: string;
  joinedAt?: string;
  openChatUrl?: string;
}

export interface MateParticipantListResponse {
  currentPeople: number;
  maxPeople: number;
  items: MateParticipant[];
}

export interface MyPageMatePost {
  matePostId: number;
  themeId?: number;
  themeTitle?: string;
  location?: string;
  title: string;
  status: MatePostStatus;
  meetingTime: string;
  currentPeople: number;
  maxPeople: number;
  createdAt: string;
  tags: string[];
  imageUrl?: string;
}
