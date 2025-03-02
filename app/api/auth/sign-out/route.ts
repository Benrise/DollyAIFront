import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-out`, {
    method: "POST",
    credentials: "include",
  });

  const response = NextResponse.json({ message: "Выход выполнен" });

  // Удаляем токен
  response.cookies.delete("access_token");

  return response;
}
