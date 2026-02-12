import { z } from "zod";

const stringToBoolean = z.preprocess((val) => {
  if (val === "true") return true;
  if (val === "false") return false;
  return val;
}, z.boolean());

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .refine((val) => val === "" || val.length >= 3, {
      message: "Full name must be at least 3 characters long.",
    })
    .optional()
    .transform((val) => val ?? ""),

  bio: z
    .string()
    .max(160, "Bio cannot exceed 160 characters")
    .optional()
    .transform((val) => (val ? val : "")),
  avatar: z.instanceof(File).optional().nullable(),
  banner: z.instanceof(File).optional().nullable(),
  deleteAvatar: stringToBoolean.default(false),
  deleteBanner: stringToBoolean.default(false),
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
