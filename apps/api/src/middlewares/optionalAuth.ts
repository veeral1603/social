import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt";

const optionalAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.cookies["access_token"] as string | undefined;
  if (!token) return next(); // No token, proceed without authentication

  const payload = await verifyToken<{
    id: string;
    email: string;
    profileId: string;
  }>(token);

  if (!payload) return next(); // Invalid token, proceed without authentication

  req.user = payload;

  next();
};

export default optionalAuth;
