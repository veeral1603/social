import prisma from "../../lib/prisma";

async function getFeed() {
  const feedPosts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: { author: true },
  });
  return feedPosts;
}

export default { getFeed };
