import { requireAuth } from "@/middleware/auth.js";
import { findUserById } from "@/repositories/users.js";
import { usersContract } from "@my-app/shared";
import { Router } from "express";

const router = Router();

router.get(
    usersContract.routes.getCurrent.backend_path(),
    requireAuth,
    async (req, res) => {
        await findUserById(req.auth?.sub!)
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

router.get(usersContract.routes.getById.backend_path(), async (req, res) => {
    const params = usersContract.routes.getById.request.params.parse(
        req.params,
    );

    let body = await findUserById(params.id)
        .then((res) => res)
        .catch((err) => {
            console.error("no such user");
        });

    return res.status(200).json(body);
});

export default router;
