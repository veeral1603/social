import { apiHandler } from "../../utils/apiHandler";
import type { Request, Response } from "express";
import conversationService from "./conversation.service";
import { successResponse } from "../../utils/apiResponses";
import ApiError from "../../utils/apiError";

const getUserConversations = apiHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const conversations = await conversationService.getUserConversations(
    userId as string,
  );

  successResponse(res, "Conversations retrieved successfully", conversations);
});

const getConversation = apiHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { participantId } = req.params;

  if (!participantId) {
    throw new ApiError("Participant ID is required", 400);
  }

  const conversation = await conversationService.getConversation(
    userId as string,
    participantId as string,
  );

  successResponse(res, "Conversation retrieved successfully", conversation);
});

const getConversationMessages = apiHandler(
  async (req: Request, res: Response) => {
    const { conversationId } = req.params;
    const cursor = req.query["cursor"] as string | undefined;

    if (!conversationId) {
      throw new ApiError("Conversation ID is required", 400);
    }
    const messagesWithCursor =
      await conversationService.getConversationMessages(
        conversationId as string,
        cursor,
      );

    successResponse(res, "Messages retrieved successfully", messagesWithCursor);
  },
);

export default {
  getUserConversations,

  getConversation,
  getConversationMessages,
};
