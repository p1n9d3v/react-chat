import { useUser } from "contexts/UserContext";
import { UserInfo } from "firebase/auth";
import styles from "./index.module.css";

interface Props {
    chatMeta: {
        participants: UserInfo[];
    };
}

function ChatRoom({ chatMeta }: Props) {
    const { currentUser } = useUser();
    const participants = Object.values(chatMeta.participants).filter(
        (user) => user.uid !== currentUser!.uid,
    );

    return (
        <div className={styles.ChatRoom}>
            <img
                className={styles.ChatRoom_profileImg}
                src={participants[0].photoURL ?? ""}
                alt="user profile"
            />
            <div className={styles.ChatRoom_info}>
                <div>
                    <div className={styles.ChatRoom_username}>
                        {participants.map((user) => user.displayName).join(",")}
                    </div>
                    {/* <div className={styles.ChatRoom_messageTime}> */}
                    {/*     {parseDate(message.time, "time")} */}
                    {/* </div> */}
                </div>
                {/* <div className={styles.ChatRoom_messageContent}> */}
                {/*     {message.content} */}
                {/* </div> */}
            </div>
        </div>
    );
}

export default ChatRoom;
