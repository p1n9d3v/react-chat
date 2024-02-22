/*
 * @jest-environment node
 */
import fs from "fs";
import {
    initializeTestEnvironment,
    RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import Firestore from "./firestore";
import { firestore } from "./config";
import Chat from "./chat";
import "./config";
import { UserInfo } from "firebase/auth";
import { fireChats } from "apis";

const envData = {
    projectId: "react-chat-751fb",
    firestore: {
        rules: fs.readFileSync("firestore.rules", "utf8"),
        host: "localhost",
        port: 8080,
    },
};
let env: Promise<RulesTestEnvironment> | any;
describe("Firestore", () => {
    beforeAll(async () => {
        env = await initializeTestEnvironment(envData);
    });

    describe("document", () => {
        let db: any;
        describe("shoud be success", () => {
            let setData = {
                name: "Los Angeles",
                state: "CA",
                country: "USA",
            };
            beforeAll(async () => {
                db = new Firestore(firestore, "cities/la");

                await db.setDoc(setData);
            });
            afterAll(() => {
                env.clearFirestore();
            });
            test("set/get data in document", async () => {
                const getData = await db.getDoc();
                expect(getData).toEqual(setData);
            });

            test("update data in document", async () => {
                await db.updateDoc({
                    name: "Philadelphia",
                });

                const getData = await db.getDoc();
                expect(getData.name).toBe("Philadelphia");
            });

            test("delete field in document", async () => {
                await db.deleteField("name");

                const getData = await db.getDoc();
                expect(getData.name).toBeUndefined();
            });

            test("delete document", async () => {
                await db.deleteDoc();

                const getData = await db.getDoc();
                expect(getData).toBeNull();
            });
        });
    });

    describe("collection", () => {
        let db: any;
        const initialDatas = [
            {
                name: "San Francisco",
                state: "CA",
                country: "USA",
                capital: false,
                population: 860000,
                regions: ["west_coast", "norcal"],
            },
            {
                name: "Los Angeles",
                state: "CA",
                country: "USA",
                capital: false,
                population: 3900000,
                regions: ["west_coast", "socal"],
            },
            {
                name: "Washington, D.C.",
                state: null,
                country: "USA",
                capital: true,
                population: 680000,
                regions: ["east_coast"],
            },
            {
                name: "Tokyo",
                state: null,
                country: "Japan",
                capital: true,
                population: 9000000,
                regions: ["kanto", "honshu"],
            },
            {
                name: "Beijing",
                state: null,
                country: "China",
                capital: true,
                population: 21500000,
                regions: ["jingjinji", "hebei"],
            },
        ];

        describe("should be success", () => {
            beforeAll(async () => {
                db = new Firestore(firestore, "cities");

                await Promise.all(
                    initialDatas.map(async (data) => await db.addDoc(data)),
                );
            });

            afterAll(() => {
                env.clearFirestore();
            });

            test("getDocs()", async () => {
                const data = await db.getDocs();
                expect(data.size).toBe(initialDatas.length);
            });

            describe("queryDocs()", () => {
                describe("where", () => {
                    test("get data that include state is CA", async () => {
                        const queries = [["state", "==", "CA"]];
                        const data = await db.queryDocs({
                            queries,
                        });

                        expect(data.length).toBe(2);
                    });

                    test("filter array field", async () => {
                        const queries = [
                            [
                                "regions",
                                "array-contains-any",
                                ["west_coast", "socal"],
                            ],
                        ];
                        const data = await db.queryDocs({
                            queries,
                        });

                        expect(data.length).toBe(2);
                    });
                });

                describe("order", () => {
                    test("asc", async () => {
                        const order = {
                            type: "asc",
                            value: "population",
                        };
                        const data = await db.queryDocs({
                            order,
                        });

                        expect(data.pop().data).toEqual(
                            initialDatas[initialDatas.length - 1],
                        );
                    });

                    test("desc", async () => {
                        const order = {
                            type: "desc",
                            value: "population",
                        };
                        const data = await db.queryDocs({
                            order,
                        });

                        expect(data[0].data).toEqual(
                            initialDatas[initialDatas.length - 1],
                        );
                    });
                });

                describe("limit", () => {
                    test("shoud be data length is 2", async () => {
                        const limit = 2;
                        const data = await db.queryDocs({
                            limit,
                        });

                        expect(data.length).toBe(limit);
                    });
                });

                describe("paginate data with query cursors", () => {
                    const order = {
                        type: "asc",
                        value: "population",
                    };
                    test("startAt", async () => {
                        const startPoint = {
                            type: "startAt",
                            value: 9000000,
                        };

                        const data = await db.queryDocs({
                            order,
                            startPoint,
                        });

                        expect(data.length).toBe(2);
                    });

                    test("endAt", async () => {
                        const startPoint = {
                            type: "endAt",
                            value: 9000000,
                        };

                        const data = await db.queryDocs({
                            order,
                            startPoint,
                        });

                        expect(data.length).toBe(4);
                    });

                    test("startAfter", async () => {
                        const startPoint = {
                            type: "startAfter",
                            value: 9000000,
                        };

                        const data = await db.queryDocs({
                            order,
                            startPoint,
                        });

                        expect(data.length).toBe(1);
                    });

                    test("endBefore", async () => {
                        const startPoint = {
                            type: "endBefore",
                            value: 9000000,
                        };

                        const data = await db.queryDocs({
                            order,
                            startPoint,
                        });

                        expect(data.length).toBe(3);
                    });
                });
                test("where and order", async () => {
                    const order = {
                        type: "desc",
                        value: "population",
                    };

                    const queries = [["country", "==", "USA"]];

                    const data = await db.queryDocs({
                        queries,
                        order,
                    });

                    const expectedData = initialDatas
                        .filter((data) => data.country === "USA")
                        .sort((a, b) => b.population - a.population);
                    expect(data.map((d: any) => d.data)).toEqual(expectedData);
                });
            });
        });
    });
    describe("should be throw new error", () => {
        test("throw new error when calling function related document if ref is collection", () => {
            const db = new Firestore(firestore, "cities");
            expect(() => db.getDoc()).toThrowError("collection is not allowed");
        });
        test("throw new error when calling function related collection if ref is document", () => {
            const db = new Firestore(firestore, "cities/la");
            expect(() => db.getDocs()).toThrowError("document is not allowed");
        });
    });
});

describe("chat", () => {
    const mockParticipants = [
        {
            uid: "1",
            email: "joon@gmail.com",
            displayName: "joon",
            photoURL: "1",
        },
        {
            uid: "2",
            email: "john@gmail.com",
            displayName: "john",
            photoURL: "2",
            accessToken: "2",
        },
    ];
    beforeAll(async () => {
        env = await initializeTestEnvironment(envData);
    });

    afterAll(() => {
        env.clearFirestore();
    });

    describe("create chat", () => {
        test("create", async () => {
            await Chat.create(mockParticipants as UserInfo[]);
            const chats = await fireChats.getDocs();
            expect(chats!.size).toBe(1);
        });

        test("if aleady exist chat room, return chat room", async () => {
            await Chat.create(mockParticipants as UserInfo[]);
            await Chat.create(mockParticipants as UserInfo[]);

            const chats = await fireChats.getDocs();
            expect(chats!.size).toBe(1);
        });
    });

    describe("send message", () => {
        test("send text message", async () => {
            const chat = await Chat.create(mockParticipants as UserInfo[]);

            const sender = {
                displayName: mockParticipants[0].displayName,
                uid: mockParticipants[0].uid,
                photoURL: mockParticipants[0].photoURL,
            };
            const content = "123";
            const message = await chat.sendMessage("text", content, sender);
            const fireMessage = new Firestore(
                firestore,
                `chats/${chat.cId}/messages/${message!.id}`,
            );

            const savedMessage = await fireMessage.getDoc();
            expect(savedMessage!.content).toBe(content);
        });
    });
});
