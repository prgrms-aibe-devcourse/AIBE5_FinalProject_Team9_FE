import axiosInstance from '@/lib/axios';

type ApiResponse<T> = T | { data?: T };

const unwrap = <T>(body: ApiResponse<T>): T => {
  if (body && typeof body === 'object' && 'data' in body && body.data) {
    return body.data;
  }

  return body as T;
};

export interface PaymentReadyRequest {
  reservationId: number;
  amount: number;
}

export interface PaymentReadyResponse {
  paymentId: number;
  reservationId: number;
  orderId: string;
  amount: number;
  status: 'PAY_PENDING' | 'PAY_SUCCESS' | 'PAY_FAILED' | 'PAY_REFUND_PENDING' | 'PAY_REFUNDED';
  orderName: string;
  customerName: string;
  customerEmail: string;
}

export interface PaymentConfirmRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export interface PaymentConfirmResponse {
  paymentId: number;
  reservationId: number;
  orderId: string;
  amount: number;
  status: 'PAY_PENDING' | 'PAY_SUCCESS' | 'PAY_FAILED' | 'PAY_REFUND_PENDING' | 'PAY_REFUNDED';
  paymentKey: string;
  paymentMethod: string;
  paidAt: string;
}

export interface PaymentRefundRequest {
  cancelReason: string;
}

export interface PaymentRefundResponse {
  paymentId: number;
  reservationId: number;
  orderId: string;
  amount: number;
  status: 'PAY_REFUND_PENDING' | 'PAY_REFUNDED' | 'PAY_FAILED';
  refundAmount?: number;
  refundedAt?: string;
  cancelReason?: string;
}

export const readyPayment = async (
  payload: PaymentReadyRequest,
): Promise<PaymentReadyResponse> => {
  const { data } = await axiosInstance.post<ApiResponse<PaymentReadyResponse>>(
    '/api/payments/ready',
    payload,
  );
  return unwrap(data);
};

export const confirmPayment = async (
  payload: PaymentConfirmRequest,
): Promise<PaymentConfirmResponse> => {
  const { data } = await axiosInstance.post<ApiResponse<PaymentConfirmResponse>>(
    '/api/payments/confirm',
    payload,
  );
  return unwrap(data);
};

export const refundPayment = async (
  paymentId: number,
  payload: PaymentRefundRequest,
): Promise<PaymentRefundResponse> => {
  const { data } = await axiosInstance.post<ApiResponse<PaymentRefundResponse>>(
    `/api/payments/${paymentId}/refund`,
    payload,
  );
  return unwrap(data);
};
