const TOSS_SDK_URL = 'https://js.tosspayments.com/v2/standard';

export interface TossPaymentWindow {
  requestPayment: (params: {
    method: 'CARD';
    amount: {
      currency: 'KRW';
      value: number;
    };
    orderId: string;
    orderName: string;
    successUrl: string;
    failUrl: string;
    customerEmail?: string;
    customerName?: string;
    customerMobilePhone?: string;
  }) => Promise<void> | void;
}

export interface TossPaymentsSdk {
  payment: (params: { customerKey: string }) => TossPaymentWindow;
}

declare global {
  interface Window {
    TossPayments?: (clientKey: string) => TossPaymentsSdk;
  }
}

let scriptPromise: Promise<void> | null = null;

const loadTossScript = () => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Toss Payments SDK는 브라우저에서만 사용할 수 있습니다.'));
  }

  if (window.TossPayments) {
    return Promise.resolve();
  }

  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${TOSS_SDK_URL}"]`,
    );

    const handleLoad = () => {
      if (!window.TossPayments) {
        reject(new Error('Toss Payments SDK 초기화 함수가 없습니다.'));
        return;
      }

      resolve();
    };

    if (existingScript) {
      existingScript.addEventListener('load', handleLoad, { once: true });
      existingScript.addEventListener(
        'error',
        () => reject(new Error('Toss Payments SDK 로드에 실패했습니다.')),
        { once: true },
      );
      return;
    }

    const script = document.createElement('script');
    script.src = TOSS_SDK_URL;
    script.async = true;
    script.onload = handleLoad;
    script.onerror = () => reject(new Error('Toss Payments SDK 로드에 실패했습니다.'));
    document.head.appendChild(script);
  });

  return scriptPromise;
};

export const loadTossPaymentWindow = async (
  clientKey: string,
  customerKey: string,
): Promise<TossPaymentWindow> => {
  await loadTossScript();

  if (!window.TossPayments) {
    throw new Error('Toss Payments SDK 초기화 함수가 없습니다.');
  }

  return window.TossPayments(clientKey).payment({ customerKey });
};
