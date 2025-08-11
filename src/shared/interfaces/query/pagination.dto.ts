import { z } from 'zod'


export const paginationQuerySchema = z.object({
    page: z.coerce.number().int().min(1).max(1000).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
}).strict();

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;