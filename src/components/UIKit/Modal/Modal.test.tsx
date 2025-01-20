import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import Modal from "./Modal";

describe("Modal component", () => {
  const mockClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    render(
      <Modal close={mockClose}>
        <div data-testid="modal-content">Test Content</div>
      </Modal>,
    );
  });

  it("Renders backdrop, dialog window, close button and children content correctly", () => {
    const backdrop = screen.getByRole("presentation");
    expect(backdrop).toBeInTheDocument();

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /Close/i });
    expect(closeButton).toBeInTheDocument();

    const content = screen.getByTestId("modal-content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("Test Content");
  });

  it("Renders children content correctly", () => {
    const content = screen.getByTestId("modal-content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("Test Content");
  });

  it("Closes modal when clicking on backdrop", () => {
    const backdrop = screen.getByRole("presentation");
    fireEvent.click(backdrop);
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it("Closes modal when pressing Escape key", () => {
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it("Closes modal when clicking on close button", () => {
    const closeButton = screen.getByRole("button", { name: /Close/i });
    fireEvent.click(closeButton);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
