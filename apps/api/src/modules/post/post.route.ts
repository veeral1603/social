import { Router } from "express";
import postController from "./post.controller";
import { validate } from "../../middlewares/validate";
import { editPostSchema, postSchema } from "@repo/shared-types";
import requireAuth from "../../middlewares/requireAuth";
const router = Router();

router.post("/", requireAuth, validate(postSchema), postController.createPost);
router.delete("/:id", requireAuth, postController.deletePost);
router.put(
  "/:id",
  requireAuth,
  validate(editPostSchema),
  postController.editPost,
);

export default router;
