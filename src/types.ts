import { UserInfo } from "firebase/auth";
import {
    CollectionReference,
    DocumentData,
    DocumentReference,
    FieldPath,
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
    date: Date;
    type: "text" | "string";
    content: string;
    sender: Sender;
};

export type Sender = Pick<UserInfo, "displayName" | "uid">;

// chat api
export type WhereArray = [string | FieldPath, WhereFilterOp, unknown];
export type Document = DocumentReference<DocumentData, DocumentData>;
export type Collection = CollectionReference<DocumentData, DocumentData>;
export type StartPoint = {
    type: "startAt" | "startAfter" | "endAt" | "endBefore";
    value: number;
};
export type Order = {
    type: "asc" | "desc";
    value: string;
};
