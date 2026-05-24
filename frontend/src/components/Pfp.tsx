import { getImage } from "@/api/images";
import { ImageContract } from "@my-app/shared";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type PfpProps = {
    id: string;
    pfp_id: string | null;
    className?: string;
};

export default function Pfp({ id, pfp_id, className }: PfpProps) {
    const [pfp_url, setPfpUrl] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            // await new Promise((f) => setTimeout(f, 200));
            try {
                if (pfp_id != null) {
                    const image =
                        ImageContract.routes.getById.responses[200].body.parse(
                            await (await getImage({ id: pfp_id })).json(),
                        );
                    setPfpUrl(
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
    }, [pfp_id]);

    return (
        <Link
            id="pfp-container"
            to={`/profile/${id}`}
            className={`bg-neutral-darkest flex justify-center overflow-clip rounded-full border-2 ${className}`}
        >
            <img
                src={
                    pfp_url == undefined
                        ? "/src/assets/icons/avatar.svg"
                        : pfp_url
                }
                alt=""
                width="100%"
            />
        </Link>
    );
}
