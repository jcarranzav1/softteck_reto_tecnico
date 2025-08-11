import { PaginationDto } from '@shared/interfaces/response/response.dto'

interface PaginationParams {
    limit: number
    page: number
    total: number
}

export function paginate({ limit, page, total }: PaginationParams): PaginationDto {
    const totalPages = Math.ceil(total / limit)
    const nextPage = page < totalPages ? page + 1 : null
    const prevPage = page > 1 ? page - 1 : null

    return {
        totalRecords: total,
        currentPage: page,
        totalPages,
        nextPage,
        prevPage,
    }
}
