import { useParams } from "react-router-dom";
import { BannerContainer, FollowDisplay, UserInformation } from "@/components/ProfileComponents";

export default function page() {
    const { username } = useParams();

    return (
        <div className="w-full">
            <BannerContainer/>
            <UserInformation username={username ?? ""} description="awdawawd wdapwdaw dwa da sd wa sdwa sd wdaaw dwa da d"/>
            
            <div className="flex justify-center gap-10 text-secondary mt-2">
                <FollowDisplay label="Following" count={10} to="/profile/settings"/>
                <FollowDisplay label="Followers" count={20} to="/profile/settings"/>
            </div>
        </div>
  );
}