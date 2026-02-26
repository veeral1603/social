import prisma from "../../lib/prisma";
import ApiError from "../../utils/apiError";

async function repost(postId: string, userId: string): Promise<void> {
  const existingRepose = await prisma.repost.findFirst({
    where: { postId, userId },
  });
  if (existingRepose) {
    throw new ApiError("You have already reposted this post.", 400);
  }
  await prisma.repost.create({
    data: {
      postId,
      userId,
    },
  });
}

async function unrepost(postId: string, userId: string): Promise<void> {
  await prisma.repost.deleteMany({
    where: {
      postId,
      userId,
    },
  });
}

export default { repost, unrepost };
