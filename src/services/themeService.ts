import axiosInstance from '@/lib/axios';
import { repairMojibake } from '@/lib/text';
import {
  Theme,
  ThemeApiResponse,
  ThemeDetail,
  ThemeFilter,
  OwnerTheme,
  OwnerThemeRequest,
} from '@/types/theme';

type ApiListResponse<T> =
  | T[]
  | {
      data?: T[] | { content?: T[] };
      content?: T[];
    };
type ApiItemResponse<T> = T | { data?: T };

export interface ThemeReviewSummary {
  reviews: ThemeReview[];
  averageRating: number;
  reviewCount: number;
}

export interface ThemeReview {
  id: number;
  nickname: string;
  rating: number;
  horrorRating: number;
  difficultyRating: number;
  tags: string[];
  content: string;
  spoiler: boolean;
  createdAt: string;
  imageUrls: string[];
}

export interface ThemeBranchInfo {
  branchName: string;
  storeName: string;
  region: string;
  address: string;
  phone: string;
  operatingHours: string;
  rating?: number;
  reviewCount?: number;
  minPeople?: number;
  maxPeople?: number;
  playTime?: number;
  thumbnailUrl?: string;
}

export interface ThemeTimeSlot {
  id?: number;
  time: string;
  status: string;
  available: boolean;
}

export interface AvailableThemeSlot {
  timeSlotId: number;
  slotDate: string;
  startTime: string;
  endTime: string;
  status?: string;
}

export interface AvailableSlotTheme {
  themeId: number;
  themeTitle: string;
  branchId: number;
  branchName: string;
  region?: string;
  rating?: number;
  reviewCount?: number;
  difficulty?: number;
  horrorLevel?: number;
  minPeople?: number;
  maxPeople?: number;
  playTime?: number;
  price?: number;
  thumbnailUrl?: string;
  tags?: string;
  description?: string;
  availableSlots: AvailableThemeSlot[];
}

interface ThemeReviewApiResponse {
  id?: number;
  reviewId?: number;
  nickname?: string;
  userNickname?: string;
  rating?: number;
  horrorRating?: number;
  horrorLevel?: number;
  difficultyRating?: number;
  difficulty?: number;
  tags?: string | string[];
  content?: string;
  spoiler?: boolean;
  hasSpoiler?: boolean;
  createdAt?: string;
  imageUrls?: string[] | null;
}

interface ThemeReviewListApiResponse {
  data?: ThemeReviewApiResponse[] | ThemeReviewListApiResponse;
  content?: ThemeReviewApiResponse[];
  reviews?: ThemeReviewApiResponse[];
  averageRating?: number;
  rating?: number;
  reviewCount?: number;
  totalElements?: number;
}

interface ThemeBranchApiResponse {
  branchName?: string;
  storeName?: string;
  region?: string;
  address?: string;
  phone?: string;
  operatingHours?: string;
  rating?: number;
  reviewCount?: number;
  minPeople?: number;
  maxPeople?: number;
  playTime?: number;
  thumbnailUrl?: string;
}

interface ThemeTimeSlotApiResponse {
  id?: number;
  slotId?: number;
  timeSlotId?: number;
  time?: string;
  startTime?: string;
  endTime?: string;
  startAt?: string;
  endAt?: string;
  startDateTime?: string;
  endDateTime?: string;
  date?: string;
  slotDate?: string;
  startDate?: string;
  status?: string;
  slotStatus?: string;
  state?: string;
  available?: boolean;
  isAvailable?: boolean;
  held?: boolean;
  availableSlots?: ThemeTimeSlotApiResponse[];
}

interface AvailableSlotThemeApiResponse {
  themeId?: number;
  id?: number;
  themeTitle?: string;
  title?: string;
  branchId?: number;
  branchName?: string;
  region?: string;
  rating?: number | null;
  reviewCount?: number | null;
  difficulty?: number;
  horrorLevel?: number;
  minPeople?: number;
  maxPeople?: number;
  playTime?: number;
  price?: number;
  thumbnailUrl?: string;
  tags?: string;
  description?: string;
  availableSlots?: ThemeTimeSlotApiResponse[];
}

