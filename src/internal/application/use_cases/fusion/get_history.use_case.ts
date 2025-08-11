import { inject, injectable } from 'inversify'
import { TYPES } from '@config/inversify/types'
import { IFusionRepository } from '@domain/ports/repository/fusion.port'
import { FusionLogEntity } from '@domain/entity/fusion.entity'
import { ResponseListDto } from '@shared/interfaces/response/response.dto'
import { PaginationQuery } from '@shared/interfaces/query/pagination.dto'
import { paginate } from '@shared/utils/paginate'

@injectable()
export class GetHistoryUseCase {
    constructor(
        @inject(TYPES.IFusionRepository) private readonly fusionRepository: IFusionRepository,
    ) {
    }

    async execute(query: PaginationQuery): Promise<ResponseListDto<FusionLogEntity[]>> {
        const { limit, page } = query

        const [records, total] = await Promise.all([
            this.fusionRepository.findAll(query),
            this.fusionRepository.countAll(),
        ])

        const pagination = paginate({ limit, page, total })

        return { data: records, pagination }
    }
}
