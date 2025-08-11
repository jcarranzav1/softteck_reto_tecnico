import type { RequestHandler } from "express";
import { type ZodTypeAny } from "zod";

type Source = "query" | "body" | "params" | "headers";

export function zValidate(schemas: Partial<Record<Source, ZodTypeAny>>): RequestHandler {
    return (req, _res, next) => {
        const sources: Source[] = ["query", "body", "params", "headers"];

        for (const src of sources) {
            const schema = schemas[src];
            if (!schema) continue;

            const parsed = schema.parse((req as any)[src]);

            (req as any)[src] = parsed;
        }
        next();
    };
}