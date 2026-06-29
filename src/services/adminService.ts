import axiosInstance from '@/lib/axios';
import { AdminReviewReportItem } from '@/types/admin';

interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
}

// // 후기 목록 조회
// export const getAdminReviews = async (params?: AdminReviewFilter) => {
//     const { data } = await axiosInstance.get('/api/admin/reviews', { params });
//     return data;
// };
//
// // 후기 상세 조회
// export const getAdminReview = async (reviewId: number) => {
//     const { data } = await axiosInstance.get(`/api/admin/reviews/${reviewId}`);
//     return data;
// };

// 후기 통계 조회
export const getAdminReviewStats = async () => {
    const { data } = await axiosInstance.get('/api/admin/reviews/stats');
    return data;
};

// 후기 엑셀 다운로드
export const exportAdminReviews = async (params?: Record<string, unknown>) => {
    const response = await axiosInstance.get('/api/admin/reviews/export', {
        params,
        responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'admin-reviews.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
};

// 신고 목록 조회
export const getAdminReviewReports = async (page = 0, limit = 16): Promise<PaginatedResponse<AdminReviewReportItem>> => {
    const { data } = await axiosInstance.get('/api/admin/review-reports', { params: { page, limit } });
    return data;
};

// 신고 승인
export const approveReviewReport = async (reportId: number, adminReason: string): Promise<void> => {
    await axiosInstance.patch(`/api/admin/review-reports/${reportId}/approve`, { adminReason });
};

// 신고 거부
export const rejectReviewReport = async (reportId: number, adminReason: string): Promise<void> => {
    await axiosInstance.patch(`/api/admin/review-reports/${reportId}/reject`, { adminReason });
};
