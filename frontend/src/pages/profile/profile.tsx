import { userGetCurrent, userGetPostsById } from "@/api/users";
import BigTitle from "@/components/BigTitle";
import { PostFeed } from "@/components/Post";
import {
    BannerContainer,
    FollowDisplay,
    UserInformation,
} from "@/components/ProfileComponents";
import { usersContract, type Post, type User } from "@my-app/shared";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const [user, setUser] = useState<User>();
    const [posts, setPosts] = useState<Post[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await new Promise((f) => setTimeout(f, 200));
            try {
                const user =
                    usersContract.routes.getById.responses[200].body.parse(
                        await (await userGetCurrent()).json(),
                    );
                setUser(user);

                const posts =
                    usersContract.routes.getPostsbyId.responses[200].body.parse(
                        await (await userGetPostsById({ id: user.id })).json(),
                    );

                setPosts(posts);
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

    if (user == undefined) {
        console.log("something went wrong with fetching user");
        return;
    }
    console.log("user: ", user);

    if (posts == undefined) {
        console.log("something went wrong with fetching posts");
        return;
    }
    console.log("posts: ", posts);

    return (
        <div className="w-full">
            <BannerContainer />
            <UserInformation
                username={user.username}
                description={user.description}
            />

            <div className="flex justify-center gap-10 text-secondary mt-2">
                <FollowDisplay
                    label="Following"
                    count={10}
                    to="/profile/settings"
                />
                <FollowDisplay
                    label="Followers"
                    count={20}
                    to="/profile/settings"
                />
            </div>
            <PostFeed posts={posts}></PostFeed>
        </div>
    );
}
