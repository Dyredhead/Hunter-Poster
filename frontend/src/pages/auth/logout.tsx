import { logout } from "@/api/auth/logout";
import BigTitle from "@/components/BigTitle";
import Screen from "@/components/Screen";
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
