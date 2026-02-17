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

async function getPostById(
  postId: string,
  userId: string | null | undefined,
): Promise<Post | null> {
  const p = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
      _count: {
        select: {
          likes: true,
        },
      },
      ...(userId && { likes: { where: { userId: userId } } }),
    },
  });
  if (!p) throw new ApiError("Post not found", 404);

  const post: Post = {
    id: p.id,
    content: p.content,
    authorId: p.authorId,
    author: p.author ?? undefined,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    likedByMe: p.likes ? p.likes.length > 0 : false,
    counts: {
      likes: p._count.likes,
    },
  };

  return post;
}

async function deletePost(postId: string): Promise<void> {
  await prisma.post.delete({ where: { id: postId } });
}

async function getPostsByUsername(
  username: string,
  userId: string | null | undefined,
): Promise<Post[]> {
  const normalizedUsername = username.trim().toLowerCase();
  const profile = await prisma.profile.findUnique({
    where: { username: normalizedUsername },
    include: {
      posts: {
        include: {
          author: true,
          _count: { select: { likes: true } },
          ...(userId && { likes: { where: { userId: userId } } }),
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });
  if (!profile) throw new ApiError("Profile not found", 404);
  const posts: Post[] = profile.posts.map((p) => {
    const post: Post = {
      id: p.id,
      content: p.content,
      authorId: p.authorId,
      author: p.author ?? undefined,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      likedByMe: p.likes ? p.likes.length > 0 : false,
      counts: {
        likes: p._count.likes,
      },
    };
    return post;
  });
  return posts;
}

async function getCurrentUserPosts(
  profileId: string,
  userId: string,
): Promise<Post[]> {
  const p = await prisma.post.findMany({
    where: { authorId: profileId },
    include: {
      author: true,
      _count: { select: { likes: true } },
      likes: { where: { userId: userId } },
    },
    orderBy: { createdAt: "desc" },
  });

  const posts: Post[] = p.map((p) => {
    const post: Post = {
      id: p.id,
      content: p.content,
      authorId: p.authorId,
      author: p.author ?? undefined,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      likedByMe: p.likes ? p.likes.length > 0 : false,
      counts: {
        likes: p._count.likes,
      },
    };
    return post;
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
