import { useParams } from "react-router-dom";

export default function page() {
    const { username } = useParams();

    return (
        <main>
            <h1>Welcome {username}</h1>
            <p>This is the profile page.</p>
        </main>
  );
}