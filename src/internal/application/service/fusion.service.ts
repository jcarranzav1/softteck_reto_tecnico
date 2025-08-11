import { IFusionService } from '@application/interfaces/fusion.interface'
import { inject, injectable } from 'inversify'
import { GetHistoryUseCase } from '@application/use_cases/fusion/get_history.use_case'
import { GetOrCreateFusionUseCase } from '@application/use_cases/fusion/create_fusion.use_case'
import { PaginationQuery } from '@shared/interfaces/query/pagination.dto'
import { ResponseListDto } from '@shared/interfaces/response/response.dto'
import { FusionLogEntity } from '@domain/entity/fusion.entity'

@injectable()
export class FusionService implements IFusionService {
    constructor(
        @inject(GetOrCreateFusionUseCase) private readonly createFusionUseCase: GetOrCreateFusionUseCase,
        @inject(GetHistoryUseCase) private readonly getHistoryUseCase: GetHistoryUseCase,
    ) {
    }

    async getOrCreate(actorEmail: string, personId: string): Promise<FusionLogEntity> {
        return await this.createFusionUseCase.execute(actorEmail, personId)
    }

    async getHistory(query: PaginationQuery): Promise<ResponseListDto<FusionLogEntity[]>> {
        return await this.getHistoryUseCase.execute(query)
    }


}
