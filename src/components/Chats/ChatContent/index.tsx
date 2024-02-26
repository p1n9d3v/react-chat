import Chat from "apis/chat";
import { useUser } from "contexts/UserContext";
import { QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import { useState, useEffect, useMemo } from "react";
import { Message } from "types";
import { parseMessages } from "utils";
import cn from "classnames";
import styles from "./index.module.css";
import Messages from "../Messages";
import ScrollToBottom from "components/common/ScrollToBottom";

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

    const getSenderUidFromMessages = (messages: Message[]) =>
        messages.at(0)?.sender.uid ?? "";

    return (
        <div className={styles.ChatContent}>
            <ScrollToBottom
                style={{
                    height: "calc(100dvh - 33rem)",
                    paddingRight: "1.6rem",
                }}
                dependencies={[rawMessages]}
            >
                <ul>
                    {messageGroups.map((messageGroup: Message[]) => (
                        <li
                            className={cn(styles.ChatContent_messageGroups, {
                                [styles.ChatContent_messageGroups___isMe]: isMe(
                                    getSenderUidFromMessages(messageGroup),
                                ),
                            })}
                        >
                            <img
                                src={messageGroup.at(0)?.sender.photoURL ?? ""}
                                alt="partner img"
                            />
                            <div>
                                <div
                                    className={cn(
                                        styles.ChatContent_partnerName,
                                        {
                                            [styles.ChatContent_partnerName___isMe]:
                                                isMe(
                                                    getSenderUidFromMessages(
                                                        messageGroup,
                                                    ),
                                                ),
                                        },
                                    )}
                                >
                                    {messageGroup.at(0)?.sender.displayName}
                                </div>
                                <Messages messages={messageGroup} />
                            </div>
                        </li>
                    ))}
                </ul>
            </ScrollToBottom>
        </div>
    );
}

export default ChatContent;
