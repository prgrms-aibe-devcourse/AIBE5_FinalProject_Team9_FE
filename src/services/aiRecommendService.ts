import axiosInstance from '@/lib/axios';
import { repairMojibake } from '@/lib/text';
import { AxiosError } from 'axios';

type ApiListResponse<T> = T[] | { data?: T[] };
type ApiItemResponse<T> = T | { data?: T };

export type AiRecommendRole = 'user' | 'assistant';

export interface AiRecommendMessage {
  role: AiRecommendRole;
  content: string;
}

export interface AiRecommendRequest {
  messages: AiRecommendMessage[];
}

export interface AiRecommendedTheme {
  id: number;
  title: string;
  thumbnailUrl?: string;
  horrorLevel: number;
  difficulty: number;
  rating: number;
  description: string;
  branchName?: string;
  region?: string;
  playTime?: number;
  price?: number;
  reason?: string;
}

interface AiRecommendedThemeApiResponse {
  id?: number;
  themeId?: number;
  title?: string;
  themeTitle?: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  horrorLevel?: number;
  difficulty?: number;
  rating?: number;
  description?: string;
  branchName?: string;
  region?: string;
  playTime?: number;
  price?: number;
  reason?: string;
  recommendReason?: string;
}

interface AiRecommendApiResponse {
  type?: 'recommendation' | 'message' | string;
  message?: string;
  themes?: AiRecommendedThemeApiResponse[];
}

export interface AiRecommendResponse {
  type: string;
  message: string;
  themes: AiRecommendedTheme[];
}

export interface AiRecommendErrorInfo {
  status?: number;
  code?: string;
  message: string;
  detail?: unknown;
}

const unwrapItem = <T>(response: ApiItemResponse<T>): T => {
  if (response && typeof response === 'object' && 'data' in response && response.data) {
    return response.data;
  }

  return response as T;
};

const unwrapList = <T>(response: ApiListResponse<T>): T[] => {
  if (Array.isArray(response)) return response;
  return response.data ?? [];
};

const normalizeTheme = (theme: AiRecommendedThemeApiResponse): AiRecommendedTheme => ({
  id: theme.id ?? theme.themeId ?? 0,
  title: repairMojibake(theme.title ?? theme.themeTitle) || '추천 테마',
  thumbnailUrl: theme.thumbnailUrl ?? theme.imageUrl,
  horrorLevel: theme.horrorLevel ?? 0,
  difficulty: theme.difficulty ?? 0,
  rating: theme.rating ?? 0,
  description: repairMojibake(theme.description),
  branchName: repairMojibake(theme.branchName) || undefined,
  region: repairMojibake(theme.region) || undefined,
  playTime: theme.playTime,
  price: theme.price,
  reason: repairMojibake(theme.reason ?? theme.recommendReason) || undefined,
});

const normalizeResponse = (response: AiRecommendApiResponse): AiRecommendResponse => ({
  type: response.type ?? 'message',
  message: repairMojibake(response.message),
  themes: (response.themes ?? []).map(normalizeTheme).filter((theme) => theme.id > 0),
});

export const getAiRecommendErrorInfo = (error: unknown): AiRecommendErrorInfo => {
  const axiosError = error as AxiosError<{ message?: string; error?: string }>;
  const status = axiosError.response?.status;
  const serverMessage = repairMojibake(
    axiosError.response?.data?.message ?? axiosError.response?.data?.error,
  );

  if (status === 401 || status === 403) {
    return {
      status,
      code: axiosError.code,
      message: serverMessage || '로그인이 필요하거나 인증이 만료되었습니다.',
      detail: axiosError.response?.data,
    };
  }

  if (status && status >= 500) {
    return {
      status,
      code: axiosError.code,
      message: serverMessage || 'AI 추천 서버 오류가 발생했습니다.',
      detail: axiosError.response?.data,
    };
  }

  if (axiosError.code === 'ECONNABORTED') {
    return {
      status,
      code: axiosError.code,
      message: 'AI 추천 응답 시간이 길어지고 있어요. 잠시 후 다시 시도해주세요.',
      detail: axiosError.message,
    };
  }

  if (axiosError.request && !axiosError.response) {
    return {
      status,
      code: axiosError.code,
      message: 'AI 추천 서버에 연결하지 못했어요. CORS 또는 네트워크 상태를 확인해주세요.',
      detail: axiosError.message,
    };
  }

  return {
    status,
    code: axiosError.code,
    message: serverMessage || 'AI 추천을 불러오지 못했어요. 잠시 후 다시 시도해주세요.',
    detail: axiosError.response?.data ?? axiosError.message,
  };
};

export const logAiRecommendError = (label: string, error: unknown) => {
  if (process.env.NODE_ENV !== 'development') return;

  const axiosError = error as AxiosError;
  const info = getAiRecommendErrorInfo(error);

  console.error(`[aiRecommendService.${label}]`, {
    status: info.status,
    code: info.code,
    message: info.message,
    detail: info.detail,
    response: axiosError.response?.data,
    url: axiosError.config?.url,
    method: axiosError.config?.method,
  });
};

export const requestAiRecommendation = async (
  payload: AiRecommendRequest,
): Promise<AiRecommendResponse> => {
  const { data } = await axiosInstance.post<ApiItemResponse<AiRecommendApiResponse>>(
    '/api/ai/recommend',
    payload,
    { timeout: 30000 },
  );

  return normalizeResponse(unwrapItem(data));
};

export const getRandomAiRecommendations = async (): Promise<AiRecommendedTheme[]> => {
  const { data } = await axiosInstance.get<ApiListResponse<AiRecommendedThemeApiResponse>>(
    '/api/ai/recommend/random',
    { timeout: 15000 },
  );

  return unwrapList(data).map(normalizeTheme).filter((theme) => theme.id > 0);
};
