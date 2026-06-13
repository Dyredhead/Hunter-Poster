import { useParams } from "react-router-dom";

export default function Page() {
    const postId = useParams().id;

    return (
        <div>
            {postId}
        </div>
    )
}