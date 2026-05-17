import {
    createImagePost,
    createPollPost,
    createTextImagePost,
    createTextPost,
    getPostAll,
    getPostsById,
    getPostsForYou,
    PostsRow,
} from "@/repositories/posts.js";
import { ContentSchema, postContract, PostCreateRequest } from "@my-app/shared";
import { RequestHandler } from "express";
import { FormatPostGetResponseService } from "./postServices.js";

const Post = postContract.routes;

export const postCreateController: RequestHandler = async (req, res) => {
    try {
        Post.create.request.body.parse(req.body);
    } catch (err) {
        res.sendStatus(Post.create.response.failed);
    }

    const body: PostCreateRequest = req.body;
    const user_id = req.auth!.sub;
    switch (body.type) {
        case "text":
            await createTextPost(user_id, body.content);
            break;

        case "image":
            await createImagePost(user_id, body.image_url);
            break;

        case "text_image":
            await createTextImagePost(user_id, body.content, body.image_url);
            break;

        case "poll":
            await createPollPost(
                user_id,
                body.question,
                body.options,
                body.closes_at,
            );
            break;
    }
    res.json(Post.create.response.post_created);
};

export const postGetByIdController: RequestHandler = async (req, res) => {
    const result = await getPostsById(String(req.params.id));

    const formattedRes = result
        ? await FormatPostGetResponseService(result)
        : null;

    if (!formattedRes) res.sendStatus(Post.getById.response.notFound);
    else res.status(200).json(Post.getById.response.post.parse(formattedRes));
};

export const postGetByForYouController: RequestHandler = async (req, res) => {
    let result: PostsRow[];
    if (!req.auth) {
        result = await getPostAll();
    } else {
        result = await getPostsForYou(req.auth.sub);
    }

    const formattedRes = await Promise.all(
        result.map(async (post) => {
            return FormatPostGetResponseService(post);
        }),
    );

    res.status(200).send(formattedRes);
};

export const postGetByFollowingController: RequestHandler = async (
    req,
    res,
) => {};
