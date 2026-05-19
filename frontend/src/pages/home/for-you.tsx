import { getByForYou } from "@/api/post";
import Post from "@/components/Post";
import type { post_type } from "@my-app/shared";
import { useEffect, useState } from "react";

export default function page() {
    const [postsState, postsSet] = useState<post_type[]>([]);

    useEffect(() => {
        getByForYou().then((response) => {
            console.log(response);
            postsSet(response);
        });
    }, []);

    return (
        <div className="posts-feed">
            {postsState.map((post) => {
                return (
                    <Post
                        key={post.id}
                        username={post.created_by}
                        created_at={post.created_at}
                        content={
                            post.content.type === "text" ||
                            post.content.type === "text_image"
                                ? post.content.content
                                : ""
                        }
                        imageUrl={
                            post.content.type === "image" ||
                            post.content.type === "text_image"
                                ? post.content.image_url
                                : ""
                        }
                        comments={post.comments}
                        likes={post.likes}
                        bookmarks={post.booksmarks}
                    />
                );
            })}
        </div>
    );
}
