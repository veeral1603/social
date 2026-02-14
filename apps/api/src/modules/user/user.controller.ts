import ApiError from "../../utils/apiError";
import { apiHandler } from "../../utils/apiHandler";
import type { Request, Response } from "express";
import userService from "./user.service";
import { successResponse } from "../../utils/apiResponses";

const searchUsers = apiHandler(async (req: Request, res: Response) => {
  const { query } = req.query;
  const currentUserId = req.user?.id as string;

  if (typeof query !== "string") {
    throw new ApiError("Query parameter is required and must be a string", 400);
  }

  const users = await userService.searchUsers(query, currentUserId);

  successResponse(res, "Retrieved Users", users);
});

export default { searchUsers };
