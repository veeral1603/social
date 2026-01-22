import { Router } from "express";
import authController from "./auth.controller";
import { validate } from "../../middlewares/validate";
import { loginSchema, registerSchema } from "@repo/shared-types";

const router = Router();

router.post("/register", validate(registerSchema), authController.registerUser);
router.post("/login", validate(loginSchema), authController.loginUser);
router.post("/verify-email", authController.verifyUserEmail);
router.post("/resend-verification", authController.resendVerificationLink);

export default router;
