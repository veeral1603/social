import type { Server, Socket } from "socket.io";
import prisma from "../../lib/prisma";
import conversationService from "../../modules/conversation/conversation.service";

interface MessagePayLoad {
  senderId: string;
  receiverId: string;
  content: string;
}

export default function registerMessageHandler(io: Server, socket: Socket) {
  socket.on("send_message", async (message: MessagePayLoad) => {
    const conversation = await conversationService.findOrCreateConversation(
      message.senderId,
      message.receiverId,
    );

    const newMessage = await prisma.message.create({
      data: {
        conversationId: conversation.id,
        senderId: message.senderId,
        content: message.content,
      },
    });

    await prisma.conversation.update({
      where: { id: conversation.id },
      data: { lastMessageId: newMessage.id },
    });

    io.to(message.senderId).emit("receive_message", newMessage);
    io.to(message.receiverId).emit("receive_message", newMessage);
  });
}
