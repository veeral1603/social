import type { MessageInputData } from "@repo/shared-types";
import { apiHandler } from "../../utils/apiHandler";
import type { Request, Response } from "express";
import ApiError from "../../utils/apiError";
import messageService from "./message.service";
import { successResponse } from "../../utils/apiResponses";

const createMessage = apiHandler(async (req: Request, res: Response) => {
  const senderId = req.user?.id as string;
  const { receiverId, content } = req.validatedBody as MessageInputData;

  if (!receiverId || !content || !content.trim()) {
    throw new ApiError("Receiver ID and content are required", 400);
  }

  if (senderId === receiverId) {
    throw new ApiError("You cannot send a message to yourself", 400);
  }

  const message = await messageService.createMessage(
    senderId,
    receiverId,
    content,
  );
  successResponse(res, "Message sent successfully", message, 201);
});

const deleteMessage = apiHandler(async (req: Request, res: Response) => {
  const userId = req?.user?.id as string;
  const { messageId } = req.params;

  if (!messageId) {
    throw new ApiError("Message ID is required", 400);
  }
  await messageService.deleteMessage(messageId as string, userId);

  successResponse(res, "Message deleted successfully", null, 200);
});

export default { createMessage, deleteMessage };
