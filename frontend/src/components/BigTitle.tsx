import type { ReactNode } from "react";
import "./BigTitle.css";

type BigTitleProps = {
    children: ReactNode;
    className?: string;
};

export default function BigTitle({ children, className = "" }: BigTitleProps) {
    return <h1 className={`app-bigtitle ${className}`}>{children}</h1>;
}
