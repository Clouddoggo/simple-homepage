import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { RequestInviteModal } from "../components/RequestInviteModal";
import { mockMatchMedia } from "../setupTests";

beforeAll(() => {
  mockMatchMedia();
});

describe("RequestInviteModal Component", () => {
  const mockOnClose = jest.fn();
  const mockOnSubmitSuccess = jest.fn();

  test("renders correctly when visible", async () => {
    const { getByText, findByRole } = render(
      <RequestInviteModal
        visible={true}
        onClose={mockOnClose}
        onSubmitSuccess={mockOnSubmitSuccess}
      />,
    );

    expect(getByText("Request an invitation")).toBeTruthy();
    expect(await findByRole("button", { name: "Submit" })).toBeTruthy();
  });

  test("validates name length", () => {
    const { getByText, getByLabelText, getByRole } = render(
      <RequestInviteModal
        visible={true}
        onClose={mockOnClose}
        onSubmitSuccess={mockOnSubmitSuccess}
      />,
    );

    act(() => {
      const nameInput = getByLabelText(/^Full Name$/);
      const submitButton = getByRole("button", { name: /Submit/ });

      fireEvent.change(nameInput, {
        target: { value: "jo" },
      });
      fireEvent.click(submitButton);
    });

    expect(
      getByText(/Your full name must have at least 3 characters/),
    ).toBeInTheDocument();
  });

  test("validates email and confirm email are matching", () => {
    const { getByRole, getByText, getByLabelText } = render(
      <RequestInviteModal
        visible={true}
        onClose={mockOnClose}
        onSubmitSuccess={mockOnSubmitSuccess}
      />,
    );

    act(() => {
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
      getByText(/The emails that you entered do not match!/),
    ).toBeInTheDocument();
  });

  test("closes RequestInviteModal on cancel", () => {
    render(
      <RequestInviteModal
        visible={true}
        onClose={mockOnClose}
        onSubmitSuccess={mockOnSubmitSuccess}
      />,
    );

    fireEvent.click(document.body); // click outside
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
