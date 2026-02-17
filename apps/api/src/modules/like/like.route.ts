import { Router } from "express";
import likeController from "./like.controller";

const router = Router();

router.post("/:postId/like", likeController.likePost);
router.delete("/:postId/like", likeController.unlikePost);

export default router;
