// src/infrastructure/controller/fusion.controller.ts
import { inject, injectable } from "inversify";
import type { NextFunction, Request, Response } from "express";

import { TYPES } from "@config/inversify/types";
import type { IFusionService } from "@application/interfaces/fusion.interface";
import type { ResponseDto } from "@shared/interfaces/response/response.dto";
import type { FusionLogEntity } from "@domain/entity/fusion.entity";
import { FusionQueryDto } from '@application/dto/fusion/fusion_query.dto'


@injectable()
export class FusionController {
    constructor(
        @inject(TYPES.IFusionService)
        private readonly fusionService: IFusionService
    ) {
    }

    async fuseByPerson(req: Request & { query: FusionQueryDto }, res: Response, next: NextFunction) {
        try {
            const peopleId = (req.query as any).people as string;
            const entity = await this.fusionService.getOrCreate(peopleId);
            const body: ResponseDto<FusionLogEntity> = { message: "ok", data: entity };
            res.status(200).json(body);
        } catch (err) {
            next(err);
        }
    }

    async history(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.fusionService.getHistory(req.query as any);
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }
}
