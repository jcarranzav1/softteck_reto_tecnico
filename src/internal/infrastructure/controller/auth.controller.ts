import { inject, injectable } from "inversify";
import type { NextFunction, Request, Response } from "express";

import { TYPES } from "@config/inversify/types";
import { IAuthService } from '@application/interfaces/auth.interface'
import { AuthDto } from '@application/dto/auth/authentication.dto'
import type { ResponseDto } from '@shared/interfaces/response/response.dto'
import { SuccessMessages } from '@shared/const/success_messages'
import { AccessTokenResponse } from '@application/dto/auth/access_token.response.dto'


@injectable()
export class AuthController {
    constructor(
        @inject(TYPES.IAuthService)
        private readonly authService: IAuthService
    ) {
    }


    async signUp(req: Request<unknown, unknown, AuthDto>, res: Response, next: NextFunction) {
        try {
            const result = await this.authService.signUp(req.body);
            const payload: ResponseDto<AccessTokenResponse> = {
                message: SuccessMessages.signup,
                data: result,
            };
            res.status(201).json(payload);
        } catch (err) {
            next(err);
        }
    }

    async login(req: Request<unknown, unknown, AuthDto>, res: Response, next: NextFunction) {
        try {
            const result = await this.authService.login(req.body);
            const payload: ResponseDto<AccessTokenResponse> = {
                message: SuccessMessages.login,
                data: result,
            };
            res.status(200).json(payload);
        } catch (err) {
            next(err);
        }
    }
}
