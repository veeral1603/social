import prisma from "../../lib/prisma";

async function likePost(userId: string, postId: string) {
  const like = await prisma.like.create({
    data: {
      userId: userId,
      postId: postId,
    },
  });
  return like;
}

async function unlikePost(userId: string, postId: string) {
  await prisma.like.deleteMany({ where: { userId: userId, postId: postId } });
}

export default { likePost, unlikePost };
