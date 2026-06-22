import { commentContract, type CommentGetByPostResponse, type CommentSchema } from "@my-app/shared";
import { apiFetch } from "./client";

const comment = commentContract.routes;

export async function GetCommentsByPost(post_id: string): Promise<CommentGetByPostResponse | undefined> {
    const response = await apiFetch(
        comment.getByPost.frontend_path(post_id),
        comment.getByPost.method
    )

    try {
        return response.json();
    } catch(err) {
        console.log({ err });
        return undefined;
    }
}