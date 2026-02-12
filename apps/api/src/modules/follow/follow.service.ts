import prisma from "../../lib/prisma";

async function followUser(
  currentUserProfileId: string,
  targetUserProfileId: string,
): Promise<void> {
  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId: currentUserProfileId,
      followingId: targetUserProfileId,
    },
  });
  if (existingFollow) {
    throw new Error("Already following this user");
  }
  await prisma.follow.create({
    data: {
      followerId: currentUserProfileId,
      followingId: targetUserProfileId,
    },
  });
}

async function unfollowUser(
  currentUserProfileId: string,
  targetUserProfileId: string,
): Promise<void> {
  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId: currentUserProfileId,
      followingId: targetUserProfileId,
    },
  });
  if (!existingFollow) {
    throw new Error("Not following this user");
  }
  await prisma.follow.delete({
    where: {
      followerId_followingId: {
        followerId: currentUserProfileId,
        followingId: targetUserProfileId,
      },
    },
  });
}

export default {
  followUser,
  unfollowUser,
};
