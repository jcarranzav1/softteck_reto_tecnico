import { inject, injectable } from 'inversify'
import { DrizzleClient } from '@infrastructure/database/client.database'
import { IFusionRepository } from '@domain/ports/repository/fusion.port'
import { TYPES } from '@config/inversify/types'
import { FusionLogEntity } from '@domain/entity/fusion.entity'
import { FusionLogSchema } from '@infrastructure/schemas'
import { count, desc, eq } from 'drizzle-orm'
import { plainToInstance } from "class-transformer";
import { PaginationQuery } from '@shared/interfaces/query/pagination.dto'

@injectable()
export class FusionRepository implements IFusionRepository {
    constructor(
        @inject(TYPES.DrizzleClient) private readonly drizzleClient: DrizzleClient,
    ) {
    }

    async create(entity: FusionLogEntity): Promise<void> {
        await this.drizzleClient.db.insert(FusionLogSchema).values(entity);
    }

    async findByPersonId(personId: string): Promise<FusionLogEntity | null> {
        const fusion = await this.drizzleClient.db.select().from(FusionLogSchema).where(eq(FusionLogSchema.person_id, personId))
        if (!fusion[0]) return null

        return plainToInstance(FusionLogEntity, fusion[0])
    }

    async findAll(query: PaginationQuery): Promise<FusionLogEntity[]> {
        const { limit, page } = query
        const rows = await this.drizzleClient.db
            .select()
            .from(FusionLogSchema)
            .orderBy(desc(FusionLogSchema.created_at))
            .limit(limit)
            .offset((page - 1) * limit);

        return plainToInstance(FusionLogEntity, rows)
    }

    async countAll(): Promise<number> {
        const result = await this.drizzleClient.db.select({ count: count() }).from(FusionLogSchema);

        return result[0].count
    }

}