type ThemeTimeSlotRaw = ThemeTimeSlotApiResponse | string;
type ThemeTimeSlotListApiResponse =
  | ThemeTimeSlotRaw[]
  | {
      data?: ThemeTimeSlotRaw[] | {
        slots?: ThemeTimeSlotRaw[];
        content?: ThemeTimeSlotRaw[];
        items?: ThemeTimeSlotRaw[];
        timeSlots?: ThemeTimeSlotRaw[];
        availableSlots?: ThemeTimeSlotRaw[];
      };
      content?: ThemeTimeSlotRaw[];
      slots?: ThemeTimeSlotRaw[];
      items?: ThemeTimeSlotRaw[];
      timeSlots?: ThemeTimeSlotRaw[];
      availableSlots?: ThemeTimeSlotRaw[];
    };
type AvailableSlotThemeListApiResponse =
  | AvailableSlotThemeApiResponse[]
  | {
      data?: AvailableSlotThemeApiResponse[] | { content?: AvailableSlotThemeApiResponse[] };
      content?: AvailableSlotThemeApiResponse[];
    };

const unwrapList = <T>(response: ApiListResponse<T>): T[] => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response.data)) return response.data;
  if (response.data?.content) return response.data.content;
  return response.content ?? [];
};

const unwrapItem = <T>(response: ApiItemResponse<T>): T => {
  if (response && typeof response === 'object' && 'data' in response && response.data) {
    return response.data;
  }

  return response as T;
};

const normalizeThemeNumbers = (theme: ThemeApiResponse) => {
  const rawPlayTime = theme.playTime ?? 0;
  const rawMinPeople = theme.minPeople ?? 0;
  const rawMaxPeople = theme.maxPeople ?? 0;

  if (
    rawMinPeople >= 30 &&
    rawMaxPeople > 0 &&
    rawMaxPeople <= 20 &&
    rawPlayTime > 0 &&
    rawPlayTime <= 20
  ) {
    return {
      duration: rawMinPeople,
      minPlayers: rawMaxPeople,
      maxPlayers: rawPlayTime,
    };
  }

  if (
    rawMinPeople > rawMaxPeople &&
    rawMinPeople <= 20 &&
    rawMaxPeople > 0 &&
    rawMaxPeople <= 20
  ) {
    return {
      duration: rawPlayTime,
      minPlayers: rawMaxPeople,
      maxPlayers: rawMinPeople,
    };
  }

  return {
    duration: rawPlayTime,
    minPlayers: rawMinPeople,
    maxPlayers: rawMaxPeople,
  };
};

const mapTheme = (theme: ThemeApiResponse): Theme => {
  const { duration, minPlayers, maxPlayers } = normalizeThemeNumbers(theme);

  return {
    id: theme.id,
    title: repairMojibake(theme.title),
    description: repairMojibake(theme.description),
    genre: repairMojibake(theme.tags),
    difficulty: theme.difficulty ?? 0,
    horrorLevel: theme.horrorLevel ?? 0,
    minPlayers,
    maxPlayers,
    duration,
    price: theme.price ?? 0,
    imageUrl: theme.thumbnailUrl ?? '',
    rating: theme.rating ?? 0,
    reviewCount: theme.reviewCount ?? 0,
    locationName: repairMojibake(theme.region ?? theme.branchName ?? theme.storeName),
    storeName: repairMojibake(theme.storeName),
    branchName: repairMojibake(theme.branchName ?? theme.storeName),
    createdAt: theme.createdAt,
  };
};

const mapThemeDetail = (theme: ThemeApiResponse & Partial<ThemeDetail>): ThemeDetail => ({
  ...mapTheme(theme),
  story: repairMojibake(theme.story),
  notice: repairMojibake(theme.notice),
  availableTimes: theme.availableTimes,
});

const parseTags = (tags?: string | string[]) => {
  if (Array.isArray(tags)) return tags.map(repairMojibake).filter(Boolean);

  return repairMojibake(tags)
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
};

const calculateAverageRating = (reviews: ThemeReview[]) => {
  if (reviews.length === 0) return 0;

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Number((total / reviews.length).toFixed(1));
};

