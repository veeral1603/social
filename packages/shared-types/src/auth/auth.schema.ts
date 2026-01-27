import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Invalid email address."),
  name: z.string().optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(16, "Username cannot exceed 16 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const loginSchema = z.object({
  usernameOrEmail: z.string().min(3, "Username or Email is required."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const verifyEmailSchema = z.object({
  token: z.jwt("Invalid or expired token."),
});

export const resendVerificationSchema = z.object({
  email: z.email("Invalid email address."),
});
