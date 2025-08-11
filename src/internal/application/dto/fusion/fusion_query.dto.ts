import { z } from 'zod'

export const fusionQuerySchema = z.object({
    people: z.coerce.string().regex(/^\d+$/, "people debe ser numérico"),
}).strict();

export type FusionQueryDto = z.infer<typeof fusionQuerySchema>;