import type { ZodType } from "zod";
import { errorResponse } from "../utils/apiResponses";
import type { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return errorResponse(
        res,
        "Invalid request data",
        400,
        result.error.flatten().fieldErrors,
      );
    }

    // overwrite body with validated & typed data
    req.validatedBody = result.data;

    return next();
  };
