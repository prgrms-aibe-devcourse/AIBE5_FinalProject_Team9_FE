import axiosInstance from '@/lib/axios';
import { repairMojibake } from '@/lib/text';
import type { MatePostStatus, MyPageMatePost } from '@/types/mate';

type ApiResponse<T> = T | { data?: T };
type ApiListResponse<T> = T[] | { data?: T[] };

export interface MyPageProfile {
  nickname: string;
  titleName?: string;
  gender?: string;
  age?: number;
  profileCharacterImageUrl?: string;
}

export interface MyPageStats {
  totalPlayCount: number;
  successRate: number;
  bestClearTime?: number | null;
  acquiredAchievementCount: number;
  totalAchievementCount: number;
}

export interface MyPageMain {
  profile: MyPageProfile;
  stats: MyPageStats;
}

export interface MyPageReservation {
  reservationId: number;
  themeName: string;
  branchName: string;
  reservationDate: string;
  reservationTime: string;
  peopleCount: number;
  status: string;
  hasReview: boolean;
  isCleared?: boolean | null;
  clearTime?: number | null;
}

export interface MyPageAchievement {
  id: number;
  name: string;
  description: string;
  conditionType: string;
  conditionValue?: number | null;
  acquiredAt?: string | null;
  acquired: boolean;
}

export interface MyPageReview {
  reviewId: number;
  themeTitle: string;
  themeId: number;
  nickname: string;
  rating: number;
  horrorRating: number;
  difficultyRating: number;
  tags: string;
  content: string;
  spoiler: boolean;
  createdAt: string;
  imageUrls: string[];
}

interface MyPageMatePostApiResponse {
  matePostId?: number;
  title?: string;
  status?: MatePostStatus;
  meetingTime?: string;
  currentPeople?: number;
  maxPeople?: number;
  createdAt?: string;
  tags?: string[] | string;
  imageUrl?: string;
}

interface MyPageMateParticipationApiResponse {
  id?: number;
  matePostId?: number;
  status?: string;
  joinedAt?: string;
}

const unwrap = <T>(response: ApiResponse<T>): T => {
  if (response && typeof response === 'object' && 'data' in response && response.data) {
    return response.data;
  }

  return response as T;
};

const unwrapList = <T>(response: ApiListResponse<T>): T[] => {
  if (Array.isArray(response)) return response;
  return response.data ?? [];
};

const parseTags = (tags?: string[] | string) => {
  if (Array.isArray(tags)) return tags.map(repairMojibake).filter(Boolean);

  return repairMojibake(tags)
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
};

const normalizeProfile = (profile?: Partial<MyPageProfile>): MyPageProfile => ({
  nickname: repairMojibake(profile?.nickname),
  titleName: repairMojibake(profile?.titleName) || undefined,
  gender: profile?.gender ?? undefined,
  age: profile?.age,
  profileCharacterImageUrl: profile?.profileCharacterImageUrl,
});

const normalizeStats = (stats?: Partial<MyPageStats>): MyPageStats => ({
  totalPlayCount: stats?.totalPlayCount ?? 0,
  successRate: stats?.successRate ?? 0,
  bestClearTime: stats?.bestClearTime ?? null,
  acquiredAchievementCount: stats?.acquiredAchievementCount ?? 0,
  totalAchievementCount: stats?.totalAchievementCount ?? 0,
});

const normalizeMatePost = (post: MyPageMatePostApiResponse): MyPageMatePost => ({
  matePostId: post.matePostId ?? 0,
  title: repairMojibake(post.title),
  status: post.status ?? 'RECRUITING',
  meetingTime: post.meetingTime ?? '',
  currentPeople: post.currentPeople ?? 0,
  maxPeople: post.maxPeople ?? 0,
  createdAt: post.createdAt ?? '',
  tags: parseTags(post.tags),
  imageUrl: post.imageUrl ?? undefined,
});

export const getMyPageMain = async (): Promise<MyPageMain> => {
  const { data } = await axiosInstance.get<ApiResponse<Partial<MyPageMain>>>('/api/mypage');
  const body = unwrap(data);

  return {
    profile: normalizeProfile(body.profile),
    stats: normalizeStats(body.stats),
  };
};

export const getMyPageProfile = async (): Promise<MyPageProfile> => {
  const { data } = await axiosInstance.get<ApiResponse<Partial<MyPageProfile>>>(
    '/api/mypage/profile',
  );

  return normalizeProfile(unwrap(data));
};

export const getMyPageStats = async (): Promise<MyPageStats> => {
  const { data } = await axiosInstance.get<ApiResponse<Partial<MyPageStats>>>(
    '/api/mypage/stats',
  );

  return normalizeStats(unwrap(data));
};

export const getMyPageReservations = async (
  type: 'UPCOMING' | 'PAST',
): Promise<MyPageReservation[]> => {
  const { data } = await axiosInstance.get<ApiListResponse<MyPageReservation>>(
    '/api/mypage/reservations',
    { params: { type } },
  );

  return unwrapList(data).map((reservation) => ({
    ...reservation,
    themeName: repairMojibake(reservation.themeName),
    branchName: repairMojibake(reservation.branchName),
  }));
};

export const getMyPageAchievements = async (): Promise<MyPageAchievement[]> => {
  const { data } = await axiosInstance.get<ApiListResponse<MyPageAchievement>>(
    '/api/mypage/achievements',
  );

  return unwrapList(data).map((achievement) => ({
    ...achievement,
    name: repairMojibake(achievement.name),
    description: repairMojibake(achievement.description),
    acquired: achievement.acquired ?? Boolean((achievement as { isAcquired?: boolean }).isAcquired),
  }));
};

export const getMyPageMatePosts = async (): Promise<MyPageMatePost[]> => {
  const { data } = await axiosInstance.get<ApiListResponse<MyPageMatePostApiResponse>>(
    '/api/mypage/mate-posts',
  );

  return unwrapList(data).map(normalizeMatePost);
};

export const getMyPageMateParticipations = async (): Promise<MyPageMatePost[]> => {
  const { data } = await axiosInstance.get<ApiListResponse<MyPageMateParticipationApiResponse>>(
    '/api/mypage/mate-participations',
  );

  return unwrapList(data).map((participation) => ({
    matePostId: participation.matePostId ?? 0,
    title: '',
    status: 'RECRUITING',
    meetingTime: '',
    currentPeople: 0,
    maxPeople: 0,
    createdAt: participation.joinedAt ?? '',
    tags: [],
  }));
};

export const getMyPageReviews = async (): Promise<MyPageReview[]> => {
  const { data } = await axiosInstance.get<ApiListResponse<MyPageReview>>('/api/reviews');

  return unwrapList(data).map((review) => ({
    ...review,
    reviewId: review.reviewId ?? 0,
    themeTitle: repairMojibake(review.themeTitle),
    nickname: repairMojibake(review.nickname),
    tags: repairMojibake(review.tags),
    content: repairMojibake(review.content),
    imageUrls: review.imageUrls ?? [],
  }));
};
