import { UserWithProfile } from "../user/user.types";

export type Message = {
  id: string;
  conversationId: string;

  senderId: string;
  sender?: UserWithProfile;

  content: string;
  createdAt: Date;
};
