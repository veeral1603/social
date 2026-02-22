import type { EditPostData, PostFormData } from "@repo/shared-types";
import { apiHandler } from "../../utils/apiHandler";
import type { Request, Response } from "express";
import postService from "./post.service";
import { successResponse } from "../../utils/apiResponses";
import ApiError from "../../utils/apiError";

const createPost = apiHandler(async (req: Request, res: Response) => {
  const profileId = req.user?.profileId;
  const { content } = req.validatedBody as PostFormData;
  const post = await postService.createPost(profileId as string, content);
  successResponse(res, "Post created successfully", post, 201);
});

const getPostById = apiHandler(async (req: Request, res: Response) => {
  const postId = req.params["id"];
  const userId = req.user?.id;
  if (!postId) throw new ApiError("Post ID is required", 400);
  const post = await postService.getPostById(postId as string, userId);
  successResponse(res, "Post retrieved successfully", post, 200);
});

const getPostsByUsername = apiHandler(async (req: Request, res: Response) => {
  const username = req.params["username"];
  const userId = req.user?.id;
  if (!username) throw new ApiError("Username is required", 400);
  const posts = await postService.getPostsByUsername(
    username as string,
    userId,
  );
  successResponse(res, "Posts retrieved successfully", posts, 200);
});

const getCurrentUserPosts = apiHandler(async (req: Request, res: Response) => {
  const profileId = req.user?.profileId;
  const userId = req.user?.id;
  if (!profileId) throw new ApiError("Profile ID is required", 400);
  const posts = await postService.getCurrentUserPosts(
    profileId as string,
    userId as string,
  );
  successResponse(res, "Current user posts retrieved successfully", posts, 200);
});

const deletePost = apiHandler(async (req: Request, res: Response) => {
  const postId = req.params["id"];
  if (!postId) throw new ApiError("Post ID is required", 400);
  await postService.deletePost(postId as string);
  successResponse(res, "Post deleted successfully", null, 200);
});

const editPost = apiHandler(async (req: Request, res: Response) => {
  const postId = req.params["id"];
  const profileId = req.user?.id;
  if (!postId) throw new ApiError("Post ID is required", 400);
  const { content } = req.validatedBody as EditPostData;
  const post = await postService.editPost(
    profileId as string,
    postId as string,
    content,
  );
  successResponse(res, "Post edited successfully", post, 200);
});

const getPostReplies = apiHandler(async (req: Request, res: Response) => {
  const postId = req.params["id"];
  const userId = req.user?.id;
  if (!postId) throw new ApiError("Post ID is required", 400);
  const replies = await postService.getPostReplies(postId as string, userId);
  successResponse(res, "Post replies retrieved successfully", replies, 200);
});

const createReply = apiHandler(async (req: Request, res: Response) => {
  const postId = req.params["id"];
  const profileId = req.user?.profileId;
  if (!postId) throw new ApiError("Post ID is required", 400);
  const { content } = req.validatedBody as PostFormData;
  const reply = await postService.createReply(
    postId as string,
    profileId as string,
    content,
  );
  successResponse(res, "Reply created successfully", reply, 201);
});

export default {
  createPost,
  getPostById,
  getPostsByUsername,
  getCurrentUserPosts,
  deletePost,
  editPost,
  getPostReplies,
  createReply,
};
