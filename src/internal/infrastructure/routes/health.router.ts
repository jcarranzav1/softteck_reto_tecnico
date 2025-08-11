import { Router } from "express";
import { container } from "@config/inversify/container";
import { TYPES } from "@config/inversify/types";
import { HealthController } from "@infrastructure/controller/health.controller";

const healthRouter = Router();
const controller = container.get<HealthController>(TYPES.HealthController);

healthRouter.get("/health", controller.health.bind(controller));

export default healthRouter;
