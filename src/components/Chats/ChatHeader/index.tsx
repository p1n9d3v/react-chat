import PhoneIcon from "components/icons/PhoneIcon";
import VideoIcon from "components/icons/VideoIcon";
import { useUser } from "contexts/UserContext";
import { ChatMetaData } from "types";
import styles from "./index.module.css";

interface Props {
    chatMeta: ChatMetaData;
}

function ChatHeader({ chatMeta }: Props) {
    const { currentUser } = useUser();
    const partner = Object.values(chatMeta.participants).filter(
        (user) => user.uid !== currentUser!.uid,
    )[0];

    return (
        <div className={styles.ChatHeader}>
            <div className={styles.ChatHeader_userInfo}>
                <img
                    className={styles.ChatHeader_profileImg}
                    src={partner.photoURL ?? ""}
                    alt="user profile"
                />
                <div className={styles.ChatHeader_username}>
                    {partner.displayName}
                </div>
            </div>

            <div className={styles.ChatHeader_interactions}>
                <PhoneIcon />
                <VideoIcon />
            </div>
        </div>
    );
}

export default ChatHeader;
