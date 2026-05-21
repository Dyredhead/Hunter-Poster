import { getImage } from "@/api/images";
import { ImageContract } from "@my-app/shared";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SettingIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#1f1f1f"
    >
        <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
    </svg>
);

type BannerContainerProps = {
    pfp_id: string | null;
    banner_id: string | null;
};

export const BannerContainer = ({
    pfp_id,
    banner_id,
}: BannerContainerProps) => {
    const [pfp_url, setPfpUrl] = useState<string | null>(null);
    const [banner_url, setBannerUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            await new Promise((f) => setTimeout(f, 200));
            try {
                if (pfp_id != null) {
                    const image =
                        ImageContract.routes.getById.responses[200].body.parse(
                            await (await getImage({ id: pfp_id })).json(),
                        );
                    console.log("got pfpurl");
                    setPfpUrl(
                        `data:${image.image_mime};base64,${image.image_data}`,
                    );
                }

                if (banner_id != null) {
                    const image =
                        ImageContract.routes.getById.responses[200].body.parse(
                            await (await getImage({ id: banner_id })).json(),
                        );
                    console.log("got bannerurl");
                    setBannerUrl(
                        `data:${image.image_mime};base64,${image.image_data}`,
                    );
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                // setLoading(false);
            }
        };

        fetchData();
    }, [banner_id, pfp_id]);

    return (
        <div className="relative mt-4 mr-4 ml-4">
            <div className="bg-neutral-lightest flex h-30 w-full flex-1 justify-center overflow-clip rounded-2xl">
                <img src={banner_url == null ? "" : banner_url} width="100%" />
            </div>

            <div className="bg-neutrual-lightest bg-neutral-lightest p1 absolute top-2 right-2 rounded-full p-1">
                <Link to="/settings">
                    <SettingIcon />
                </Link>
            </div>

            <div className="bg-neutral-darkest absolute bottom-0 left-0 flex h-20 w-20 flex-1 translate-x-1/10 translate-y-1/2 justify-center overflow-clip rounded-full border-2">
                <img
                    src={
                        pfp_url == null
                            ? "/src/assets/icons/avatar.svg"
                            : pfp_url
                    }
                    alt=""
                    width="100%"
                />
            </div>
        </div>
    );
};

export const UserInformation = ({
    username,
    description,
}: {
    username: string;
    description: string | null;
}) => {
    return (
        <div className="mt-2 text-xs">
            <div className="text-neutral-lightest ml-30 font-bold">
                {username}
            </div>

            <div className="bg-neutral-lightest border-secondary mt-3 mr-3 ml-3 flex h-15 flex-col justify-center rounded-md border-2 px-5 text-2xl font-bold">
                <p className="text-black">{description}</p>
            </div>
        </div>
    );
};

export const FollowDisplay = ({
    label,
    count,
    to,
}: {
    label: string;
    count: number;
    to: string;
}) => {
    return (
        <Link to={to}>
            <div className="text-secondary flex flex-col items-center text-xs">
                <p className="font-bold">{label}</p>
                <p>{count}</p>
            </div>
        </Link>
    );
};
