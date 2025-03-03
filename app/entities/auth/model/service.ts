import { api } from "@/app/api";
import { ILoginResponse, IRegisterResponse, TypeLoginSchema, TypeRegisterSchema } from "./types";

class AuthService {
    public async register(body: TypeRegisterSchema) {
        const response = await api.post<IRegisterResponse>('/auth/sign-up', body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        return response
    }

    public async login(body: TypeLoginSchema) {
        const response = await api.post<ILoginResponse>('/auth/sign-in', body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        return response
    }

    public async logout() {
        const response = await api.post('/auth/sign-out')

        return response;
    }
}

export const authService = new AuthService()