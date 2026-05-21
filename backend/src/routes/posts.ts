import { requireAuth } from "@/middleware/auth.js";
import { postContract } from "@my-app/shared";
import { Router } from "express";
import {
    postCreateController,
    postGetByFollowingController,
    postGetByForYouController,
    postGetByIdController,
} from "./postControllers.js";

const router = Router();

const Post = postContract.routes;

router.post(Post.create.backend_path(), requireAuth, postCreateController);
router.get(
    Post.getByForYou.backend_path(),
    // optionalAuth,
    requireAuth,
    postGetByForYouController,
);
router.get(
    Post.getByFollowing.backend_path(),
    requireAuth,
    postGetByFollowingController,
);
router.get(Post.getById.backend_path(), postGetByIdController);

export default router;
