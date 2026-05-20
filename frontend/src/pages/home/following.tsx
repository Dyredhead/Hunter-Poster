import { getByFollowing } from "@/api/post";
import BigTitle from "@/components/BigTitle";
import { PostFeed } from "@/components/Post";
import { type PostGetByFollowingResponse } from "@my-app/shared";
import { useEffect, useState } from "react";

export default function FollowingPage() {
    const [posts, setPosts] = useState<PostGetByFollowingResponse>();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Define the async function
        console.log("test");
        const fetchData = async () => {
            await new Promise((f) => setTimeout(f, 200));
            try {
                const response = await getByFollowing();
                setPosts(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Execute the function
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <BigTitle>loading...</BigTitle>
            </div>
        );
    }

    console.log("posts: ", posts);

    return <PostFeed posts={posts!}></PostFeed>;
}
