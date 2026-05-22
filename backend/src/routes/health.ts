import { healthContract, type HealthResponse } from "@my-app/shared";
import { Router } from "express";

const router = Router();

router.get(healthContract.path, (_req, res) => {
    const response: HealthResponse = {
        ok: true,
        message: "Backend is running",
    };

    res.json(response);
});

export default router;
