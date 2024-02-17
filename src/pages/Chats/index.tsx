import ChatRoom from "components/Chats/ChatRoom";
import styles from "./index.module.css";
import { useQuery } from "react-query";
import { fireChats } from "apis";
import Chat from "components/Chats/Chat";

function Chats() {
    const { data: chats } = useQuery(
        "chats",
        async () => await fireChats.getDocs(),
    );

    return (
        <div className={styles.Chats}>
            <div className={styles.Chats_col}>
                <ul>
                    {chats &&
                        Array.from(chats, ([_, value]) => value).map(
                            (chat, index) => (
                                <li>
                                    <ChatRoom key={index} chat={chat} />
                                </li>
                            ),
                        )}
                </ul>
            </div>
            <div className={styles.Chats_col}>
                <Chat />
            </div>
        </div>
    );
}

export default Chats;
