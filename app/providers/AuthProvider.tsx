"use client";

import { useAuthStore } from "@/app/entities/auth";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const LOGIN_URL = "/app/auth/login";
  const REGISTER_URL = "/app/auth/register";
  const RECOVER_URL = "/app/auth/recover";
  
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
          await signOut();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const id = Number(searchParams.get("id"));
    const email = searchParams.get("email");
    const access = searchParams.get("access");
    const access_type = searchParams.get("access_type");

    if (session && (pathname === LOGIN_URL || pathname === REGISTER_URL)) {
      router.replace("/app");
      return;
    }

    if (!session && id && email && access && access_type) {
      setSession({ id, email, access, access_type });
      router.replace(pathname);
      return;
    }

    if (!session && ![LOGIN_URL, REGISTER_URL, RECOVER_URL, '/'].includes(pathname)) {
      router.push(`${LOGIN_URL}?redirect_to=${pathname}`);
    }
  }, [session]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
};