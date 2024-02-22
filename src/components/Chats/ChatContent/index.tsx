import Chat from "apis/chat";
import { useUser } from "contexts/UserContext";
import { QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import { useState, useEffect, useMemo } from "react";
import { Message } from "types";
import { parseMessages } from "utils";
import styles from "./index.module.css";

interface Props {
    id: string;
}
function ChatContent({ id }: Props) {
    const { currentUser } = useUser();
    const chat = new Chat(id);
    const [rawMessages, setRawMessages] = useState<Map<string, Message>>(
        new Map(),
    );
    const messages = useMemo(
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

    console.log(messages);

    return (
        <div className={styles.ChatContent}>
            <ul>
                {/* {messages.map((message) => ( */}
                {/*     <li> */}
                {/*         <img */}
                {/*             className={styles.ChatContent_partnerProfileImg} */}
                {/*             src={message.sender.photoURL ?? ""} */}
                {/*             alt="partner img" */}
                {/*         /> */}
                {/*         <div> */}
                {/*             <div className={styles.ChatContent_partnerName}> */}
                {/*                 {message.sender.displayName} */}
                {/*             </div> */}
                {/*             <div></div> */}
                {/*         </div> */}
                {/*     </li> */}
                {/* ))} */}
            </ul>
        </div>
    );
}

export default ChatContent;
