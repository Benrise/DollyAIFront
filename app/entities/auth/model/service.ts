import { api } from "@/app/api";
import { ILoginResponse, IRefreshResponse, IRegisterResponse, TypeLoginSchema, TypeRegisterSchema } from "./types";


class AuthService {
    public async register(body: TypeRegisterSchema) {
        const response = await api.post<IRegisterResponse>('/auth/sign-up', body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        return response.data
    }

    public async login(body: TypeLoginSchema) {
        const response = await api.post<ILoginResponse>('/auth/sign-in', body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        return response.data
    }

    public async logout() {
        const response = await api.delete<null>('/auth/sign-out')
        return response.data
    }

    public async refresh() {
        const response = await api.post<IRefreshResponse>('/auth/refresh')
        return response.data
    }

    public async sendCode(email: string) {
        const response = await api.post<null>('/auth/forgot-pass', { email })
        return response.data
    }

    public async verifyCode(code: string) {
        const response = await api.post<null>('/auth/verify-code', { code })
        return response.data
    }

    public async changePassword(password: string, password_confirm: string) {
        const response = await api.post<null>('/auth/new-pass', { password, password_confirm })
        return response.data
    }
}

export const authService = new AuthService()