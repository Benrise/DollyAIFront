import { api } from "@/app/api";
import { IUserResponse } from "./types";

class UserService {
    public async me() {
        const response = await api.get<IUserResponse>('/users/me');
        return response.data
    }
}

export const userService = new UserService()