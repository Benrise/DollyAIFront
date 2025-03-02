export interface AuthResponse {
    id: string;
    email: string;
    access: string;
  }

export async function signUp(email: string, password: string) {
    const res = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    if (!res.ok) throw new Error("Ошибка регистрации");
    return res.json();
  }

export async function signIn(email: string, password: string) {
    const res = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    if (!res.ok) throw new Error("Ошибка входа");
    return res.json();
}
  
export async function signOut() {
    await fetch("/api/auth/sign-out", { method: "POST" });
}
  
export async function refreshTokens() {
    const res = await fetch("/api/auth/refresh", { method: "POST" });
    if (!res.ok) throw new Error("Не удалось обновить токен");
    return res.json();
}
  