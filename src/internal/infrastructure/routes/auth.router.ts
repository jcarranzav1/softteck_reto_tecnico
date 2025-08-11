import { Router } from "express";
import { container } from "@config/inversify/container";
import { TYPES } from "@config/inversify/types";
import { zValidate } from "@shared/middleware/zod_validate.middleware";
import { authSchema } from '@application/dto/auth/authentication.dto'
import { AuthController } from '@infrastructure/controller/auth.controller'

const authRouter = Router();
const controller = container.get<AuthController>(TYPES.AuthController);

authRouter.post(
    "/auth/signup",
    zValidate({ body: authSchema }),
    controller.signUp.bind(controller)
);

authRouter.post(
    "/auth/login",
    zValidate({ body: authSchema }),
    controller.login.bind(controller)
);

export default authRouter;
