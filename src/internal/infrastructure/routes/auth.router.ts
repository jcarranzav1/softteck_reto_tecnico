import { Router } from "express";
import { container } from "@config/inversify/container";
import { TYPES } from "@config/inversify/types";
import { zValidate } from "@shared/middleware/zod_validate.middleware";
import { authSchema } from '@application/dto/auth/authentication.dto'
import { AuthController } from '@infrastructure/controller/auth.controller'

const router = Router();
const controller = container.get<AuthController>(TYPES.AuthController);

router.post(
    "/auth/signup",
    zValidate({ body: authSchema }),
    controller.signUp.bind(controller)
);

router.post(
    "/auth/login",
    zValidate({ body: authSchema }),
    controller.login.bind(controller)
);

export default router;
