import type { Message } from "@repo/shared-types";
import prisma from "../../lib/prisma";

async function getUserConversations(userId: string) {
  const conversations = await prisma.conversation.findMany({
    where: {
      conversationParticipants: {
        some: {
          userId,
        },
      },
    },
    include: {
      conversationParticipants: {
        include: {
          user: {
            include: {
              profile: { select: { avatar: true, username: true, name: true } },
            },
            omit: {
              password: true,
              email: true,
              isVerified: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
      lastMessage: true,
    },
    orderBy: {
      lastMessage: {
        createdAt: "desc",
      },
    },
  });

  const refinedParticipants = conversations.map((conversation) => {
    const otherParticipant = conversation.conversationParticipants.find(
      (p) => p.userId !== userId,
    );
    return {
      ...conversation,
      otherParticipant: otherParticipant ? otherParticipant.user : null,
    };
  });

  return refinedParticipants;
}

async function getConversation(userId: string, participantId: string) {
  const conversation = await prisma.conversation.findFirst({
    where: {
      AND: [
        {
          conversationParticipants: {
            some: { userId },
          },
        },
        {
          conversationParticipants: {
            some: { userId: participantId },
          },
        },
      ],
    },
  });

  return conversation;
}

async function findOrCreateConversation(userId: string, participantId: string) {
  const existingConversation = await prisma.conversation.findFirst({
    where: {
      AND: [
        {
          conversationParticipants: {
            some: { userId },
          },
        },
        {
          conversationParticipants: {
            some: { userId: participantId },
          },
        },
      ],
    },
    include: {
      conversationParticipants: true,
    },
  });

  if (existingConversation) return existingConversation;

  const conversation = await prisma.conversation.create({
    data: {
      conversationParticipants: {
        create: [
          {
            userId,
          },
          {
            userId: participantId,
          },
        ],
      },
    },
    include: {
      conversationParticipants: true,
    },
  });

  return conversation;
}

async function getConversationMessages(
  conversationId: string,
  cursor?: string,
  limit: number = 20,
): Promise<{ messages: Message[]; nextCursor?: string | undefined }> {
  const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "desc" },
    take: limit + 1,
    ...(cursor && { cursor: { id: cursor } }),
    skip: cursor ? 1 : 0,
  });

  let nextCursor: string | undefined = undefined;
  if (messages.length > limit) {
    const nextMessage = messages.pop();
    nextCursor = nextMessage?.id;
  }
  return {
    messages: messages.reverse(),
    nextCursor,
  };
}

export default {
  getUserConversations,
  getConversation,
  findOrCreateConversation,
  getConversationMessages,
};
