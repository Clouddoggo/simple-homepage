import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("App Component", () => {
  test("renders the main title and button", () => {
    render(<App />);
    expect(
      screen.getByText(/A better way to enjoy everyday/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Request an invite/i }),
    ).toBeInTheDocument();
  });

  test("opens RequestInviteModal when clicking 'Request an invite'", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Request an invite/i }));
    expect(screen.getByText(/Request an invite/i)).toBeInTheDocument();
  });

  test("closes RequestInviteModal on cancel", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Request an invite/i }));
    fireEvent.click(screen.getByRole("button", { name: /Cancel/i })); // Assuming there's a cancel button
    expect(screen.queryByText(/Request an invite/i)).not.toBeInTheDocument();
  });

  test("shows SuccessModal after successful submission", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Request an invite/i }));

    const nameInput = screen.getByPlaceholderText(/John Doe/i);
    const emailInput = screen.getByPlaceholderText(/johndoe@example.com/i);
    const confirmEmailInput = screen.getByPlaceholderText(/Confirm Email/i);
    const submitButton = screen.getByRole("button", { name: /Submit/i });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });
    fireEvent.change(confirmEmailInput, {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.click(submitButton);

    // Simulate successful submission
    expect(screen.getByText(/All done!/i)).toBeInTheDocument();
  });
});
