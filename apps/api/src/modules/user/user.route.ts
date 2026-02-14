import { Router } from "express";
import userController from "./user.controller";
import requireAuth from "../../middlewares/requireAuth";

const router = Router();

router.get("/search", requireAuth, userController.searchUsers);

export default router;
