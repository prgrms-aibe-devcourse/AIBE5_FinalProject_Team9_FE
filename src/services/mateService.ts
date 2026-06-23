import axiosInstance from '@/lib/axios';
import { repairMojibake } from '@/lib/text';
import {
  CreateMatePostRequest,
  MateParticipant,
  MateParticipantListResponse,
  MatePost,
  MatePostListParams,
  MatePostListResponse,
  MyPageMatePost,
  UpdateMatePostRequest,
} from '@/types/mate';

type ApiItemResponse<T> = T | { data?: T };
type ApiListResponse<T> =
  | T[]
  | {
      data?: T[] | { data?: T[]; items?: T[]; content?: T[] };
      items?: T[];
      content?: T[];
    };

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
  memberNickname?: string;
  nickname?: string;
  userNickname?: string;
  status?: MateParticipant['status'];
  profileImageUrl?: string;
  joinedAt?: string;
  openChatUrl?: string;
}

interface MateParticipantListApiResponse {
  data?: MateParticipantListApiResponse | MateParticipantApiResponse[];
  items?: MateParticipantApiResponse[];
  content?: MateParticipantApiResponse[];
  currentPeople?: number;
  maxPeople?: number;
}

interface MyPageMatePostApiResponse {
  id?: number;
  postId?: number;
  matePostId?: number;
  matePost?: MatePostApiResponse;
  post?: MatePostApiResponse;
  themeId?: number;
  themeTitle?: string;
  themeName?: string;
  branchName?: string;
  storeName?: string;
  region?: string;
  location?: string;
  title?: string;
  status?: MatePost['status'];
  meetingTime?: string;
  currentPeople?: number;
  maxPeople?: number;
  createdAt?: string;
  tags?: string[] | string;
  imageUrl?: string;
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

const unwrapList = <T>(response: ApiListResponse<T>): T[] => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response.data)) return response.data;
  if (response.data && !Array.isArray(response.data)) {
    return response.data.data ?? response.data.items ?? response.data.content ?? [];
  }

  return response.items ?? response.content ?? [];
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
  nickname: repairMojibake(
    participant.memberNickname ?? participant.nickname ?? participant.userNickname ?? '익명',
  ),
  status: participant.status,
  profileImageUrl: participant.profileImageUrl,
  joinedAt: participant.joinedAt,
  openChatUrl: participant.openChatUrl,
});

const mapMyPageMatePost = (post: MyPageMatePostApiResponse): MyPageMatePost => {
  const nestedPost = post.matePost ?? post.post;
  const source = nestedPost ?? post;
  const locationParts = [
    post.storeName ?? nestedPost?.storeName,
    post.branchName ?? nestedPost?.branchName,
    post.region ?? nestedPost?.region,
    post.location,
  ]
    .map(repairMojibake)
    .filter(Boolean);

  return {
    matePostId: post.matePostId ?? post.postId ?? post.id ?? nestedPost?.id ?? 0,
    themeId: post.themeId ?? nestedPost?.themeId,
    themeTitle: repairMojibake(
      post.themeTitle ?? post.themeName ?? nestedPost?.themeTitle,
    ),
    location: locationParts.join(' · ') || undefined,
    title: repairMojibake(source.title),
    status: source.status ?? 'RECRUITING',
    meetingTime: source.meetingTime ?? '',
    currentPeople: source.currentPeople ?? 0,
    maxPeople: source.maxPeople ?? 0,
    createdAt: source.createdAt ?? '',
    tags: parseTags(source.tags),
    imageUrl: source.imageUrl ?? undefined,
  };
};

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
  const items = rawItems
    .map(mapParticipant)
    .filter((participant) => !participant.status || participant.status === 'JOINED');

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

export const closeMatePost = async (id: number): Promise<void> => {
  await axiosInstance.patch(`/api/mate-posts/${id}/close`);
};

export const joinMatePost = async (postId: number): Promise<void> => {
  await axiosInstance.post(`/api/mate-posts/${postId}/join`);
};

export const leaveMatePost = async (postId: number): Promise<void> => {
  await axiosInstance.delete(`/api/mate-posts/${postId}/join`);
};

export const getMyMateParticipations = async (): Promise<MyPageMatePost[]> => {
  const { data } = await axiosInstance.get<ApiListResponse<MyPageMatePostApiResponse>>(
    '/api/mypage/mate-participations',
  );

  return unwrapList(data).map(mapMyPageMatePost);
};

