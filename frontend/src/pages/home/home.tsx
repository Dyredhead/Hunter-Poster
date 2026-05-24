import { TabSlider, type TabSliderOption } from "@/components/TabSlider";
import { Outlet, useLocation } from "react-router-dom";
import "./home.css";

type HomeTabValue = "for-you" | "following";

const HOME_TABS: TabSliderOption<HomeTabValue>[] = [
    {
        value: "for-you",
        label: "For You",
    },
    {
        value: "following",
        label: "Following",
    },
];

export default function HomeLayout() {
    const { pathname } = useLocation();
    const activeTab = pathname.split("/").at(-1)!;

    return (
        <div className="home-screen">
            <div className="home-tabs-bar">
                <TabSlider options={HOME_TABS} value={activeTab} />
            </div>
            <Outlet />
        </div>
    );
}
