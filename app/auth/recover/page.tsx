"use client";

import { RecoverForm } from '@/app/features/auth/recover';
import { ContentSection } from '@/app/shared/ui/content-section';

export default function RecoverPage() {
  return (
   <ContentSection className='sm:max-w-lg sm:rounded-4xl'>
      <RecoverForm/>
   </ContentSection>
  );
}
