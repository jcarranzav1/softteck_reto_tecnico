import { PaginationQuery } from '@shared/interfaces/query/pagination.dto'
import { ResponseListDto } from '@shared/interfaces/response/response.dto'
import { FusionLogEntity } from '@domain/entity/fusion.entity'

export interface IFusionService {
    getHistory(query: PaginationQuery): Promise<ResponseListDto<FusionLogEntity[]>>

    getOrCreate(personId: string): Promise<FusionLogEntity>
}
