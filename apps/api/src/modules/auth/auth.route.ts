import { Router } from "express";
import authController from "./auth.controller";
import { validate } from "../../middlewares/validate";
import {
  loginSchema,
  registerSchema,
  verifyEmailSchema,
} from "@repo/shared-types";
import requireAuth from "../../middlewares/requireAuth";

const router = Router();

router.post("/register", validate(registerSchema), authController.registerUser);
router.post("/login", validate(loginSchema), authController.loginUser);
router.post(
  "/verify-email",
  validate(verifyEmailSchema),
  authController.verifyUserEmail,
);
router.get("/resend-verification-otp", authController.resendVerificationOtp);
router.get("/me", requireAuth, authController.getCurrentUser);
router.post("/logout", requireAuth, authController.logoutUser);
export default router;
