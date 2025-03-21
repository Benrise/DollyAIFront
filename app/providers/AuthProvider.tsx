"use client";

import { useAuthStore } from "@/app/entities/auth";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { session, setSession, refresh, signOut } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (session && !session.access) {
        try {
          await refresh();
        } catch (error) {
          console.error("Ошибка обновления токена:", error);
          signOut();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [session, refresh, signOut]);

  useEffect(() => {
    if (isLoading) return;

    const id = Number(searchParams.get("id"));
    const email = searchParams.get("email");
    const access = searchParams.get("access");
    const access_type = searchParams.get("access_type");

    if (session && (pathname === "/auth/login" || pathname === "/auth/register")) {
      router.replace("/");
      return;
    }

    if (!session && id && email && access && access_type) {
      setSession({ id, email, access, access_type });
      router.replace(pathname);
      return;
    }

    if (!session && !["/auth/login", "/auth/register", "/auth/recover", '/landing'].includes(pathname)) {
      router.push(`/auth/login?redirect_to=${pathname}`);
    }
  }, [isLoading, pathname, router, searchParams, setSession, session]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
};