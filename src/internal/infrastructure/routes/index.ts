import { Router } from "express";
import health from "@infrastructure/routes/health.router";
import fusion from "@infrastructure/routes/fusion.router";

const router = Router();
router.use(health);
router.use(fusion);

export default router;