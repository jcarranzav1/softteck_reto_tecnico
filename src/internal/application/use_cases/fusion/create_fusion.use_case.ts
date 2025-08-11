import { inject, injectable } from 'inversify'
import { TYPES } from '@config/inversify/types'
import { IFusionRepository } from '@domain/ports/repository/fusion.port'
import { ICountriesApi } from '@domain/ports/apis/countries.port'
import { ISwApi } from '@domain/ports/apis/swapi.port'
import { countryForPlanetName } from '@shared/const/planet_country_map'
import { Conflict } from 'http-errors'
import { FusionLogEntity, RestCountryEntity, SwPersonEntity, SwPlanetEntity } from '@domain/entity/fusion.entity'
import { IFusionCache } from '@domain/ports/cache/fusion_cache.port'

@injectable()
export class GetOrCreateFusionUseCase {
    constructor(
        @inject(TYPES.IFusionRepository) private readonly fusionRepository: IFusionRepository,
        @inject(TYPES.IFusionCache) private readonly fusionCache: IFusionCache,
        @inject(TYPES.ISwApi) private readonly swApi: ISwApi,
        @inject(TYPES.ICountriesApi) private readonly countriesApi: ICountriesApi,
    ) {
    }

    async execute(actorEmail:string, personId: string): Promise<FusionLogEntity> {
        const cached = await this.fusionCache.get(personId);
        if (cached) return cached;

        const recordExists = await this.fusionRepository.findByPersonId(personId)
        if (recordExists) {
            await this.fusionCache.set(personId, recordExists)
            return recordExists
        }

        const swPerson = await this.swApi.getCharacter<SwPersonEntity>(personId)
        const swPlanet = await this.swApi.getPlanet<SwPlanetEntity>(swPerson.homeworld)
        const countryName = countryForPlanetName(swPlanet.name)
        if (!countryName) {
            throw Conflict(`No country associated with the planet ${swPlanet.name} was found.`)
        }
        const restCountry = await this.countriesApi.getCountry<RestCountryEntity>(countryName)

        const newFusionLog = FusionLogEntity.create({
            person: swPerson,
            planet: swPlanet,
            country: restCountry,
            person_id: personId,
            created_by: actorEmail
        })

        await this.fusionRepository.create(newFusionLog)

        const [fusionLog] = await Promise.all([
            this.fusionRepository.findByPersonId(personId),
            this.fusionCache.set(personId, newFusionLog)
        ])

        return fusionLog
    }
}
