import type { Request, Response } from "express";
import { successResponse } from "../../utils/apiResponses";
import profileService from "./profile.service";
import type {
  UpdateProfileFormData,
  UpdateUsernameFormData,
} from "@repo/shared-types";
import { apiHandler } from "../../utils/apiHandler";

const getSelfProfile = apiHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const profile = await profileService.getProfileByUserId(userId as string);
  successResponse(res, "Profile fetched successfully", profile);
});

const getProfileByUsername = apiHandler(async (req: Request, res: Response) => {
  const username = req.params["username"];
  const profile = await profileService.getProfileByUsername(username as string);
  successResponse(res, "Profile fetched successfully", profile);
});

const updateUserProfile = apiHandler(
  async (req: Request<{}, {}, UpdateProfileFormData>, res: Response) => {
    const userId = req.user?.id;
    const data = req.validatedBody as UpdateProfileFormData;
    const avatarFile = req.file || null;

    const profile = await profileService.updateUserProfile(
      userId as string,
      data,
      avatarFile,
    );

    successResponse(res, "Profile Updated Successfully", profile);
  },
);

const checkUsernameAvailability = apiHandler(
  async (req: Request, res: Response) => {
    const username = req.query["username"] as string;
    const isAvailable =
      await profileService.checkUsernameAvailability(username);
    successResponse(res, "Username availability checked successfully", {
      isAvailable,
    });
  },
);

export const updateUsername = apiHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const data = req.validatedBody as UpdateUsernameFormData;

    const updatedProfie = await profileService.updateUsername(
      userId as string,
      data.username,
    );
    successResponse(res, "Username changed successfully", updatedProfie);
  },
);
export default {
  getSelfProfile,
  getProfileByUsername,
  updateUserProfile,
  checkUsernameAvailability,
  updateUsername,
};
