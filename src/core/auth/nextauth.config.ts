import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authService } from "@/modules/auth/services/auth.service";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Chamada ao seu novo Service
        const user = await authService.validateUser({
          email: credentials.email,
          password: credentials.password,
        });

        return user ? user : null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "ADMIN" | "USER";
      }
      session.userId = token.sub as string;
      return session;
    },
  },
};
