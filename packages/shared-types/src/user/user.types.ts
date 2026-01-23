import { Profile } from "../profile/profile.types";

export type PublicUser = {
  id: string;
  firstName: string;
  lastName?: string | null;
  username: string;
  email: string;
};

export type UserWithProfile = {
  id: string;
  email: string;
  isVerified: boolean;
  profile?: Profile | null;
};
