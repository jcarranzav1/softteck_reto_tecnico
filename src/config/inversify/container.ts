import "reflect-metadata";

import { Container } from "inversify";
import { TYPES } from "./types";
import { HealthController } from '@infrastructure/controller/health.controller'
import { FusionRepository } from '@infrastructure/adapters/repository/fusion.repository'
import { DrizzleClient } from '@infrastructure/database/client.database'
import { SwApi } from '@infrastructure/adapters/apis/swApi'
import { CountriesApi } from '@infrastructure/adapters/apis/countries'
import { GetOrCreateFusionUseCase } from '@application/use_cases/fusion/create_fusion.use_case'
import { GetHistoryUseCase } from '@application/use_cases/fusion/get_history.use_case'
import { FusionService } from '@application/service/fusion.service'
import { IFusionRepository } from '@domain/ports/repository/fusion.port'
import { ISwApi } from '@domain/ports/apis/swapi.port'
import { ICountriesApi } from '@domain/ports/apis/countries.port'
import { IFusionService } from '@application/interfaces/fusion.interface'
import { FusionController } from '@infrastructure/controller/fusion.controller'
import { IFusionCache } from '@domain/ports/cache/fusion_cache.port'
import { FusionCacheDynamo } from '@infrastructure/adapters/cache/fusion.cache'
import { IGTA5ProfileRepository } from '@domain/ports/repository/gta_5.profile.port'
import { GTA5ProfileRepository } from '@infrastructure/adapters/repository/gt5_profile.repository'
import { CreateGTA5ProfileUseCase } from '@application/use_cases/gta5_profile/create_gt5_profile.use_case'
import { GTA5ProfileService } from '@application/service/gta5_profile.service'
import { IGTA5ProfileService } from '@application/interfaces/gta5_profile.interface'
import { GTA5ProfileController } from '@infrastructure/controller/gta5_profile.controller'


const container = new Container({ defaultScope: "Singleton" })

container.bind<DrizzleClient>(TYPES.DrizzleClient).to(DrizzleClient)
container.bind<ISwApi>(TYPES.ISwApi).to(SwApi)
container.bind<ICountriesApi>(TYPES.ICountriesApi).to(CountriesApi)
container.bind<IFusionRepository>(TYPES.IFusionRepository).to(FusionRepository)
container.bind<IGTA5ProfileRepository>(TYPES.IGTA5ProfileRepository).to(GTA5ProfileRepository)
container.bind<IFusionCache>(TYPES.IFusionCache).to(FusionCacheDynamo)

container.bind(GetOrCreateFusionUseCase).toSelf();
container.bind(GetHistoryUseCase).toSelf();
container.bind(CreateGTA5ProfileUseCase).toSelf();

container.bind<IFusionService>(TYPES.IFusionService).to(FusionService)
container.bind<IGTA5ProfileService>(TYPES.IGTA5ProfileService).to(GTA5ProfileService)

container.bind<FusionController>(TYPES.FusionController).to(FusionController)
container.bind<GTA5ProfileController>(TYPES.GTA5ProfileController).to(GTA5ProfileController)
container.bind<HealthController>(TYPES.HealthController).to(HealthController)

export { container };
