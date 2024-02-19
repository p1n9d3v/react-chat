import { fireUsers } from "apis";
import User from "components/Users/User";
import UserDetail from "components/Users/UserDetail";
import styles from "./index.module.css";
import { UserInfo } from "@firebase/auth";
import { useQuery } from "react-query";
import { useState } from "react";
import { useUser } from "contexts/UserContext";

type UserMap = Map<string, UserInfo> | null;

function Users() {
    const [user, setUser] = useState<UserInfo | null>(null);
    const { data: users } = useQuery<UserMap>(
        ["users"],
        async () => await fireUsers.getDocs(),
    );
    const { currentUser } = useUser();

    return (
        <div className={styles.Users}>
            <div className={styles.Users_col}>
                <ul>
                    {users &&
                        Array.from(users, ([_, user]) => user)
                            .filter((user) => user.uid !== currentUser!.uid)
                            .map((user, index) => (
                                <li key={index} onClick={() => setUser(user)}>
                                    <User user={user} />
                                </li>
                            ))}
                </ul>
            </div>
            <div className={styles.Users_col}>
                {user && <UserDetail user={user} />}
            </div>
        </div>
    );
}

export default Users;
