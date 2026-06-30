import { commentGetReplies, CommentRow, countTotalReplies } from "@/repositories/comments.js";
import { findUserById } from "@/repositories/users.js";
import { type Comment } from "@my-app/shared";

export async function FormatCommentResponse(
    comment: CommentRow,
    user_id?: string,
) {
    const replies = countTotalReplies(comment.id);
    const user = await findUserById(comment.user_id);

    const formattedComment: Comment = {
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
        parent_id: comment.parent_id,
        total_replies: await replies,
    };

    return formattedComment; 
}