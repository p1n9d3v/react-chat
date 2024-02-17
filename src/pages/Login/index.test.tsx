import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Login from ".";
import FireAuth from "apis/fireAuth";

describe("Login", () => {
    test("redirect chat page if login success", async () => {
        const mockLoginWithGoogle = jest.fn().mockResolvedValue({
            user: {
                uid: "123",
                accessToken: "123",
                email: "123",
                photoURL: "123",
                displayName: "123",
            },
        });

        jest.spyOn(FireAuth.prototype, "loginWithGoogle").mockReturnValueOnce(
            mockLoginWithGoogle as any,
        );

        render(
            <MemoryRouter initialEntries={["/login"]}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<div>chat page</div>} />
                </Routes>
            </MemoryRouter>,
        );

        const googleButton = screen.getByRole("button", {
            name: "Sign in with Google",
        });

        userEvent.click(googleButton);

        await waitFor(() => {
            const chatPage = screen.queryByText(/chat page/i);
            expect(chatPage).toBeInTheDocument();
        });
    });

    test("should not redirecti if login failed", async () => {
        const mockLoginWithGoogle = jest.fn().mockResolvedValue({
            user: null,
        });

        jest.spyOn(FireAuth.prototype, "loginWithGoogle").mockReturnValueOnce(
            mockLoginWithGoogle as any,
        );

        render(
            <MemoryRouter initialEntries={["/login"]}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/chat" element={<div>chat page</div>} />
                </Routes>
            </MemoryRouter>,
        );

        const googleButton = screen.getByRole("button", {
            name: "Sign in with Google",
        });

        userEvent.click(googleButton);

        await waitFor(() => {
            const chatPage = screen.queryByText(/chat page/i);
            expect(chatPage).toBeNull();
        });
    });
});
