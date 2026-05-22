import { requireAuth } from "@/middleware/auth.js";
import {
    updateUserSettingsAccount,
    updateUserSettingsProfile,
} from "@/repositories/users.js";
import { SettingsContract } from "@my-app/shared";
import { Router } from "express";

const router = Router();

router.put(
    SettingsContract.routes.updateProfile.backend_path(),
    requireAuth,
    async (req, res) => {
        const body = SettingsContract.routes.updateProfile.request.body.parse(
            req.body,
        );

        await updateUserSettingsProfile(
            req.auth?.sub!,
            body.description,
            body.pfp_id,
            body.banner_id,
        )
            .then(() => {
                return res.status(200).json(body);
            })
            .catch((err) => {
                console.log("error: ", err);
                return res.sendStatus(400);
            });

        return;
    },
);

router.put(
    SettingsContract.routes.updateAccount.backend_path(),
    requireAuth,
    async (req, res) => {
        const body = SettingsContract.routes.updateAccount.request.body.parse(
            req.body,
        );

        await updateUserSettingsAccount(
            req.auth?.sub!,
            body.username,
            body.password,
        )
            .then(() => {
                return res.status(200).json(body);
            })
            .catch((err) => {
                console.log("error: ", err);
                return res.sendStatus(400);
            });

        return;
    },
);

export default router;
