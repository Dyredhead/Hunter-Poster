import type { ProfilePreview } from "@my-app/shared"
import Pfp from "./Pfp"
import "./Post.css"

export const UserPreview = ({id, pfp_id, username}: ProfilePreview) => {
    return (
        <div className="post-author">
            <Pfp id={id} pfp_id={pfp_id} />
            <p className="post-username"> {username} </p>
        </div>
    )
}