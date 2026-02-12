import { updateProfileSchema, updateUsernameSchema } from "./profile.schema";
import z from "zod";

type ImageType = {
  url: string;
  fileId: string;
};

export type Profile = {
  id?: string;
  name?: string | null;
  username: string;
  bio?: string | null;
  avatar?: ImageType | null;
  banner?: ImageType | null;

  followersCount: number;
  followingCount: number;
  isFollowing?: boolean;
  isFollower?: boolean;
};

export type UpdatedProfileResponse = {
  name?: string | null;
  bio?: string | null;
  avatar?: ImageType | null;
  banner?: ImageType | null;
};

export type UpdatedUsernameResponse = {
  username: string;
};

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
export type UpdateUsernameFormData = z.infer<typeof updateUsernameSchema>;
