import type { EditPostData, PostFormData } from "@repo/shared-types";
import { apiHandler } from "../../utils/apiHandler";
import type { Request, Response } from "express";
import postService from "./post.service";
import { successResponse } from "../../utils/apiResponses";
import ApiError from "../../utils/apiError";

const createPost = apiHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { content } = req.validatedBody as PostFormData;
  const post = await postService.createPost(userId as string, content);
  successResponse(res, "Post created successfully", post, 201);
});

const deletePost = apiHandler(async (req: Request, res: Response) => {
  const postId = req.params["id"];
  if (!postId) throw new ApiError("Post ID is required", 400);
  await postService.deletePost(postId as string);
  successResponse(res, "Post deleted successfully", null, 200);
});

const editPost = apiHandler(async (req: Request, res: Response) => {
  const postId = req.params["id"];
  const userId = req.user?.id;
  if (!postId) throw new ApiError("Post ID is required", 400);
  const { content } = req.validatedBody as EditPostData;
  const post = await postService.editPost(
    userId as string,
    postId as string,
    content,
  );
  successResponse(res, "Post edited successfully", post, 200);
});

export default {
  createPost,
  deletePost,
  editPost,
};
