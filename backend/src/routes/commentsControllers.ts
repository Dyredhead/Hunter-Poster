import {
    commentCreate,
    commentGetById,
    commentGetByPost,
    commentGetReplies,
} from "@/repositories/comments.js";
import { commentContract, CommentCreateRequest } from "@my-app/shared";
import { RequestHandler } from "express";
import { FormatCommentResponse } from "./commentsServices.js";

const comment = commentContract.routes;

export const getByPostController: RequestHandler = async (req, res) => {
    const reqContract = comment.getByPost.request;

    const parsedPath = reqContract.path_params.safeParse(req.params);
    const parsedQuery = reqContract.query_params.safeParse(req.query);

    if (!parsedPath.success) {
        res.status(400).json(parsedPath.error.flatten())
    }

    const pathParams = parsedPath.data!;

    const commentList = parsedQuery.success
        ? await commentGetByPost(pathParams.id, parsedQuery.data.page_size, parsedQuery.data.cursor)
        : await commentGetByPost(pathParams.id, 20);

    
    const formattedComments = await Promise.all(
        commentList.map(async (comment) => {
            return FormatCommentResponse(comment);
        }),
    );

    res.status(200).json(formattedComments);
};


export const getByPostRepliesController: RequestHandler = async (req, res) => {
    const reqContract = comment.getByReplies.request;

    const parsedPath = reqContract.path_params.safeParse(req.params);
    const parsedQuery = reqContract.query_params.safeParse(req.query);

    if (!parsedPath.success) {
        res.status(400).json(parsedPath.error.flatten())
    }

    const pathParams = parsedPath.data!;

    const commentList = parsedQuery.success
        ? await commentGetReplies(pathParams.id, parsedQuery.data.cursor)
        : await commentGetReplies(pathParams.id);

    const formattedComments = await Promise.all(
        commentList.map(async (comment) => {
            return FormatCommentResponse(comment);
        }),
    );

    res.status(200).json(formattedComments);
};


export const CommentGetByIdController: RequestHandler = async (req, res) => {
    const reqContract = comment.getById.request;

    const params = reqContract.path_params.safeParse(req.params);

    if (!params.success) {
        res.status(400).json(params.error.flatten())
    }

    const result = await commentGetById(params.data!.id);

    if (!result) {
        res.sendStatus(404);
    } else {
        const formattedResult = await FormatCommentResponse(result);

        res.status(200).json(formattedResult);
    }
};


export const CommentCreateController: RequestHandler = async (req, res) => {
    const parsedBody = comment.create.request.body.safeParse(req.body)

    if(!parsedBody.success) {
        res.status(400).json(parsedBody.error.flatten())
    }

    const user_id = req.auth!.sub;

    const result = await commentCreate(user_id, parsedBody.data!);

    if (!result) {
        res.sendStatus(400);
    } else {
        const formattedResult = await FormatCommentResponse(result);

        res.status(200).json(formattedResult);
    }
};
