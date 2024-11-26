import { string, z } from "zod";

export const userEmailsSchema = z.object({
  emails: z.array(z.string().email()).min(1, "At least one email is required."),
});

export const userEditParamsSchema = z.object({
  email: z.string().email({ message: "Invalid email format." }).optional(),
  state: z
    .string()
    .refine(
      (val) => ["Pending", "Accepted", "Denied", "Expired"].includes(val),
      { message: "Invalid state value" },
    )
    .optional(),
});

// export const emailValuesParamsSchema = z.record(z.string());

export type UserEmailsType = z.infer<typeof userEmailsSchema>;
export type UserEmailsValues = z.infer<typeof userEmailsSchema>;
export type UserEditParamsType = z.infer<typeof userEditParamsSchema>;
export type EmailType = z.infer<typeof userEditParamsSchema.shape.email>;
