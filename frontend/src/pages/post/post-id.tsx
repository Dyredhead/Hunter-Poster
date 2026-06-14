import { getById } from "@/api/posts";
import { Post } from "@/components/Post";
import type { Post as PostType } from "@my-app/shared";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Page() {
    const postId = useParams().id;
    const [post, setPost] = useState<PostType | null | undefined>();

    useEffect(() => {
        getById(postId!).then((newPost) => {
            setPost(newPost);
            console.log(newPost);
        } )
    }, [])

    if (post !== undefined && post !== null) {
        return (
            <div>
                <Post post={post}/>
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

const Comment = () => {
    
}