import { UserEntity } from '@domain/entity/user.entity'

export interface IUserRepository {
    create(user: UserEntity): Promise<void>;

    findByEmail(email: string): Promise<UserEntity | null>
}