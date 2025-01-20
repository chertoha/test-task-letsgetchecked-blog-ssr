import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import DeleteCommentButton from "./DeleteCommentButton";

jest.mock("../../actions/deleteCommentAction", () => ({
  deleteCommentAction: jest.fn(),
}));

jest.mock("../../hooks/useModal", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    isOpen: false,
    open: jest.fn(),
    close: jest.fn(),
  }),
}));

describe("DeleteCommentButton component", () => {
  it("Renders button correctly", () => {
    render(<DeleteCommentButton commentId={1} />);

    const deleteButton = screen.getByRole("button", { name: /Delete comment/i });
    expect(deleteButton).toBeInTheDocument();
  });

  it("opens the modal when the delete button is clicked", () => {
    const useModalMock = jest.mocked(jest.requireMock("../../hooks/useModal").default);

    const { open } = useModalMock();

    render(<DeleteCommentButton commentId={1} />);

    const deleteButton = screen.getByRole("button", { name: /Delete comment/i });
    fireEvent.click(deleteButton);

    expect(open).toHaveBeenCalledTimes(1);
  });
});
