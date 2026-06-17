import axiosInstance from '@/lib/axios';
import { repairMojibake } from '@/lib/text';
import { getThemeReviews } from '@/services/themeService';
import type { MyPageReview } from '@/services/mypageService';
import type {
  Review,
  ReviewCreateRequest,
  ReviewFilter,
  ReviewUpdateRequest,
} from '@/types/review';

type ApiResponse<T> = T | { data?: T };
type ApiListResponse<T> = T[] | { data?: T[] };

interface ReviewApiResponse {
  id?: number;
  reviewId?: number;
  themeId?: number;
  themeTitle?: string;
  nickname?: string;
  userNickname?: string;
  rating?: number;
  horrorRating?: number;
  horrorLevel?: number;
  difficultyRating?: number;
  difficulty?: number;
  content?: string;
  tags?: string | string[];
  spoiler?: boolean;
  hasSpoiler?: boolean;
  imageUrls?: string[] | null;
  createdAt?: string;
  updatedAt?: string;
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

const stringifyTags = (tags?: string[]) => {
  const normalized = (tags ?? []).map((tag) => tag.trim()).filter(Boolean);
  return normalized.length > 0 ? normalized.join(',') : undefined;
};

const mapReview = (review: ReviewApiResponse): Review => ({
  id: review.id ?? review.reviewId ?? 0,
  themeId: review.themeId ?? 0,
  themeTitle: repairMojibake(review.themeTitle),
  userId: 0,
  userNickname: repairMojibake(review.nickname ?? review.userNickname ?? '익명'),
  rating: review.rating ?? 0,
  difficulty: review.difficultyRating ?? review.difficulty ?? 0,
  horrorLevel: review.horrorRating ?? review.horrorLevel ?? 0,
  content: repairMojibake(review.content),
  tags: parseTags(review.tags),
  imageUrls: review.imageUrls ?? [],
  hasSpoiler: review.spoiler ?? review.hasSpoiler ?? false,
  createdAt: review.createdAt ?? '',
  updatedAt: review.updatedAt ?? undefined,
});

const createMultipartRequest = (
  payload: ReviewCreateRequest | ReviewUpdateRequest,
  images?: File[],
) => {
  const formData = new FormData();
  formData.append(
    'request',
    new Blob([JSON.stringify(payload)], { type: 'application/json' }),
  );

  images?.forEach((image) => {
    formData.append('images', image);
  });

  return formData;
};

export const toCreateReviewRequest = ({
  reservationId,
  rating,
  difficulty,
  horrorLevel,
  content,
  tags,
  hasSpoiler,
}: {
  reservationId: number;
  rating: number;
  difficulty: number;
  horrorLevel: number;
  content: string;
  tags: string[];
  hasSpoiler: boolean;
}): ReviewCreateRequest => ({
  reservationId,
  rating,
  horrorRating: horrorLevel,
  difficultyRating: difficulty,
  tags: stringifyTags(tags),
  content,
  spoiler: hasSpoiler,
});

export const toUpdateReviewRequest = ({
  rating,
  difficulty,
  horrorLevel,
  content,
  tags,
  hasSpoiler,
}: {
  rating: number;
  difficulty: number;
  horrorLevel: number;
  content: string;
  tags: string[];
  hasSpoiler: boolean;
}): ReviewUpdateRequest => ({
  rating,
  horrorRating: horrorLevel,
  difficultyRating: difficulty,
  tags: stringifyTags(tags),
  content,
  spoiler: hasSpoiler,
});

export const getReviews = async (filter?: ReviewFilter): Promise<Review[]> => {
  const { data } = await axiosInstance.get<ApiListResponse<ReviewApiResponse>>('/api/reviews', {
    params: filter,
  });

  return unwrapList(data).map(mapReview);
};

export const createReview = async (
  payload: ReviewCreateRequest,
  images?: File[],
): Promise<Review> => {
  const formData = createMultipartRequest(payload, images);
  const { data } = await axiosInstance.post<ApiResponse<ReviewApiResponse>>(
    '/api/reviews',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return mapReview(unwrap(data));
};

export const updateReview = async (
  reviewId: number,
  payload: ReviewUpdateRequest,
  images?: File[],
): Promise<Review> => {
  const formData = createMultipartRequest(payload, images);
  const { data } = await axiosInstance.patch<ApiResponse<ReviewApiResponse>>(
    `/api/reviews/${reviewId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return mapReview(unwrap(data));
};

export const deleteReview = async (reviewId: number): Promise<void> => {
  await axiosInstance.delete(`/api/reviews/${reviewId}`);
};

const themeReviewCache = new Map<number, Promise<Review[]>>();

const getCachedThemeReviews = (themeId: number) => {
  const cached = themeReviewCache.get(themeId);
  if (cached) return cached;

  const request = getThemeReviews(themeId).then((response) =>
    response.reviews.map((review) => ({
      id: review.id,
      themeId,
      themeTitle: '',
      userId: 0,
      userNickname: review.nickname,
      rating: review.rating,
      difficulty: review.difficultyRating,
      horrorLevel: review.horrorRating,
      content: review.content,
      tags: review.tags,
      imageUrls: review.imageUrls,
      hasSpoiler: review.spoiler,
      createdAt: review.createdAt,
    })),
  );

  themeReviewCache.set(themeId, request);
  return request;
};

export const resolveMyPageReviewId = async (review: MyPageReview): Promise<number | null> => {
  if ((review as MyPageReview & { reviewId?: number }).reviewId) {
    return (review as MyPageReview & { reviewId?: number }).reviewId ?? null;
  }

  if (!review.themeId) return null;

  const themeReviews = await getCachedThemeReviews(review.themeId);
  const matched = themeReviews.find((themeReview) => {
    const sameCreatedAt = themeReview.createdAt === review.createdAt;
    const sameNickname = themeReview.userNickname === review.nickname;
    const sameContent = themeReview.content === review.content;
    const sameRating = themeReview.rating === review.rating;
    const sameHorror = themeReview.horrorLevel === review.horrorRating;
    const sameDifficulty = themeReview.difficulty === review.difficultyRating;

    return (
      sameCreatedAt &&
      sameNickname &&
      sameContent &&
      sameRating &&
      sameHorror &&
      sameDifficulty
    );
  });

  return matched?.id ?? null;
};
