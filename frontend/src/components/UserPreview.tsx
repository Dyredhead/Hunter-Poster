import type { ProfilePreview } from "@my-app/shared"
import Pfp from "./Pfp"

export const UserPreview = ({id, pfp_id, username}: ProfilePreview) => {
    return (
        <div>
            <Pfp id={id} pfp_id={pfp_id} />
            <p> {username} </p>
        </div>
    )
}