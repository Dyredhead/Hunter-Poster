import {
    userGetById,
    userGetCurrent,
    userGetFollowersById,
    userGetFollowingById,
} from "@/api/users";
import Pfp from "@/components/Pfp";
import { BigTitle } from "@/components/Title";
import { usersContract, type User } from "@my-app/shared";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type ProfilePageProps = {
    type: "Followers" | "Following";
};

export default function ProfilePage({ type }: ProfilePageProps) {
    const id = useParams().id; // to differentiate current user's profile and other users profile

    const [user, setUser] = useState<User>();
    const [users, setusers] = useState<User[]>();
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

                let ids = [];
                switch (type) {
                    case "Following": {
                        ids =
                            usersContract.routes.getFollowingById.responses[200].body.parse(
                                await (
                                    await userGetFollowingById({ id: user.id })
                                ).json(),
                            );
                        break;
                    }
                    case "Followers": {
                        ids =
                            usersContract.routes.getFollowersById.responses[200].body.parse(
                                await (
                                    await userGetFollowersById({ id: user.id })
                                ).json(),
                            );
                        break;
                    }
                }

                const users = await Promise.all(
                    ids.map(async (id) =>
                        usersContract.routes.getById.responses[200].body.parse(
                            await (await userGetById({ id: id })).json(),
                        ),
                    ),
                );
                setusers(users);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, type]);

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

    if (users == undefined) {
        console.log("something went wrong with fetching following");
        return;
    }

    if (users?.length == 0) {
        return (
            <div className="flex justify-center">
                <BigTitle>get some more friends :(</BigTitle>
            </div>
        );
    }

    return (
        <div>
            <BigTitle className="flex justify-center">{type}:</BigTitle>
            <div className="flex w-full flex-row gap-10 px-20 py-5">
                {users?.map((user) => {
                    return (
                        <div>
                            <Pfp
                                id={user.id}
                                pfp_id={user.pfp_id}
                                className="h-20 w-20"
                            />
                            <p className="flex justify-center">
                                {user.username}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
