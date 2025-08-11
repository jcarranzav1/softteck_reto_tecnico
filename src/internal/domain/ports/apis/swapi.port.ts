export interface ISwApi {
    getCharacter<T>(characterId: string): Promise<T>

    getPlanet<T>(urlPlanet: string): Promise<T>
}