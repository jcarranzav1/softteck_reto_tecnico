import { GTA5ProfileEntity } from '@domain/entity/gta5_profile.entity'

export interface IGTA5ProfileRepository {
    create(data: GTA5ProfileEntity): Promise<void>;

    getByProfileName(profileName: string): Promise<GTA5ProfileEntity>
}