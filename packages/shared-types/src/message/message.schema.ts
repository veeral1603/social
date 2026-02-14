import { z } from "zod";

export const messageInputSchema = z.object({
  receiverId: z.string().min(1, "Receiver ID is required"),
  content: z
    .string()
    .min(1, "Message content cannot be empty")
    .max(300, "Message content cannot exceed 300 characters"),
});
