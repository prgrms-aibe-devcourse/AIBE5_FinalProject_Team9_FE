import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import {
  getRefreshToken,
  getToken,
  setAuthTokens,
} from './token';
import { useAuthStore } from '@/stores/authStore';

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface TokenResponseBody {
  accessToken?: string;
  refreshToken?: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
  };
}

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const AUTH_REQUIRED_PATHS = [
  '/api/auth/me',
  '/api/auth/logout',
  '/api/auth/password',
  '/api/auth/withdraw',
  '/api/mypage',
  '/api/payments',
  '/api/owner',
  '/api/admin',
  '/owner',
];
const PROTECTED_PAGE_PATHS = ['/mypage', '/owner', '/admin'];
let refreshPromise: Promise<{ accessToken: string; refreshToken: string }> | null = null;
let isHandlingUnauthorized = false;

const getRequestPath = (url?: string) => {
  if (!url) return '';
  try {
    return new URL(url, baseURL).pathname;
  } catch {
    return url.split('?')[0];
  }
};

const requiresAuth = (url?: string) => {
  const path = getRequestPath(url);
  return AUTH_REQUIRED_PATHS.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
};

const extractTokens = (body: TokenResponseBody) => {
  const accessToken = body.accessToken ?? body.data?.accessToken;
  const refreshToken = body.refreshToken ?? body.data?.refreshToken;

  return { accessToken, refreshToken };
};

const redirectToLogin = () => {
  if (typeof window === 'undefined') return;
  const isProtectedPage = PROTECTED_PAGE_PATHS.some(
    (prefix) => window.location.pathname === prefix || window.location.pathname.startsWith(`${prefix}/`),
  );
  if (isProtectedPage && window.location.pathname !== '/login') window.location.replace('/login');
};

const handleUnauthorizedOnce = () => {
  if (isHandlingUnauthorized) return;
  isHandlingUnauthorized = true;
  useAuthStore.getState().logout();
  redirectToLogin();
  queueMicrotask(() => {
    isHandlingUnauthorized = false;
  });
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (!token && requiresAuth(config.url)) {
      return Promise.reject(
        new axios.CanceledError('Authentication required: request skipped because no access token exists.'),
      );
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes('/api/auth/refresh')
    ) {
      return Promise.reject(error);
    }

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      handleUnauthorizedOnce();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .post<TokenResponseBody>(
            `${baseURL}/api/auth/refresh`,
            { refreshToken },
            { headers: { 'Content-Type': 'application/json' } },
          )
          .then(({ data }) => {
            const tokens = extractTokens(data);
            if (!tokens.accessToken || !tokens.refreshToken) {
              throw new Error('Token refresh response is missing tokens.');
            }
            return {
              accessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken,
            };
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const tokens = await refreshPromise;
      setAuthTokens(tokens);
      originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      handleUnauthorizedOnce();
      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance;
