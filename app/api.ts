import { FetchClient } from "@/app/shared/lib";

export const api = new FetchClient({
    baseUrl: process.env.NEXT_PUBLIC_API_URL as string,
    options: {
        credentials: 'include'
    }
})