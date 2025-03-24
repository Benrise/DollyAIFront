import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { IRefreshResponse, useAuthStore } from "@/app/entities/auth";

export class FetchError extends Error {
  public constructor(
      public statusCode: number,
      public message: string,
      public config: RequestInit,
      public detail?: string
  ){
      super(message);
      

      Object.setPrototypeOf(this, new.target.prototype)
  }
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS) || 300_000,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const authState = useAuthStore.getState();
  const accessToken = authState.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const authStore = useAuthStore.getState();
    const originalRequest = error.config as InternalAxiosRequestConfig & { _isRetry?: boolean };

    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post<IRefreshResponse>(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {}, { withCredentials: true });
        authStore.setAccessToken(response.data.access);
        return api.request(originalRequest);
      } catch (refreshError) {
        console.error("Ошибка обновления токена:", refreshError);
        await authStore.signOut(true);
      }
    }

    if (error.response?.status && error.response?.status >= 500) {
        console.error("Внутренняя ошибка сервера:", error);
    }

   if (error.response?.data) {
      return Promise.reject(error.response.data);
   }

    return Promise.reject(error);
  }
);