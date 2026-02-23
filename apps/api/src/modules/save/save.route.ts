import { Router } from "express";
import saveController from "./save.controller.js";
const router = Router();

router.post("/:id", saveController.savePost);
router.delete("/:id", saveController.unsavePost);
router.get("/me", saveController.getUserSavedPosts);

export default router;
