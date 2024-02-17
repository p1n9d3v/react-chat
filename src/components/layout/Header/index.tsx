import AlarmIcon from "components/icons/Alarmlogo";
import LogoIcon from "components/icons/LogoIcon";
import SearchIcon from "components/icons/SearchIcon";
import IconInput from "components/ui/IconInput";
import styles from "./index.module.css";

function Header() {
    return (
        <div className={styles.Header}>
            <div className={styles.Header_col}>
                <LogoIcon />
                <IconInput icon={<SearchIcon />} />
            </div>
            <div className={styles.Header_col}>
                <AlarmIcon width={24} height={24} />
                <div className={styles.Header_profileImg}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkVNl0TVPEwDDpv0A4h2ukPqW9haj9FvzxrQ&usqp=CAU"
                        alt="profile"
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
