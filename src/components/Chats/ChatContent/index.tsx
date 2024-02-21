import Chat from "apis/chat";
import {
    DocumentSnapshot,
    QueryDocumentSnapshot,
    QuerySnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { Message } from "types";
import styles from "./index.module.css";

interface Props {
    id: string;
}
function ChatContent({ id }: Props) {
    const chat = new Chat(id);
    const [rawMessages, setRawMessages] = useState<Map<string, Message>>(
        new Map(),
    );

    useEffect(() => {
        const unsub = chat.subscribe((snapshot: QuerySnapshot) => {
            snapshot.forEach((doc: QueryDocumentSnapshot) => {
                const newMsg = doc.data() as Message;
                setRawMessages((oldMsges) =>
                    new Map(oldMsges).set(doc.id, newMsg),
                );
            });
        });

        return () => {
            unsub();
        };
    }, []);

    return <div className={styles.ChatContent}>ChatContent</div>;
}

export default ChatContent;
