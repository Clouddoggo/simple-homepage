import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SuccessModal } from "../components/SuccessModal";

describe("SuccessModal Component", () => {
  const mockOnClose = jest.fn();

  test("renders correctly when visible", () => {
    render(<SuccessModal visible={true} onClose={mockOnClose} />);
    expect(screen.getByText(/All done!/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Great!/i })).toBeInTheDocument();
  });

  test("calls onClose when 'Great!' button is clicked", () => {
    render(<SuccessModal visible={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByRole("button", { name: /Great!/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
