import { Response } from "express";

export const successResponse = (
  res: Response,
  message: string,
  data: unknown = null,
  status: number = 200,
) => {
  return res.status(status).json({ success: true, message, data });
};

export const errorResponse = (
  res: Response,
  message: string = "Internal Server Error",
  status: number = 500,
  errors: Record<string, unknown> | null = null,
) => {
  return res.status(status).json({ success: false, message, errors });
};
