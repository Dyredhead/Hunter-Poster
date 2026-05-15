import { Router } from "express";
import { postContract } from "@my-app/shared";
import { createUser } from "@/repositories/users.js";

const router = Router();

router.post(postContract.routes.like.mount, async (req, res) => {
    const body = registerContract.routes.register.request.body.parse(req.body);
    await createUser(body.username, body.email, body.password).catch((err) => {
        switch (err.type) {
            case "EMAIL_TAKEN":
                return res.status(401).json({
                    error: "Unauthorized",
                    message: "A user with that email already exists",
                });
            case "USERNAME_TAKEN":
                return res.status(401).json({
                    error: "Unauthorized",
                    message: "A user with that username already exists",
                });
        }
    });
    return res.sendStatus(200);
});

export default router;
