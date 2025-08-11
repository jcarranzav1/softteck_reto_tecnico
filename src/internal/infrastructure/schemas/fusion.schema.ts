import { char, datetime, index, json, mysqlSchema, uniqueIndex, varchar } from "drizzle-orm/mysql-core";
import { RestCountryEntity, SwPersonEntity, SwPlanetEntity } from '@domain/entity/fusion.entity'
import { sql } from "drizzle-orm";

export const fusionSqlSchema = mysqlSchema("reto_tecnico");

export const FusionLogSchema = fusionSqlSchema.table(
    "fusion_logs",
    {
        id: char("id", { length: 36 }).primaryKey(),
        person_id: varchar("person_id", { length: 3 }).notNull(),
        person: json("person").$type<SwPersonEntity>().notNull(),
        planet: json("planet").$type<SwPlanetEntity>().notNull(),
        country: json("country").$type<RestCountryEntity>().notNull(),
        created_at: datetime("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
        updated_at: datetime("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
        created_by: varchar("created_by", { length: 255 }).notNull().default("system"),
        updated_by: varchar("updated_by", { length: 255 }).notNull().default("system"),
    },
    (fusion) => ({
        idxCreatedAt: index("idx_fusion_created_at").on(fusion.created_at),
        uqIdxPersonId: uniqueIndex("uq_idx_fusion_person_id").on(fusion.person_id)
    })
);
