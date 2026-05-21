import { Link, Outlet, useLocation } from "react-router-dom";
import "./home.css";

export default function HomeLayout() {
    const { pathname } = useLocation();
    const isForYou = pathname === "/home/for-you";

    return (
        <div className="home-screen">
            <div className="home-tabs-bar">
                <div className="tab-switcher">
                    <div
                        className={`tab-slider-pill ${isForYou ? "tab-slider-pill--left" : "tab-slider-pill--right"}`}
                    />
                    <Link
                        to="/home/for-you"
                        className={`tab-item ${isForYou ? "tab-item--active" : "tab-item--inactive"}`}
                    >
                        For You
                    </Link>
                    <Link
                        to="/home/following"
                        className={`tab-item ${isForYou ? "tab-item--inactive" : "tab-item--active"}`}
                    >
                        Following
                    </Link>
                </div>
            </div>
            <Outlet />
        </div>
    );
}
