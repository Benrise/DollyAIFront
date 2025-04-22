"use client";

import { Terms } from '@/app/entities/terms';
import { RecoverForm } from '@/app/features/auth/recover';
import { ContentSection } from '@/app/shared/ui/content-section';

export default function RecoverPage() {
  return (
   <ContentSection className='sm:max-w-lg sm:rounded-4xl sm:min-w-lg justify-between gap-8'>
      <RecoverForm/>
      <Terms />
   </ContentSection>
  );
}
