import { logout } from "@/api/auth/logout";
import Screen from "@/components/Screen";
import { BigTitle } from "@/components/Title";
import { useEffect } from "react";
import "./auth.css";

export default function LogoutPage() {
    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            logout();
        }, 500);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, []);

    return (
        <Screen>
            <BigTitle>Logging Out ...</BigTitle>
        </Screen>
    );
}
