import { Router } from "express";
import repostController from "./repost.controller";
const router = Router();

router.post("/:postId/repost", repostController.repost);
router.delete("/:postId/repost", repostController.unrepost);

export default router;
