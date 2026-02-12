import { apiHandler } from "../../utils/apiHandler";
import type { Request, Response } from "express";
import followService from "./follow.service";
import ApiError from "../../utils/apiError";
import { successResponse } from "../../utils/apiResponses";

const followUser = apiHandler(async (req: Request, res: Response) => {
  const { profileId } = req.params;

  if (!profileId) {
    throw new ApiError("Profile ID is required", 400);
  }
  const currentUserProfileId = req.user?.profileId;

  await followService.followUser(
    currentUserProfileId as string,
    profileId as string,
  );

  successResponse(res, "Successfully followed the user", null, 201);
});

const unfollowUser = apiHandler(async (req: Request, res: Response) => {
  const { profileId } = req.params;
  if (!profileId) {
    throw new ApiError("Profile ID is required", 400);
  }
  const currentUserProfileId = req.user?.profileId;
  await followService.unfollowUser(
    currentUserProfileId as string,
    profileId as string,
  );
  successResponse(res, "Successfully unfollowed the user", null, 200);
});

export default { followUser, unfollowUser };
