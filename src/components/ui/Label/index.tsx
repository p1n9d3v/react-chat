import { LabelHTMLAttributes, PropsWithChildren } from "react";
import styles from "./index.module.css";

function Label({
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & PropsWithChildren) {
    return (
        <label className={styles.Label} {...props}>
            {children}
        </label>
    );
}

export default Label;
