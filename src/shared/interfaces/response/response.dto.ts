import { z } from 'zod'

export const paginationSchema = z
    .object({
        totalRecords: z.number().int().nonnegative(),
        currentPage: z.number().int().min(1),
        totalPages: z.number().int().min(0),
        nextPage: z.number().int().min(0),
        prevPage: z.number().int().min(0),
    })
    .strict();

export type PaginationDto = z.infer<typeof paginationSchema>;


export interface ResponseDto<T> {
    message?: string;
    data?: T;
};

export interface ResponseListDto<T> extends ResponseDto<T> {
    pagination: PaginationDto;
};

