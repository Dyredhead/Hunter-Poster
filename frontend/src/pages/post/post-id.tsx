import { getCommentsByPost } from "@/api/comments";
import { getById } from "@/api/posts";
import { Post } from "@/components/Post";
import { UserPreview } from "@/components/UserPreview";
import { type CommentCreateRequest, type Comment, type Post as PostType } from "@my-app/shared";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Page() {
    const postId = useParams().id;
    const [post, setPost] = useState<PostType | null | undefined>();
    const [comments, setcomments] = useState<Comment[] | undefined>();

    useEffect(() => {
        getById(postId!).then((newPost) => {
            setPost(newPost);
            console.log(newPost);

            getCommentsByPost(postId!).then((newComments) => {
                setcomments(newComments);
            })
        } )
    }, [])

    if (post !== undefined && post !== null) {
        return (
            <div>
                <Post post={post}/>

                {comments?.map((comment) => {
                    return (
                        <Comment comment={comment} />
                    )
                })}
            </div>
        )
    } else {
        return (
            <div>
                404 NOT FOUND
            </div>
        )
    }
}

const Comment = ({comment}: {comment: Comment}) => {
    
    return(
        <div>
            <UserPreview 
                id={comment.profile.id}
                pfp_id={comment.profile.pfp_id}
                username={comment.profile.username}
            />
            <p> {comment.content} </p>

            {comment.replies.map((reply) => {
                return (
                    <div key={reply.id} className="translate-x-6">
                        <Comment comment={reply} />
                    </div>
                )
            })};

        </div>
    )
}

const CommentCreate = ({post_id}: {post_id: string}) => {
    const [comment, setComment] = useState<CommentCreateRequest>({
        post_id: post_id,
        content: ""
    });

    return(
        <div></div>
    )
}