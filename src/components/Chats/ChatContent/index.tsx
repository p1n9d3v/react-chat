import Chat from "apis/chat";
import { useUser } from "contexts/UserContext";
import { QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import { useState, useEffect, useMemo } from "react";
import { Message } from "types";
import { parseMessages } from "utils";
import cn from "classnames";
import styles from "./index.module.css";
import Messages from "../Messages";

interface Props {
    id: string;
}
function ChatContent({ id }: Props) {
    const { currentUser, isMe } = useUser();
    const chat = new Chat(id);
    const [rawMessages, setRawMessages] = useState<Map<string, Message>>(
        new Map(),
    );
    const messageGroups = useMemo(
        () => parseMessages(rawMessages, currentUser!),
        [rawMessages],
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

    return (
        <div className={styles.ChatContent}>
            <ul>
                {messageGroups.map((messageGroup: Message[]) => (
                    <li
                        className={cn(styles.ChatContent_messageGroups, {
                            [styles.ChatContent_messageGroups___isMe]: isMe(
                                messageGroup.at(0)?.sender.uid ?? "",
                            ),
                        })}
                    >
                        <img
                            src={messageGroup.at(0)?.sender.photoURL ?? ""}
                            alt="partner img"
                        />
                        <div>
                            <div className={styles.ChatContent_partnerName}>
                                {messageGroup.at(0)?.sender.displayName}
                            </div>
                            <Messages messages={messageGroup} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChatContent;
