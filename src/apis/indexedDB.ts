class DB {
    #dbName?: string;
    #version?: number;
    #db?: IDBDatabase;

    constructor(
        dbName: string,
        version: number,
        objectStores: {
            name: string;
            keyPath: string;
        }[],
    ) {
        this.#dbName = dbName;
        this.#version = version;
        this.#init(objectStores);
    }

    #init(
        objectStores: {
            name: string;
            keyPath: string;
        }[],
    ) {
        const dbOpenRequest = indexedDB.open(this.#dbName!, this.#version!);
        dbOpenRequest.onerror = (event) => {
            throw new Error("DB open error");
        };

        dbOpenRequest.onsuccess = (event: Event) => {
            this.#db = (event.target as IDBOpenDBRequest).result;
        };

        if (objectStores) {
            dbOpenRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const db = (event.target as IDBOpenDBRequest).result;

                objectStores.forEach((store) => {
                    if (!db.objectStoreNames.contains(store.name)) {
                        db.createObjectStore(store.name, {
                            keyPath: store.keyPath,
                        });
                    }
                });
            };
        }
    }

    #openDB(): IDBDatabase | undefined {
        if (!this.#db) throw new Error("DB is not created");

        return this.#db;
    }

    async add(storeName: string, data: any) {
        new Promise((resolve, reject) => {
            const db = this.#openDB();
            const objectStore = db!
                .transaction(storeName, "readwrite")
                .objectStore(storeName);
            const request = objectStore.add(data);

            request.onerror = (event) => {
                reject((event.target as IDBRequest).error);
            };
        });
    }

    async put(storeName: string, data: any) {
        new Promise((resolve, reject) => {
            const db = this.#openDB();
            const objectStore = db!
                .transaction(storeName, "readwrite")
                .objectStore(storeName);
            const request = objectStore.put(data);

            request.onerror = (event) => {
                reject((event.target as IDBRequest).error);
            };
        });
    }

    async get(storeName: string, keyPath: string) {
        return new Promise((resolve, reject) => {
            const db = this.#openDB();
            const objectStore = db!
                .transaction(storeName, "readonly")
                .objectStore(storeName);
            const request = objectStore.get(keyPath);

            request.onerror = (event) => {
                reject((event.target as IDBRequest).error);
            };

            request.onsuccess = (event) => {
                resolve((event.target as IDBRequest).result);
            };
        });
    }

    async getAll(storeName: string) {
        return new Promise((resolve, reject) => {
            const db = this.#openDB();
            const objectStore = db!
                .transaction(storeName, "readonly")
                .objectStore(storeName);
            const request = objectStore.getAll();

            request.onerror = (event) => {
                reject((event.target as IDBRequest).error);
            };

            request.onsuccess = (event) => {
                resolve((event.target as IDBRequest).result);
            };
        });
    }
}

const DB_NAME = "react-chat";
const DB_VERSION = 1;
const OBJECT_STORES = [
    {
        name: "chats",
        keyPath: "id",
    },
];
export const ChatDB = new DB(DB_NAME, DB_VERSION, OBJECT_STORES);
