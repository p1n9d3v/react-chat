import { Message as MessageType } from "types";
import cn from "classnames";
import styles from "./index.module.css";
import { useUser } from "contexts/UserContext";

interface Props {
    messages: MessageType[];
}
function Messages({ messages }: Props) {
    const { currentUser, isMe } = useUser();

    return (
        <div>
            {messages.map((message) => (
                <div
                    className={cn(styles.Messages_text, {
                        [styles.Messages_text___right]: isMe(
                            messages.at(0)?.sender.uid ?? "",
                        ),
                        [styles.Messages_text___left]: !isMe(
                            messages.at(0)?.sender.uid ?? "",
                        ),
                    })}
                >
                    {message.content}
                </div>
            ))}
        </div>
    );
}

export default Messages;
