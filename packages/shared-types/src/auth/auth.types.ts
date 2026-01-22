import { z } from "zod";
import { registerSchema, loginSchema } from "./auth.schema";

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
