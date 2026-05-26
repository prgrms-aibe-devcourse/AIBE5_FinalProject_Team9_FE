export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface Reservation {
  id: number;
  reservationNumber: string;
  themeId: number;
  themeTitle: string;
  themeImageUrl?: string;
  locationName?: string;
  branchName?: string;
  date: string;
  time: string;
  adultCount: number;
  teenCount?: number;
  totalAmount: number;
  status: ReservationStatus;
  paymentStatus?: 'PAID' | 'UNPAID' | 'REFUNDED';
  clearTime?: string;
  createdAt: string;
  hasReview?: boolean;
  dDay?: number;
}

export interface CreateReservationRequest {
  themeId: number;
  date: string;
  time: string;
  adultCount: number;
  teenCount?: number;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeCancellation: boolean;
  agreeMarketing?: boolean;
}

export interface ReservationFilter {
  status?: ReservationStatus | 'ALL';
  page?: number;
  size?: number;
}
