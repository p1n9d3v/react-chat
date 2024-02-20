import ChatRoom from "components/Chats/ChatRoom";
import styles from "./index.module.css";
import { useQuery } from "react-query";
import { fireChats } from "apis";
import Chat from "components/Chats/Chat";
import { ChatMeta } from "types";
import { useNavigate } from "react-router-dom";

function Chats() {
    const { data: chats } = useQuery(
        "chats",
        async () => await fireChats.getDocs(),
    );
    const navigate = useNavigate();

    const handleClickChat = (chat: ChatMeta) => {
        navigate(`/chats?chatId=${chat.cId}`);
    };

    return (
        <div className={styles.Chats}>
            <div className={styles.Chats_col}>
                <ul>
                    {chats &&
                        Array.from(chats, ([_, value]) => value).map(
                            (chat, index) => (
                                <li onClick={() => handleClickChat(chat)}>
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
