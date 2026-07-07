import { getCommentsByPost } from "@/api/comments";
import { getById } from "@/api/posts";
import { Post } from "@/components/Post";
import { UserPreview } from "@/components/UserPreview";
import { type CommentCreateRequest, type Comment, type Post as PostType } from "@my-app/shared";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

interface CommentNode extends Comment {
    replies: CommentNode[],
}

export default function Page() {
    const postId = useParams().id;
    const [post, setPost] = useState<PostType | null | undefined>();
    const [comments, setComments] = useState<Comment[] | undefined>();
    const [commentCreate, setCommentCreate] = useState<CommentCreateRequest>({parent_id: null, post_id: "", content: ""});

    // initial page load
    useEffect(() => {
        getById(postId!).then((newPost) => {
            setPost(newPost);
            console.log(newPost);

            if (newPost) {
                setCommentCreate({
                    parent_id: null,
                    post_id: newPost.id,
                    content: "",
                })
            }

            getCommentsByPost(postId!).then((newComments) => {
                setComments(newComments);
            })
        } )
    }, [])

    // creates tree structure if new comments come in
    const commentRoots = useMemo(() => {
        const commentMap = new Map<string, CommentNode>();
        let roots: CommentNode[] = [];
        
        comments?.forEach((comment) => {
            commentMap.set(comment.id, {...comment, replies: []})
        });

        comments?.forEach((comment) => {
            const mappedNode = commentMap.get(comment.id)!;

            if (comment.parent_id === null) {
                roots.push(mappedNode)
            } else {
                const parentNode = commentMap.get(comment.parent_id);
                if (parentNode) parentNode.replies.push(mappedNode);
            }
        });

        return roots;
    }, [comments]);

    // checks if post exists
    if (post !== undefined && post !== null) {
        return (
            <div>
                <Post post={post}/>

                {commentRoots.map((comment) => 
                    <Comment 
                        key={comment.id}
                        comment={comment}
                        onContentClick={() => {setCommentCreate({...commentCreate, parent_id: comment.id})}}
                    />
                )}

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


const Comment = ({comment, onContentClick}: {
    comment: CommentNode,
    onContentClick: (id: string)=>void,
}) => {
    return(
        <div>
            <UserPreview 
                id={comment.profile.id}
                pfp_id={comment.profile.pfp_id}
                username={comment.profile.username}
            />
            
            <p onClick={() => onContentClick(comment.id)}> {comment.content} </p>

            <div className="translate-x-6 transition-all duration-300 hover:bg-gray-400">
                {comment.replies.map((reply) => {
                    return <Comment
                        key={reply.id} 
                        comment={reply} 
                        onContentClick={onContentClick} 
                    />
                })}
            </div>
        </div>
    )
}


const CommentCreate = ({createRequest}: {createRequest: CommentCreateRequest}) => {
    return(
        <div></div>
    )
}