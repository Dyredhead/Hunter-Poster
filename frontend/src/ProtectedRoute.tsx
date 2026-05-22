import { Outlet, useNavigate } from "react-router-dom";
import BigButton from "./components/BigButton";

export default function ProtectedRoute() {
    const navigate = useNavigate();

    if (!localStorage.getItem("token")) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <section className="text-center">
                    <h1>You are unauthenticated</h1>

                    <BigButton onClick={() => navigate("/")}>Go Back</BigButton>
                </section>
            </main>
        );
    }

    return <Outlet />;
}
