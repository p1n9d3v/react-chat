import styles from "./index.module.css";
import { UserInfo } from "@firebase/auth";

interface Props {
    user: UserInfo;
}

function User({ user }: Props) {
    return (
        <div className={styles.User}>
            <img
                className={styles.User_avatar}
                src={user.photoURL ?? ""}
                alt="user profile"
            />
            <div className={styles.User_info}>
                <div className={styles.User_name}>{user.displayName}</div>
                <div className={styles.User_email}>{user.email}</div>
            </div>
        </div>
    );
}

export default User;
