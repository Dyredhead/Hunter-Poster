import { Router } from "express";
import { commentContract } from "@my-app/shared";
import { requireAuth } from "@/middleware/auth.js";
import { CommentCreateController, CommentGetByIdController, getByPostImmController, getByPostRepliesController } from "./commentsControllers.js";

const router = Router();

const comment = commentContract.routes;

router.get(comment.getByPostImm.backend_path(), requireAuth, getByPostImmController);
router.get(comment.getByReplies.backend_path(), requireAuth, getByPostRepliesController);
router.get(comment.getById.backend_path(), requireAuth, CommentGetByIdController);
router.post(comment.create.backend_path(), requireAuth, CommentCreateController);
