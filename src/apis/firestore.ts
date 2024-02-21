import {
    collection,
    deleteDoc,
    deleteField,
    doc,
    Firestore as FirestoreInterface,
    limit as FirestoreLimit,
    getDoc,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    query,
    where,
    orderBy,
    startAt,
    endAt,
    endBefore,
    startAfter,
    onSnapshot,
    DocumentReference,
    DocumentSnapshot,
    QuerySnapshot,
} from "firebase/firestore";
import { Query } from "react-query";
import { Collection, Document, Order, StartPoint, WhereArray } from "types";

class Firestore {
    #db;
    #ref;
    #refType: "doc" | "col" = "doc";

    constructor(firestore: FirestoreInterface, path: string) {
        if (!path.length) {
            throw new Error("invalid path");
        }
        this.#db = firestore;
        this.#ref = this.#getRef(path);

        return new Proxy(this, {
            get: (target: any, prop: string, receiver: any) => {
                const isRelatedDoc = [
                    "getDoc",
                    "setDoc",
                    "updateDoc",
                    "deleteDoc",
                    "deleteField",
                ].includes(prop);

                const isRelatedCol = [
                    "getDocs",
                    "addDoc",
                    "queryDocs",
                ].includes(prop);

                if (isRelatedDoc && target.#refType !== "doc") {
                    throw new Error("collection is not allowed");
                }

                if (isRelatedCol && target.#refType !== "col") {
                    throw new Error("document is not allowed");
                }

                return target[prop];
            },
        });
    }

    #getRef(path: string) {
        if (!this.#db) throw new Error("Firestore is not initialized");
        const pathArray = path.split("/");
        if (path.startsWith("/")) {
            pathArray.shift();
        }

        const [first, ...rest] = pathArray;
        if (pathArray.length % 2 === 0) {
            this.#refType = "doc";
            return doc(this.#db, first, ...rest);
        }

        this.#refType = "col";
        return collection(this.#db, first, ...rest);
    }

    #parseQueries(
        queries?: Array<WhereArray>,
        order?: Order,
        limit?: number,
        startPoint?: StartPoint,
    ) {
        let parsedQueries = [];
        if (queries) {
            const wheres = queries.map(([prop, op, val]) =>
                where(prop, op, val),
            );
            parsedQueries.push(...wheres);
        }

        if (order) {
            parsedQueries.push(orderBy(order.value, order.type));
        }

        if (startPoint) {
            switch (startPoint.type) {
                case "startAt": {
                    parsedQueries.push(startAt(startPoint.value));
                    break;
                }
                case "endAt": {
                    parsedQueries.push(endAt(startPoint.value));
                    break;
                }

                case "endBefore": {
                    parsedQueries.push(endBefore(startPoint.value));
                    break;
                }

                case "startAfter": {
                    parsedQueries.push(startAfter(startPoint.value));
                }
            }
        }
        if (limit) {
            parsedQueries.push(FirestoreLimit(limit));
        }
        return parsedQueries;
    }

    async setDoc(data: any) {
        await setDoc(this.#ref as Document, data);
    }

    async getDoc() {
        const snap = await getDoc(this.#ref as Document);

        if (!snap.exists()) return null;
        return snap.data();
    }

    async getDocs() {
        const snaps = await getDocs(this.#ref as Collection);
        const result = new Map<string, any>();

        snaps.forEach((doc) => {
            if (doc.exists()) {
                result.set(doc.id, doc.data());
            }
        });

        if (!result.size) return null;

        return result;
    }

    async addDoc(data: any) {
        const snap = await addDoc(this.#ref as Collection, data);

        return snap;
    }

    async queryDocs(queryArgs: {
        queries?: Array<WhereArray>;
        order?: Order;
        limit?: number;
        startPoint?: StartPoint;
    }) {
        const { queries, order, limit, startPoint } = queryArgs;

        const parsedQueries = this.#parseQueries(
            queries,
            order,
            limit,
            startPoint,
        );
        const q = query(this.#ref as Collection, ...parsedQueries);

        const snaps = await getDocs(q);
        if (snaps.empty) return null;
        return snaps.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }));
    }

    async updateDoc(data: any) {
        await updateDoc(this.#ref as Document, data);
    }

    async deleteField(field: string) {
        await updateDoc(this.#ref as Document, {
            [field]: deleteField(),
        });
    }

    async deleteDoc() {
        await deleteDoc(this.#ref as Document);
    }

    subscribe(callback: (doc: QuerySnapshot) => void) {
        return onSnapshot(this.#ref as Collection, callback);
    }
}

export default Firestore;
