import { boolean, char, datetime, index, mysqlSchema, uniqueIndex, varchar, } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const TechnicalChallengeSqlSchema = mysqlSchema("reto_tecnico");

export const UserSchema = TechnicalChallengeSqlSchema.table(
    "user",
    {
        id: char("id", { length: 36 }).primaryKey(),
        email: varchar("email", { length: 320 }).notNull(),
        password: varchar("password", { length: 100 }).notNull(),
        status: boolean("status").notNull().default(true),
        created_at: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
        updated_at: datetime("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    },
    (t) => ({
        ux_email: uniqueIndex("ux_user_email").on(t.email),
        idx_status: index("idx_user_status").on(t.status),
    })
);