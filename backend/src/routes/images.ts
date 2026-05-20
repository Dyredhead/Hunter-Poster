import { requireAuth } from "@/middleware/auth.js";
import { findImageById } from "@/repositories/images.js";
import { ImageContract } from "@my-app/shared";
import { Router } from "express";

const router = Router();

router.get(
    ImageContract.routes.getById.backend_path(),
    requireAuth,
    async (req, res) => {
        await findImageById(req.auth?.sub!)
            .then((body) => {
                if (body != null) {
                    return res.status(200).json(body);
                } else {
                }
            })
            .catch((err) => {
                console.log("no such user");
                return res.sendStatus(400);
            });

        return;
    },
);
