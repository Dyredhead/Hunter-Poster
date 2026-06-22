import { commentGetReplies, CommentRow } from "@/repositories/comments.js";
import { findUserById } from "@/repositories/users.js";
import { CommentSchema } from "@my-app/shared";

export async function FormatCommentResponse(
    comment: CommentRow,
    user_id?: string,
) {
    const user = await findUserById(comment.user_id);

    const formattedComment: CommentSchema = {
        id: comment.id,
        profile: {
            id: comment.user_id,
            pfp_id: user!.pfp_id,
            username: user!.username,
        },
        post_id: comment.post_id,
        content: comment.content,
        likes: 0,
        liked: false,
        comment_id: comment.comment_id,
        replies: []
    };

    return formattedComment; 
}


export async function FormatCommentWithReplies(comment: CommentRow) {
    const formattedComment = await FormatCommentResponse(comment);

    const replies = await commentGetReplies(formattedComment.id);

    if (replies.length > 0) {
        formattedComment.replies = await Promise.all(
            replies.map(async (comment) => {
                return FormatCommentWithReplies(comment);
            })
        );        
    }

    return formattedComment;
}