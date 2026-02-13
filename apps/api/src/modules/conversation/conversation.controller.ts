import { apiHandler } from "../../utils/apiHandler";
import type { Request, Response } from "express";
import conversationService from "./conversation.service";
import { successResponse } from "../../utils/apiResponses";
import ApiError from "../../utils/apiError";
import type { FindOrCreateConversationInput } from "@repo/shared-types";

const getUserConversations = apiHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const conversations = await conversationService.getUserConversations(
    userId as string,
  );

  successResponse(res, "Conversations retrieved successfully", conversations);
});

const findOrCreateConversation = apiHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const { participantId } =
      req.validatedBody as FindOrCreateConversationInput;

    if (!participantId) {
      throw new ApiError("Participant ID is required", 400);
    }

    const conversation = await conversationService.findOrCreateConversation(
      userId as string,
      participantId as string,
    );

    successResponse(res, "Conversation retrieved successfully", conversation);
  },
);

export default { getUserConversations, findOrCreateConversation };
