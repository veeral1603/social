import { Router } from "express";
import conversationController from "./conversation.controller";
const router = Router();

router.get("/me", conversationController.getUserConversations);

router.get("/:participantId", conversationController.getConversation);

router.get(
  "/:conversationId/messages",
  conversationController.getConversationMessages,
);

export default router;
