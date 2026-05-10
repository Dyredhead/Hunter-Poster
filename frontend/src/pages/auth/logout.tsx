import "./auth.css";
import Screen from "@/components/Screen";
import BigTitle from "@/components/BigTitle";
import { useEffect } from "react";
import { logout } from "@/api/auth/logout";

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
