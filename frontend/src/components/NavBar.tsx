import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
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
    // function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    //     console.log("Login link clicked");

    //     // optional: prevent navigation if needed
    //     event.preventDefault();
    // }

    return (
        <Link
            to={to}
            // onClick={handleClick}
            className="flex w-full items-center justify-center flex-col"
        >
            <img src={src} alt={alt} />
            {/* <p className="text-xs font-bold text-neutral-middle">{description}</p> */}
        </Link>
    );
};

export const NavBar = () => {
    //TODO: make this generate dynamically to whatever the current user's username is.
    // const username = "john";
    return (
        <div>
            <Outlet />
            <div className="flex justify-around fixed bottom-0 w-full bg-black h-20">
                <NavItem
                    to="profile/${username}"
                    src="/src/assets/icons/navbar/profile.svg"
                    alt="profile button"
                    description="profile"
                />

                <NavItem
                    to="/chat"
                    src="/src/assets/icons/navbar/chat.svg"
                    alt="chat button"
                    description="chat"
                />

                <NavItem
                    to="/home/for-you"
                    src="/src/assets/icons/navbar/home.svg"
                    alt="home button"
                    description="home"
                />

                <NavItem
                    to="/notifications"
                    src="/src/assets/icons/navbar/notifications.svg"
                    alt="notifications button"
                    description="notifications"
                />

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
