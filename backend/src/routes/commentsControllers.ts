import {
    commentCreate,
    commentGetById,
    commentGetPostImm,
    commentGetReplies,
} from "@/repositories/comments.js";
import { commentContract, CommentCreateRequest } from "@my-app/shared";
import { RequestHandler } from "express";
import { FormatCommentResponse, FormatCommentWithReplies } from "./commentsServices.js";

const comment = commentContract.routes;

export const getByPostController: RequestHandler = async (req, res) => {
    const params = comment.getByPost.request.params.parse(req.params);

    const result = await commentGetPostImm(params.id);

    const formattedResult = await Promise.all(
        result.map(async (comment) => {
            return FormatCommentWithReplies(comment);
        }),
    );

    formattedResult.length >= 0
        ? res
              .status(comment.getByPost.response.status.success)
              .json(formattedResult)
        : res.sendStatus(comment.getByPost.response.status.failed);
};

export const getByPostRepliesController: RequestHandler = async (req, res) => {
    const params = comment.getByReplies.request.params.parse(req.params);

    const result = await commentGetReplies(params.comment_id);

    const formattedResult = await Promise.all(
        result.map(async (comment) => {
            return FormatCommentResponse(comment);
        }),
    );

    formattedResult.length >= 0
        ? res
              .status(comment.getByReplies.response.status.success)
              .json(formattedResult)
        : res.sendStatus(comment.getByReplies.response.status.failed);
};

export const CommentGetByIdController: RequestHandler = async (req, res) => {
    const params = comment.getById.request.params.parse(req.params);

    const result = await commentGetById(params.comment_id);

    if (!result) {
        res.sendStatus(comment.getById.response.status.failed);
    } else {
        const formattedResult = await FormatCommentResponse(result);

        res.status(comment.getById.response.status.success).json(
            formattedResult,
        );
    }
};

export const CommentCreateController: RequestHandler = async (req, res) => {
    try {
        comment.create.request.body.parse(req.body);
    } catch {
        res.sendStatus(comment.create.response.status.failed);
    }

    const body: CommentCreateRequest = req.body;
    const user_id = req.auth!.sub;

    const result = await commentCreate(user_id, body);

    if (!result) {
        res.sendStatus(comment.create.response.status.failed);
    } else {
        const formattedResult = await FormatCommentResponse(result);

        res.status(comment.create.response.status.success).json(
            formattedResult,
        );
    }
};
