"use client";

import { Terms } from '@/app/entities/terms';
import { RegisterForm } from '@/app/features/auth/register';
import { ContentSection } from '@/app/shared/ui/content-section';

export default function RegisterPage() {
  return (
    <ContentSection className='sm:max-w-lg sm:rounded-4xl sm:min-w-lg justify-between gap-8'>
        <RegisterForm/>
        <Terms />
    </ContentSection>
  );
}
