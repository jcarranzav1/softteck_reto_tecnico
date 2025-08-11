import { injectable } from 'inversify'
import axios from 'axios'
import { ISwApi } from '@domain/ports/apis/swapi.port'
import { AxiosException } from '@shared/global_error/custom_errors'

@injectable()
export class SwApi implements ISwApi {
    constructor() {
    }

    async getCharacter<T>(characterId: string): Promise<T> {
        try {
            const response = await axios.get<T>(`https://swapi.info/api/people/${characterId}`, {
                timeout: 30000,
            })
            return response.data
        } catch (err) {
            if (axios.isAxiosError(err)) {
                throw new AxiosException({
                    message: err.message,
                    error: "SWAPI_GET_PEOPLE_ERROR",
                    statusCode: err.response?.status ?? 502,
                    requestUrl: err.config?.url,
                    apiResponse: err.response?.data,
                });
            }
        }
    }

    async getPlanet<T>(urlPlanet: string): Promise<T> {
        try {
            const response = await axios.get<T>(urlPlanet, {
                timeout: 30000,
            })
            return response.data
        } catch (err) {
            if (axios.isAxiosError(err)) {
                throw new AxiosException({
                    message: err.message,
                    error: "SWAPI_GET_PlANET_ERROR",
                    statusCode: err.response?.status ?? 502,
                    requestUrl: err.config?.url,
                    apiResponse: err.response?.data,
                });
            }
        }
    }
}
