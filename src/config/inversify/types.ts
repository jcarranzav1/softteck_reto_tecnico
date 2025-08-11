import { IFusionCache } from '@domain/ports/cache/fusion_cache.port'
import { IUserRepository } from '@domain/ports/repository/user.port'
import { IAuthService } from '@application/interfaces/auth.interface'

export const TYPES = {
    DrizzleClient: Symbol.for("DrizzleClient"),
    ISwApi: Symbol.for("ISwApi"),
    ICountriesApi: Symbol.for("ICountriesApi"),
    IFusionRepository: Symbol.for("IFusionRepository"),
    IGTA5ProfileRepository: Symbol.for("IGTA5ProfileRepository"),
    IUserRepository: Symbol.for("IUserRepository"),
    IFusionCache: Symbol.for("IFusionCache"),
    IFusionService: Symbol.for("IFusionService"),
    IAuthService: Symbol.for("IAuthService"),
    IGTA5ProfileService: Symbol.for("IGTA5ProfileService"),
    GTA5ProfileController: Symbol.for("GTA5ProfileController"),
    FusionController: Symbol.for("FusionController"),
    AuthController: Symbol.for("AuthController"),
    HealthController: Symbol.for("HealthController"),
};
