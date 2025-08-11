import { IFusionCache } from '@domain/ports/cache/fusion_cache.port'

export const TYPES = {
    DrizzleClient: Symbol.for("DrizzleClient"),
    ISwApi: Symbol.for("ISwApi"),
    ICountriesApi: Symbol.for("ICountriesApi"),
    IFusionRepository: Symbol.for("IFusionRepository"),
    IGTA5ProfileRepository: Symbol.for("IGTA5ProfileRepository"),
    IFusionCache: Symbol.for("IFusionCache"),
    IFusionService: Symbol.for("IFusionService"),
    IGTA5ProfileService: Symbol.for("IGTA5ProfileService"),
    GTA5ProfileController: Symbol.for("GTA5ProfileController"),
    FusionController: Symbol.for("FusionController"),
    HealthController: Symbol.for("HealthController"),
};
