import type { Profile, UpdateProfileFormData } from "@repo/shared-types";
import prisma from "../../lib/prisma";
import ApiError from "../../utils/apiError";
import { deleteImage, uploadImage } from "../../lib/imagekit";
import type { Prisma } from "@prisma/client";

async function getProfileByUserId(userId: string): Promise<Profile> {
  const profile = await prisma.profile.findUnique({
    where: { userId },
    omit: { createdAt: true, updatedAt: true, userId: true, id: true },
  });
  if (!profile) {
    throw new ApiError("Profile not found", 404);
  }
  return profile;
}

async function getProfileByUsername(username: string): Promise<Profile> {
  const profile = await prisma.profile.findUnique({
    where: { username },
    omit: { createdAt: true, updatedAt: true, userId: true, id: true },
  });
  if (!profile) {
    throw new ApiError("Profile not found", 404);
  }
  return profile;
}

async function updateUserProfile(
  userId: string,
  data: UpdateProfileFormData,
  avatarFile: Express.Multer.File | null,
  bannerFile: Express.Multer.File | null,
): Promise<Profile> {
  const updateData: UpdateProfileFormData = {
    name: data.name ?? "",
    bio: data.bio ?? "",
  };

  const userProfile = await getProfileByUserId(userId);
  if (!userProfile) {
    throw new ApiError("Profile not found", 404);
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
      ...updateData,
      avatar: avatarObj,
      banner: bannerObj,
    } as Prisma.ProfileUpdateInput,
    omit: { createdAt: true, updatedAt: true, userId: true },
  });

  return updatedProfile as Profile;
}

async function checkUsernameAvailability(username: string): Promise<boolean> {
  const existingProfile = await prisma.profile.findUnique({
    where: { username },
  });
  return existingProfile ? false : true;
}

async function updateUsername(
  userId: string,
  newUsername: string,
): Promise<Profile> {
  const updatedProfile = await prisma.profile.update({
    where: { userId },
    data: { username: newUsername },
    omit: { createdAt: true, updatedAt: true, userId: true },
  });

  if (!updatedProfile) {
    throw new ApiError("Profile not found", 404);
  }

  return updatedProfile;
}

export default {
  getProfileByUserId,
  getProfileByUsername,
  updateUserProfile,
  checkUsernameAvailability,
  updateUsername,
};
