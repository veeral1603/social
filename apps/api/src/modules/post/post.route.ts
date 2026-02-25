import { Router } from "express";
import postController from "./post.controller";
import { validate } from "../../middlewares/validate";
import {
  editPostSchema,
  postSchema,
  postSchemaForBackend,
} from "@repo/shared-types";
import requireAuth from "../../middlewares/requireAuth";
import optionalAuth from "../../middlewares/optionalAuth";
import { multerUpload } from "../../config/multer.config";
const router = Router();

router.post(
  "/",
  requireAuth,
  multerUpload.array("images", 4),
  validate(postSchemaForBackend),
  postController.createPost,
);
router.post(
  "/:id/reply",
  requireAuth,
  multerUpload.array("images", 4),
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

router.get(
  "/replies/user/@:username",
  optionalAuth,
  postController.getRepliesByUsername,
);

export default router;
