import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Не удалось обновить токен" }, { status: res.status });
  }

  const data = await res.json();
  const response = NextResponse.json(data);

  response.cookies.set("access_token", data.access, { httpOnly: true });

  return response;
}
