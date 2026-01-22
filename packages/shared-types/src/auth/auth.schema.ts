import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.email("Invalid email address."),
    firstName: z
      .string()
      .min(3, "First name must be at least 3 characters long."),
    lastName: z
      .string()
      .min(3, "Last name must be at least 3 characters long.")
      .optional(),
    username: z.string().min(3, "Username must be at least 3 characters long."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
  });

export const loginSchema = z.object({
  usernameOrEmail: z.string().min(3, "Username or Email is required."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});
