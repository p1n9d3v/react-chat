import GoogleIcon from "components/icons/GoogleIcon";
import PhoneIcon from "components/icons/TwitterIcon";
import { ButtonHTMLAttributes } from "react";
import styles from "./index.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    login: "google" | "twitter";
}

function OAuthButton({ login, ...props }: Props) {
    return (
        <button className={styles.OAuthButton} {...props}>
            {login === "google" && <GoogleIcon />}
            {login === "twitter" && <PhoneIcon />}
            <div>
                {login === "google" && "Sign in with Google"}
                {login === "twitter" && "Sign in with Twitter"}
            </div>
        </button>
    );
}

export default OAuthButton;
