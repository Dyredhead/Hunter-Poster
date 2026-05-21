import { requireAuth } from "@/middleware/auth.js";
import { PostsRow } from "@/repositories/posts.js";
import {
    findUserById,
    getFollowersById,
    getFollowingById,
    getPostsById,
} from "@/repositories/users.js";
import { usersContract } from "@my-app/shared";
import { Router } from "express";
import { FormatPostGetResponseService } from "./postServices.js";

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

router.get(
    usersContract.routes.getById.backend_path(),
    requireAuth,
    async (req, res) => {
        const params = usersContract.routes.getById.request.params.parse(
            req.params,
        );

        let body = await findUserById(params.id)
            .then((res) => res)
            .catch((err) => {
                console.error("no such user");
            });

        return res.status(200).json(body);
    },
);

router.get(
    usersContract.routes.getFollowersById.backend_path(),
    requireAuth,
    async (req, res) => {
        const params =
            usersContract.routes.getFollowersById.request.params.parse(
                req.params,
            );

        let body = await getFollowersById(params.id)
            .then((res) => res)
            .catch((err) => {
                console.error("no such user");
            });

        return res.status(200).json(body);
    },
);

router.get(
    usersContract.routes.getFollowingById.backend_path(),
    requireAuth,
    async (req, res) => {
        const params =
            usersContract.routes.getFollowingById.request.params.parse(
                req.params,
            );

        let body = await getFollowingById(params.id)
            .then((res) => res)
            .catch((err) => {
                console.error("no such user");
            });

        return res.status(200).json(body);
    },
);

router.get(
    usersContract.routes.getPostsbyId.backend_path(),
    requireAuth,
    async (req, res) => {
        const params = usersContract.routes.getPostsbyId.request.params.parse(
            req.params,
        );

        const result: PostsRow[] = await getPostsById(params.id);

        const formattedRes = await Promise.all(
            result.map(async (post) => {
                return FormatPostGetResponseService(post);
            }),
        );

        return res.status(200).json(formattedRes);
    },
);

export default router;
