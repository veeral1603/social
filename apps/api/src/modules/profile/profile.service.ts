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
): Promise<Profile> {
  const updateData: UpdateProfileFormData = {
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    bio: data.bio || undefined,
  };

  let avatarObj: { url: string; fileId: string } | undefined = undefined;
  if (avatarFile) {
    const fileName = `${userId}_avatar_${Date.now()}`;
    try {
      const userProfile = await getProfileByUserId(userId);
      if (!userProfile) {
        throw new ApiError("Profile not found", 404);
      }
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
      updateData.avatar = avatarObj;
    } catch {
      throw new ApiError("Failed to upload avatar", 500);
    }
  }

  const updatedProfile = await prisma.profile.update({
    where: { userId },
    data: updateData as Prisma.ProfileUpdateInput,
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
