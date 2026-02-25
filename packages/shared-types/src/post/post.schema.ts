import { z } from "zod";

export const postBaseSchema = z.object({
  content: z.string().max(300).optional().nullable(),
});

export const postSchemaForFrontend = postBaseSchema
  .extend({
    images: z.array(z.instanceof(File)).max(4).optional().nullable(),
  })
  .refine(
    (data) => {
      const hasContent = data.content && data.content.trim().length > 0;
      const hasImages = data.images && data.images.length > 0;
      return hasContent || hasImages;
    },
    {
      message: "Post must contain text or atleast one image",
      path: ["content"],
    },
  );

export const postSchemaForBackend = postBaseSchema
  .extend({
    images: z.any().optional(), // We will validate this separately in the middleware
  })
  .refine(
    (data) => {
      const hasContent = data.content && data.content.trim().length > 0;
      const hasImages = Array.isArray(data.images) && data.images.length > 0;
      return hasContent || hasImages;
    },
    {
      message: "Post must contain text or atleast one image",
      path: ["content"],
    },
  );

export const postSchema = z
  .object({
    content: z.string().max(300).optional().nullable(),
    images: z.array(z.instanceof(File)).max(4).optional().nullable(),
  })
  .refine(
    (data) => {
      const hasContent = data.content && data.content.trim().length > 0;
      const hasImages = data.images && data.images.length > 0;
      return hasContent || hasImages;
    },
    {
      message: "Post must contain text or atleast one image",
      path: ["content"],
    },
  );

export const editPostSchema = z.object({
  content: z.string().min(1).max(300),
});
