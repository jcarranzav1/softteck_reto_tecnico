import { inject, injectable } from 'inversify'
import { DrizzleClient } from '@infrastructure/database/client.database'
import { TYPES } from '@config/inversify/types'
import { IGTA5ProfileRepository } from '@domain/ports/repository/gta_5.profile.port'
import { GTA5ProfileEntity } from '@domain/entity/gta5_profile.entity'
import { GTA5ProfileSchema } from '@infrastructure/schemas/gta_profile.schema'
import { eq } from 'drizzle-orm'
import { plainToInstance } from 'class-transformer'

@injectable()
export class GTA5ProfileRepository implements IGTA5ProfileRepository {
    constructor(
        @inject(TYPES.DrizzleClient) private readonly drizzleClient: DrizzleClient,
    ) {
    }

    async create(entity: GTA5ProfileEntity): Promise<void> {
        await this.drizzleClient.db.insert(GTA5ProfileSchema).values(entity);
    }

    async getByProfileName(profileName: string): Promise<GTA5ProfileEntity> {
        const gt5Profile =
            await this.drizzleClient.db.select().from(GTA5ProfileSchema).where(eq(GTA5ProfileSchema.profile_name, profileName))

        if (!gt5Profile[0]) return null

        return plainToInstance(GTA5ProfileEntity, gt5Profile[0])
    }

}
