import { inject, injectable } from "inversify";
import type { NextFunction, Request, Response } from "express";

import { TYPES } from "@config/inversify/types";
import type { IFusionService } from "@application/interfaces/fusion.interface";
import type { ResponseDto, ResponseListDto } from "@shared/interfaces/response/response.dto";
import type { FusionLogEntity } from "@domain/entity/fusion.entity";
import { FusionQueryDto } from '@application/dto/fusion/fusion_query.dto'
import { SuccessMessages } from '@shared/const/success_messages'


@injectable()
export class FusionController {
    constructor(
        @inject(TYPES.IFusionService)
        private readonly fusionService: IFusionService
    ) {
    }

    async fuseByPerson(req: Request & { query: FusionQueryDto }, res: Response, next: NextFunction) {
        try {
            const peopleId = req.query.people;
            const fusion = await this.fusionService.getOrCreate(peopleId);

            const payload: ResponseDto<FusionLogEntity> = {
                message: SuccessMessages.fusion,
                data: fusion,
            };
            res.status(200).json(payload);
        } catch (err) {
            next(err);
        }
    }

    async history(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.fusionService.getHistory(req.query as any);

            const payload: ResponseListDto<FusionLogEntity[]> = {
                message: SuccessMessages.history,
                ...result
            };
            res.status(200).json(payload);
        } catch (err) {
            next(err);
        }
    }
}