const mapThemeReview = (review: ThemeReviewApiResponse): ThemeReview => ({
  id: review.id ?? review.reviewId ?? 0,
  nickname: repairMojibake(review.nickname ?? review.userNickname ?? '익명'),
  rating: review.rating ?? 0,
  horrorRating: review.horrorRating ?? review.horrorLevel ?? 0,
  difficultyRating: review.difficultyRating ?? review.difficulty ?? 0,
  tags: parseTags(review.tags),
  content: repairMojibake(review.content),
  spoiler: review.spoiler ?? review.hasSpoiler ?? false,
  createdAt: review.createdAt ?? '',
  imageUrls: review.imageUrls ?? [],
});

const unwrapReviewSummary = (body: ThemeReviewListApiResponse): ThemeReviewSummary => {
  const source =
    body.data && !Array.isArray(body.data)
      ? body.data
      : body;
  const rawReviews = Array.isArray(body.data)
    ? body.data
    : source.reviews ?? source.content ?? [];
  const reviews = rawReviews.map(mapThemeReview);
  const averageRating = source.averageRating ?? source.rating ?? calculateAverageRating(reviews);
  const reviewCount = Math.max(source.reviewCount ?? source.totalElements ?? 0, reviews.length);

  if (process.env.NODE_ENV === 'development') {
    console.log('[themeService.getThemeReviews]', {
      response: body,
      rawReviews,
      mappedReviews: reviews,
      averageRating,
      reviewCount,
    });
  }

  return {
    reviews,
    averageRating,
    reviewCount,
  };
};

const mapThemeBranch = (branch: ThemeBranchApiResponse): ThemeBranchInfo => ({
  branchName: repairMojibake(branch.branchName),
  storeName: repairMojibake(branch.storeName),
  region: repairMojibake(branch.region),
  address: repairMojibake(branch.address),
  phone: repairMojibake(branch.phone),
  operatingHours: repairMojibake(branch.operatingHours),
  rating: branch.rating,
  reviewCount: branch.reviewCount,
  minPeople: branch.minPeople,
  maxPeople: branch.maxPeople,
  playTime: branch.playTime,
  thumbnailUrl: branch.thumbnailUrl,
});

const mapAvailableThemeSlot = (slot: ThemeTimeSlotApiResponse): AvailableThemeSlot => ({
  timeSlotId: slot.timeSlotId ?? slot.id ?? slot.slotId ?? 0,
  slotDate: slot.slotDate ?? slot.date ?? slot.startDate ?? getRawSlotDate(slot),
  startTime: normalizeSlotTime(slot.startTime ?? slot.time ?? slot.startAt ?? slot.startDateTime),
  endTime: normalizeSlotTime(slot.endTime ?? slot.endAt ?? slot.endDateTime),
  status: slot.status ?? slot.slotStatus ?? slot.state,
});

const mapAvailableSlotTheme = (item: AvailableSlotThemeApiResponse): AvailableSlotTheme => ({
  themeId: item.themeId ?? item.id ?? 0,
  themeTitle: repairMojibake(item.themeTitle ?? item.title),
  branchId: item.branchId ?? 0,
  branchName: repairMojibake(item.branchName),
  region: repairMojibake(item.region),
  rating: item.rating ?? undefined,
  reviewCount: item.reviewCount ?? undefined,
  difficulty: item.difficulty,
  horrorLevel: item.horrorLevel,
  minPeople: item.minPeople,
  maxPeople: item.maxPeople,
  playTime: item.playTime,
  price: item.price,
  thumbnailUrl: item.thumbnailUrl,
  tags: repairMojibake(item.tags),
  description: repairMojibake(item.description),
  availableSlots: (item.availableSlots ?? [])
    .map(mapAvailableThemeSlot)
    .filter((slot) => slot.timeSlotId && slot.slotDate && slot.startTime),
});

const unwrapAvailableSlotThemes = (body: AvailableSlotThemeListApiResponse): AvailableSlotThemeApiResponse[] => {
  if (Array.isArray(body)) return body;
  if (Array.isArray(body.data)) return body.data;
  if (body.data?.content) return body.data.content;
  return body.content ?? [];
};

