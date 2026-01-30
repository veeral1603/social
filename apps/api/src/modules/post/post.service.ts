import type { Post } from "@repo/shared-types";
import prisma from "../../lib/prisma";
import ApiError from "../../utils/apiError";

async function createPost(
  userId: string,
  content: string,
): Promise<Post | null> {
  const profile = await prisma.profile.findUnique({
    where: { userId: userId },
  });
  if (!profile) throw new ApiError("Profile not found", 404);

  const post = await prisma.post.create({
    data: {
      authorId: profile.id,
      content: content,
    },
  });

  return post;
}

async function getPostById(postId: string): Promise<Post | null> {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });
  if (!post) throw new ApiError("Post not found", 404);
  return post;
}

async function deletePost(postId: string): Promise<void> {
  await prisma.post.delete({ where: { id: postId } });
}

async function editPost(
  userId: string,
  postId: string,
  content: string,
): Promise<Post | null> {
  const post = await prisma.post.update({
    where: { id: postId, authorId: userId },
    data: { content },
  });
  if (post.authorId !== userId) {
    throw new ApiError("Unauthorized to edit this post", 403);
  }
  return post;
}

export default {
  createPost,
  getPostById,
  deletePost,
  editPost,
};
