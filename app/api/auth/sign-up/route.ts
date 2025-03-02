import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Ошибка регистрации" }, { status: res.status });
  }

  const data = await res.json();
  const response = NextResponse.json(data);

  response.cookies.set("access_token", data.access, { httpOnly: true });

  return response;
}
