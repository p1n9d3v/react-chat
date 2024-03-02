import { fireChat, fireChats } from "apis";
import { UserInfo } from "firebase/auth";
import Firestore from "./firestore";
import sha256 from "crypto-js/sha256";
import {
    ChatMeta,
    ChatMetaData,
    Order,
    Sender,
    StartPoint,
    WhereArray,
} from "types";
import { firestore } from "./config";
import { DocumentSnapshot, QuerySnapshot } from "firebase/firestore";
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

    constructor(id: string) {
        this.#fireChat = new Firestore(firestore, `chats/${id}`);
        this.#fireMessage = new Firestore(firestore, `chats/${id}/messages`);
        this.#cId = id;
    }

    get cId() {
        return this.#cId;
    }

    async sendMessage(
        type: "enter" | "text" | "img" | "exit",
        content: any,
        sender: Sender,
    ) {
        if (!Chat.isExist(this.#cId!)) throw new Error("chat is not exist");
        const data = {
            type,
            date: new Date().getTime(),
            content,
            sender,
        };

        const message = await this.#fireMessage?.addDoc(data);

        return message;
    }

    querySubscribe(
        queryArgs: {
            queries?: Array<WhereArray>;
            order?: Order;
            limit?: number;
            startPoint?: StartPoint;
        },
        callback: (snapshot: QuerySnapshot) => void,
    ) {
        return this.#fireMessage!.querySubscribe(queryArgs, callback);
    }
}

export default Chat;
