import { Message as MessageType } from "types";
import styles from "./index.module.css";

interface Props {
    messages: MessageType[];
}
function Messages({ messages }: Props) {
    return (
        <div className={styles.Message}>
            <img src="" alt="profile img" />
            <ul>
                {messages.map((message) => (
                    <li>{message.content}</li>
                ))}
            </ul>
        </div>
    );
}

export default Messages;
