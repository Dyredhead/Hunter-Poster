import {
    postContract,
    type PostBookmarkRequest,
    type PostCheckBookmarkedRequest,
    type PostCheckLikedRequest,
    type PostCreateRequest,
    type PostGetByFollowingResponse,
    type PostGetByForYouResponse,
    type PostGetByIdResponse,
    type PostLikeRequest,
    type PostUnbookmarkRequest,
    type PostUnlikeRequest,
} from "@my-app/shared";
import { apiFetch } from "./client";

const post = postContract.routes;

export async function createPost(request: PostCreateRequest): Promise<number> {
    const response = await apiFetch<PostCreateRequest>(
        post.create.frontend_path(),
        post.create.method,
        request,
    );

    return response.status;
}

export async function getByForYou(): Promise<PostGetByForYouResponse> {
    const response = await apiFetch(
        post.getByForYou.frontend_path(),
        post.getByForYou.method,
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
        post.getByFollowing.frontend_path(),
        post.getByFollowing.method,
    );

    try {
        return response.json();
    } catch (err) {
        console.log({ err });
        return [];
    }
}

export async function getById(post_id: string): Promise<PostGetByIdResponse> {
    const response = await apiFetch(
        post.getById.frontend_path(post_id),
        post.getById.method,
    );

    return post.getById.response.body.parse(response.body);
}

// Like
export async function checkLikedByUser(
    request: PostCheckLikedRequest,
): Promise<Response> {
    const response = await apiFetch<PostCheckLikedRequest>(
        post.checkLiked.frontend_path(request.id),
        post.checkLiked.method,
    );

    return response;
}

export async function likePost(request: PostLikeRequest): Promise<Response> {
    const body = post.unlike.request.body.parse(request);

    const response = await apiFetch<PostLikeRequest>(
        post.like.frontend_path(),
        post.like.method,
        body,
    );

    return response;
}

export async function unlikePost(
    request: PostUnlikeRequest,
): Promise<Response> {
    const body = post.unlike.request.body.parse(request);

    const response = await apiFetch<PostUnlikeRequest>(
        post.unlike.frontend_path(),
        post.unlike.method,
        body,
    );

    return response;
}

// Bookmark

export async function checkBookmarkedByUser(
    request: PostCheckBookmarkedRequest,
): Promise<Response> {
    const response = await apiFetch<PostCheckBookmarkedRequest>(
        post.checkBookmarked.frontend_path(request.id),
        post.checkBookmarked.method,
    );

    return response;
}

export async function bookmarkPost(
    request: PostBookmarkRequest,
): Promise<Response> {
    const body = post.bookmark.request.body.parse(request);

    const response = await apiFetch<PostBookmarkRequest>(
        post.bookmark.frontend_path(),
        post.bookmark.method,
        body,
    );

    return response;
}

export async function unbookmarkPost(
    request: PostUnbookmarkRequest,
): Promise<Response> {
    const body = post.unbookmark.request.body.parse(request);

    const response = await apiFetch<PostUnbookmarkRequest>(
        post.unbookmark.frontend_path(),
        post.unbookmark.method,
        body,
    );

    return response;
}
