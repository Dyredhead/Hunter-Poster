import { userGetCurrent } from "@/api/users";
import {
    BannerContainer,
    FollowDisplay,
    UserInformation,
} from "@/components/ProfileComponents";
import { usersContract } from "@my-app/shared";

export default async function ProfilePage() {
    const result = await userGetCurrent();

    if (result.ok) {
        const user = usersContract.routes.getById.responses[200].body.parse(
            await result.json(),
        );

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
    } else {
        console.error("something went wrong");
    }
}
