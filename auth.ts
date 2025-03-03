import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { api } from "@/app/api";
import { authService, ILoginResponse } from "@/app/entities/auth";
import { access } from "fs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        return credentials
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
        token.access_token = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.access_token = token.access_token as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  debug: true,
});