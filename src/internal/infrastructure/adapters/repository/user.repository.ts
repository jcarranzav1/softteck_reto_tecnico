// src/infrastructure/adapters/repository/user.repository.ts
import { inject, injectable } from "inversify";
import { DrizzleClient } from "@infrastructure/database/client.database";
import { TYPES } from "@config/inversify/types";
import { UserSchema } from "@infrastructure/schemas/user.schema";
import { eq } from "drizzle-orm";
import { IUserRepository } from '@domain/ports/repository/user.port'
import { UserEntity } from '@domain/entity/user.entity'
import { plainToInstance } from 'class-transformer'

@injectable()
export class UserRepository implements IUserRepository {
    constructor(@inject(TYPES.DrizzleClient) private readonly drizzle: DrizzleClient) {
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const [user] = await this.drizzle.db.select().from(UserSchema).where(eq(UserSchema.email, email));
        if (!user) return null
        
        return plainToInstance(UserEntity, user);
    }

    async create(user: UserEntity): Promise<void> {
        await this.drizzle.db.insert(UserSchema).values(user);
    }
}
