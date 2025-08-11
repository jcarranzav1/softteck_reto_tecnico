import { injectable } from "inversify";
import mysql, { type Pool } from "mysql2/promise";
import { drizzle, type MySql2Database } from "drizzle-orm/mysql2";
import * as schema from "@infrastructure/schemas";
import { getEnv } from '@config/env/env.config'

export type DB = MySql2Database<typeof schema>;
const env = getEnv()

@injectable()
export class DrizzleClient {
    public readonly pool: Pool;
    public readonly db: DB;

    constructor() {
        this.pool = mysql.createPool({
            host: env.MYSQL_HOST,
            port: env.MYSQL_PORT ?? 3306,
            user: env.MYSQL_USER,
            password: env.MYSQL_PASSWORD,
            database: env.MYSQL_DB,
            connectionLimit: 4,
            waitForConnections: true,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
        });

        this.db = drizzle(this.pool, { schema, mode: "default" });
    }

    async close(): Promise<void> {
        await this.pool.end();
    }
}

export { schema };
