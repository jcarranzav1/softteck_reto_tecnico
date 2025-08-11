import { inject, injectable } from 'inversify'
import { AuthDto } from '@application/dto/auth/authentication.dto'
import { LoginUseCase } from '@application/use_cases/auth/login.use_case'
import { SignUpUseCase } from '@application/use_cases/auth/sign_up.use_case'
import { AccessTokenResponse } from '@application/dto/auth/access_token.response.dto'
import { IAuthService } from '@application/interfaces/auth.interface'

@injectable()
export class AuthService implements IAuthService {
    constructor(
        @inject(SignUpUseCase) private readonly signUpUseCase: SignUpUseCase,
        @inject(LoginUseCase) private readonly loginUseCase: LoginUseCase,
    ) {
    }

    async signUp(authDto: AuthDto): Promise<AccessTokenResponse> {
        return await this.signUpUseCase.execute(authDto)
    }

    async login(authDto: AuthDto): Promise<AccessTokenResponse> {
        return await this.loginUseCase.execute(authDto)
    }
    
}
