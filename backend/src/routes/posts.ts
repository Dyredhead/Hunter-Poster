import { requireAuth } from "@/middleware/auth.js";
import { postContract } from "@my-app/shared";
import { Router } from "express";
import {
    likePostController,
    postCreateController,
    postGetByFollowingController,
    postGetByForYouController,
    postGetByIdController,
    PostLikedByUserController,
    unlikePostController,
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

router.post(Post.like.backend_path(), requireAuth, likePostController);
router.delete(Post.unlike.backend_path(), requireAuth, unlikePostController);
router.get(
    Post.checkLike.backend_path(),
    requireAuth,
    PostLikedByUserController,
);

export default router;
