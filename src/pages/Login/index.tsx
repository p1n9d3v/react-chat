import { fireAuth } from "apis";
import OAuthButton from "components/Login/OAuthButton";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

function Login() {
    const navigate = useNavigate();
    const handleGoogleLogin = async () => {
        const data = await fireAuth.loginWithGoogle();

        if (data) {
            navigate("/");
        }
    };

    return (
        <div className={styles.Login}>
            <div className={styles.Login_title}>Chat</div>
            <div className={styles.Login_welcome}>Welcom back</div>
            <div className={styles.Login_oauth}>
                <OAuthButton login="google" onClick={handleGoogleLogin} />
                <OAuthButton login="twitter" />
            </div>
        </div>
    );
}

export default Login;
