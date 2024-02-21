import { auth, firestore } from "./config";

import FireAuth from "./fireAuth";
import Firestore from "./firestore";

export const fireAuth = new FireAuth(auth);
export const fireUser = (uid: string) =>
    new Firestore(firestore, `users/${uid}`);
export const fireUsers = new Firestore(firestore, "users");
export const fireChats = new Firestore(firestore, "chats");
export const fireChat = (id: string) => new Firestore(firestore, `chats/${id}`);
