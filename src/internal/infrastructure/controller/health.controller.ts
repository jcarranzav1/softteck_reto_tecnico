// src/infrastructure/controller/health.controller.ts
import { injectable } from "inversify";
import type { Request, Response } from "express";
import { Messages } from "@shared/const/messages";
import type { ResponseDto } from "@shared/interfaces/response/response.dto";
import type { HealthResponse } from "@application/dto/health/health.dto.response";

@injectable()
export class HealthController {
    async health(_req: Request, res: Response) {
        const payload: ResponseDto<HealthResponse> = {
            message: Messages.success.health,
            data: { status: "Ok", timestamp: new Date().toISOString() },
        };
        res.status(200).json(payload);
    }
}
