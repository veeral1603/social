import type { Message } from "@repo/shared-types";
import prisma from "../../lib/prisma";
import conversationService from "../conversation/conversation.service";
import ApiError from "../../utils/apiError";

async function createMessage(
  senderId: string,
  receiverId: string,
  content: string,
): Promise<Message> {
  const conversation = await conversationService.findOrCreateConversation(
    senderId,
    receiverId,
  );

  const message = await prisma.message.create({
    data: {
      conversationId: conversation.id,
      senderId: senderId,
      content: content,
    },
  });

  await prisma.conversation.update({
    where: { id: conversation.id },
    data: {
      lastMessageId: message.id,
    },
  });

  return message;
}

async function deleteMessage(messageId: string, userId: string): Promise<void> {
  const message = await prisma.message.findUnique({
    where: { id: messageId },
    include: { conversation: true },
  });
  if (!message) {
    throw new ApiError("Message not found", 404);
  }

  const isSender = message.senderId === userId;

  if (!isSender) {
    throw new ApiError("You can only delete your own messages", 403);
  }

  const conversation = await prisma.conversation.findUnique({
    where: { id: message.conversationId },
    include: { messages: { orderBy: { createdAt: "desc" } } },
  });

  if (messageId === conversation?.lastMessageId) {
    const lastMessage = conversation?.messages[1];
    await prisma.conversation.update({
      where: { id: conversation.id },
      data: { lastMessageId: lastMessage ? lastMessage.id : null },
    });
  }

  await prisma.message.delete({ where: { id: messageId } });
}

export default { createMessage, deleteMessage };
