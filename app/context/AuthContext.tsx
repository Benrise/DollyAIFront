"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { signIn, signOut, signUp, refreshTokens, AuthResponse } from "@/app/api/auth";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: AuthResponse | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const router = useRouter();

  const handleRefresh = async () => {
    try {
      const data = await refreshTokens();
      setUser(data);
    } catch {
      setUser(null);
      router.push("/login");
    }
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await signIn(email, password);
    setUser(data);
    router.push("/");
  };

  const register = async (email: string, password: string) => {
    const data = await signUp(email, password);
    setUser(data);
    router.push("/");
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
