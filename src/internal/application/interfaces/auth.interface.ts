import { AuthDto } from '@application/dto/auth/authentication.dto'
import { AccessTokenResponse } from '@application/dto/auth/access_token.response.dto'

export interface IAuthService {
    signUp(authDto: AuthDto): Promise<AccessTokenResponse>

    login(authDto: AuthDto): Promise<AccessTokenResponse>
}
