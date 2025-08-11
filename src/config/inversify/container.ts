import "reflect-metadata";

import { Container } from "inversify";
import { TYPES } from "./types";
import { HealthController } from '@infrastructure/controller/health.controller'
import { FusionRepository } from '@infrastructure/adapters/repository/fusion.repository'
import { DrizzleClient } from '@infrastructure/database/client.database'
import { SwApi } from '@infrastructure/adapters/apis/swApi'
import { CountriesApi } from '@infrastructure/adapters/apis/countries'
import { GetOrCreateFusionUseCase } from '@application/use_cases/create_fusion.use_case'
import { GetHistoryUseCase } from '@application/use_cases/get_history.use_case'
import { FusionService } from '@application/service/fusion.service'
import { IFusionRepository } from '@domain/ports/repository/fusion.port'
import { ISwApi } from '@domain/ports/apis/swapi.port'
import { ICountriesApi } from '@domain/ports/apis/countries.port'
import { IFusionService } from '@application/interfaces/fusion.interface'
import { FusionController } from '@infrastructure/controller/fusion.controller'


const container = new Container({ defaultScope: "Singleton" })

container.bind<DrizzleClient>(TYPES.DrizzleClient).to(DrizzleClient)
container.bind<ISwApi>(TYPES.ISwApi).to(SwApi)
container.bind<ICountriesApi>(TYPES.ICountriesApi).to(CountriesApi)
container.bind<IFusionRepository>(TYPES.IFusionRepository).to(FusionRepository)

container.bind(GetOrCreateFusionUseCase).toSelf();
container.bind(GetHistoryUseCase).toSelf();

container.bind<IFusionService>(TYPES.IFusionService).to(FusionService)

container.bind<FusionController>(TYPES.FusionController).to(FusionController)
container.bind<HealthController>(TYPES.HealthController).to(HealthController)

export { container };
