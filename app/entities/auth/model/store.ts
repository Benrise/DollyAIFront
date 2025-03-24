import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authService } from "@/app/entities/auth";
import { ILoginResponse, IRefreshResponse, IRegisterResponse } from "./types";
import { stat } from "fs";

interface IAuthData {
  id: number,
  email: string,
  access: string,
  access_type: string
}

interface AuthState {
  session: IAuthData | null;
  signIn: (email: string, password: string) => Promise<ILoginResponse>;
  signUp: (email: string, password: string, password_confirm: string) => Promise<IRegisterResponse>;
  signOut: () => Promise<void>;
  sendCode: (email: string) => Promise<null>;
  verifyCode: (code: string) => Promise<null>;
  changePassword: (password: string, password_confirm: string) => Promise<null>;
  refresh: () => Promise<IRefreshResponse>;
  setSession: (session: IAuthData) => void;
  getAccessToken: () => string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      signIn: async (email, password) => {
        const response = await authService.login({ email, password });
        set({ session: response });
        return response
      },
      signUp: async (email, password, password_confirm) => {
        const response = await authService.register({ email, password, password_confirm });
        set({ session: response });
        return response
      },
      sendCode: async (email: string) => {
        const response = await authService.sendCode(email);
        return response
      },
      verifyCode: async (code: string) => {
        const response = await authService.verifyCode(code);
        return response
      },
      changePassword: async (password: string, password_confirm: string) => {
        const response = await authService.changePassword(password, password_confirm);
        return response
      },
      signOut: async () => {
        try {
          if (get().session) {
            await authService.logout();
          }
        } catch (error) {
          throw error;
        } finally {
          set({ session: null });
        }
      },
      refresh: async () => {
        try {
          const response = await authService.refresh();
          set((state) => ({
            session: state.session ? { ...state.session, access: response.access } : null,
          }));
          return response
        } catch (error) {
          set({ session: null });
          throw error;
        }
      },
      setSession(session) {
        set({ session });
      },
      getAccessToken: () => {
        const session = get().session;
        return session ? session.access : "";
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ session: state.session }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);
