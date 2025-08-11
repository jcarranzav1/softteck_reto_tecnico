import {
    boolean,
    char,
    datetime,
    double,
    index,
    int,
    json,
    mysqlEnum,
    mysqlSchema,
    uniqueIndex,
    varchar,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import {
    ActivityEnum,
    CameraModeEnum,
    CharacterEnum,
    ControlSchemeEnum,
    ModeEnum,
    OnlineRoleEnum,
    PlatformEnum,
} from "@shared/enum/gta5.enum";


export const TechnicalChallengeSqlSchema = mysqlSchema("reto_tecnico");
const CONTROL_SCHEME_VALUES = Object.values(ControlSchemeEnum) as [string, ...string[]];
const CAMERA_MODE_VALUES = Object.values(CameraModeEnum) as [string, ...string[]];


export const GTA5ProfileSchema = TechnicalChallengeSqlSchema.table(
    "gta5_profile",
    {
        id: char("id", { length: 36 }).primaryKey(),

        profile_name: varchar("profile_name", { length: 100 })
            .notNull(),
        platforms: json("platforms").$type<PlatformEnum[]>().notNull(),
        modes_enabled: json("modes_enabled").$type<ModeEnum[]>().notNull(),
        is_voice_chat_enabled: boolean("is_voice_chat_enabled").notNull().default(false),
        control_scheme: mysqlEnum("control_scheme", CONTROL_SCHEME_VALUES)
            .notNull()
            .default(ControlSchemeEnum.CONTROLLER),

        camera_preference: mysqlEnum("camera_preference", CAMERA_MODE_VALUES)
            .notNull()
            .default(CameraModeEnum.THIRD_PERSON),
        hours_played: double("hours_played").notNull().default(0),
        completion_percent: int("completion_percent").notNull().default(0),
        rank_online: int("rank_online").notNull().default(0),
        kd_ratio: double("kd_ratio").notNull().default(0),
        mission_ids_completed: json("mission_ids_completed").$type<number[]>().notNull(),
        owned_vehicle_names: json("owned_vehicle_names").$type<string[]>().notNull(),
        favorite_weapons: json("favorite_weapons").$type<string[]>().notNull(),
        characters_unlocked: json("characters_unlocked").$type<CharacterEnum[]>().notNull(),
        online_roles: json("online_roles").$type<OnlineRoleEnum[]>().notNull(),
        preferred_activities: json("preferred_activities").$type<ActivityEnum[]>().notNull(),
        status: boolean("status").notNull().default(true),
        created_by: varchar("created_by", { length: 255 }),
        updated_by: varchar("updated_by", { length: 255 }),
        created_at: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
        updated_at: datetime("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    },
    (table) => ({
        ux_profile_name: uniqueIndex("ux_gta5_profile_profile_name").on(table.profile_name),
        idx_status: index("idx_gta5_profile_status").on(table.status),
    })
);
