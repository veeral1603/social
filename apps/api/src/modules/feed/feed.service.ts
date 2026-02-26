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
      _count: {
        select: { likes: true, replies: true, saves: true, reposts: true },
      },
      ...(userId && {
        likes: { where: { userId: userId } },
        saves: { where: { userId: userId } },
        reposts: { where: { userId: userId } },
      }),
    },
  });

  const posts: Post[] = feedPosts.map((p) => {
    return {
      id: p.id,
      content: p.content,
      images: (p.images as { url: string; fileId: string }[]) ?? [],
      authorId: p.authorId,
      author: p.author ?? undefined,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      counts: {
        likes: p._count.likes,
        replies: p._count.replies,
        saves: p._count.saves,
        reposts: p._count.reposts,
      },
      likedByMe: p.likes ? p.likes.length > 0 : false,
      savedByMe: p.saves ? p.saves.length > 0 : false,
      repostedByMe: p.reposts ? p.reposts.length > 0 : false,
      parentId: p.parentId,
    };
  });

  return posts;
}

export default { getFeed };
