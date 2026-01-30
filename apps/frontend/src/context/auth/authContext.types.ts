import type { Profile, PublicUser, UserWithProfile } from "@repo/shared-types";

export type AuthStatus = "authenticated" | "unauthenticated" | "loading";
export type AuthState = {
  status: AuthStatus;
  user: PublicUser | UserWithProfile | null;
  profile: Profile | null;
};
