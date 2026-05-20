import { userGetCurrent } from "@/api/users";
import BigTitle from "@/components/BigTitle";
import {
    BannerContainer,
    FollowDisplay,
    UserInformation,
} from "@/components/ProfileComponents";
import { usersContract, type User } from "@my-app/shared";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const [user, setUser] = useState<User>();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Define the async function
        console.log("test");
        const fetchData = async () => {
            await new Promise((f) => setTimeout(f, 200));
            try {
                const json = await (await userGetCurrent()).json();
                console.log("json:", json);
                const user =
                    usersContract.routes.getById.responses[200].body.parse(
                        await (await userGetCurrent()).json(),
                    );
                setUser(user);
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

    console.log("user: ", user);

    if (user == undefined) {
        console.log("something went wrong");
        return;
    }
    // return <PostFeed posts={posts!}></PostFeed>;
    // const result = await userGetCurrent();

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
        </div>
    );
}
