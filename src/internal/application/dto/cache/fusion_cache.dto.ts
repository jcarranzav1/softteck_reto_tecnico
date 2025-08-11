import { z } from 'zod'
import { FusionLogEntity } from '@domain/entity/fusion.entity'

const FusionCacheRecordSchema = z.object({
    key: z.string().nonempty(),
    value: z.unknown(),
    ttl: z.number().int().nonnegative(),
    created_at: z.string().nonempty(),
});

export type CacheRecordDto<T> = Omit<z.infer<typeof FusionCacheRecordSchema>, "value"> & { value: T };


export type FusionCacheRecordDto = CacheRecordDto<FusionLogEntity>;
