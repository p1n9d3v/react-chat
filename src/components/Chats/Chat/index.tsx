import { useEffect } from "react";
import { useLocation, useNavigation, useSearchParams } from "react-router-dom";
import ChatForm from "../ChatForm";
import ChatHeader from "../ChatHeader";
import styles from "./index.module.css";

function Chat() {
    const location = useLocation();

    console.log(location.search);
    // useEffect(() => {
    // 	if(location.search)
    // },[])

    return (
        <div className={styles.Chat}>
            <div className={styles.Chat_header}>
                <ChatHeader />
            </div>
            <div className={styles.Chat_content}></div>
            <div className={styles.Chat_form}>
                <ChatForm />
            </div>
        </div>
    );
}

export default Chat;
