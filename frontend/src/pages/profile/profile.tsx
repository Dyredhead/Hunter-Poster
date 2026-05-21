import {
    userGetCurrent,
    userGetFollowersById,
    userGetFollowingById,
    userGetPostsById,
} from "@/api/users";
import { PostFeed } from "@/components/Post";
import {
    BannerContainer,
    FollowDisplay,
    UserInformation,
} from "@/components/ProfileComponents";
import { BigTitle } from "@/components/Title";
import { usersContract, type Post, type User } from "@my-app/shared";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function ProfilePage() {
    const [user, setUser] = useState<User>();
    const [following, setFollowing] = useState<number | null>(null);
    const [followers, setFollowers] = useState<number | null>(null);
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

                setFollowing(
                    usersContract.routes.getFollowingById.responses[200].body.parse(
                        await (
                            await userGetFollowingById({ id: user.id })
                        ).json(),
                    ).length,
                );

                setFollowers(
                    usersContract.routes.getFollowersById.responses[200].body.parse(
                        await (
                            await userGetFollowersById({ id: user.id })
                        ).json(),
                    ).length,
                );

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
            <BannerContainer pfp_id={user.pfp_id} banner_id={user.banner_id} />
            <UserInformation
                username={user.username}
                description={user.description}
            />

            <div className="text-secondary mt-2 flex justify-center gap-10">
                <FollowDisplay
                    label="Following"
                    count={following!}
                    to="/profile/following"
                />
                <FollowDisplay
                    label="Followers"
                    count={followers!}
                    to="/profile/followers"
                />
            </div>
            <PostFeed posts={posts}></PostFeed>
            <Outlet></Outlet>
        </div>
    );
}
