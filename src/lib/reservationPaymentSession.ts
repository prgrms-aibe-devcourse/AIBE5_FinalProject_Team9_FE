import {
  PaymentConfirmResponse,
  PaymentReadyResponse,
} from '@/services/paymentService';

const PENDING_KEY = 'grimgate-pending-payment';
const COMPLETE_KEY = 'grimgate-complete-payment';

export interface ReservationPaymentDisplay {
  themeId: number;
  themeTitle: string;
  themeImageUrl?: string;
  locationName?: string;
  branchName?: string;
  timeSlotId: number;
  date: string;
  time: string;
  peopleCount: number;
}

export interface PendingPaymentSession extends ReservationPaymentDisplay {
  reservationId: number;
  paymentId: number;
  orderId: string;
  amount: number;
  status: string;
  orderName: string;
  customerName?: string;
  customerEmail?: string;
  createdAt: string;
}

export interface CompletePaymentSession extends ReservationPaymentDisplay {
  reservationId: number;
  paymentId: number;
  orderId: string;
  amount: number;
  status: string;
  paymentMethod?: string;
  paidAt?: string;
  createdAt: string;
}

const readJson = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;

  const raw = window.sessionStorage.getItem(key);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as T;
  } catch {
    window.sessionStorage.removeItem(key);
    return null;
  }
};

const writeJson = <T>(key: string, value: T) => {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(key, JSON.stringify(value));
};

export const savePendingPaymentSession = (
  ready: PaymentReadyResponse,
  display: ReservationPaymentDisplay,
) => {
  writeJson<PendingPaymentSession>(PENDING_KEY, {
    ...display,
    reservationId: ready.reservationId,
    paymentId: ready.paymentId,
    orderId: ready.orderId,
    amount: ready.amount,
    status: ready.status,
    orderName: ready.orderName,
    customerName: ready.customerName,
    customerEmail: ready.customerEmail,
    createdAt: new Date().toISOString(),
  });
};

export const getPendingPaymentSession = () =>
  readJson<PendingPaymentSession>(PENDING_KEY);

export const clearPendingPaymentSession = () => {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(PENDING_KEY);
};

export const saveCompletePaymentSession = (
  confirm: PaymentConfirmResponse,
  pending: PendingPaymentSession,
) => {
  writeJson<CompletePaymentSession>(COMPLETE_KEY, {
    themeId: pending.themeId,
    themeTitle: pending.themeTitle,
    themeImageUrl: pending.themeImageUrl,
    locationName: pending.locationName,
    branchName: pending.branchName,
    timeSlotId: pending.timeSlotId,
    date: pending.date,
    time: pending.time,
    peopleCount: pending.peopleCount,
    reservationId: confirm.reservationId,
    paymentId: confirm.paymentId,
    orderId: confirm.orderId,
    amount: confirm.amount,
    status: confirm.status,
    paymentMethod: confirm.paymentMethod,
    paidAt: confirm.paidAt,
    createdAt: new Date().toISOString(),
  });
};

export const getCompletePaymentSession = () =>
  readJson<CompletePaymentSession>(COMPLETE_KEY);
