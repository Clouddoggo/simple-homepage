import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RequestInviteModal } from "../components/RequestInviteModal";

describe("RequestInviteModal Component", () => {
  const mockOnClose = jest.fn();
  const mockOnSubmitSuccess = jest.fn();

  test("renders correctly when visible", () => {
    render(
      <RequestInviteModal
        visible={true}
        onClose={mockOnClose}
        onSubmitSuccess={mockOnSubmitSuccess}
      />,
    );
    expect(screen.getByText(/Request an invite/i)).toBeInTheDocument();
  });

  test("validates email and confirm email", async () => {
    render(
      <RequestInviteModal
        visible={true}
        onClose={mockOnClose}
        onSubmitSuccess={mockOnSubmitSuccess}
      />,
    );

    const emailInput = screen.getByPlaceholderText(/johndoe@example.com/i);
    const confirmEmailInput = screen.getByPlaceholderText(/Confirm Email/i);
    const submitButton = screen.getByRole("button", { name: /Submit/i });

    fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });
    fireEvent.change(confirmEmailInput, {
      target: { value: "wrong@example.com" },
    });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText(/The emails that you entered do not match!/i),
    ).toBeInTheDocument();
  });

  test("calls onSubmitSuccess on successful submission", async () => {
    render(
      <RequestInviteModal
        visible={true}
        onClose={mockOnClose}
        onSubmitSuccess={mockOnSubmitSuccess}
      />,
    );

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

    expect(mockOnSubmitSuccess).toHaveBeenCalledTimes(1);
  });
});
