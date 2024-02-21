import { fireChat, fireChats } from "apis";
import { UserInfo } from "firebase/auth";
import Firestore from "./firestore";
import sha256 from "crypto-js/sha256";
import { ChatMeta, ChatMetaData, WhereArray } from "types";
import { firestore } from "./config";
class Chat {
    static async create(_participants: UserInfo[]) {
        if (_participants.length < 2)
            throw new Error("participants count must be more than 2");

        const participants = _participants.reduce((prev, cur) => {
            return {
                ...prev,
                [cur.uid]: {
                    ...cur,
                },
            };
        }, {});
        const participantIds = _participants.map((user) => user.uid);
        const cId = await Chat.makeCId(participantIds);

        let chat: any = await Chat.isExist(cId.toString());
        if (!chat) {
            chat = await fireChats.addDoc({
                participants,
                participantIds,
                cId: cId.toString(),
            });
        }

        return new Chat(chat.id);
    }

    static async makeCId(participantIds: string[]) {
        return sha256(participantIds.sort().join(""));
    }

    static async isExist(cId: string) {
        const queries = [["cId", "==", cId]] as WhereArray[];
        const data = await fireChats.queryDocs({
            queries,
        });

        if (!data) return null;

        return data[0];
    }

    static async getChatMeta(id: string) {
        const chat = fireChat(id);

        return (await chat.getDoc()) as ChatMetaData | null;
    }

    static async getMyChats(uid: string) {
        const queries = [
            ["participantIds", "array-contains", uid],
        ] as WhereArray[];
        return (await fireChats.queryDocs({
            queries,
        })) as null | ChatMeta[];
    }

    #fireChat?: Firestore;
    #fireMessage?: Firestore;
    #cId?: string;

    constructor(cId: string) {
        this.#fireChat = new Firestore(firestore, `chats/${cId}`);
        this.#fireMessage = new Firestore(firestore, `chats/${cId}/messages`);
        this.#cId = cId;
    }

    get cId() {
        return this.#cId;
    }

    async sendMessage(
        type: "enter" | "text" | "img" | "exit",
        content: any,
        sender: { displayName: string; uid: string },
    ) {
        if (!Chat.isExist(this.#cId!)) throw new Error("chat is not exist");
        // 시간, 메시지, 타입, sender정보,
        // 타입 enter, text, img, exit
        const data = {
            type,
            date: new Date(),
            content,
            sender,
        };

        const message = await this.#fireMessage?.addDoc(data);

        return message;
    }
}

export default Chat;
