import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

import authConfig from "./auth.config";

import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's information. */
      id: string;
      subscribed: boolean;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      const existingUser = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
      });

      if (!existingUser) {
        throw new Error("User not found");
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub!;
      session.user.subscribed = true;
      return session;
    },
  },
  ...authConfig,
});
