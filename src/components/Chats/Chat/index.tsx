import { fireChats } from "apis";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { ChatMeta } from "types";
import ChatForm from "../ChatForm";
import ChatHeader from "../ChatHeader";
import styles from "./index.module.css";

function Chat() {
    const location = useLocation();
    const cId = location.search.split("=")[1];
    const { data: chatMeta } = useQuery<ChatMeta | undefined>(
        ["chat", cId],
        async () => {
            const chatMeta = await fireChats.queryDocs({
                queries: [["cId", "==", cId]],
            });
            if (!chatMeta) return undefined;
            return chatMeta[0].data as ChatMeta;
        },
        {
            enabled: !!cId,
            suspense: true,
        },
    );

    if (!chatMeta) return null;
    return (
        <div className={styles.Chat}>
            <div className={styles.Chat_header}>
                <ChatHeader chatMeta={chatMeta} />
            </div>
            <div className={styles.Chat_content}></div>
            <div className={styles.Chat_form}>
                <ChatForm />
            </div>
        </div>
    );
}

export default Chat;
