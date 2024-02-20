import styles from "./index.module.css";
import { useForm } from "react-hook-form";
import Button from "components/ui/Button";
import ImageIcon from "components/icons/ImageIcon";
import { useState } from "react";
import Chat from "apis/chat";
import { useUser } from "contexts/UserContext";
import { ChatMeta } from "types";

interface Props {
    chatMeta: ChatMeta;
}
interface IChatForm {
    text: string;
}

function ChatForm({ chatMeta }: Props) {
    const { id } = chatMeta;
    const chat = new Chat(id);
    const [text, setText] = useState("");
    const { register, handleSubmit } = useForm<IChatForm>({
        defaultValues: {
            text: "",
        },
    });

    const { currentUser } = useUser();

    const sendMessage = (data: IChatForm) => {
        chat.sendMessage("text", data.text, {
            displayName: currentUser!.displayName ?? "",
            uid: currentUser!.uid,
        });
    };

    return (
        <form className={styles.ChatForm} onSubmit={handleSubmit(sendMessage)}>
            <div className={styles.ChatForm_textarea}>
                <textarea
                    {...register("text")}
                    value={text}
                    rows={5}
                    placeholder="Wirte Text..."
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div className={styles.ChatForm_actions}>
                <ImageIcon style={{ width: "2.4rem", height: "2.4rem" }} />
                <Button type="submit" size="lg">
                    Send Message
                </Button>
            </div>
        </form>
    );
}

export default ChatForm;
