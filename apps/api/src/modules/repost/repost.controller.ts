import { apiHandler } from "../../utils/apiHandler";
import type { Request, Response } from "express";
import repostService from "./repost.service";
import { successResponse } from "../../utils/apiResponses";
import ApiError from "../../utils/apiError";

const repost = apiHandler(async (req: Request, res: Response) => {
  const { postId } = req.params;
  if (!postId) {
    throw new ApiError("Post ID is required", 400);
  }
  const userId = req.user?.id as string;
  await repostService.repost(postId as string, userId);
  successResponse(res, "Post reposted successfully");
});

const unrepost = apiHandler(async (req: Request, res: Response) => {
  const { postId } = req.params;
  if (!postId) {
    throw new ApiError("Post ID is required", 400);
  }
  const userId = req.user?.id as string;
  await repostService.unrepost(postId as string, userId);
  successResponse(res, "Post unreposted successfully");
});

export default { repost, unrepost };
