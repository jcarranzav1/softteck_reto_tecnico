import { z } from "zod";

export const authSchema = z.object({
    email: z.email().transform((s) => s.trim().toLowerCase()),
    password: z.string()
        .min(6, "min 6 chars")
        .refine(v => /[A-Za-z]/.test(v) && /\d/.test(v), "letters and numbers required"),
});

export type AuthDto = z.infer<typeof authSchema>;