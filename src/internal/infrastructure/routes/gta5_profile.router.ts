import { Router } from "express";
import { container } from "@config/inversify/container";
import { TYPES } from "@config/inversify/types";
import { zValidate } from "@shared/middleware/zod_validate.middleware";
import { createGTA5ProfileSchema } from '@application/dto/gta5_profile/create_gta5_profile.dto'
import { GTA5ProfileController } from '@infrastructure/controller/gta5_profile.controller'
import { authMiddleware } from '@shared/middleware/auth.middleware'

const router = Router();
const controller = container.get<GTA5ProfileController>(TYPES.GTA5ProfileController);

router.post(
    "/almacenar",
    authMiddleware,
    zValidate({ body: createGTA5ProfileSchema }),
    controller.create.bind(controller)
);


export default router;
