import { Profile } from "../profile/profile.types";

export type TempUser = {
  id: string;
  name?: string | null;
  username: string;
  email: string;
};
export type PublicUser = {
  id: string;
  email: string;
  isVerified: boolean;
};

export type UserWithProfile = {
  id: string;
  email: string;
  isVerified: boolean;
  profile?: Profile | null;
};