const mapThemeSlot = (slot: ThemeTimeSlotApiResponse | string): ThemeTimeSlot => {
  if (typeof slot === 'string') {
    return { time: slot, status: 'SLOT_AVAILABLE', available: true };
  }

  const status =
    slot.status ??
    slot.slotStatus ??
    slot.state ??
    ((slot.available ?? slot.isAvailable ?? true) ? 'SLOT_AVAILABLE' : 'SLOT_FULL');
  const upperStatus = status.toUpperCase();
  const available =
    slot.available ??
    slot.isAvailable ??
    (
      upperStatus.includes('AVAILABLE') &&
      !slot.held &&
      !upperStatus.includes('HELD') &&
      !upperStatus.includes('FULL') &&
      !upperStatus.includes('RESERVED')
    );
  const startTime = normalizeSlotTime(slot.time ?? slot.startTime ?? slot.startAt ?? slot.startDateTime);
  const endTime = normalizeSlotTime(slot.endTime ?? slot.endAt ?? slot.endDateTime);

  return {
    id: slot.id ?? slot.slotId ?? slot.timeSlotId,
    time: startTime && endTime ? `${startTime}~${endTime}` : startTime,
    status,
    available,
  };
};

const flattenTimeSlots = (slots: ThemeTimeSlotRaw[]): ThemeTimeSlotRaw[] =>
  slots.flatMap((slot) => {
    if (typeof slot === 'string') return slot;
    if (Array.isArray(slot.availableSlots)) return slot.availableSlots;
    return slot;
  });

const unwrapTimeSlots = (body: ThemeTimeSlotListApiResponse): ThemeTimeSlotRaw[] => {
  if (Array.isArray(body)) return flattenTimeSlots(body);
  if (Array.isArray(body.data)) return flattenTimeSlots(body.data);
  if (body.data?.slots) return flattenTimeSlots(body.data.slots);
  if (body.data?.content) return flattenTimeSlots(body.data.content);
  if (body.data?.items) return flattenTimeSlots(body.data.items);
  if (body.data?.timeSlots) return flattenTimeSlots(body.data.timeSlots);
  if (body.data?.availableSlots) return flattenTimeSlots(body.data.availableSlots);
  if (body.slots) return flattenTimeSlots(body.slots);
  if (body.content) return flattenTimeSlots(body.content);
  if (body.items) return flattenTimeSlots(body.items);
  if (body.timeSlots) return flattenTimeSlots(body.timeSlots);
  if (body.availableSlots) return flattenTimeSlots(body.availableSlots);

  return [];
};

const normalizeSlotTime = (value?: string) => {
  if (!value) return '';
  const timePart = value.includes('T') ? value.split('T')[1] : value;
  return timePart.slice(0, 5);
};

const getRawSlotDate = (slot: ThemeTimeSlotRaw) => {
  if (typeof slot === 'string') return '';
  const value = slot.date ?? slot.slotDate ?? slot.startDate ?? slot.startDateTime ?? slot.startAt;
  if (!value) return '';
  return value.includes('T') ? value.split('T')[0] : value.slice(0, 10);
};

const mapOwnerTheme = (theme: OwnerTheme): OwnerTheme => ({
  ...theme,
  title: repairMojibake(theme.title),
  description: repairMojibake(theme.description),
  tags: repairMojibake(theme.tags),
  branchName: repairMojibake(theme.branchName),
});

const createOwnerThemeFormData = (payload: OwnerThemeRequest, thumbnail?: File) => {
  const form = new FormData();
  form.append(
    'request',
    new Blob([JSON.stringify(payload)], { type: 'application/json' })
  );

  if (thumbnail) {
    form.append('thumbnail', thumbnail);
  }

  return form;
};

// GET /api/themes
export const getThemes = async (filter?: ThemeFilter): Promise<Theme[]> => {
  const { data } = await axiosInstance.get<ApiListResponse<ThemeApiResponse>>('/api/themes', { params: filter });
  return unwrapList(data).map(mapTheme);
};

// GET /api/themes/:id
export const getThemeById = async (id: number): Promise<ThemeDetail> => {
  const { data } = await axiosInstance.get<ApiItemResponse<ThemeApiResponse & Partial<ThemeDetail>>>(`/api/themes/${id}`);
  return mapThemeDetail(unwrapItem(data));
};

