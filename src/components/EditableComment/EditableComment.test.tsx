import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import EditableComment from "./EditableComment";
import { mockComment } from "@/utils/mockData/comment";

jest.mock("../EditCommentForm", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Edit Form</div>),
}));

jest.mock("../DeleteCommentButton", () => ({
  __esModule: true,
  default: jest.fn(() => <button>Delete Comment</button>),
}));

describe("EditableComment component", () => {
  beforeEach(() => {
    render(<EditableComment commentId={1} content={mockComment.content} />);
  });

  it("Renders the comment content correctly", () => {
    const commentText = screen.getByText(mockComment.content);
    expect(commentText).toBeInTheDocument();
  });

  it("Shows the edit button and switches to edit mode when clicked", () => {
    const editButton = screen.getByRole("button", { name: /Update comment/i });
    fireEvent.click(editButton);

    expect(screen.getByText("Edit Form")).toBeInTheDocument();
  });

  it("Shows the delete button", () => {
    const deleteButton = screen.getByRole("button", { name: /Delete Comment/i });
    expect(deleteButton).toBeInTheDocument();
  });
});
