import axiosInstance from '@/lib/axios';
import { repairMojibake } from '@/lib/text';
import {
  CreateMatePostRequest,
  MateParticipant,
  MateParticipantListResponse,
  MatePost,
  MatePostListParams,
  MatePostListResponse,
  UpdateMatePostRequest,
} from '@/types/mate';

type ApiItemResponse<T> = T | { data?: T };

interface MatePostApiResponse {
  id?: number;
  memberId?: number;
  authorNickname?: string;
  themeId?: number;
  themeTitle?: string;
  title?: string;
  content?: string;
  imageUrl?: string;
  meetingTime?: string;
  deadline?: string;
  currentPeople?: number;
  maxPeople?: number;
  tags?: string[] | string;
  experienceLevel?: MatePost['experienceLevel'];
  openChatUrl?: string;
  status?: MatePost['status'];
  createdAt?: string;
  updatedAt?: string;
  branchName?: string;
  storeName?: string;
  region?: string;
}

interface MatePostListApiResponse {
  items?: MatePostApiResponse[];
  data?: MatePostListApiResponse | MatePostApiResponse[];
  content?: MatePostApiResponse[];
  page?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
  hasNext?: boolean;
}

interface MateParticipantApiResponse {
  id?: number;
  memberId?: number;
  nickname?: string;
  userNickname?: string;
  profileImageUrl?: string;
  joinedAt?: string;
}

interface MateParticipantListApiResponse {
  data?: MateParticipantListApiResponse | MateParticipantApiResponse[];
  items?: MateParticipantApiResponse[];
  content?: MateParticipantApiResponse[];
  currentPeople?: number;
  maxPeople?: number;
}

const unwrapItem = <T>(response: ApiItemResponse<T>): T => {
  if (response && typeof response === 'object' && 'data' in response && response.data) {
    return response.data;
  }

  return response as T;
};

const parseTags = (tags?: string[] | string) => {
  if (Array.isArray(tags)) return tags.map(repairMojibake).filter(Boolean);

  return repairMojibake(tags)
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
};

const mapMatePost = (post: MatePostApiResponse): MatePost => ({
  id: post.id ?? 0,
  memberId: post.memberId ?? 0,
  authorNickname: repairMojibake(post.authorNickname ?? '익명'),
  themeId: post.themeId ?? 0,
  themeTitle: repairMojibake(post.themeTitle),
  title: repairMojibake(post.title),
  content: repairMojibake(post.content),
  imageUrl: post.imageUrl ?? undefined,
  meetingTime: post.meetingTime ?? '',
  deadline: post.deadline ?? '',
  currentPeople: post.currentPeople ?? 0,
  maxPeople: post.maxPeople ?? 0,
  tags: parseTags(post.tags),
  experienceLevel: post.experienceLevel ?? 'ANY',
  openChatUrl: post.openChatUrl ?? undefined,
  status: post.status ?? 'RECRUITING',
  createdAt: post.createdAt ?? '',
  updatedAt: post.updatedAt,
  branchName: repairMojibake(post.branchName),
  storeName: repairMojibake(post.storeName),
  region: repairMojibake(post.region),
});

const unwrapMatePostList = (body: MatePostListApiResponse): MatePostListResponse => {
  const source =
    body.data && !Array.isArray(body.data)
      ? body.data
      : body;
  const rawItems = Array.isArray(body.data)
    ? body.data
    : source.items ?? source.content ?? [];
  const items = rawItems.map(mapMatePost);

  return {
    items,
    page: source.page ?? 0,
    size: source.size ?? items.length,
    totalElements: source.totalElements ?? items.length,
    totalPages: source.totalPages ?? 1,
    hasNext: source.hasNext ?? false,
  };
};

const mapParticipant = (participant: MateParticipantApiResponse): MateParticipant => ({
  id: participant.id,
  memberId: participant.memberId ?? participant.id ?? 0,
  nickname: repairMojibake(participant.nickname ?? participant.userNickname ?? '익명'),
  profileImageUrl: participant.profileImageUrl,
  joinedAt: participant.joinedAt,
});

const unwrapParticipantList = (
  body: MateParticipantListApiResponse,
): MateParticipantListResponse => {
  const source =
    body.data && !Array.isArray(body.data)
      ? body.data
      : body;
  const rawItems = Array.isArray(body.data)
    ? body.data
    : source.items ?? source.content ?? [];
  const items = rawItems.map(mapParticipant);

  return {
    currentPeople: source.currentPeople ?? items.length,
    maxPeople: source.maxPeople ?? 0,
    items,
  };
};

export const getMatePosts = async (
  params: MatePostListParams = {},
): Promise<MatePostListResponse> => {
  const { data } = await axiosInstance.get<MatePostListApiResponse>('/api/mate-posts', {
    params,
  });

  return unwrapMatePostList(data);
};

export const getMatePostById = async (id: number): Promise<MatePost> => {
  const { data } = await axiosInstance.get<ApiItemResponse<MatePostApiResponse>>(
    `/api/mate-posts/${id}`,
  );

  return mapMatePost(unwrapItem(data));
};

export const createMatePost = async (
  payload: CreateMatePostRequest,
): Promise<MatePost> => {
  const { data } = await axiosInstance.post<ApiItemResponse<MatePostApiResponse>>(
    '/api/mate-posts',
    payload,
  );

  return mapMatePost(unwrapItem(data));
};

export const updateMatePost = async (
  id: number,
  payload: UpdateMatePostRequest,
): Promise<MatePost> => {
  const { data } = await axiosInstance.patch<ApiItemResponse<MatePostApiResponse>>(
    `/api/mate-posts/${id}`,
    payload,
  );

  return mapMatePost(unwrapItem(data));
};

export const deleteMatePost = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/api/mate-posts/${id}`);
};

export const joinMatePost = async (postId: number): Promise<void> => {
  await axiosInstance.post(`/api/mate-posts/${postId}/join`);
};

export const leaveMatePost = async (postId: number): Promise<void> => {
  await axiosInstance.delete(`/api/mate-posts/${postId}/join`);
};

export const getMatePostParticipants = async (
  postId: number,
): Promise<MateParticipantListResponse> => {
  const { data } = await axiosInstance.get<MateParticipantListApiResponse>(
    `/api/mate-posts/${postId}/participants`,
  );

  return unwrapParticipantList(data);
};
