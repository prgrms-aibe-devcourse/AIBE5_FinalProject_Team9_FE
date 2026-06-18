import { getThemeById } from '@/services/themeService';
import type { MyPageReview } from '@/services/mypageService';
import { repairMojibake } from '@/lib/text';

export const parseReviewTags = (tags?: string) =>
  repairMojibake(tags)
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

export const hasReviewImage = (review: Pick<MyPageReview, 'imageUrls'>) =>
  review.imageUrls.some((imageUrl) => Boolean(imageUrl?.trim()));

const themeImageCache = new Map<number, Promise<string | null>>();

const getCachedThemeImage = (themeId: number) => {
  const cached = themeImageCache.get(themeId);
  if (cached) return cached;

  const request = getThemeById(themeId)
    .then((theme) => theme.imageUrl || null)
    .catch(() => null);

  themeImageCache.set(themeId, request);
  return request;
};

export async function enrichMyPageReviewsWithThemeImages(
  reviews: MyPageReview[],
): Promise<MyPageReview[]> {
  const themeIds = Array.from(
    new Set(
      reviews
        .filter((review) => !hasReviewImage(review) && review.themeId > 0)
        .map((review) => review.themeId),
    ),
  );

  if (themeIds.length === 0) return reviews;

  const imageEntries = await Promise.all(
    themeIds.map(async (themeId) => [themeId, await getCachedThemeImage(themeId)] as const),
  );
  const imageMap = new Map(imageEntries);

  return reviews.map((review) => {
    if (hasReviewImage(review)) return review;

    const themeImageUrl = imageMap.get(review.themeId);
    if (!themeImageUrl) return review;

    return {
      ...review,
      imageUrls: [themeImageUrl],
    };
  });
}
