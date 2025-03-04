"use client";

import { LoginForm } from "@/app/features/auth/login";
import { AuthWrapper } from "@/app/widgets/auth/wrapper";
import { HighlightedText } from "@/app/shared/ui/highlighted-text";


export default function LoginPage() {
  return (
    <AuthWrapper title={<div><HighlightedText>AI Love Photo</HighlightedText> - your personal photoclone</div>}>
      <LoginForm/>
    </AuthWrapper>
  );
}
