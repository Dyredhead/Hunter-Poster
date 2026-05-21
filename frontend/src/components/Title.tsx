import type { ReactNode } from "react";
import "./Title.css";

type TitleProps = {
    children: ReactNode;
    className?: string;
};

export function BigTitle({ children, className = "" }: TitleProps) {
    return <h1 className={`app-bigtitle ${className}`}>{children}</h1>;
}

export function MediumTitle({ children, className = "" }: TitleProps) {
    return <h1 className={`app-mediumtitle ${className}`}>{children}</h1>;
}
