import { inject, injectable } from 'inversify'
import { TYPES } from '@config/inversify/types'
import { IUserRepository } from '@domain/ports/repository/user.port'
import { AuthDto } from '@application/dto/auth/authentication.dto'
import { Conflict } from 'http-errors'
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { UserEntity } from '@domain/entity/user.entity'
import { TokenPayloadDto } from '@application/dto/auth/token.payload.dto'
import { getEnv } from '@config/env/env.config'
import { AccessTokenResponse } from '@application/dto/auth/access_token.response.dto'

@injectable()
export class SignUpUseCase {
    private readonly jwtSecret: string;

    constructor(
        @inject(TYPES.IUserRepository) private readonly userRepository: IUserRepository,
    ) {
        const env = getEnv()
        this.jwtSecret = env.JWT_SECRET;
    }

    async execute(authDto: AuthDto): Promise<AccessTokenResponse> {
        const { email, password } = authDto
        const userExists = await this.userRepository.findByEmail(email);
        if (userExists) throw Conflict("Email already registered")

        const hash = await bcrypt.hash(password, 10);
        const newUser = UserEntity.create({
            email,
            password: hash,
        })

        await this.userRepository.create(newUser);

        const jwtPayload: TokenPayloadDto = { email, id: newUser.id };
        const accessToken = jwt.sign(jwtPayload, this.jwtSecret, { expiresIn: "2h" });

        return { accessToken };
    }
}
