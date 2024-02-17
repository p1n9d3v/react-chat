import { ButtonHTMLAttributes, HTMLAttributes, PropsWithChildren } from "react";
import styles from "./index.module.css";
import cn from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    size: "sm" | "md" | "lg";
}

function Button({ children, size, ...rest }: Props) {
    return (
        <button
            className={cn(styles.Button, {
                [styles.Button___sm]: size === "sm",
                [styles.Button___md]: size === "md",
                [styles.Button___lg]: size === "lg",
            })}
            {...rest}
        >
            {children}
        </button>
    );
}

export default Button;
