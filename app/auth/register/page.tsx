"use client";

import { RegisterForm } from '@/app/features/auth/register';
import { ContentSection } from '@/app/shared/ui/content-section';

export default function RegisterPage() {
  return (
   <ContentSection className='max-w-fit!'>
      <RegisterForm/>
   </ContentSection>
  );
}
