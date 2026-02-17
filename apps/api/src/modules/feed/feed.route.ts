import { Router } from "express";
import feedController from "./feed.controller";
import optionalAuth from "../../middlewares/optionalAuth";
const router = Router();

router.get("/", optionalAuth, feedController.getFeed);

export default router;
