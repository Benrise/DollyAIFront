import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authService } from "@/app/entities/auth";
import { ILoginResponse, IRefreshResponse, IRegisterResponse } from "./types";

interface IUser extends ILoginResponse {}

interface AuthState {
  user: IUser | null;
  signIn: (email: string, password: string) => Promise<ILoginResponse>;
  signUp: (email: string, password: string, password_confirm: string) => Promise<IRegisterResponse>;
  signOut: () => Promise<null>;
  refresh: () => Promise<IRefreshResponse>;
  getAccessToken: () => string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
  
      signIn: async (email, password) => {
        const response = await authService.login({ email, password });
        set({ user: response });
        return response
      },

      signUp: async (email, password, password_confirm) => {
        const response = await authService.register({ email, password, password_confirm });
        set({ user: response });
        return response
      },

      signOut: async () => {
        const response = await authService.logout();
        set({ user: null });
        return response
      },

      refresh: async () => {
        const response = await authService.refresh();
          set((state) => ({
            user: state.user ? { ...state.user, access: response.access } : null,
          }));
          return response
      },

      getAccessToken: () => {
        const user = get().user;
        return user ? user.access : "";
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);
