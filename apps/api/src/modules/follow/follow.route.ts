import { Router } from "express";
import followController from "./follow.controller";
const router = Router();

router.post("/:profileId", followController.followUser);

router.delete("/:profileId", followController.unfollowUser);

export default router;
