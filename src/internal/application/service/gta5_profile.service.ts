import { inject, injectable } from 'inversify'
import { CreateGTA5ProfileUseCase } from '@application/use_cases/gta5_profile/create_gt5_profile.use_case'
import { CreateGTA5ProfileDto } from '@application/dto/gta5_profile/create_gta5_profile.dto'
import { GTA5ProfileEntity } from '@domain/entity/gta5_profile.entity'
import { IGTA5ProfileService } from '@application/interfaces/gta5_profile.interface'

@injectable()
export class GTA5ProfileService implements IGTA5ProfileService {
    constructor(
        @inject(CreateGTA5ProfileUseCase) private readonly createGTA5ProfileUseCase: CreateGTA5ProfileUseCase,
    ) {
    }

    async create(createDto: CreateGTA5ProfileDto): Promise<GTA5ProfileEntity> {
        return await this.createGTA5ProfileUseCase.execute(createDto)
    }
}
