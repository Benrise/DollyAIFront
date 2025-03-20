"use client";

import { useAuthStore } from "@/app/entities/auth";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { session, setSession, refresh } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (session && !session.access) {
        await refresh();
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [session, refresh]);

  useEffect(() => {
    if (isLoading) return;

    const id = Number(searchParams.get("id"));
    const email = searchParams.get("email");
    const access = searchParams.get("access");
    const access_type = searchParams.get("access_type");

    if (session && pathname === "/auth/login") {
      router.replace("/");
      return;
    }

    if (session && pathname === "/auth/register") {
      router.replace("/");
      return;
    }

    if (!session && id && email && access && access_type) {
      setSession({ id, email, access, access_type });
      router.replace(pathname);
    }
    else if (session) {
      router.replace(pathname);
      return
    }


    if (!session && pathname !== "/auth/login" && pathname !== "/auth/register" && pathname !== "/auth/recover") {
      router.push(`/auth/login?redirect_to=${pathname}`);
    }
  }, [isLoading, pathname, router, searchParams, setSession, session]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
};
