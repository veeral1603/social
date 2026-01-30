import { Profile } from "../profile/profile.types";
import { editPostSchema, postSchema } from "./post.schema";
import { z } from "zod";

export type PostFormData = z.infer<typeof postSchema>;

export type Post = {
  id: string;
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  Author?: Profile;
};

export type EditPostData = z.infer<typeof editPostSchema>;
