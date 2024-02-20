import ChatRoom from "components/Chats/ChatRoom";
import styles from "./index.module.css";
import { useQuery } from "react-query";
import { fireChats } from "apis";
import Chat from "components/Chats/Chat";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";
import Loading from "components/ui/Loading";

function Chats() {
    const { data: chats } = useQuery(
        "chats",
        async () => await fireChats.getDocs(),
    );
    const navigate = useNavigate();

    const handleClickChat = (chatMeta: { cId: string }) => {
        navigate(`/chats?chatId=${chatMeta.cId}`);
    };

    return (
        <div className={styles.Chats}>
            <div className={styles.Chats_col}>
                <ul>
                    {chats &&
                        Array.from(chats, ([_, value]) => value).map(
                            (chatMeta, index) => (
                                <li onClick={() => handleClickChat(chatMeta)}>
                                    <ChatRoom key={index} chatMeta={chatMeta} />
                                </li>
                            ),
                        )}
                </ul>
            </div>
            <div className={styles.Chats_col}>
                <Suspense fallback={<Loading />}>
                    <Chat />
                </Suspense>
            </div>
        </div>
    );
}

export default Chats;
