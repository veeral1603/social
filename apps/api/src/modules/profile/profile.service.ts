import type {
  Profile,
  UpdatedProfileResponse,
  UpdatedUsernameResponse,
  UpdateProfileFormData,
} from "@repo/shared-types";
import prisma from "../../lib/prisma";
import ApiError from "../../utils/apiError";
import { deleteImage, uploadImage } from "../../lib/imagekit";
import { Prisma } from "@prisma/client";

async function getProfileByUserId(userId: string): Promise<Profile> {
  const p = await prisma.profile.findUnique({
    where: { userId },
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        },
      },
    },
    omit: { createdAt: true, updatedAt: true, userId: true },
  });
  if (!p) {
    throw new ApiError("Profile not found", 404);
  }

  const profile = {
    id: p.id,
    name: p.name,
    username: p.username,
    bio: p.bio,
    avatar: p.avatar,
    banner: p.banner,
    followersCount: p._count.followers,
    followingCount: p._count.following,
    postsCount: p._count.posts,
  };
  return profile;
}

async function getProfileByUsername(
  username: string,
  currentUserProfileId?: string | null,
): Promise<Profile> {
  const p = await prisma.profile.findUnique({
    where: { username },
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        },
      },
    },
    omit: { createdAt: true, updatedAt: true, userId: true },
  });
  if (!p) {
    throw new ApiError("Profile not found", 404);
  }
  let isFollowing = false;
  let isFollower = false;
  if (currentUserProfileId) {
    const isFollowingRecored = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUserProfileId,
          followingId: p.id,
        },
      },
    });
    const isFollowerRecord = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: p.id,
          followingId: currentUserProfileId,
        },
      },
    });

    isFollowing = !!isFollowingRecored;
    isFollower = !!isFollowerRecord;
  }
  const profile = {
    id: p.id,
    name: p.name,
    username: p.username,
    bio: p.bio,
    avatar: p.avatar,
    banner: p.banner,
    followersCount: p._count.followers,
    followingCount: p._count.following,
    postsCount: p._count.posts,
    isFollowing,
    isFollower,
  };
  return profile;
}

async function updateUserProfile(
  userId: string,
  data: UpdateProfileFormData,
  avatarFile: Express.Multer.File | null,
  bannerFile: Express.Multer.File | null,
): Promise<UpdatedProfileResponse> {
  const updateData: UpdateProfileFormData = {
    name: data.name ?? "",
    bio: data.bio ?? "",
    deleteAvatar: data.deleteAvatar ?? false,
    deleteBanner: data.deleteBanner ?? false,
  };

  const userProfile = await getProfileByUserId(userId);
  if (!userProfile) {
    throw new ApiError("Profile not found", 404);
  }
  if (updateData.deleteAvatar) {
    if (userProfile.avatar) {
      await deleteImage(userProfile.avatar.fileId);
    }
  }
  if (updateData.deleteBanner) {
    if (userProfile.banner) {
      await deleteImage(userProfile.banner.fileId);
    }
  }

  let avatarObj: { url: string; fileId: string } | undefined = undefined;
  if (avatarFile) {
    const fileName = `${userId}_avatar_${Date.now()}`;
    try {
      if (userProfile.avatar) {
        await deleteImage(userProfile.avatar.fileId);
      }
      const uploadedResponse = await uploadImage(
        avatarFile,
        fileName,
        "/user-avatars",
      );

      avatarObj = {
        url: uploadedResponse.url,
        fileId: uploadedResponse.fileId,
      };
    } catch {
      throw new ApiError("Failed to upload avatar", 500);
    }
  }

  let bannerObj: { url: string; fileId: string } | undefined = undefined;
  if (bannerFile) {
    const fileName = `${userId}_banner_${Date.now()}`;
    try {
      if (userProfile.banner) {
        await deleteImage(userProfile.banner.fileId);
      }
      const uploadedResponse = await uploadImage(
        bannerFile,
        fileName,
        "/user-banners",
      );

      bannerObj = {
        url: uploadedResponse.url,
        fileId: uploadedResponse.fileId,
      };
    } catch {
      throw new ApiError("Failed to upload banner", 500);
    }
  }

  const updatedProfile = await prisma.profile.update({
    where: { userId },
    data: {
      name: updateData.name,
      bio: updateData.bio,
      avatar: data.deleteAvatar && !avatarObj ? null : avatarObj,
      banner: data.deleteBanner && !bannerObj ? null : bannerObj,
    } as Prisma.ProfileUpdateInput,
    omit: { createdAt: true, updatedAt: true, userId: true },
  });

  return {
    name: updatedProfile.name,
    bio: updatedProfile.bio,
    avatar: updatedProfile.avatar,
    banner: updatedProfile.banner,
  };
}

async function checkUsernameAvailability(username: string): Promise<boolean> {
  const normalizedUsername = username.trim().toLowerCase();
  const existingProfile = await prisma.profile.findUnique({
    where: { username: normalizedUsername },
  });
  return existingProfile ? false : true;
}

async function updateUsername(
  userId: string,
  newUsername: string,
): Promise<UpdatedUsernameResponse> {
  const newNormalizedUsername = newUsername.trim().toLowerCase();
  try {
    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data: { username: newNormalizedUsername },
      select: { username: true },
    });

    return {
      username: updatedProfile.username,
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new ApiError("Username already taken", 409);
    }

    throw error;
  }
}

export default {
  getProfileByUserId,
  getProfileByUsername,
  updateUserProfile,
  checkUsernameAvailability,
  updateUsername,
};
