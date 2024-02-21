import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { ChatMetaData } from "types";
import ChatForm from "../ChatForm";
import ChatHeader from "../ChatHeader";
import ChatApi from "apis/chat";
import styles from "./index.module.css";

function Chat() {
    const location = useLocation();
    const id = location.search.split("=")[1];
    const { data: chatMetaData } = useQuery<ChatMetaData | null>(
        ["chat", id],
        async () => await ChatApi.getChatMeta(id),
        {
            enabled: !!id,
            suspense: true,
        },
    );

    if (!chatMetaData) return null;
    return (
        <div className={styles.Chat}>
            <div className={styles.Chat_header}>
                <ChatHeader chatMeta={chatMetaData} />
            </div>
            <div className={styles.Chat_content}></div>
            <div className={styles.Chat_form}>
                <ChatForm id={id} />
            </div>
        </div>
    );
}

export default Chat;
