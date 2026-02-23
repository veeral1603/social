import { Post } from "../post/post.types";
import { UserWithProfile } from "../user/user.types";

export type Save = {
  id: string;
  userId: string;
  user?: UserWithProfile;
  postId: string;
  post?: Post;
  createdAt: Date;
};
