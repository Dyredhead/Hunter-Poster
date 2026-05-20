import type { ReactNode } from "react";
import "./Screen.css";

type ScreenProps = {
    children: ReactNode;
    className?: string;
};

export default function Screen({ children, className = "" }: ScreenProps) {
    return <main className={`app-screen ${className}`}>{children}</main>;
}
