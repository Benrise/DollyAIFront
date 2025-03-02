import { LoginForm } from "@/app/features/auth/login";
import { AuthWrapper } from "@/app/widgets/auth/wrapper";
import { HighlightedText } from "@/app/shared/highlighted-text";

export default async function LoginPage() {
  return (
    <AuthWrapper title={<div><HighlightedText>AI Love Photo</HighlightedText> - your personal photoclone</div>} description={"Forget about studios and photographers - create perfect shots with AI in minutes"}>
      <LoginForm/>
    </AuthWrapper>
  );
}
