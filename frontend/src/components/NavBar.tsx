import { Link, Outlet } from "react-router-dom";
import "./NavBar.css";

const NavItem = ({
    to,
    src,
    alt,
    // description,
}: {
    to: string;
    src: string;
    alt: string;
    description: string;
}) => {
    return (
        <Link
            to={to}
            className="flex w-full flex-col items-center justify-center"
        >
            <img src={src} alt={alt} />
            {/* <p className="text-xs font-bold text-neutral-middle">{description}</p> */}
        </Link>
    );
};

export const NavBar = () => {
    return (
        <div>
            <Outlet />
            <div className="fixed bottom-0 flex h-20 w-full justify-around bg-black">
                <NavItem
                    to="/profile/"
                    src="/src/assets/icons/navbar/profile.svg"
                    alt="profile button"
                    description="profile"
                />

                {/* <NavItem
                    to="/chat"
                    src="/src/assets/icons/navbar/chat.svg"
                    alt="chat button"
                    description="chat"
                /> */}

                <NavItem
                    to="/home/for-you"
                    src="/src/assets/icons/navbar/home.svg"
                    alt="home button"
                    description="home"
                />

                {/* <NavItem
                    to="/notifications"
                    src="/src/assets/icons/navbar/notifications.svg"
                    alt="notifications button"
                    description="notifications"
                /> */}

                <NavItem
                    to="/post/create"
                    src="/src/assets/icons/navbar/post.svg"
                    alt="create posts button"
                    description="post"
                />
            </div>
        </div>
    );
};
