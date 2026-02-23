import type { Post, Save } from "@repo/shared-types";
import prisma from "../../lib/prisma";

async function savePost(userId: string, postId: string): Promise<Save> {
  const save = await prisma.save.create({
    data: {
      userId,
      postId,
    },
  });
  return save;
}

async function unsavePost(userId: string, postId: string): Promise<void> {
  await prisma.save.deleteMany({
    where: {
      userId,
      postId,
    },
  });
}

async function getUserSavedPosts(userId: string): Promise<Post[]> {
  const save = await prisma.save.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      post: {
        include: {
          author: true,
          _count: { select: { likes: true, replies: true, saves: true } },
          likes: { where: { userId: userId } },
          saves: { where: { userId: userId } },
        },
      },
    },
  });

  const posts = save.map((s) => {
    const p = s.post;
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

export default {
  savePost,
  unsavePost,
  getUserSavedPosts,
};
