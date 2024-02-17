import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OAuthButton from ".";

const login = jest.fn();
describe("OAuthButton", () => {
    test("calls the login api when clicked", () => {
        render(<OAuthButton login="google" onClick={login} />);
        userEvent.click(screen.getByRole("button"));
        expect(login).toHaveBeenCalled();
    });
});
