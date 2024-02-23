import { UserInfo } from "firebase/auth";
import { Message } from "types";

export const parseDate = (date: Date, type: "time") => {
    switch (type) {
        case "time": {
            return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
        }
        default:
            throw new Error("Invaild type");
    }
};

export const parseMessages = (
    rawMessages: Map<string, Message>,
    currentUser: UserInfo,
) => {
    const sortedMessages = Array.from(rawMessages)
        .map(([_, v]) => v)
        .sort((a: any, b: any) => a.date - b.date);

    return seperateMessagesByUserAndTime(sortedMessages, currentUser);
};

export const seperateMessagesByUserAndTime = (
    messages: Message[],
    currentUser: UserInfo,
) => {
    const result: Message[][] = [];
    let messageGroup: Message[] = [];

    let prevSenderUid = currentUser!.uid;
    let prevDate = 0;
    messages.forEach((message, index) => {
        if (
            prevSenderUid === message.sender.uid &&
            message.date.seconds - prevDate <= 60
        ) {
            messageGroup.push(message);
        } else {
            result.push(messageGroup);
            messageGroup = [message];
        }

        if (index === messages.length - 1) {
            result.push(messageGroup);
            return;
        }

        prevSenderUid = message.sender.uid;
        prevDate = message.date.seconds;
    });

    result.shift(); // 처음 빈 배열 제거
    return result;
};
