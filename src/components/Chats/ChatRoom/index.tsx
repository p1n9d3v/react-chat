import Chat from "apis/chat";
import { useUser } from "contexts/UserContext";
import { QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ChatMeta, Message } from "types";
import { parseDate } from "utils";
import styles from "./index.module.css";

interface Props {
    chatMeta: ChatMeta;
}

function ChatRoom({ chatMeta }: Props) {
    const { currentUser } = useUser();
    const participants = Object.values(chatMeta.data.participants).filter(
        (user) => user.uid !== currentUser!.uid,
    );
    const chat = new Chat(chatMeta.id);
    const [latestMessage, setLatestMessage] = useState<Message | undefined>(
        undefined,
    );

    useEffect(() => {
        const unsub = chat.querySubscribe(
            {
                order: {
                    type: "desc",
                    value: "date",
                },
                limit: 1,
            },
            (snapshot: QuerySnapshot) => {
                snapshot.forEach((doc: QueryDocumentSnapshot) => {
                    setLatestMessage(doc.data() as Message | undefined);
                });
            },
        );

        return () => {
            if (unsub) unsub();
        };
    }, []);

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
                    <div className={styles.ChatRoom_messageTime}>
                        {parseDate(latestMessage?.date ?? 0, "time")}
                    </div>
                </div>
                <div className={styles.ChatRoom_messageContent}>
                    {latestMessage?.content}
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;
