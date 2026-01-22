import { apiHandler } from "../../utils/apiHandler";
import type { Request, Response } from "express";
import authService from "./auth.service";
import { successResponse } from "../../utils/apiResponses";
import type { LoginFormData, RegisterFormData } from "@repo/shared-types";
import { setCookie } from "../../lib/cookie";

const registerUser = apiHandler(
  async (req: Request<{}, {}, RegisterFormData>, res: Response) => {
    const data = req.body;
    const user = await authService.registerUser(data);
    successResponse(res, "OTP sent successfully", user, 201);
  },
);

const verifyUserEmail = apiHandler(
  async (req: Request<{}, {}, { token: string }>, res: Response) => {
    const { token } = req.body;
    const access_token = await authService.verifyUserEmail(token);
    setCookie(res, "access_token", access_token);
    successResponse(res, "Email verified successfully", null, 200);
  },
);

export const resendVerificationLink = apiHandler(
  async (req: Request<{}, {}, { email: string }>, res: Response) => {
    const { email } = req.body;
    await authService.resendVerificationLink(email);
    successResponse(res, "Verification link resent successfully", null, 200);
  },
);

export const loginUser = apiHandler(
  async (req: Request<{}, {}, LoginFormData>, res: Response) => {
    const data = req.body;
    const { user, access_token } = await authService.loginUser(data);
    setCookie(res, "access_token", access_token);
    successResponse(res, "Login successful", user, 200);
  },
);

export default {
  registerUser,
  verifyUserEmail,
  resendVerificationLink,
  loginUser,
};
