import { Router } from "express";
import { postContract } from "@my-app/shared";
import { createUser } from "@/repositories/users.js";
import { optionalAuth, requireAuth } from "@/middleware/auth.js";
import {
    postCreateController,
    postGetByFollowingController,
    postGetByForYouController,
    postGetByIdController,
} from "./postControllers.js";

const router = Router();

const Post = postContract.routes;

router.post(Post.create.backend_path(), requireAuth, postCreateController);
router.get(Post.getByForYou.backend_path(), optionalAuth, postGetByForYouController);
router.get(Post.getByFollowing.backend_path(), requireAuth, postGetByFollowingController);
router.get(Post.getById.backend_path(), postGetByIdController);

export default router;
