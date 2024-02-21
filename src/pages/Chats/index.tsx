import styles from "./index.module.css";
import Chat from "components/Chats/Chat";
import { Suspense } from "react";
import Loading from "components/ui/Loading";
import MyChats from "components/Chats/MyChats";

function Chats() {
    return (
        <div className={styles.Chats}>
            <div className={styles.Chats_col}>
                <Suspense fallback={<Loading />}>
                    <MyChats />
                </Suspense>
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
