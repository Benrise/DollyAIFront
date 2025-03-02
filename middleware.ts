import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { Session } from "next-auth";

interface AuthenticatedRequest extends NextRequest {
  auth: Session | null;
}

export default auth((req: AuthenticatedRequest) => {
  const session = req.auth;
  const pathname = req.nextUrl.pathname;

  const protectedRoutes = ["/"];
  const publicRoutes = ["/auth/login", "/auth/register"];

  if (session) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  if (protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  } 

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};