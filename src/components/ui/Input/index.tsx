import { InputHTMLAttributes } from "react";
import styles from "./index.module.css";

function Input({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className={styles.Input}>
            <input {...props} />
        </div>
    );
}

export default Input;
