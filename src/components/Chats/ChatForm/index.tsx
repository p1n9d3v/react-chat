import styles from "./index.module.css";
import { useForm } from "react-hook-form";
import Button from "components/ui/Button";
import ImageIcon from "components/icons/ImageIcon";
import { KeyboardEvent, useState } from "react";
import Chat from "apis/chat";
import { useUser } from "contexts/UserContext";

interface Props {
    id: string;
}
interface IChatForm {
    text: string;
}

function ChatForm({ id }: Props) {
    const chat = new Chat(id);
    const [text, setText] = useState("");
    const { register, handleSubmit, reset } = useForm<IChatForm>({
        defaultValues: {
            text: "",
        },
    });

    const { currentUser } = useUser();

    const sendMessage = (data: IChatForm) => {
        if (data.text === "") return;

        chat.sendMessage("text", data.text, {
            displayName: currentUser!.displayName ?? "",
            uid: currentUser!.uid,
            photoURL: currentUser!.photoURL ?? "",
        });
        reset();
    };

    const handleEnterDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage({ text });
        }
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
                    onKeyDown={handleEnterDown}
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
