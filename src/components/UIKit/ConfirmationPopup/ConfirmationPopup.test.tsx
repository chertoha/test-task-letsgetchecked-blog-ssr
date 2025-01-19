import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ConfirmationPopup from "./ConfirmationPopup";

describe("ConfirmationPopup component", () => {
  const mockOnConfirm = jest.fn();
  const mockOnReject = jest.fn();
  const mockTitle = "Test title";
  const mockDescription = "Test description";

  beforeEach(() => {
    render(
      <ConfirmationPopup
        title={mockTitle}
        description={mockDescription}
        onConfirm={mockOnConfirm}
        onReject={mockOnReject}
      />,
    );
  });

  it("Renders title correctly", () => {
    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toHaveTextContent(mockTitle);
  });

  it("Renders description correctly", () => {
    const description = screen.getByText(mockDescription);
    expect(description).toBeInTheDocument();
  });

  it("Renders default button 'ok' and 'cancel' correctly", () => {
    const confirmButton = screen.getByRole("button", { name: /ok/i });
    const rejectButton = screen.getByRole("button", { name: /cancel/i });

    expect(confirmButton).toBeInTheDocument();
    expect(rejectButton).toBeInTheDocument();

    expect(confirmButton).toHaveAttribute("type", "button");
    expect(rejectButton).toHaveAttribute("type", "button");
  });

  it("Calls onReject when button 'cancel' is clicked", () => {
    const rejectButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(rejectButton);
    expect(mockOnReject).toHaveBeenCalledTimes(1);
  });

  it("Calls onConfirm when button 'ok' is clicked", () => {
    const confirmButton = screen.getByRole("button", { name: /ok/i });
    fireEvent.click(confirmButton);
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("Renders custom confirm and reject buttons if provided", () => {
    render(
      <ConfirmationPopup
        title="Are you sure?"
        onConfirm={mockOnConfirm}
        onReject={mockOnReject}
        confirmButtonElement={<button>Custom Confirm</button>}
        rejectButtonElement={<button>Custom Reject</button>}
      />,
    );

    const customConfirm = screen.getByText("Custom Confirm");
    const customReject = screen.getByText("Custom Reject");

    expect(customConfirm).toBeInTheDocument();
    expect(customReject).toBeInTheDocument();
  });

  it("Calls custom confirm and reject handlers if provided", () => {
    const customMockConfirm = jest.fn();
    const customMockReject = jest.fn();

    render(
      <ConfirmationPopup
        title="Are you sure?"
        onConfirm={customMockConfirm}
        onReject={customMockReject}
        confirmButtonElement={<button onClick={customMockConfirm}>Custom Confirm</button>}
        rejectButtonElement={<button onClick={customMockReject}>Custom Reject</button>}
      />,
    );

    const customConfirm = screen.getByText("Custom Confirm");
    const customReject = screen.getByText("Custom Reject");

    fireEvent.click(customReject);
    expect(customMockReject).toHaveBeenCalledTimes(1);

    fireEvent.click(customConfirm);
    expect(customMockConfirm).toHaveBeenCalledTimes(1);
  });
});
