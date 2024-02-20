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
    data: {
        cId: string;
        participantIds: string[];
        participants: UserInfo[];
    };
};

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
