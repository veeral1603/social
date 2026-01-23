import { apiHandler } from "../../utils/apiHandler";
import type { Request, Response } from "express";
import authService from "./auth.service";
import { successResponse } from "../../utils/apiResponses";
import type {
  LoginFormData,
  RegisterFormData,
  ResendVerificationData,
  VerifyEmailData,
} from "@repo/shared-types";
import { setCookie } from "../../lib/cookie";

const registerUser = apiHandler(async (req: Request, res: Response) => {
  const data = req.validatedBody as RegisterFormData;
  const user = await authService.registerUser(data);
  successResponse(res, "Verification link sent successfully", user, 201);
});

const verifyUserEmail = apiHandler(async (req: Request, res: Response) => {
  const data = req.validatedBody as VerifyEmailData;
  const { user, access_token } = await authService.verifyUserEmail(data.token);
  setCookie(res, "access_token", access_token);
  successResponse(res, "Email verified successfully", user, 200);
});

export const resendVerificationLink = apiHandler(
  async (req: Request, res: Response) => {
    const data = req.validatedBody as ResendVerificationData;
    await authService.resendVerificationLink(data.email);
    successResponse(res, "Verification link resent successfully", null, 200);
  },
);

export const loginUser = apiHandler(async (req: Request, res: Response) => {
  const data = req.validatedBody as LoginFormData;
  const { user, access_token } = await authService.loginUser(data);
  setCookie(res, "access_token", access_token);
  successResponse(res, "Login successful", user, 200);
});

export default {
  registerUser,
  verifyUserEmail,
  resendVerificationLink,
  loginUser,
};
