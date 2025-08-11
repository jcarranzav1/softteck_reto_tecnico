import { v7 as uuidv7 } from "uuid";

export interface SwPersonEntity {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}

export interface SwPlanetEntity {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
}

export interface RestCountryEntity {
    name: {
        common: string;
        official: string;
        nativeName?: Record<string, { official: string; common: string }>;
    };
    population: number;
    region?: string;
    subregion?: string;
    cca3: string;
    flags?: {
        png?: string;
        svg?: string;
        alt?: string;
    };
    languages?: Record<string, string>;
}

export class FusionLogEntity {
    id: string;
    person_id: string;
    person: SwPersonEntity;
    planet: SwPlanetEntity;
    country: RestCountryEntity;
    status: true;
    created_by: string;
    update_by: string;
    created_at: Date;
    updated_at: Date;

    constructor(props?: Partial<FusionLogEntity>) {
        if (props) {
            Object.assign(this, props);
        }
    }

    static create(data: Partial<FusionLogEntity>) {
        const entity = new FusionLogEntity();
        Object.assign(entity, {
            id: uuidv7(),
            created_at: new Date(),
            updated_at: new Date(),
            status: true,
            ...data,
        });
        return entity;
    }
}