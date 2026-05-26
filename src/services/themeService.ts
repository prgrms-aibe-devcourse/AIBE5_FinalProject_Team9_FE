import axiosInstance from '@/lib/axios';
import { Theme, ThemeDetail, ThemeFilter, CreateThemeRequest } from '@/types/theme';

interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// TODO: GET /api/themes
export const getThemes = async (filter?: ThemeFilter): Promise<PaginatedResponse<Theme>> => {
  const { data } = await axiosInstance.get('/themes', { params: filter });
  return data;
};

// TODO: GET /api/themes/:id
export const getThemeById = async (id: number): Promise<ThemeDetail> => {
  const { data } = await axiosInstance.get(`/themes/${id}`);
  return data;
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

// TODO: POST /api/owner/themes
export const createTheme = async (payload: CreateThemeRequest): Promise<Theme> => {
  const { data } = await axiosInstance.post('/owner/themes', payload);
  return data;
};

// TODO: PUT /api/owner/themes/:id
export const updateTheme = async (id: number, payload: Partial<CreateThemeRequest>): Promise<Theme> => {
  const { data } = await axiosInstance.put(`/owner/themes/${id}`, payload);
  return data;
};

// TODO: DELETE /api/owner/themes/:id
export const deleteTheme = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/owner/themes/${id}`);
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
