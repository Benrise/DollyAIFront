"use client";

import { Terms } from "@/app/entities/terms";
import { LoginForm } from "@/app/features/auth/login";
import { ContentSection } from "@/app/shared/ui/content-section";

export default function LoginPage() {
  return (
    <ContentSection className="sm:max-w-lg sm:rounded-4xl sm:min-w-lg justify-between gap-8">
      <LoginForm/>
      <Terms />
    </ContentSection>
  );
}
