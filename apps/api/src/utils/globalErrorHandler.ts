import type { NextFunction, Response, Request } from "express";
import ApiError from "./apiError";
import { errorResponse } from "./apiResponses";

export const globalErrorHandler = (
  error: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error("Global Error Handler:", error);
  if (error instanceof ApiError) {
    return errorResponse(res, error.message, error.status, error.errors);
  }
  return errorResponse(res);
};
