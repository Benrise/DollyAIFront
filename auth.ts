import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import api from "@/app/shared/lib/axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing email or password");
            }

            try {
                const response = await api.post("/auth/sign-in", { email: credentials.email, password: credentials.password }, {
                    headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        }
                    },
                );

                const data = response.data;

                if (!data.id || !data.email || !data.access) {
                    throw new Error("Invalid response from authentication server");
                }

                return {
                    id: data.id.toString(),
                    email: data.email,
                    accessToken: data.access,
                };
            } 
            catch (error: any) {
                if (error.response) {
                    const status = error.response.status;
                    const detail = error.response.data?.detail || "Authentication failed";

                    if (status === 404) {
                    throw new Error("User with such credentials not found");
                    }
                    throw new Error(detail);
                } else if (error.request) {
                    throw new Error("Unable to reach authentication server");
                } else {
                    throw new Error("Authentication request failed");
                }
            }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  debug: true,
});