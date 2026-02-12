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
    include: { author: true },
  });
  if (!post) throw new ApiError("Post not found", 404);
  return post;
}

async function deletePost(postId: string): Promise<void> {
  await prisma.post.delete({ where: { id: postId } });
}

async function getPostsByUsername(username: string): Promise<Post[]> {
  const normalizedUsername = username.trim().toLowerCase();
  const profile = await prisma.profile.findUnique({
    where: { username: normalizedUsername },
    include: {
      posts: { include: { author: true }, orderBy: { createdAt: "desc" } },
    },
  });
  if (!profile) throw new ApiError("Profile not found", 404);
  return profile.posts;
}

async function getCurrentUserPosts(profileId: string): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    where: { authorId: profileId },
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });
  return posts;
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
  getCurrentUserPosts,
  getPostsByUsername,
  deletePost,
  editPost,
};
