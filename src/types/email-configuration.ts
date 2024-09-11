import { z } from "zod";
export const emailSettingsSchema = z.object({
  server: z.string().min(1, { message: "Server is required." }),
  verified_sender_email: z.string().email({ message: "Invalid email format." }),
  port: z.number().int().min(1, { message: "Port is required." }),

  username: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(1, { message: "Password is required." }),
  securityType: z.enum(["SSL", "TLS"], {
    message: "Security type is required.",
  }),
  testEmail: z.string().email({ message: "Invalid email format." }),
});
export type EmailSettingsType = z.infer<typeof emailSettingsSchema>;
export type EmailSettingsFormValues = z.infer<typeof emailSettingsSchema>;

export const organizationSchema = z.object({
  organization: z.object({
    name: z.string().min(1, { message: "Organization name is required." }),
  }),
  email: z.string().email({ message: "Invalid email format." }),
});
export type OrganizationType = z.infer<typeof organizationSchema>;
