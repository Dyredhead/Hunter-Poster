import BigButton from "@/components/BigButton";
import BigTitle from "@/components/BigTitle";
import Screen from "@/components/Screen";
import { useNavigate } from "react-router-dom";
import "./greeter.css";

export default function GreeterPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    if (token) {
        navigate("/home/for-you");
    }

    return (
        <Screen>
            <BigTitle>
                Hunter
                <br />
                Poster
            </BigTitle>
            <div className="greeter-actions">
                <BigButton to="/auth/login">Login</BigButton>
                <BigButton to="/auth/register">Register</BigButton>
            </div>
        </Screen>
    );
}
