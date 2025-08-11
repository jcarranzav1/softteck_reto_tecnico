import { Router } from "express";
import health from "@infrastructure/routes/health.router";
import fusion from "@infrastructure/routes/fusion.router";
import gta5_profile from "@infrastructure/routes/gta5_profile.router";

const router = Router();
router.use(health);
router.use(fusion);
router.use(gta5_profile);

export default router;