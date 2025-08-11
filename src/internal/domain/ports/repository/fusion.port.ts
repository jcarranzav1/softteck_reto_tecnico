import { FusionLogEntity } from '@domain/entity/fusion.entity'
import { PaginationQuery } from '@shared/interfaces/query/pagination.dto'

export interface IFusionRepository {
    create(data: FusionLogEntity): Promise<void>;

    findByPersonId(personId: string): Promise<FusionLogEntity | null>

    findAll(query: PaginationQuery): Promise<FusionLogEntity[]>


    countAll(): Promise<number>
}