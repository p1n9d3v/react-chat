import { UserInfo } from "firebase/auth";
import {
    CollectionReference,
    DocumentData,
    DocumentReference,
    FieldPath,
    Timestamp,
    WhereFilterOp,
} from "firebase/firestore";

export type ChatMeta = {
    id: string;
    data: ChatMetaData;
};

export type ChatMetaData = {
    cId: string;
    participantIds: string[];
    participants: UserInfo[];
};

export type Message = {
    date: number;
    type: "text" | "img";
    content: string;
    sender: Sender;
    id: string;
};

export type Sender = Pick<UserInfo, "displayName" | "uid" | "photoURL">;

// chat api
export type WhereArray = [string | FieldPath, WhereFilterOp, unknown];
export type Document = DocumentReference<DocumentData, DocumentData>;
export type Collection = CollectionReference<DocumentData, DocumentData>;
export type StartPoint = {
    type: "startAt" | "startAfter" | "endAt" | "endBefore";
    value: number | Timestamp;
};
export type Order = {
    type: "asc" | "desc";
    value: string;
};
