import ApiError from "../../utils/apiError";
import { apiHandler } from "../../utils/apiHandler";
import { successResponse } from "../../utils/apiResponses";
import likeService from "./like.service";
import type { Request, Response } from "express";

const likePost = apiHandler(async (req: Request, res: Response) => {
  const userId = req?.user?.id;
  const { postId } = req.params;

  if (!postId) {
    throw new ApiError("PostId is required", 400);
  }

  await likeService.likePost(userId as string, postId as string);

  successResponse(res, "Post liked successfully", 201);
});

const unlikePost = apiHandler(async (req: Request, res: Response) => {
  const userId = req?.user?.id;
  const { postId } = req.params;

  if (!postId) {
    throw new ApiError("PostId is required", 400);
  }

  await likeService.unlikePost(userId as string, postId as string);

  successResponse(res, "Post unliked successfully", 200);
});

export default { likePost, unlikePost };
