import z from "zod";

export const findOrCreateConversationSchema = z.object({
  participantId: z.string(),
});
