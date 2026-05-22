import {
    postContract,
    type PostCreateRequest,
    type PostGetByFollowingResponse,
    type PostGetByForYouResponse,
    type PostLikeRequest,
} from "@my-app/shared";
import { apiFetch } from "./client";

export async function likePost(request: PostLikeRequest): Promise<Response> {
    const body = postContract.routes.like.request.body.parse(request);

    const response = await apiFetch<PostLikeRequest>(
        postContract.routes.like.frontend_path(),
        postContract.routes.like.method,
        body,
    );

    return response;
}

export async function unlikePost(request: PostLikeRequest): Promise<Response> {
    const body = postContract.routes.unlike.request.body.parse(request);

    const response = await apiFetch<PostLikeRequest>(
        postContract.routes.unlike.frontend_path(),
        postContract.routes.unlike.method,
        body,
    );

    return response;
}

const Post = postContract.routes;

export async function createPost(request: PostCreateRequest): Promise<number> {
    const response = await apiFetch<PostCreateRequest>(
        Post.create.frontend_path(),
        Post.create.method,
        request,
    );

    return response.status;
}

export async function getByForYou(): Promise<PostGetByForYouResponse> {
    const response = await apiFetch(
        Post.getByForYou.frontend_path(),
        Post.getByForYou.method,
    );

    try {
        return response.json();
    } catch (err) {
        console.log({ err });
        return [];
    }
}

export async function getByFollowing(): Promise<PostGetByFollowingResponse> {
    const response = await apiFetch(
        Post.getByFollowing.frontend_path(),
        Post.getByFollowing.method,
    );

    try {
        return response.json();
    } catch (err) {
        console.log({ err });
        return [];
    }
}
