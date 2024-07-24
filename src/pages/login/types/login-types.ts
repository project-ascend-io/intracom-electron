import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Please enter a email address" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Please enter a password" })
    .min(8, { message: "Password must be at least 8 characters" })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /[^a-zA-Z0-9]/.test(value), {
      message: "Password must contain at least one non-alphanumeric character",
    }),
});

//convert zod schema into typescript type
export type LoginFormType = z.infer<typeof loginSchema>;
