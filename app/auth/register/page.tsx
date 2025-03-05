"use client";

import { RegisterForm } from '@/app/features/auth/register';
import { AuthWrapper } from '@/app/widgets/auth/wrapper';

export default function RegisterPage() {
  return (
   <AuthWrapper>
      <RegisterForm/>
   </AuthWrapper>
  );
}
