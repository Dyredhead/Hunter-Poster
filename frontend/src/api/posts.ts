import {
    postContract,
    type PostBookmarkRequest,
    type PostCheckBookmarkedRequest,
    type PostCheckLikedRequest,
    type PostCreateRequest,
    type PostGetByFollowingResponse,
    type PostGetByForYouResponse,
    type PostLikeRequest,
    type PostUnbookmarkRequest,
    type PostUnlikeRequest,
} from "@my-app/shared";
import { apiFetch } from "./client";

export async function createPost(request: PostCreateRequest): Promise<number> {
    const response = await apiFetch<PostCreateRequest>(
        postContract.routes.create.frontend_path(),
        postContract.routes.create.method,
        request,
    );

    return response.status;
}

export async function getByForYou(): Promise<PostGetByForYouResponse> {
    const response = await apiFetch(
        postContract.routes.getByForYou.frontend_path(),
        postContract.routes.getByForYou.method,
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
        postContract.routes.getByFollowing.frontend_path(),
        postContract.routes.getByFollowing.method,
    );

    try {
        return response.json();
    } catch (err) {
        console.log({ err });
        return [];
    }
}

// Like
export async function checkLikedByUser(
    request: PostCheckLikedRequest,
): Promise<Response> {
    const response = await apiFetch<PostCheckLikedRequest>(
        postContract.routes.checkLiked.frontend_path(request.id),
        postContract.routes.checkLiked.method,
    );

    return response;
}

export async function likePost(request: PostLikeRequest): Promise<Response> {
    const body = postContract.routes.unlike.request.body.parse(request);

    const response = await apiFetch<PostLikeRequest>(
        postContract.routes.like.frontend_path(),
        postContract.routes.like.method,
        body,
    );

    return response;
}

export async function unlikePost(
    request: PostUnlikeRequest,
): Promise<Response> {
    const body = postContract.routes.unlike.request.body.parse(request);

    const response = await apiFetch<PostUnlikeRequest>(
        postContract.routes.unlike.frontend_path(),
        postContract.routes.unlike.method,
        body,
    );

    return response;
}

// Bookmark

export async function checkBookmarkedByUser(
    request: PostCheckBookmarkedRequest,
): Promise<Response> {
    console.log("here1");
    const response = await apiFetch<PostCheckBookmarkedRequest>(
        postContract.routes.checkBookmarked.frontend_path(request.id),
        postContract.routes.checkBookmarked.method,
    );
    console.log("response: ", response);
    console.log("here2");

    return response;
}

export async function bookmarkPost(
    request: PostBookmarkRequest,
): Promise<Response> {
    const body = postContract.routes.bookmark.request.body.parse(request);

    const response = await apiFetch<PostBookmarkRequest>(
        postContract.routes.bookmark.frontend_path(),
        postContract.routes.bookmark.method,
        body,
    );

    return response;
}

export async function unbookmarkPost(
    request: PostUnbookmarkRequest,
): Promise<Response> {
    const body = postContract.routes.unbookmark.request.body.parse(request);

    const response = await apiFetch<PostUnbookmarkRequest>(
        postContract.routes.unbookmark.frontend_path(),
        postContract.routes.unbookmark.method,
        body,
    );

    return response;
}
