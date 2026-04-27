import { Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";

const NavItem = ({to, src, alt, description} :
    {
        to: string;
        src: string;
        alt: string;
        description: string;
    }
) => {
    return (
        <div className='flex-1'>
            <Link to={to} className="flex flex-col items-center">
                <img src={src} alt={alt}/>
                <p className="text-xs font-bold">{description}</p>
            </Link>
        </div>
    )
}

export const NavBar = () => {
    return (
        <div>
            <Outlet/>
            <div className="flex justify-around fixed bottom-0 w-full bg-white h-14 pt-2 pb-2">
                <NavItem
                    to="/profile/person"
                    src="../../profile_icon.svg"
                    alt="profile button"
                    description="profile"
                />

                <NavItem
                    to="/auth/login"
                    src="../../chat_icon.svg"
                    alt="chat button"
                    description="chat"
                />

                <NavItem
                    to="/home/for-you"
                    src="../../home_icon.svg"
                    alt="home button"
                    description="home"
                />

                <NavItem
                    to="/notifications"
                    src="../../notifs_icon.svg"
                    alt="notifications button"
                    description="notifications"
                />

                <NavItem
                    to="/post/create"
                    src="../../post_icon.svg"
                    alt="create posts button"
                    description="post"
                />
            </div>
        </div>
        
    )
}