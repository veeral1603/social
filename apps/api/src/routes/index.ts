import { Router } from "express";
import authRoutes from "../modules/auth/auth.route";
import profileRoutes from "../modules/profile/profile.route";
import postRoutes from "../modules/post/post.route";
import followRoutes from "../modules/follow/follow.route";
import requireAuth from "../middlewares/requireAuth";
import feedRoutes from "../modules/feed/feed.route";
import conversationRoutes from "../modules/conversation/conversation.route";
import userRoutes from "../modules/user/user.route";
import messageRoutes from "../modules/message/message.route";
import likeRoutes from "../modules/like/like.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/profiles", profileRoutes);
router.use("/posts", postRoutes);
router.use("/posts", requireAuth, likeRoutes); //Like routes are nested under posts and require authentication
router.use("/follows", requireAuth, followRoutes);
router.use("/feed", feedRoutes);
router.use("/conversations", requireAuth, conversationRoutes);
router.use("/users", userRoutes);
router.use("/messages", requireAuth, messageRoutes);
export default router;
