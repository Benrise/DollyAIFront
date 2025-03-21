"use client";

import { RegisterForm } from '@/app/features/auth/register';
import { ContentSection } from '@/app/shared/ui/content-section';

export default function RegisterPage() {
  return (
   <ContentSection className='md:rounded-4xl'>
      <RegisterForm/>
   </ContentSection>
  );
}
