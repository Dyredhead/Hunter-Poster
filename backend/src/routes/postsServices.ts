import {
    checkPostLikedByUser,
    // checkPostLikedByUser,
    getImagePostByPostId,
    getPollOptionsByPollId,
    getPollPostByPostId,
    getPollVoteByUserId,
    getPollVotesByPollId,
    getPostBookmarksById,
    getPostCommentsById,
    getPostLikesById,
    getTextImagePostByPostId,
    getTextPostByPostId,
    PostsRow,
} from "@/repositories/posts.js";
import { findUserById } from "@/repositories/users.js";
import {
    Content,
    content_type,
    poll_position_type,
    Post,
} from "@my-app/shared";

async function FormatPostContentService(
    post: PostsRow,
    user_id?: string,
): Promise<Content> {
    let content: Content;

    switch (post.post_type) {
        case content_type.text:
            const textPost = await getTextPostByPostId(post.id);
            content = {
                type: content_type.text,
                content: textPost.text,
            };
            break;

        case content_type.image:
            const imagePost = await getImagePostByPostId(post.id);
            content = {
                type: content_type.image,
                image_id: imagePost.image_id,
            };
            break;

        case content_type.text_image:
            const textImagePost = await getTextImagePostByPostId(post.id);
            content = {
                type: content_type.text_image,
                content: textImagePost.text,
                image_id: textImagePost.image_id,
            };
            break;

        case content_type.poll:
            const pollPost = await getPollPostByPostId(post.id);
            const pollOptions = getPollOptionsByPollId(pollPost.id);
            const votes1 = getPollVotesByPollId(
                pollPost.id,
                poll_position_type._1,
            );
            const votes2 = getPollVotesByPollId(
                pollPost.id,
                poll_position_type._2,
            );
            const votes3 = getPollVotesByPollId(
                pollPost.id,
                poll_position_type._3,
            );
            const votes4 = getPollVotesByPollId(
                pollPost.id,
                poll_position_type._4,
            );
            const pollVotes = [
                await votes1,
                await votes2,
                await votes3,
                await votes4,
            ];
            const yourVote = user_id
                ? getPollVoteByUserId(pollPost.id, user_id)
                : 0;

            content = {
                type: content_type.poll,
                question: pollPost.question,
                closes_at: pollPost.closes_at,
                options: (await pollOptions).map((option) => option.option),
                vote: await yourVote,
                current_votes: pollVotes,
            };
            break;
    }
    return content;
}

export async function FormatPostGetResponseService(
    post: PostsRow,
    user_id?: string,
): Promise<Post> {
    const content = FormatPostContentService(post);
    const comments = getPostCommentsById(post.id);
    const likes = getPostLikesById(post.id);
    const bookmarks = getPostBookmarksById(post.id);

    const liked = user_id 
        ? checkPostLikedByUser(user_id, post.id)
        : false;

    const formattedPost: Post = {
        id: post.id,
        author_id: post.user_id,
        content: await content,
        comments: await comments,
        likes: await likes,
        liked: await liked,
        bookmarks: await bookmarks,
    };

    return formattedPost;
}
