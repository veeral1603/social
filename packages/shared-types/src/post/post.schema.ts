import { z } from "zod";

export const postSchema = z.object({
  content: z.string().min(1).max(300),
});

export const editPostSchema = z.object({
  content: z.string().min(1).max(300),
});
