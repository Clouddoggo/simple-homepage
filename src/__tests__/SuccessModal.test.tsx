import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { SuccessModal } from "../components/SuccessModal";

describe("SuccessModal Component", () => {
  const mockOnClose = jest.fn();

  test("renders correctly when visible", async () => {
    const { getByText, getByRole } = render(
      <SuccessModal visible={true} onClose={mockOnClose} />,
    );

    await waitFor(() => {
      expect(getByText(/You're invited!/)).toBeVisible();
      expect(getByRole("button", { name: /Great!/ })).toBeVisible();
    });
  });

  test("calls onClose when 'Great!' button is clicked", () => {
    const { getByText, getByRole } = render(
      <SuccessModal visible={true} onClose={mockOnClose} />,
    );

    fireEvent.click(getByRole("button", { name: /Great!/ }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(getByText(/You're invited!/)).not.toBeVisible();
  });
});
