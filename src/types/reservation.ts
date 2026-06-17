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
  timeSlotId: number;
  holdToken: string;
  peopleCount: number;
  termsAgreed: boolean;
}

export interface ReservationCreateResponse {
  reservationId: number;
  timeSlotId: number;
  memberId: number;
  status: string;
  peopleCount: number;
  totalPrice: number;
}

export interface ReservationFilter {
  status?: ReservationStatus | 'ALL';
  page?: number;
  size?: number;
}
