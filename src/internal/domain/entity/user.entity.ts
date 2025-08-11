import { v7 as uuidv7 } from 'uuid'

export class UserEntity {
    id: string;
    email: string;
    password: string;
    status: true;
    created_at: Date;
    updated_at: Date;

    constructor(props?: Partial<UserEntity>) {
        if (props) {
            Object.assign(this, props);
        }
    }

    static create(data: Partial<UserEntity>) {
        const entity = new UserEntity();
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