import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config();

export const envSchema = z.object({
    MYSQL_HOST: z
        .string()
        .trim()
        .optional(),


    MYSQL_PORT: z
        .coerce.number()
        .int({ message: "MYSQL_PORT must be an integer" })
        .min(1, { message: "MYSQL_PORT must be >= 1" })
        .max(65535, { message: "MYSQL_PORT must be <= 65535" }),

    MYSQL_USER: z
        .string()
        .trim()
        .min(1, { message: "MYSQL_USER is required" }),

    MYSQL_PASSWORD: z
        .string()
        .min(1, { message: "MYSQL_PASSWORD is required" }),

    MYSQL_DB: z
        .string()
        .trim().min(1, { message: "MYSQL_DB is required" }),


    DDB_CACHE_TABLE: z.string().trim().min(1, { message: "DDB_CACHE_TABLE is required" }),

});


export type Env = z.infer<typeof envSchema>;

let _env: Env | null = null;

export function getEnv(): Env {
    if (_env) return _env;

    const parsed = envSchema.safeParse(process.env);
    if (!parsed.success) {
        console.error(
            "Environment variable validation error:",
            parsed.error.format()
        );
        throw new Error("Invalid environment variables");
    }

    _env = parsed.data;
    return _env;
}
