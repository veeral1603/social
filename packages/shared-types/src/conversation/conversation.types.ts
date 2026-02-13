import { findOrCreateConversationSchema } from "./conversation.schema";
import { UserWithProfile } from "./../user/user.types";
import type { Message } from "../message/message.types";
import { z } from "zod";
import { Profile } from "../profile/profile.types";

export type ConversationParticipant = {
  id: string;
  conversationId: string;

  userId: string;
  user?: { profile: Profile }[];

  lastReadMessageId?: string;
};
export type Conversation = {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  lastMessageId?: string;
  conversationParticipants?: ConversationParticipant[];
  messages?: Message[];

  otherParticipant?: { profile: Profile };
};

export type FindOrCreateConversationInput = z.infer<
  typeof findOrCreateConversationSchema
>;
