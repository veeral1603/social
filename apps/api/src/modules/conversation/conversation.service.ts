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
              id: true,
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

export default { getUserConversations, findOrCreateConversation };
