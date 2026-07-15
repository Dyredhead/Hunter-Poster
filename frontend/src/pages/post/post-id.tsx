import { createComment, getCommentReplies, getCommentsByPost } from "@/api/comments";
import { getById } from "@/api/posts";
import { EndOfPage } from "@/components/EndOfPage";
import { Post } from "@/components/Post";
import { UserPreview } from "@/components/UserPreview";
import { type CommentCreateRequest, type Comment, type Post as PostType, type CommentGetRepliesRequest, type CommentGetByPostRequest } from "@my-app/shared";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

interface CommentNode extends Comment {
    replies: CommentNode[],
}

export default function Page() {
    const postId = useParams().id;
    const [post, setPost] = useState<PostType | null | undefined>();
    const [comments, setComments] = useState<Comment[] | undefined>();
    const [commentCreate, setCommentCreate] = useState<CommentCreateRequest & {parent_user?: string}>({parent_id: null, post_id: "", content: ""});
    const nextCursor = useRef<string>(null);

    const submitComment: React.SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();

        createComment(commentCreate as CommentCreateRequest).then((newComment) => {
            if (newComment)
                setComments([newComment, ...(comments ?? [])])
        })
    }

    const loadReplies = async (parent_id: string, query?: CommentGetRepliesRequest) => {
        const newReplies = await getCommentReplies(parent_id, query);
        if (newReplies) {
            setComments([...(comments ?? []), ...(newReplies ?? [])]);
        }
    }

    const loadRootComments = async () => {
        const query: CommentGetByPostRequest | undefined = nextCursor.current
            ? { cursor: nextCursor.current, page_size: 10}
            : undefined;
        
        const newRoots = await getCommentsByPost(postId!, query);
        if (newRoots) {
            setComments([...(comments ?? []), ...(newRoots)]);
        }
    }

        // creates tree structure if new comments come in
    const commentRoots = useMemo(() => {
        const commentMap = new Map<string, CommentNode>();
        let roots: CommentNode[] = [];
        
        const commentNodes = comments?.map<CommentNode>((comment) => {
            return {...comment, replies:[]};
        })

        commentNodes?.forEach((comment) => {
            commentMap.set(comment.id, comment)
        });

        commentNodes?.forEach((comment) => {
            if (comment.parent_id === null) {
                roots.push(comment)
            } else {
                const parentNode = commentMap.get(comment.parent_id);
                if (parentNode) parentNode.replies.push(comment);
            }
        });

        if (roots.length > 0)
            nextCursor.current = roots[roots.length - 1].id;

        return roots;
    }, [comments]);


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


    // checks if post exists
    if (post !== undefined && post !== null) {
        return (
            <div>
                <Post post={post}/>

                {commentRoots.map((comment) => 
                    <Comment 
                        key={comment.id}
                        comment={comment}
                        onContentClick={(id, user) => {
                            setCommentCreate({...commentCreate, parent_id: id, parent_user: user})
                        }}
                        onRepliesClick={loadReplies}
                    />
                )}
                <div className="h-60"></div>

                {comments && comments.length > 0 && <EndOfPage callback={loadRootComments}/>}

                <form 
                    onSubmit={submitComment} 
                    className="flex-col justify-start fixed bottom-20 left-0 w-full bg-white rounded-lg"
                >
                    {commentCreate.parent_id && <div 
                        className="h-5 w-full bg-white rounded-lg"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCommentCreate({...commentCreate, parent_id: null, parent_user: ""})}
                        }
                    >
                        <p className="bg-gray-200 hover:bg-gray-300">
                            Replying to: {commentCreate.parent_user}
                        </p>
                    </div>}

                    <div className="flex">
                        <textarea
                            className="w-full p-3 h-12 focus:h-25 transition-all duration-300 ease-in-out"
                            value={commentCreate.content}
                            onChange={(e) => setCommentCreate({...commentCreate, content: e.target.value})}
                            placeholder="reply"
                        />
                        <input type="submit"/>
                    </div>
                    
                </form>
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


const Comment = ({comment, onContentClick, onRepliesClick}: {
    comment: CommentNode,
    onContentClick: (id: string, user: string)=>void,
    onRepliesClick: (parent_id: string, query?: CommentGetRepliesRequest)=>void,
}) => {
    const remainingReplies = comment.total_replies - comment.replies.length;
    const query: CommentGetRepliesRequest | undefined = comment.replies.length > 0
        ? {cursor: comment.replies[comment.replies.length - 1].id}
        : undefined;
    
    return(
        <div>
            <div className="relative transition-all duration-300 bg-white hover:bg-gray-300 rounded-lg border-2 border-gray-400">
                <div className="absolute">
                    <UserPreview
                        id={comment.profile.id}
                        pfp_id={comment.profile.pfp_id}
                        username={comment.profile.username}
                    />
                </div>
                
                <div onClick={() => onContentClick(comment.id, comment.profile.username)}>
                    <div className="h-10"/>
                    <p> {comment.content} </p>
                </div>
                
            </div>
            
        
            <div className="translate-x-6">
                {comment.replies.map((reply) => {
                    return <Comment
                        key={reply.id} 
                        comment={reply} 
                        onContentClick={onContentClick}
                        onRepliesClick={onRepliesClick}
                    />
                })}
            </div>

            
            {remainingReplies > 0 && <div onClick={() => onRepliesClick(comment.id, query)}>
                Show Replies ({remainingReplies})
            </div>}
        </div>
    )
}

