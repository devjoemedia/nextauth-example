import CredentialsProvider from "next-auth/providers/credentials";

import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        // all fields you want here
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials, req) {
        const user = {
          id: "1",
          name: credentials?.username,
          email: credentials?.email,
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, trigger, session }) {
      if (trigger === "update" && session) {
        token.custom = session.custom
      }
      return token
    },
    async session({ token, session }) {
      console.log({session, token})
      session.custom = token.custom as number;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
