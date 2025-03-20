import { create } from "zustand";
import { IUserResponse } from "./types";
import { userService } from "./service";


interface UserState {
    user: IUserResponse | null
    me: () => Promise<void>
}


export const useUserStore = create<UserState>()(
    (set) => ({
        user: null,
        me: async () => {
            const response = await userService.me();
            set({ user: response });
        },
    })
)