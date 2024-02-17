import { render, screen } from "@testing-library/react";
import Users from ".";
import { useQuery } from "react-query";
import { UserInfo } from "@firebase/auth";
jest.mock("react-query", () => ({
    useQuery: jest.fn(),
}));

const mockUsers = new Map<string, UserInfo>([
    [
        "1",
        {
            email: "john@gmail.com",
            displayName: "John",
            photoURL: "1",
            uid: "1",
        } as UserInfo,
    ],
    [
        "2",
        {
            email: "alice@gmail.com",
            displayName: "Alice",
            photoURL: "2",
            uid: "2",
        } as UserInfo,
    ],
]);
describe("Users component", () => {
    beforeEach(() => {
        // Mocking the return value of useQuery
        (useQuery as any).mockReturnValue({
            data: mockUsers,
        });
    });

    test("renders users correctly", () => {
        render(<Users />);

        // Assert that the user names are rendered
        expect(screen.getByText("John")).toBeInTheDocument();
        expect(screen.getByText("Alice")).toBeInTheDocument();
    });
});
