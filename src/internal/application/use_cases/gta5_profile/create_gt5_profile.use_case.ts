import { inject, injectable } from 'inversify'
import { TYPES } from '@config/inversify/types'
import { IGTA5ProfileRepository } from '@domain/ports/repository/gta_5.profile.port'
import { CreateGTA5ProfileDto } from '@application/dto/gta5_profile/create_gta5_profile.dto'
import { GTA5ProfileEntity } from '@domain/entity/gta5_profile.entity'

@injectable()
export class CreateGTA5ProfileUseCase {
    constructor(
        @inject(TYPES.IGTA5ProfileRepository) private readonly gta5ProfileRepository: IGTA5ProfileRepository,
    ) {
    }

    async execute(createDto: CreateGTA5ProfileDto): Promise<GTA5ProfileEntity> {
        const newProfile = GTA5ProfileEntity.create(createDto)
        await this.gta5ProfileRepository.create(newProfile)

        return await this.gta5ProfileRepository.getByProfileName(createDto.profile_name)
    }
}
