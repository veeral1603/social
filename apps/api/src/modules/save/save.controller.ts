import ApiError from "../../utils/apiError";
import { apiHandler } from "../../utils/apiHandler";
import type { Request, Response } from "express";
import saveService from "./save.service";
import { successResponse } from "../../utils/apiResponses";

const savePost = apiHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const postId = req.params["id"];
  if (!postId) {
    throw new ApiError("Post ID is required", 400);
  }
  const save = await saveService.savePost(userId as string, postId as string);
  successResponse(res, "Post saved successfully.", save, 201);
});

const unsavePost = apiHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const postId = req.params["id"];

  if (!postId) {
    throw new ApiError("Post ID is required", 400);
  }

  await saveService.unsavePost(userId as string, postId as string);
  successResponse(res, "Post unsaved successfully", null, 200);
});

const getUserSavedPosts = apiHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const saves = await saveService.getUserSavedPosts(userId as string);
  successResponse(res, "Saved posts retrieved successfully", saves, 200);
});
export default { savePost, unsavePost, getUserSavedPosts };
