import { apiHandler } from "../../utils/apiHandler";
import type { Request, Response } from "express";
import feedService from "./feed.service";
import { successResponse } from "../../utils/apiResponses";

const getFeed = apiHandler(async (req: Request, res: Response) => {
  const userId = req?.user?.id;
  const feedPosts = await feedService.getFeed({ userId });
  successResponse(res, "Feed retrieved successfully", feedPosts);
});

export default { getFeed };
