import { useNavigate } from "react-router-dom";
import BigButton from "./components/BigButton";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <main className="flex min-h-screen items-center justify-center">
            <section className="text-center">
                <h1>No such page</h1>

                <BigButton onClick={handleClick}>Go Back</BigButton>
            </section>
        </main>
    );

    function handleClick() {
        if (!localStorage.getItem("token")) {
            navigate("/");
        } else {
            navigate("/home/for-you");
        }
    }
}
