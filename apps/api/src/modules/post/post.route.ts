import { Router } from "express";
import postController from "./post.controller";
import { validate } from "../../middlewares/validate";
import { editPostSchema, postSchema } from "@repo/shared-types";
import requireAuth from "../../middlewares/requireAuth";
import optionalAuth from "../../middlewares/optionalAuth";
const router = Router();

router.post("/", requireAuth, validate(postSchema), postController.createPost);
router.post(
  "/:id/reply",
  requireAuth,
  validate(postSchema),
  postController.createReply,
);
router.delete("/:id", requireAuth, postController.deletePost);
router.put(
  "/:id",
  requireAuth,
  validate(editPostSchema),
  postController.editPost,
);
router.get("/:id", optionalAuth, postController.getPostById);
router.get("/me", requireAuth, postController.getCurrentUserPosts);
router.get("/user/@:username", optionalAuth, postController.getPostsByUsername);

router.get("/:id/replies", optionalAuth, postController.getPostReplies);

export default router;
