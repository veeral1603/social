import type { Request, Response, NextFunction } from "express";

type HandlerFunction = (
  res: Response,
  req: Request,
  next: NextFunction,
) => Promise<void> | void;

export const apiHandler = (handler: HandlerFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(res, req, next);
    } catch (error) {
      next(error);
    }
  };
};