export const getMatePostParticipants = async (
  postId: number,
): Promise<MateParticipantListResponse> => {
  const { data } = await axiosInstance.get<MateParticipantListApiResponse>(
    `/api/mate-posts/${postId}/participants`,
  );

  return unwrapParticipantList(data);
};

//mate 글쓰기
interface MateCommentApiResponse {
  commentId?: number;
  id?: number;
  parentCommentId?: number | null;
  authorId?: number | null;
  authorNickname?: string | null;
  content?: string;
  deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  replies?: MateCommentApiResponse[];
}

interface MateCommentListApiResponse {
  data?: MateCommentListApiResponse | MateCommentApiResponse[];
  comments?: MateCommentApiResponse[];
  items?: MateCommentApiResponse[];
  content?: MateCommentApiResponse[];
  totalCount?: number;
}

export interface MateCommentItem {
  commentId: number;
  parentCommentId: number | null;
  authorId: number | null;
  authorNickname: string | null;
  content: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MateCommentReply extends MateCommentItem {
  parentCommentId: number;
}

export interface MateComment extends MateCommentItem {
  parentCommentId: null;
  replies: MateCommentReply[];
}

export interface MateCommentListResponse {
  totalCount: number;
  comments: MateComment[];
}

const mapCommentItem = (comment: MateCommentApiResponse): MateCommentItem => ({
  commentId: comment.commentId ?? comment.id ?? 0,
  parentCommentId: comment.parentCommentId ?? null,
  authorId: comment.authorId ?? null,
  authorNickname: comment.authorNickname ? repairMojibake(comment.authorNickname) : null,
  content: comment.deleted && !comment.content ? '삭제된 댓글입니다.' : repairMojibake(comment.content),
  deleted: comment.deleted ?? false,
  createdAt: comment.createdAt ?? '',
  updatedAt: comment.updatedAt ?? '',
});

const mapCommentReply = (comment: MateCommentApiResponse): MateCommentReply => ({
  ...mapCommentItem(comment),
  parentCommentId: comment.parentCommentId ?? 0,
});

const mapComment = (comment: MateCommentApiResponse): MateComment => ({
  ...mapCommentItem(comment),
  parentCommentId: null,
  replies: (comment.replies ?? []).map(mapCommentReply),
});

const unwrapCommentList = (
  body: MateCommentListApiResponse | MateCommentApiResponse[],
): MateCommentListResponse => {
  if (Array.isArray(body)) {
    const comments = body.map(mapComment);
    return { totalCount: comments.length, comments };
  }

  const source =
    body.data && !Array.isArray(body.data)
      ? body.data
      : body;
  const rawComments = Array.isArray(body.data)
    ? body.data
    : source.comments ?? source.items ?? source.content ?? [];
  const comments = rawComments.map(mapComment);

  return {
    totalCount: source.totalCount ?? comments.length,
    comments,
  };
};

export const getMateComments = async (
  postId: number,
): Promise<MateCommentListResponse> => {
  const { data } = await axiosInstance.get<MateCommentListApiResponse | MateCommentApiResponse[]>(
    `/api/mate-posts/${postId}/comments`,
  );

  return unwrapCommentList(data);
};

export const createMateComment = async (
  postId: number,
  content: string,
): Promise<MateCommentItem> => {
  const { data } = await axiosInstance.post<ApiItemResponse<MateCommentApiResponse>>(
    `/api/mate-posts/${postId}/comments`,
    { content },
  );

  return mapCommentItem(unwrapItem(data));
};

export const createMateCommentReply = async (
  postId: number,
  commentId: number,
  content: string,
): Promise<MateCommentReply> => {
  const { data } = await axiosInstance.post<ApiItemResponse<MateCommentApiResponse>>(
    `/api/mate-posts/${postId}/comments/${commentId}/replies`,
    { content },
  );

  return mapCommentReply(unwrapItem(data));
};

export const updateMateComment = async (
  postId: number,
  commentId: number,
  content: string,
): Promise<MateCommentItem> => {
  const { data } = await axiosInstance.patch<ApiItemResponse<MateCommentApiResponse>>(
    `/api/mate-posts/${postId}/comments/${commentId}`,
    { content },
  );

  return mapCommentItem(unwrapItem(data));
};

export const deleteMateComment = async (postId: number, commentId: number): Promise<void> => {
  await axiosInstance.delete(`/api/mate-posts/${postId}/comments/${commentId}`);
};
