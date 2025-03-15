"use client";

import { RecoverForm } from '@/app/features/auth/recover';
import { AuthWrapper } from '@/app/widgets/auth/wrapper';

export default function RecoverPage() {
  return (
   <AuthWrapper>
      <RecoverForm/>
   </AuthWrapper>
  );
}
