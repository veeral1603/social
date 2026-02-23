import type { Post } from "@repo/shared-types";
import prisma from "../../lib/prisma";

async function getFeed({
  userId,
}: {
  userId: string | null | undefined;
}): Promise<Post[]> {
  const feedPosts = await prisma.post.findMany({
    where: { parentId: null },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      _count: { select: { likes: true, replies: true, saves: true } },
      ...(userId && {
        likes: { where: { userId: userId } },
        saves: { where: { userId: userId } },
      }),
    },
  });

  const posts: Post[] = feedPosts.map((p) => {
    return {
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
      parentId: p.parentId,
      savedByMe: p.saves ? p.saves.length > 0 : false,
    };
  });

  return posts;
}

export default { getFeed };
