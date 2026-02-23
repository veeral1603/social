import type { Post } from "@repo/shared-types";
import prisma from "../../lib/prisma";
import ApiError from "../../utils/apiError";
import { ObjectId } from "bson";

async function createPost(
  profileId: string,
  content: string,
): Promise<Post | null> {
  const post = await prisma.post.create({
    data: {
      authorId: profileId,
      content: content,
      parentId: null,
    },
  });

  return post;
}

async function getPostById(
  postId: string,
  userId: string | null | undefined,
): Promise<Post | null> {
  if (!ObjectId.isValid(postId)) {
    throw new ApiError("Post not found", 404);
  }
  const p = await prisma.post.findFirst({
    where: { id: postId },
    include: {
      author: true,
      _count: {
        select: {
          likes: true,
          replies: true,
          saves: true,
        },
      },
      ...(userId && {
        likes: { where: { userId: userId } },
        saves: { where: { userId: userId } },
      }),
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
      replies: p._count.replies,
      saves: p._count.saves,
    },
    savedByMe: p.saves ? p.saves.length > 0 : false,
    parentId: p.parentId ?? null,
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
        where: { parentId: null },
        include: {
          author: true,
          _count: { select: { likes: true, replies: true, saves: true } },
          ...(userId && {
            likes: { where: { userId: userId } },
            saves: { where: { userId: userId } },
          }),
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
        replies: p._count.replies,
        saves: p._count.saves,
      },
      savedByMe: p.saves ? p.saves.length > 0 : false,
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
    where: { authorId: profileId, parentId: null },
    include: {
      author: true,
      _count: { select: { likes: true, replies: true, saves: true } },
      likes: { where: { userId: userId } },
      saves: { where: { userId: userId } },
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
      savedByMe: p.saves ? p.saves.length > 0 : false,
      counts: {
        likes: p._count.likes,
        replies: p._count.replies,
        saves: p._count.saves,
      },
    };
    return post;
  });

  return posts;
}

async function editPost(
  profileId: string,
  postId: string,
  content: string,
): Promise<Post | null> {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    throw new ApiError("Post not found", 404);
  }
  if (post.authorId !== profileId) {
    throw new ApiError("Unauthorized to edit this post", 403);
  }

  await prisma.post.update({
    where: { id: postId, authorId: profileId },
    data: { content },
  });
  return post;
}

async function createReply(
  postId: string,
  profileId: string,
  content: string,
): Promise<Post> {
  const reply = await prisma.post.create({
    data: {
      content,
      authorId: profileId,
      parentId: postId,
    },
  });
  return reply;
}
async function getPostReplies(
  postId: string,
  userId: string | null | undefined,
): Promise<Post[]> {
  const r = await prisma.post.findMany({
    where: { parentId: postId },
    include: {
      author: true,
      _count: { select: { likes: true, replies: true, saves: true } },
      ...(userId && {
        likes: { where: { userId: userId } },
        saves: { where: { userId: userId } },
      }),
    },
    orderBy: { createdAt: "desc" },
  });

  const replies: Post[] = r.map((re) => {
    const reply: Post = {
      id: re.id,
      content: re.content,
      authorId: re.authorId,
      author: re.author ?? undefined,
      createdAt: re.createdAt,
      updatedAt: re.updatedAt,
      likedByMe: re.likes ? re.likes.length > 0 : false,
      counts: {
        likes: re._count.likes,
        replies: re._count.replies,
        saves: re._count.saves,
      },
      savedByMe: re.saves ? re.saves.length > 0 : false,
    };
    return reply;
  });

  return replies;
}

async function getRepliesByUsername(
  username: string,
  userId: string,
): Promise<Post[]> {
  const normalizedUsername = username.trim().toLowerCase();

  const profile = await prisma.profile.findUnique({
    where: { username: normalizedUsername },
    include: {
      posts: {
        where: { NOT: { parentId: null } },
        include: {
          author: true,
          _count: { select: { likes: true, replies: true, saves: true } },
          likes: { where: { userId: userId } },
          saves: { where: { userId: userId } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!profile) throw new ApiError("Profile not found", 404);

  const replies: Post[] = profile.posts.map((r) => {
    const reply: Post = {
      id: r.id,
      content: r.content,
      authorId: r.authorId,
      author: r.author ?? undefined,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      likedByMe: r.likes ? r.likes.length > 0 : false,
      savedByMe: r.saves ? r.saves.length > 0 : false,
      counts: {
        likes: r._count.likes,
        replies: r._count.replies,
        saves: r._count.saves,
      },
    };
    return reply;
  });

  return replies;
}

export default {
  createPost,
  getPostById,
  getCurrentUserPosts,
  getPostsByUsername,
  deletePost,
  editPost,
  getPostReplies,
  createReply,
  getRepliesByUsername,
};
