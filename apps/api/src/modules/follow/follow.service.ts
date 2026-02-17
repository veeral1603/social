import prisma from "../../lib/prisma";
import ApiError from "../../utils/apiError";

async function followUser(
  currentUserProfileId: string,
  targetUserProfileId: string,
): Promise<void> {
  if (currentUserProfileId === targetUserProfileId) {
    throw new ApiError("Cannot follow yourself", 400);
  }
  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId: currentUserProfileId,
      followingId: targetUserProfileId,
    },
  });
  if (existingFollow) {
    throw new ApiError("Already following this user", 400);
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
    throw new ApiError("Not following this user", 400);
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
