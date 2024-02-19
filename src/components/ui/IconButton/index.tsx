import { ReactNode } from "react";
import styles from "./index.module.css";

interface Props {
    icon: ReactNode;
    text: string;
    onClick?: () => void;
}

function IconButton({ icon, text, onClick }: Props) {
    return (
        <button className={styles.IconButton} onClick={onClick}>
            {icon}
            {text}
        </button>
    );
}

export default IconButton;
