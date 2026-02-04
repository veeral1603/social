import type { PublicUser } from "@repo/shared-types";

export type AuthStatus = "authenticated" | "unauthenticated" | "loading";
export type AuthState = {
  status: AuthStatus;
  user: PublicUser | null;
};
