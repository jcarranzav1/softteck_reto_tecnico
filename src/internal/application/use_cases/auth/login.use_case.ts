import { inject, injectable } from 'inversify'
import { TYPES } from '@config/inversify/types'
import { IUserRepository } from '@domain/ports/repository/user.port'
import { AuthDto } from '@application/dto/auth/authentication.dto'
import { Unauthorized } from 'http-errors'
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { TokenPayloadDto } from '@application/dto/auth/token.payload.dto'
import { getEnv } from '@config/env/env.config'
import { AccessTokenResponse } from '@application/dto/auth/access_token.response.dto'

@injectable()
export class LoginUseCase {
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
        if (!userExists) throw Unauthorized("Invalid credentials")

        const isSamePassword = await bcrypt.compare(password, userExists.password)
        if (!isSamePassword) throw Unauthorized("Invalid credentials")

        const jwtPayload: TokenPayloadDto = { email: userExists.email, id: userExists.id };
        const accessToken = jwt.sign(jwtPayload, this.jwtSecret, { expiresIn: "2h" });

        return { accessToken };
    }
}
