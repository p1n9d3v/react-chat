import { render, screen } from "@testing-library/react";
import User from "components/Users/User";
import { UserInfo } from "@firebase/auth";

const mockUser = {
    photoURL:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgVFRUYGBgZGBoZGBgYGBgYGBgYGhgcGRgYGBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHzQsJCs0NDU0NDE0NDQ0NDE0NDQ0NDY0NDQ0MTQ0NDQ0NDQ0NDQ0NDY0NDQxNDQ0NDQ0NDQ0NP/AABEIAM4A9QMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAgMEBQYBB//EADoQAAIBAgQEBAQEBQQCAwAAAAECAAMRBBIhMQUiQVFhcYGRBhMyoUJSscEjYpLR8IKywuEUchUzov/EABkBAAMBAQEAAAAAAAAAAAAAAAACAwQBBf/EACIRAAMBAAMBAAIDAQEAAAAAAAABAhEDEiExQVETIjJxgf/aAAwDAQACEQMRAD8A9ihCE4dCEIQAIQhAAhCEACEIQAIQhAAhCEACEIQAIQhAAhCEACEIQAIQhAAhCJ+YL2vrADjyO5j9QyNUMVnUNs0aZp1zGmMXRheacjcIadwvIQhKEwhCEACEIQAIQhAAhCEACEIQAIQhAAhCUWP42Q/y6KhjezOTyg9QANWI69otVMrWNEVbyS9kDGcYoUrh6qKRuL3YeajUTNcT4qiH+NXa5H0g2Fr7BFH3PvIS8Zw6cqCkPN0X3yhgPWTfI/wiq4c/0zWD4hw9wpq5Cdg6ul/LOovLKnVVhdWDDuCCPcTGYfiNCuGXkYDQhgGUn",
    displayName: "name",
    email: "email",
} as UserInfo;

describe("User", () => {
    test("renders correctly", () => {
        render(<User user={mockUser} />);
        const img = screen.getByAltText("user profile");
        expect(img.getAttribute("src")).toBe(mockUser.photoURL);

        const name = screen.getByText(mockUser.displayName as string);
        expect(name).toBeInTheDocument();

        const email = screen.getByText(mockUser.email as string);
        expect(email).toBeInTheDocument();
    });
});
