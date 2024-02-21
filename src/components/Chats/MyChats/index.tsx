import Chat from "apis/chat";
import { useUser } from "contexts/UserContext";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import ChatRoom from "../ChatRoom";

function MyChats() {
    const navigate = useNavigate();

    const { currentUser } = useUser();
    const { data: chats } = useQuery(
        "chats",
        async () => await Chat.getMyChats(currentUser!.uid),
        { enabled: !!currentUser },
    );

    const handleClickChat = (id: string) => {
        navigate(`/chats?chatId=${id}`);
    };
    return (
        <ul>
            {chats &&
                chats.map((chatMeta, index) => (
                    <li onClick={() => handleClickChat(chatMeta.id)}>
                        <ChatRoom key={index} chatMeta={chatMeta} />
                    </li>
                ))}
        </ul>
    );
}

export default MyChats;
