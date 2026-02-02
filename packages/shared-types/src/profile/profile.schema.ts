import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(3, "Full name must be at least 3 characters long.")
    .optional(),
  bio: z.string().max(160, "Bio cannot exceed 160 characters").optional(),
  avatar: z
    .object({
      url: z.url("Invalid URL"),
      fileId: z.string().min(1, "File ID cannot be empty"),
    })
    .optional(),
  banner: z
    .object({
      url: z.url("Invalid URL"),
      fileId: z.string().min(1, "File ID cannot be empty"),
    })
    .optional(),
});

export const updateUsernameSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(16, "Username cannot exceed 16 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
});
