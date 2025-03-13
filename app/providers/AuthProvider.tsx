"use client";

import { useAuthStore } from "@/app/entities/auth";
import { useRouter, usePathname, useSearchParams  } from "next/navigation";
import { useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, refresh } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (user && !user.access) {
        await refresh();
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [user, refresh]);

  useEffect(() => {
    const redirectTo = searchParams.get("redirect_to");

    if (!isLoading && !user && pathname !== "/auth/login" && pathname !== "/auth/register") {
      router.push(`/auth/login?redirect_to=${pathname}`);
    } else if (user && redirectTo) {
      router.replace(redirectTo);
    }
  }, [user, isLoading, pathname, router, searchParams]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
};