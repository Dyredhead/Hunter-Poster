import { Router } from "express";
import { loginContract } from "@my-app/shared";
import { verifyUserCredentials } from "@/repositories/users.js";
import { signAccessToken } from "@/jwt.js";

const router = Router();

router.post(loginContract.mount, async (req, res) => {
    const body = loginContract.routes.login.request.body.parse(req.body);

    const user = await verifyUserCredentials(body.email, body.password);

    if (!user) {
        return res.status(401).json({
            error: "Unauthorized",
            message: "Either the email or password was incorrect",
        });
    }

    let jwt = signAccessToken(user.id);

    return res.status(200).json({ token: jwt });
});

export default router;
