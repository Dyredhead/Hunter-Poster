import {
    bookmarkPost,
    checkPostBookmarkedByUser,
    checkPostLikedByUser,
    createImagePost,
    createPollPost,
    createTextImagePost,
    createTextPost,
    getPostsById,
    getPostsFollowing,
    getPostsForYou,
    likePost,
    PostsRow,
    unbookmarkPost,
    unlikePost,
} from "@/repositories/posts.js";
import { postContract, PostCreateRequest } from "@my-app/shared";
import { RequestHandler } from "express";
import { FormatPostGetResponseService } from "./postsServices.js";

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
            await createImagePost(user_id, body.image_id);
            break;

        case "text_image":
            await createTextImagePost(user_id, body.content, body.image_id);
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

    if (!formattedRes) res.sendStatus(404);
    else
        res.status(200).json(
            Post.getById.responses[200].body.parse(formattedRes),
        );
};

export const postGetByForYouController: RequestHandler = async (req, res) => {
    const result: PostsRow[] = await getPostsForYou(req.auth?.sub!);

    const formattedRes = await Promise.all(
        result.map(async (post) => {
            return FormatPostGetResponseService(post);
        }),
    );

    res.status(200).json(formattedRes);
};

export const postGetByFollowingController: RequestHandler = async (
    req,
    res,
) => {
    const result: PostsRow[] = await getPostsFollowing(req.auth?.sub!);

    const formattedRes = await Promise.all(
        result.map(async (post) => {
            return FormatPostGetResponseService(post);
        }),
    );

    res.status(200).json(formattedRes);
};

// Like
export const PostLikedByUserController: RequestHandler = async (req, res) => {
    const params = Post.checkLiked.request.params.parse(req.params);

    try {
        const result = await checkPostLikedByUser(req.auth!.sub, params.id);
        res.status(200).json({ isLiked: result });
    } catch {
        res.sendStatus(404);
    }
};

export const likePostController: RequestHandler = async (req, res) => {
    const body = Post.like.request.body.parse(req.body);

    try {
        await likePost(req.auth!.sub, body.post_id);
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(404);
    }
};

export const unlikePostController: RequestHandler = async (req, res) => {
    const body = Post.unlike.request.body.parse(req.body);

    try {
        await unlikePost(req.auth!.sub, body.post_id);
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(404);
    }
};

// Bookmark
export const PostBookmarkedByUserController: RequestHandler = async (
    req,
    res,
) => {
    const params = Post.checkBookmarked.request.params.parse(req.params);

    try {
        const result = await checkPostBookmarkedByUser(
            req.auth!.sub,
            params.id,
        );

        res.status(200).json({ isBookmarked: result });
    } catch {
        res.sendStatus(404);
    }
};

export const bookmarkPostController: RequestHandler = async (req, res) => {
    const body = Post.bookmark.request.body.parse(req.body);

    try {
        await bookmarkPost(req.auth!.sub, body.post_id);
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(404);
    }
};

export const unbookmarkPostController: RequestHandler = async (req, res) => {
    const body = Post.unbookmark.request.body.parse(req.body);

    try {
        await unbookmarkPost(req.auth!.sub, body.post_id);
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(404);
    }
};
