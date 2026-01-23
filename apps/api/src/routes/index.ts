import { Router } from "express";
import authRoutes from "../modules/auth/auth.route";
import profileRoutes from "../modules/profile/profile.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);

export default router;
