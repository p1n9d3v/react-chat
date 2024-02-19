import { screen, render, waitFor } from "@testing-library/react";
import { useUser } from "contexts/UserContext";
import { ReactNode } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PrivateProvider from ".";

jest.mock("contexts/UserContext", () => ({
    useUser: jest.fn(),
}));

const CustomRender = () => (
    <MemoryRouter initialEntries={["/"]}>
        <Routes>
            <Route
                path="/"
                element={
                    <PrivateProvider>
                        <div>Home Page</div>
                    </PrivateProvider>
                }
            />
            <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
    </MemoryRouter>
);
describe("PrivateProvider", () => {
    test("redirects to '/login' when user is not logged in", async () => {
        (useUser as any).mockReturnValue({ login: false });
        render(<CustomRender />);

        await waitFor(() => {
            const text = screen.getByText(/Login Page/i);
            expect(text).toBeInTheDocument();
        });
    });

    test("if user is login, then should not redirect", async () => {
        (useUser as any).mockReturnValue({ login: true });
        render(<CustomRender />);

        await waitFor(() => {
            const text = screen.getByText(/Home Page/i);
            expect(text).toBeInTheDocument();
        });
    });
});
