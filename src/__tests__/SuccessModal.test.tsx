import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SuccessModal } from "../components/SuccessModal";

describe("SuccessModal Component", () => {
  const mockOnClose = jest.fn();

  test("renders correctly when visible", () => {
    const { getByText, getByRole } = render(
      <SuccessModal visible={true} onClose={mockOnClose} />,
    );

    expect(getByText(/You're invited!/)).toBeTruthy();
    expect(getByRole("button", { name: /Great!/ })).toBeTruthy();
  });

  test("calls onClose when 'Great!' button is clicked", () => {
    render(<SuccessModal visible={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByRole("button", { name: /Great!/ }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
