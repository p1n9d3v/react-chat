import { ReactNode } from "react";
import styles from "./index.module.css";

interface Props {
    icon: ReactNode;
    text: string;
}

function IconButton({ icon, text }: Props) {
    return (
        <button className={styles.IconButton}>
            {icon}
            {text}
        </button>
    );
}

export default IconButton;
