import React from "react";
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import App from "../components/App";
import { mockMatchMedia } from "../setupTests";

beforeAll(() => {
  mockMatchMedia();
});

describe("App Component", () => {
  test("renders the main title and button", () => {
    render(<App />);
    expect(screen.getByText(/A better way to enjoy everyday/)).toBeVisible();
    expect(
      screen.getByRole("button", { name: /Send me an invite!/ }),
    ).toBeVisible();
  });

  test("opens RequestInviteModal when clicking 'Send me an invite'", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Send me an invite!/ }));

    const modal = screen.getByRole("dialog");

    await waitFor(() => {
      expect(within(modal).getByText(/Request an invitation/)).toBeVisible();
    });
  });
});
