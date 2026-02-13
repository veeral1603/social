import { Router } from "express";
import authRoutes from "../modules/auth/auth.route";
import profileRoutes from "../modules/profile/profile.route";
import postRoutes from "../modules/post/post.route";
import followRoutes from "../modules/follow/follow.route";
import requireAuth from "../middlewares/requireAuth";
import feedRoutes from "../modules/feed/feed.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/post", postRoutes);
router.use("/follow", requireAuth, followRoutes);
router.use("/feed", feedRoutes);

export default router;
