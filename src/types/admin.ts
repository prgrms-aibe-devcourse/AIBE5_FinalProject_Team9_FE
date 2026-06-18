export interface AdminReviewReportItem {
    id: number;
    reviewId: number;
    reviewContent: string;
    reporterId: number;
    reporterNickname: string;
    ownerReason: string;
    status: string;
    createdAt: string;
    themeTitle: string;
    rating: number;
    adminReason?: string;
}
