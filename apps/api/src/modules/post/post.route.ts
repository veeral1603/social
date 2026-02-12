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
router.get("/:id", postController.getPostById);
router.get("/me", requireAuth, postController.getCurrentUserPosts);
router.get("/user/@:username", postController.getPostsByUsername);

export default router;
