import { FetchClient } from "@/app/shared/lib";
import { signOut, getSession } from "next-auth/react";
import { toast } from "sonner";

export const api = new FetchClient({
    baseUrl: process.env.NEXT_PUBLIC_API_URL as string,
    options: {
        credentials: 'include'
    }
})

api.interceptors.request.use(
    async (config) => {

    const session = await getSession();

    if (session && session.user) {
        const accessToken = session.user.access;

        if (accessToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`,
            };
        }
    }
        
      return config;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

api.interceptors.response.use(
    async (response) => response,
    async (error) => {
        const statusCode = error.statusCode;

        if (statusCode === 401 || statusCode === 403) {
            signOut({ callbackUrl: "/auth/login" });
        }

        if (statusCode && statusCode >= 500) {
            toast.error('Server error');
        }
      
      return Promise.reject(error);
    }
  );

