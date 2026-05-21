import { userGetById, userGetCurrent, userGetFollowingById } from "@/api/users";
import Pfp from "@/components/Pfp";
import { BigTitle } from "@/components/Title";
import { usersContract, type User } from "@my-app/shared";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
    const id = useParams().id; // to differentiate current user's profile and other users profile

    const [user, setUser] = useState<User>();
    const [following, setFollowing] = useState<User[]>();
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

                const following_ids =
                    usersContract.routes.getFollowingById.responses[200].body.parse(
                        await (
                            await userGetFollowingById({ id: user.id })
                        ).json(),
                    );

                const users = await Promise.all(
                    following_ids.map(async (id) =>
                        usersContract.routes.getById.responses[200].body.parse(
                            await (await userGetById({ id: id })).json(),
                        ),
                    ),
                );
                setFollowing(users);
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

    if (following == undefined) {
        console.log("something went wrong with fetching following");
        return;
    }

    if (following?.length == 0) {
        return (
            <div className="flex justify-center">
                <BigTitle>No Followers :(</BigTitle>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-row justify-between gap-10 px-20 py-5">
            {following?.map((user) => {
                return (
                    <div>
                        <Pfp
                            id={user.id}
                            pfp_id={user.pfp_id}
                            className="h-20 w-20"
                        />
                        <p className="flex justify-center">{user.username}</p>
                    </div>
                );
            })}
        </div>
    );
}
