import AlarmIcon from "components/icons/Alarmlogo";
import LogoIcon from "components/icons/LogoIcon";
import SearchIcon from "components/icons/SearchIcon";
import IconInput from "components/ui/IconInput";
import styles from "./index.module.css";
import { useUser } from "contexts/UserContext";
import UserProfilePopup from "../UserProfilePopup";

function Header() {
    const { currentUser } = useUser();
    return (
        <div className={styles.Header}>
            <div className={styles.Header_col}>
                <LogoIcon />
                <IconInput icon={<SearchIcon />} />
            </div>
            <div className={styles.Header_col}>
                <AlarmIcon width={24} height={24} />
                <UserProfilePopup
                    user={currentUser!}
                    target={
                        <div className={styles.Header_profileImg}>
                            <img
                                src={currentUser?.photoURL ?? ""}
                                alt="profile"
                            />
                        </div>
                    }
                />
            </div>
        </div>
    );
}

export default Header;
