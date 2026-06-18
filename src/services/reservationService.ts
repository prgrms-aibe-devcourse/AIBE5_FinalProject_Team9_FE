import axiosInstance from '@/lib/axios';
import {
  Reservation,
  CreateReservationRequest,
  ReservationCreateResponse,
  ReservationFilter,
} from '@/types/reservation';

type ApiResponse<T> = T | { data?: T };

const unwrap = <T>(body: ApiResponse<T>): T => {
  if (body && typeof body === 'object' && 'data' in body && body.data) {
    return body.data;
  }

  return body as T;
};

interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
}

type ReservationListResponse<T> =
  | T[]
  | {
      data?: T[] | PaginatedResponse<T>;
      content?: T[];
      totalElements?: number;
      totalPages?: number;
    };

const normalizeReservationList = <T>(body: ReservationListResponse<T>): PaginatedResponse<T> => {
  if (Array.isArray(body)) {
    return { content: body, totalElements: body.length, totalPages: 1 };
  }

  if (Array.isArray(body.data)) {
    return { content: body.data, totalElements: body.data.length, totalPages: 1 };
  }

  if (body.data && !Array.isArray(body.data)) {
    return body.data;
  }

  const content = body.content ?? [];
  return {
    content,
    totalElements: body.totalElements ?? content.length,
    totalPages: body.totalPages ?? 1,
  };
};

export const getMyReservations = async (filter?: ReservationFilter): Promise<PaginatedResponse<Reservation>> => {
  const { data } = await axiosInstance.get<ReservationListResponse<Reservation>>(
    '/api/mypage/reservations',
    { params: filter },
  );
  return normalizeReservationList(data);
};

export const getReservationById = async (id: number): Promise<Reservation> => {
  const { data } = await axiosInstance.get(`/api/reservations/${id}`);
  return data;
};

export const createReservation = async (
  payload: CreateReservationRequest,
): Promise<ReservationCreateResponse> => {
  const { data } = await axiosInstance.post<ApiResponse<ReservationCreateResponse>>(
    '/api/reservations',
    payload,
  );
  return unwrap(data);
};

export const cancelReservation = async (id: number): Promise<void> => {
  await axiosInstance.post(`/api/reservations/${id}/cancel`);
};

export interface SlotHoldResponse {
  timeSlotId: number;
  holdToken: string;
  expiresInSeconds: number;
}

export interface SlotReleaseResponse {
  timeSlotId: number;
  released: boolean;
}

export const holdSlot = async (timeSlotId: number): Promise<SlotHoldResponse> => {
  const { data } = await axiosInstance.post<SlotHoldResponse>(`/api/slots/${timeSlotId}/hold`);
  return data;
};

export const releaseSlot = async (
  timeSlotId: number,
  holdToken: string,
): Promise<SlotReleaseResponse> => {
  const { data } = await axiosInstance.patch<SlotReleaseResponse>(
    `/api/slots/${timeSlotId}/release`,
    { holdToken },
  );
  return data;
};

export const getAvailableTimes = async (themeId: number, date: string): Promise<string[]> => {
  const { data } = await axiosInstance.get(`/api/themes/${themeId}/available-times`, { params: { date } });
  return data;
};
