import { injectable } from "inversify";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, } from "@aws-sdk/lib-dynamodb";
import { FusionLogEntity } from "@domain/entity/fusion.entity";
import { IFusionCache } from '@domain/ports/cache/fusion_cache.port'
import { getEnv } from '@config/env/env.config'
import { FusionCacheRecordDto } from '@application/dto/cache/fusion_cache.dto'

1800

@injectable()
export class FusionCacheDynamo implements IFusionCache {
    private static readonly TTL_SECONDS = 1800;
    private readonly document: DynamoDBDocumentClient;
    private readonly table: string;

    constructor() {
        const ddb = new DynamoDBClient({});
        this.document = DynamoDBDocumentClient.from(ddb, {
            marshallOptions: {
                removeUndefinedValues: true,
                convertClassInstanceToMap: true
            },
        });

        this.table = getEnv().DDB_CACHE_TABLE;
    }

    async get(id: string): Promise<FusionLogEntity | null> {
        const response = await this.document.send(new GetCommand({
            TableName: this.table,
            Key: { key: this.key(id) },
            ConsistentRead: false,
        }));
        if (!response.Item) return null;

        const { value, ttl } = response.Item as FusionCacheRecordDto;
        const now = Math.floor(Date.now() / 1000);

        const timeHasPassedTTL = ttl <= now;
        if (timeHasPassedTTL) {
            this.delete(id).catch(() => void 0);
            return null;
        }
        
        return value ?? null;
    }

    async set(id: string, value: FusionLogEntity): Promise<void> {
        const ttl = Math.floor(Date.now() / 1000) + FusionCacheDynamo.TTL_SECONDS;
        const payload: FusionCacheRecordDto = {
            key: this.key(id),
            value,
            ttl,
            created_at: new Date().toISOString(),
        };

        await this.document.send(new PutCommand({
            TableName: this.table,
            Item: payload,
        }));
    }

    async delete(id: string): Promise<void> {
        await this.document.send(new DeleteCommand({
            TableName: this.table,
            Key: { key: this.key(id) },
        }));
    }

    private key(id: string) {
        return `fusion:${id}`;
    }
}
