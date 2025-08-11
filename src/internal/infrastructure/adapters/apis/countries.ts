import { injectable } from 'inversify'
import axios from 'axios'
import { ICountriesApi } from '@domain/ports/apis/countries.port'
import { AxiosException } from '@shared/global_error/custom_errors'

@injectable()
export class CountriesApi implements ICountriesApi {
    constructor() {
    }

    async getCountry<T>(country: string): Promise<T> {
        const name = encodeURIComponent(country.trim()); // <- maneja espacios y acentos
        const url = `https://restcountries.com/v3.1/name/${name}`;
        try {
            const response = await axios.get<T>(url, {
                timeout: 30000,
                params: { fields: 'name,population,region,subregion,cca3,flags,languages' }
            })
            return response.data
        } catch (err) {
            if (axios.isAxiosError(err)) {
                throw new AxiosException({
                    message: err.message,
                    error: "REST_COUNTRY_ERROR",
                    statusCode: err.response?.status ?? 502,
                    requestUrl: err.config?.url,
                    apiResponse: err.response?.data,
                });
            }
        }
    }


}
