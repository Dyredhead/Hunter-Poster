import BigButton from "@/components/BigButton";
import Screen from "@/components/Screen";
import { BigTitle } from "@/components/Title";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./greeter.css";

export default function GreeterPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/home/for-you");
        }
    });

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
