import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

type GoogleProfileClaims = {
  email_verified?: boolean;
  picture?: string;
  sub?: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/auth" },
  callbacks: {
    async signIn({ user, profile }) {
      const googleProfile = profile as GoogleProfileClaims | undefined;
      const googleId = googleProfile?.sub ?? user.id;

      if (!googleId) return false;

      const now = new Date();
      const emailVerified = googleProfile?.email_verified ? now : null;
      const userData = {
        googleId,
        email: user.email ?? null,
        name: user.name ?? null,
        image: user.image ?? (typeof googleProfile?.picture === "string" ? googleProfile.picture : null),
        emailVerified,
        updatedAt: now,
        lastSignInAt: now,
      };

      await db.insert(users).values(userData).onConflictDoUpdate({
        target: users.googleId,
        set: {
          email: userData.email,
          name: userData.name,
          image: userData.image,
          emailVerified: userData.emailVerified,
          updatedAt: now,
          lastSignInAt: now,
        },
      });

      return true;
    },
    async jwt({ token, user, profile }) {
      const googleProfile = profile as GoogleProfileClaims | undefined;
      if (user) {
        token.name = user.name ?? token.name;
        token.email = user.email ?? token.email;
        token.picture = user.image ?? token.picture;

        const googleId = googleProfile?.sub ?? user.id;
        const [databaseUser] = await db
          .select({ role: users.role })
          .from(users)
          .where(eq(users.googleId, googleId))
          .limit(1);

        token.role = databaseUser?.role ?? "OPR";
      }

      if (googleProfile && typeof googleProfile.picture === "string") {
        token.picture = googleProfile.picture;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name ?? null;
        session.user.email = token.email ?? null;
        session.user.image = token.picture ?? null;
        session.user.role = token.role ?? "OPR";
      }

      return session;
    },
  },
};
