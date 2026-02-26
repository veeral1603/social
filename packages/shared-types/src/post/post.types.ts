import { Profile } from "../profile/profile.types";
import { editPostSchema, postSchema } from "./post.schema";
import { z } from "zod";

export type PostFormData = z.infer<typeof postSchema>;

type ImageType = {
  url: string;
  fileId: string;
};

export type Post = {
  id: string;
  authorId: string;
  content?: string | undefined | null;
  images?: ImageType[];
  createdAt: Date;
  updatedAt: Date;
  author?: Profile;

  counts?: {
    likes: number;
    replies: number;
    saves: number;
    reposts: number;
  };

  likedByMe?: boolean;
  savedByMe?: boolean;
  repostedByMe?: boolean;

  parentId?: string | null;
  parent?: Post;
};

export type EditPostData = z.infer<typeof editPostSchema>;
