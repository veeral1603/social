import { findOrCreateConversationSchema } from "@repo/shared-types";
import { Router } from "express";
import conversationController from "./conversation.controller";
import { validate } from "../../middlewares/validate";
const router = Router();

router.get("/", conversationController.getUserConversations);

router.post(
  "/",
  validate(findOrCreateConversationSchema),
  conversationController.findOrCreateConversation,
);

export default router;
