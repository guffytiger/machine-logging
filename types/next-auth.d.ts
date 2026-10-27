import type { DefaultSession } from "next-auth";

type UserRole = "Admin" | "Staff" | "OPR";

declare module "next-auth" {
  interface Session {
    user: NonNullable<DefaultSession["user"]> & { role: UserRole };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
  }
}
