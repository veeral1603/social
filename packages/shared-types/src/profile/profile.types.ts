import { updateProfileSchema, updateUsernameSchema } from "./profile.schema";
import z from "zod";

export type Profile = {
  firstName: string;
  lastName?: string | null;
  username: string;
  bio?: string | null;
  avatar?: {
    url: string;
    fileId: string;
  } | null;
};

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
export type UpdateUsernameFormData = z.infer<typeof updateUsernameSchema>;
