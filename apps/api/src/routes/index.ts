import { Router } from "express";
import authRoutes from "../modules/auth/auth.route";
import profileRoutes from "../modules/profile/profile.route";
import postRoutes from "../modules/post/post.route";
import followRoutes from "../modules/follow/follow.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/post", postRoutes);
router.use("/follow", followRoutes);

export default router;
