export interface ICountriesApi {
    getCountry<T>(country: string): Promise<T>
}