// GET /api/themes/:themeId/reviews
export const getThemeReviews = async (themeId: number): Promise<ThemeReviewSummary> => {
  const { data } = await axiosInstance.get<ThemeReviewListApiResponse>(
    `/api/themes/${themeId}/reviews`,
    { params: { page: 1, limit: 100, sort: 'latest' } },
  );

  return unwrapReviewSummary(data);
};

// GET /api/themes/:themeId/branches
export const getThemeBranchInfo = async (themeId: number): Promise<ThemeBranchInfo> => {
  try {
    const { data } = await axiosInstance.get<ApiItemResponse<ThemeBranchApiResponse>>(
      `/api/themes/${themeId}/branches`,
    );

    return mapThemeBranch(unwrapItem(data));
  } catch {
    const { data } = await axiosInstance.get<ApiItemResponse<ThemeBranchApiResponse>>(
      `/api/themes/branches/${themeId}`,
    );

    return mapThemeBranch(unwrapItem(data));
  }
};

// GET /api/themes/:themeId/slots?slotDate=YYYY-MM-DD
export const getThemeTimeSlots = async (
  themeId: number,
  date: string,
): Promise<ThemeTimeSlot[]> => {
  const params = { slotDate: date };
  const { data } = await axiosInstance.get<ThemeTimeSlotListApiResponse>(
    `/api/themes/${themeId}/slots`,
    { params },
  );
  const rawSlots = unwrapTimeSlots(data);
  const slots = rawSlots
    .map(mapThemeSlot)
    .filter((slot) => slot.time);

  if (process.env.NODE_ENV === 'development') {
    console.log('[themeService.getThemeTimeSlots]', {
      url: `/api/themes/${themeId}/slots`,
      params,
      response: data,
      rawSlots,
      mappedSlots: slots,
    });
  }

  return slots;
};

// GET /api/slots/available?dateFrom=YYYY-MM-DD&dateTo=YYYY-MM-DD
export const getAvailableSlotThemes = async (
  dateFrom: string,
  dateTo: string,
): Promise<AvailableSlotTheme[]> => {
  const { data } = await axiosInstance.get<AvailableSlotThemeListApiResponse>(
    '/api/slots/available',
    { params: { dateFrom, dateTo } },
  );

  const themes = unwrapAvailableSlotThemes(data).map(mapAvailableSlotTheme);

  if (process.env.NODE_ENV === 'development') {
    console.log('[themeService.getAvailableSlotThemes]', {
      params: { dateFrom, dateTo },
      response: data,
      mappedThemes: themes,
    });
  }

  return themes;
};

// TODO: GET /api/themes/popular
export const getPopularThemes = async (): Promise<Theme[]> => {
  const { data } = await axiosInstance.get('/themes/popular');
  return data;
};

// TODO: GET /api/themes/new
export const getNewThemes = async (): Promise<Theme[]> => {
  const { data } = await axiosInstance.get('/themes/new');
  return data;
};

// GET /api/owner/themes
export const getOwnerThemes = async (): Promise<OwnerTheme[]> => {
  const { data } = await axiosInstance.get<ApiListResponse<OwnerTheme>>('/api/owner/themes');
  return unwrapList(data).map(mapOwnerTheme);
};

// POST /api/owner/themes
export const createTheme = async (
  payload: OwnerThemeRequest,
  thumbnail: File
): Promise<OwnerTheme> => {
  const { data } = await axiosInstance.post(
    '/api/owner/themes',
    createOwnerThemeFormData(payload, thumbnail),
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return data;
};

// PATCH /api/owner/themes/:id
export const updateTheme = async (
  id: number,
  payload: OwnerThemeRequest,
  thumbnail?: File
): Promise<OwnerTheme> => {
  const { data } = await axiosInstance.patch(
    `/api/owner/themes/${id}`,
    createOwnerThemeFormData(payload, thumbnail),
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return data;
};

// DELETE /api/owner/themes/:id
export const deleteTheme = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/api/owner/themes/${id}`);
};

// TODO: POST /api/owner/themes/:id/image
export const uploadThemeImage = async (themeId: number, file: File): Promise<{ imageUrl: string }> => {
  const form = new FormData();
  form.append('file', file);
  const { data } = await axiosInstance.post(`/owner/themes/${themeId}/image`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};
