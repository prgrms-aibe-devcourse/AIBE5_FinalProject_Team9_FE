import axiosInstance from '@/lib/axios';

interface PaymentRequest {
  reservationId: number;
  amount: number;
  method: string;
}

interface PaymentResponse {
  paymentId: string;
  status: string;
  amount: number;
  paidAt: string;
}

// TODO: POST /api/payments
export const processPayment = async (payload: PaymentRequest): Promise<PaymentResponse> => {
  const { data } = await axiosInstance.post('/payments', payload);
  return data;
};

// TODO: DELETE /api/payments/:paymentId
export const refundPayment = async (paymentId: string): Promise<void> => {
  await axiosInstance.delete(`/payments/${paymentId}`);
};
