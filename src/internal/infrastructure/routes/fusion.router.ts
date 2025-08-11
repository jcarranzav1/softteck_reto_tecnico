import { Router } from "express";
import { container } from "@config/inversify/container";
import { TYPES } from "@config/inversify/types";
import { FusionController } from "@infrastructure/controller/fusion.controller";
import { zValidate } from "@shared/middleware/zod_validate.middleware";
import { fusionQuerySchema } from "@application/dto/fusion/fusion_query.dto";
import { paginationQuerySchema } from "@shared/interfaces/query/pagination.dto";

const router = Router();
const controller = container.get<FusionController>(TYPES.FusionController);

router.get(
    "/fusionados",
    zValidate({ query: fusionQuerySchema }),
    controller.fuseByPerson.bind(controller)
);

router.get(
    "/historial",
    zValidate({ query: paginationQuerySchema }),
    controller.history.bind(controller)
);

export default router;
