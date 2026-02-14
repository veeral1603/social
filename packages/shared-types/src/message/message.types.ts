import { z } from "zod";
import { UserWithProfile } from "../user/user.types";
import { messageInputSchema } from "./message.schema";
import { Conversation } from "../conversation/conversation.types";

export type Message = {
  id: string;
  conversationId: string;
  conversation?: Conversation;

  senderId: string;
  sender?: UserWithProfile;

  content: string;
  createdAt: Date;
};

export type MessageInputData = z.infer<typeof messageInputSchema>;
