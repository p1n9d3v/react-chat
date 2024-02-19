import ChatIcon from "components/icons/ChatIcon";
import PhoneIcon from "components/icons/PhoneIcon";
import VideoIcon from "components/icons/VideoIcon";
import IconButton from "components/ui/IconButton";
import { UserInfo } from "@firebase/auth";
import styles from "./index.module.css";
import { useUser } from "contexts/UserContext";
import { useMutation } from "react-query";
import Chat from "apis/chat";
import { useNavigate } from "react-router-dom";

interface Props {
    user: UserInfo;
}
function UserDetail({ user }: Props) {
    const navigate = useNavigate();
    const { currentUser } = useUser();
    const { mutate: createChat } = useMutation({
        mutationFn: async () => {
            if (!currentUser)
                throw new Error(
                    "Can not create chat because user is not logged in",
                );
            await Chat.create([currentUser, user]);
        },
    });

    return (
        <div className={styles.UserDetail} onClick={() => createChat()}>
            <div className={styles.UserDetail_info}>
                <img
                    className={styles.UserDetail_avatar}
                    src={user.photoURL ?? ""}
                    alt="user img"
                />
                <div className={styles.UserDetail_name}>{user.displayName}</div>
                <div className={styles.UserDetail_email}>{user.email}</div>
            </div>

            <div className={styles.UserDetail_actions}>
                <IconButton icon={<PhoneIcon />} text="Audio" />
                <IconButton icon={<VideoIcon />} text="Video" />
                <IconButton
                    icon={<ChatIcon />}
                    text="Chat"
                    onClick={() => navigate("/chats")}
                />
            </div>

            <div className={styles.UserDetail_stories}>
                <div>images</div>
            </div>
        </div>
    );
}

export default UserDetail;
