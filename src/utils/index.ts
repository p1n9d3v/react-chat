export const parseDate = (date: Date, type: "time") => {
    switch (type) {
        case "time": {
            return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
        }
        default:
            throw new Error("Invaild type");
    }
};
