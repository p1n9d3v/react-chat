import { InputHTMLAttributes, ReactNode } from "react";
import styles from "./index.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    icon: ReactNode;
}

function IconInput({ icon }: Props) {
    return (
        <div className={styles.IconInput}>
            {icon}
            <input />
        </div>
    );
}

export default IconInput;
