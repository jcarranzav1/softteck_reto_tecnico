import { inject, injectable } from "inversify";
import type { NextFunction, Request, Response } from "express";

import { TYPES } from "@config/inversify/types";
import { IGTA5ProfileService } from '@application/interfaces/gta5_profile.interface'
import { CreateGTA5ProfileDto } from '@application/dto/gta5_profile/create_gta5_profile.dto'


@injectable()
export class GTA5ProfileController {
    constructor(
        @inject(TYPES.IGTA5ProfileService)
        private readonly gta5ProfileService: IGTA5ProfileService
    ) {
    }


    async create(req: Request<unknown, unknown, CreateGTA5ProfileDto>, res: Response, next: NextFunction) {
        try {
            const result = await this.gta5ProfileService.create(req.body);
            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    }
}
