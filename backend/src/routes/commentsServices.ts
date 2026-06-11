import { CommentRow } from "@/repositories/comments.js";
import { findUserById } from "@/repositories/users.js";
import { Comment } from "@my-app/shared";

export async function FormatCommentResponseService(
    comment: CommentRow,
    user_id?: string,
) {
    const username = findUserById(comment.user_id);

    const formattedComment: Comment = {
        id: comment.id,
        user_id: comment.user_id,
        username: (await username)?.username ?? "",
        post_id: comment.post_id,
        content: comment.content,
        likes: 0,
        liked: false,
        comment_id: comment.comment_id,
    };

    return formattedComment;
}
