import type { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";
import { verifyToken } from "../lib/jwt";

const requireAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.cookies["access_token"] as string | undefined;
  if (!token) {
    throw new ApiError("Unauthorized", 401);
  }
  const payload = await verifyToken<{ id: string; email: string }>(token);

  if (!payload) {
    throw new ApiError("Unauthorized", 401);
  }

  req.user = payload;

  next();
};

export default requireAuth;
