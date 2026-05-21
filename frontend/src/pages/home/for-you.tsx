import { getByForYou } from "@/api/post";
import { PostFeed } from "@/components/Post";
import { BigTitle } from "@/components/Title";
import { type PostGetByForYouResponse } from "@my-app/shared";
import { useEffect, useState } from "react";

export default function ForYouPage() {
    const [posts, setPosts] = useState<PostGetByForYouResponse>();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await new Promise((f) => setTimeout(f, 200));
            try {
                const response = await getByForYou();
                setPosts(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <BigTitle>loading...</BigTitle>
            </div>
        );
    }

    return <PostFeed posts={posts!}></PostFeed>;
}
