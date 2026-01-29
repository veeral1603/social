import { z } from "zod";
import { registerSchema, loginSchema, verifyEmailSchema } from "./auth.schema";

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type VerifyEmailData = z.infer<typeof verifyEmailSchema>;
