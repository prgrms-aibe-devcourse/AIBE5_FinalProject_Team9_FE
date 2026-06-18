export interface Review {
  id: number;
  themeId: number;
  themeTitle: string;
  userId: number;
  userNickname: string;
  userProfileImageUrl?: string;
  rating: number;
  difficulty: number;   // 1~5
  horrorLevel: number;  // 1~5
  content: string;
  tags: string[];
  imageUrls?: string[];
  hasSpoiler: boolean;
  isHidden?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateReviewRequest {
  themeId: number;
  reservationId: number;
  rating: number;
  difficulty: number;
  horrorLevel: number;
  content: string;
  tags: string[];
  hasSpoiler: boolean;
  imageUrls?: string[];
}

export interface UpdateReviewRequest {
  rating?: number;
  difficulty?: number;
  horrorLevel?: number;
  content?: string;
  tags?: string[];
  hasSpoiler?: boolean;
}

export interface ReviewFilter {
  themeId?: number;
  userId?: number;
  page?: number;
  size?: number;
}

export interface ReviewReportItem {
    reportId: number;
    reviewId: number;
    reviewContent: string;
    reporterNickname: string;
    reason: string;
    detail: string;
    status: string;
    createdAt: string;
    rating: number;    // 추가
    spoiler: boolean;
    themeTitle: string;
    ownerReason?: string;
}
