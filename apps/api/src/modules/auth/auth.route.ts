import { Router } from "express";
import authController from "./auth.controller";
import { validate } from "../../middlewares/validate";
import {
  loginSchema,
  registerSchema,
  verifyEmailSchema,
  resendVerificationSchema,
} from "@repo/shared-types";

const router = Router();

router.post("/register", validate(registerSchema), authController.registerUser);
router.post("/login", validate(loginSchema), authController.loginUser);
router.post(
  "/verify-email",
  validate(verifyEmailSchema),
  authController.verifyUserEmail,
);
router.post(
  "/resend-verification",
  validate(resendVerificationSchema),
  authController.resendVerificationOtp,
);

export default router;
