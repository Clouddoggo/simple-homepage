import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import { RequestInviteModal } from "../components/RequestInviteModal";
import { mockMatchMedia } from "../setupTests";

beforeAll(() => {
  mockMatchMedia();
});

describe("RequestInviteModal Component", () => {
  const mockOnClose = jest.fn();
  const mockOnSubmitSuccess = jest.fn();

  test("renders correctly when visible", async () => {
    const { getByText, getByRole } = render(
      <RequestInviteModal
        visible={true}
        onClose={mockOnClose}
        onSubmitSuccess={mockOnSubmitSuccess}
      />,
    );

    await waitFor(() => {
      expect(getByText("Request an invitation")).toBeVisible();
      expect(getByRole("button", { name: "Submit" })).toBeVisible();
    });
  });

  test("shows error when name length is less than 3", async () => {
    const { findByText, getByLabelText, getByRole } = render(
      <RequestInviteModal
        visible={true}
        onClose={mockOnClose}
        onSubmitSuccess={mockOnSubmitSuccess}
      />,
    );

    await act(() => {
      const nameInput = getByLabelText(/^Full Name$/);
      const submitButton = getByRole("button", { name: /Submit/ });

      fireEvent.change(nameInput, {
        target: { value: "jo" },
      });
      fireEvent.click(submitButton);
    });

    expect(
      await findByText(/Your full name must have at least 3 characters/),
    ).toBeInTheDocument();
  });

  test("shows error when email is not in email format", async () => {
    const { getByRole, findByText, getByLabelText } = render(
      <RequestInviteModal
        visible={true}
        onClose={mockOnClose}
        onSubmitSuccess={mockOnSubmitSuccess}
      />,
    );

    await act(() => {
      const emailInput = getByLabelText(/^Email$/);
      const submitButton = getByRole("button", { name: /Submit/ });

      fireEvent.change(emailInput, {
        target: { value: "john@com" },
      });
      fireEvent.click(submitButton);
    });

    expect(await findByText(/Please enter a valid email/)).toBeInTheDocument();
  });

  test("validates email and confirm email are matching", async () => {
    const { getByRole, findByText, getByLabelText } = render(
      <RequestInviteModal
        visible={true}
        onClose={mockOnClose}
        onSubmitSuccess={mockOnSubmitSuccess}
      />,
    );

    await act(() => {
      const emailInput = getByLabelText(/^Email$/);
      const confirmEmailInput = getByLabelText(/Confirm Email/);
      const submitButton = getByRole("button", { name: /Submit/ });

      fireEvent.change(emailInput, {
        target: { value: "johndoe@example.com" },
      });
      fireEvent.change(confirmEmailInput, {
        target: { value: "wrong@example.com" },
      });
      fireEvent.click(submitButton);
    });

    expect(
      await findByText(/The emails that you entered do not match!/),
    ).toBeInTheDocument();
  });
});
