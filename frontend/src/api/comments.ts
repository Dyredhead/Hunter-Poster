import { commentContract, type CommentCreateRequest, type CommentGetByPostRequest, type CommentGetByPostResponse, type CommentGetRepliesRequest, type CommentGetRepliesResponse } from "@my-app/shared";
import { apiFetch } from "./client";

const comment = commentContract.routes;

export async function getCommentsByPost(postId: string, query?: CommentGetByPostRequest): Promise<CommentGetByPostResponse | undefined> {
    const response = await apiFetch<undefined, typeof query>(
        comment.getByPost.frontend_path(postId),
        comment.getByPost.method,
        undefined,
        query
    )

    try {
        const temp = response.json();
        const parsedComments = comment.getByPost.response.safeParse(temp);

        if (parsedComments.success) {
            return parsedComments.data;
        } else {
            console.log(parsedComments.error);
            return undefined;
        }

    } catch(err) {
        console.log({ err });
        return undefined;
    }
}


export async function getCommentReplies(parentId: string, query?: CommentGetRepliesRequest): Promise<CommentGetRepliesResponse | undefined> {
    const response = await apiFetch<undefined, typeof query>(
        comment.getByReplies.frontend_path(parentId),
        comment.getByReplies.method,
        undefined,
        query
    )

    try {
        const temp = response.json();
        const parsedComments = comment.getByReplies.response.safeParse(temp);

        if (parsedComments.success) {
            return parsedComments.data;
        } else {
            console.log(parsedComments.error);
            return undefined;
        }

    } catch(err) {
        console.log({ err });
        return undefined;
    }
}

export async function createComment(postId: string, commentRequest: CommentCreateRequest) {
    const response = await apiFetch<typeof commentRequest>(
        comment.create.frontend_path(postId),
        comment.create.method,
        commentRequest
    )

    try {
        const temp = response.json();
        const parsedComments = comment.create.response.safeParse(temp);

        if (parsedComments.success) {
            return parsedComments.data;
        } else {
            console.log(parsedComments.error);
            return undefined;
        }

    } catch(err) {
        console.log({ err });
        return undefined;
    }    
}