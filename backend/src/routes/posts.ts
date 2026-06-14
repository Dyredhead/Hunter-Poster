import { requireAuth } from "@/middleware/auth.js";
import { checkPostBookmarkedByUser } from "@/repositories/posts.js";
import { postContract } from "@my-app/shared";
import { Router } from "express";
import {
    bookmarkPostController,
    likePostController,
    PostBookmarkedByUserController,
    postCreateController,
    postGetByFollowingController,
    postGetByForYouController,
    postGetByIdController,
    PostLikedByUserController,
    unbookmarkPostController,
    unlikePostController,
} from "./postsControllers.js";

const router = Router();

router.post(
    postContract.routes.create.backend_path(),
    requireAuth,
    postCreateController,
);
router.get(
    postContract.routes.getByForYou.backend_path(),
    // optionalAuth,
    requireAuth,
    postGetByForYouController,
);
router.get(
    postContract.routes.getByFollowing.backend_path(),
    requireAuth,
    postGetByFollowingController,
);
router.get(postContract.routes.getById.backend_path(), requireAuth, postGetByIdController);

// Like
router.get(
    postContract.routes.checkLiked.backend_path(),
    requireAuth,
    PostLikedByUserController,
);

router.post(
    postContract.routes.like.backend_path(),
    requireAuth,
    likePostController,
);
router.delete(
    postContract.routes.unlike.backend_path(),
    requireAuth,
    unlikePostController,
);

// Bookmark
router.get(
    postContract.routes.checkBookmarked.backend_path(),
    requireAuth,
    PostBookmarkedByUserController,
);

router.post(
    postContract.routes.bookmark.backend_path(),
    requireAuth,
    bookmarkPostController,
);

router.delete(
    postContract.routes.unbookmark.backend_path(),
    requireAuth,
    unbookmarkPostController,
);

export default router;
