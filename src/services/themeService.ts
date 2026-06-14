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

const mapTheme = (theme: ThemeApiResponse): Theme => ({
  id: theme.id,
  title: repairMojibake(theme.title),
  description: repairMojibake(theme.description),
  genre: repairMojibake(theme.tags),
  difficulty: theme.difficulty ?? 0,
  horrorLevel: theme.horrorLevel ?? 0,
  minPlayers: theme.minPeople ?? 0,
  maxPlayers: theme.maxPeople ?? 0,
  duration: theme.playTime ?? 0,
  price: theme.price ?? 0,
  imageUrl: theme.thumbnailUrl ?? '',
  rating: theme.rating ?? 0,
  reviewCount: theme.reviewCount ?? 0,
  locationName: repairMojibake(theme.region ?? theme.branchName ?? theme.storeName),
  branchName: repairMojibake(theme.branchName ?? theme.storeName),
  createdAt: theme.createdAt,
});

const mapThemeDetail = (theme: ThemeApiResponse & Partial<ThemeDetail>): ThemeDetail => ({
  ...mapTheme(theme),
  story: repairMojibake(theme.story),
  notice: repairMojibake(theme.notice),
  availableTimes: theme.availableTimes,
});

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
