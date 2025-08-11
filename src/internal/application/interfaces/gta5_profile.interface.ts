import { CreateGTA5ProfileDto } from '@application/dto/gta5_profile/create_gta5_profile.dto'
import { GTA5ProfileEntity } from '@domain/entity/gta5_profile.entity'

export interface IGTA5ProfileService {
    create(actorEmail: string, createDto: CreateGTA5ProfileDto): Promise<GTA5ProfileEntity>
}
