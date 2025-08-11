import { FusionLogEntity } from "@domain/entity/fusion.entity";

export interface IFusionCache {
    get(personId: string): Promise<FusionLogEntity | null>;

    set(personId: string, value: FusionLogEntity): Promise<void>;

    delete(personId: string): Promise<void>;
}
