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
import { ChatDB } from "apis/indexedDB";
import { Unsubscribe } from "firebase/auth";

interface Props {
    id: string;
}
function ChatContent({ id }: Props) {
    const { currentUser, isMe } = useUser();
    const chat = new Chat(id);
    const [rawMessages, setRawMessages] = useState<Map<string, Message>>(
        new Map(),
    );
    const allRawMessages = useMemo(
        () => Array.from(rawMessages.values()),
        [rawMessages],
    );
    const messageGroups = useMemo(
        () => parseMessages(rawMessages, currentUser!),
        [rawMessages],
    );

    useEffect(() => {
        let unsub: Unsubscribe | null = null;
        (async () => {
            const oldChat = (await ChatDB.get("chats", id)) as any;
            const oldMessages = oldChat?.messages;
            if (oldMessages?.length > 0) {
                setRawMessages(
                    new Map<string, Message>(
                        oldMessages.map((msg: Message) => [msg.id, msg]),
                    ),
                );
            }

            unsub = chat.querySubscribe(
                {
                    order: {
                        type: "asc",
                        value: "date",
                    },
                    startPoint: {
                        type: "startAfter",
                        value: oldMessages?.at(-1)?.date ?? 0,
                    },
                },
                (snapshot: QuerySnapshot) => {
                    snapshot.forEach((doc: QueryDocumentSnapshot) => {
                        const newMsg = doc.data() as Omit<Message, "id">;
                        setRawMessages((oldMsges) =>
                            new Map(oldMsges).set(doc.id, {
                                id: doc.id,
                                ...newMsg,
                            }),
                        );
                    });
                },
            );
        })();

        return () => {
            if (unsub) unsub();
            if (allRawMessages.length > 0) {
                ChatDB.put("chats", {
                    id,
                    messages: Array.from(rawMessages.values()),
                });
            }
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
