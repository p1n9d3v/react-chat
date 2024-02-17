/* eslint-disable */
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { UserContextProvider, useUser } from ".";

const TestComponent = () => {
    const user = useUser();
    return <div>{user.login.toString()}</div>;
};

jest.mock("apis", () => ({
    fireAuth: {
        observeAuthState: jest.fn(),
    },
}));

describe("UserContextProvider", () => {
    describe("if login", () => {
        beforeEach(() => {
            require("apis").fireAuth.observeAuthState.mockImplementation(
                (callback: (user: any) => void) => {
                    const mockUser = {
                        uid: "123",
                        email: "user@example.com",
                    };
                    callback(mockUser);
                },
            );
        });

        test("provides user login status and user information", async () => {
            render(
                <UserContextProvider>
                    <TestComponent />
                </UserContextProvider>,
            );

            await waitFor(() => {
                expect(screen.getByText(/true/i)).toBeInTheDocument();
            });
        });
    });

    describe("if not login", () => {
        beforeEach(() => {
            jest.clearAllMocks();
            require("apis").fireAuth.observeAuthState.mockImplementation(
                (callback: (user: any) => void) => {
                    callback(null);
                },
            );
        });

        test("provides user login status and user information", async () => {
            render(
                <UserContextProvider>
                    <TestComponent />
                </UserContextProvider>,
            );

            await waitFor(() => {
                expect(screen.getByText(/false/i)).toBeInTheDocument();
            });
        });
    });
});
