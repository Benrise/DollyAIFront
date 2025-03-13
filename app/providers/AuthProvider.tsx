"use client";

import { useAuthStore } from "@/app/entities/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, refresh } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
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
    if (!isLoading && !user && pathname !== "/auth/login" && pathname !== "/auth/register") {
      router.push("/auth/login");
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
};