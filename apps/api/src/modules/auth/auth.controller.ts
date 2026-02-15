import { apiHandler } from "../../utils/apiHandler";
import type { Request, Response } from "express";
import authService from "./auth.service";
import { successResponse } from "../../utils/apiResponses";
import type {
  LoginFormData,
  RegisterFormData,
  VerifyEmailData,
} from "@repo/shared-types";
import { clearCookie, setCookie } from "../../lib/cookie";

const registerUser = apiHandler(async (req: Request, res: Response) => {
  const data = req.validatedBody as RegisterFormData;
  const { user, temp_token } = await authService.registerUser(data);
  setCookie(res, "temp_token", temp_token);
  successResponse(res, "Verification OTP sent successfully", user, 201);
});

const verifyUserEmail = apiHandler(async (req: Request, res: Response) => {
  const data = req.validatedBody as VerifyEmailData;
  const { user, access_token } = await authService.verifyUserEmail(data.otp);
  clearCookie(res, "temp_token");
  setCookie(res, "access_token", access_token);
  successResponse(res, "Email verified successfully", user, 200);
});

export const resendVerificationOtp = apiHandler(
  async (req: Request, res: Response) => {
    const temp_token = req.cookies["temp_token"] as string | undefined;
    await authService.resendVerificationOtp(temp_token);
    successResponse(res, "Verification OTP resent successfully", null, 200);
  },
);

export const loginUser = apiHandler(async (req: Request, res: Response) => {
  const data = req.validatedBody as LoginFormData;
  const { user, access_token } = await authService.loginUser(data);
  setCookie(res, "access_token", access_token);
  successResponse(res, "Login successful", user, 200);
});

export const getCurrentUser = apiHandler(
  async (req: Request, res: Response) => {
    const withProfile = req.query["profile"] === "true";
    const userId = req.user?.id as string;
    const user = await authService.getCurrentUser(userId, withProfile);
    setCookie(res, "test", "test_value");
    successResponse(res, "User fetched successfully", user, 200);
  },
);

export const logoutUser = apiHandler((_req: Request, res: Response) => {
  clearCookie(res, "access_token");
  successResponse(res, "Logout successful", null, 200);
});

export default {
  registerUser,
  verifyUserEmail,
  resendVerificationOtp,
  loginUser,
  getCurrentUser,
  logoutUser,
};
