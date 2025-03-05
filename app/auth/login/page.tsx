"use client";

import { LoginForm } from "@/app/features/auth/login";
import { AuthWrapper } from "@/app/widgets/auth/wrapper";


export default function LoginPage() {
  return (
    <AuthWrapper>
      <LoginForm/>
    </AuthWrapper>
  );
}
