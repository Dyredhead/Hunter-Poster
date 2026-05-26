import {
    userFollowById,
    userGetById,
    userGetCurrent,
    userGetFollowersById,
    userGetFollowingById,
    userGetPostsById,
    userUnfollowById,
} from "@/api/users";
import Pfp from "@/components/Pfp";
import { PostFeed } from "@/components/Post";
import { BannerContainer, NumberDisplay } from "@/components/ProfileComponents";
import { BigTitle } from "@/components/Title";
import { usersContract, type Post, type User } from "@my-app/shared";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

export default function ProfilePage() {
    const id = useParams().id; // to differentiate current user's profile and other users profile

    const [user, setUser] = useState<User>();
    const [isCurrentUser, setIsCurentUser] = useState<boolean>();
    const [isFollowing, setIsFollowing] = useState<boolean>();

    const [following, setFollowing] = useState<number | null>(null);
    const [followers, setFollowers] = useState<number | null>(null);
    const [posts, setPosts] = useState<Post[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            // await new Promise((f) => setTimeout(f, 200));
            try {
                const response =
                    id === undefined
                        ? await userGetCurrent()
                        : await userGetById({ id });

                const user =
                    usersContract.routes.getById.responses[200].body.parse(
                        await response.json(),
                    );
                setUser(user);

                const current_id =
                    usersContract.routes.getById.responses[200].body.parse(
                        await (await userGetCurrent()).json(),
                    ).id;

                setIsCurentUser(current_id == user.id);

                const followers =
                    usersContract.routes.getFollowersById.responses[200].body.parse(
                        await (
                            await userGetFollowersById({ id: user.id })
                        ).json(),
                    );
                setFollowers(followers.length);

                setIsFollowing(
                    followers.some((follower) => follower == current_id),
                );

                setFollowing(followers.length);

                setFollowing(
                    usersContract.routes.getFollowingById.responses[200].body.parse(
                        await (
                            await userGetFollowingById({ id: user.id })
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
    }, [id]);

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

    if (posts == undefined) {
        console.log("something went wrong with fetching posts");
        return;
    }

    return (
        <div id="profile-container" className="m-4 flex flex-col pb-20">
            <BannerContainer
                key={user.banner_id}
                banner_id={user.banner_id}
                display_settings={id == undefined}
            />
            <div
                id="pfp-username-follow-container"
                className="-mt-10 flex translate-x-2 flex-row gap-4"
            >
                <Pfp
                    key={user.pfp_id}
                    id={user.id}
                    pfp_id={user.pfp_id}
                    className="h-20 w-20"
                />
                <div className="flex flex-col justify-end">
                    <div className="flex -translate-y-3 flex-row justify-end gap-2">
                        <p className="p-0.5">{user.username}</p>

                        {!isCurrentUser! && (
                            <button
                                onClick={handleFollow}
                                className={`rounded-2xl ${isFollowing ? "bg-red-600" : "bg-green-600"} p-0.5 px-2`}
                            >
                                {isFollowing ? "Unfollow" : "Follow"}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div id="description-container" className="text-xs">
                <div className="bg-neutral-lightest border-secondary mt-3 mr-3 ml-3 flex h-15 flex-col justify-center rounded-md border-2 px-5 text-2xl font-bold">
                    <p className="text-black">{user.description}</p>
                </div>
            </div>

            <div className="text-secondary mt-2 flex justify-center gap-10">
                <NumberDisplay
                    label="Following"
                    count={following!}
                    to={`/following/${id == undefined ? "" : id}`}
                />
                <NumberDisplay
                    label="Followers"
                    count={followers!}
                    to={`/followers/${id == undefined ? "" : id}`}
                />
            </div>

            <PostFeed key="profile" posts={posts}></PostFeed>
            <Outlet></Outlet>
        </div>
    );

    async function handleFollow() {
        if (!isFollowing) {
            await userFollowById({ id: user!.id });
        } else {
            await userUnfollowById({ id: user!.id });
        }
        window.location.reload();
    }
}
