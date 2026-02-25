import { errorResponse } from "../utils/apiResponses";
import type { Request, Response, NextFunction } from "express";
import type { ZodTypeAny } from "zod";

export const validate =
  <T extends ZodTypeAny>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    const files = Array.isArray(req.files)
      ? (req.files as Express.Multer.File[])
      : undefined;
    const dataToValidate: unknown = {
      ...req.body,
      images: files, // 👈 important
    };
    console.log(dataToValidate);
    const result = schema.safeParse(dataToValidate);
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
    // console.log("Validated Data:", req.validatedBody);

    return next();
  };
