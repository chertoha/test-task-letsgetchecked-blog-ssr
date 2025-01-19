import { render, screen } from "@testing-library/react";
import Comment from "./Comment";
import { CommentType } from "@/types/entities";
import { mockComment } from "@/utils/mockData/comment";

jest.mock("../EditableComment", () => ({ content, commentId }: any) => (
  <div data-testid="editable-comment">
    Mock EditableComment: {content} - {commentId}
  </div>
));

jest.mock("@/utils/datetime", () => ({
  dateToString: jest.fn((date: Date) => `Formatted ${date.toDateString()}`),
  isToday: jest.fn((date: Date) => date.toDateString() === new Date().toDateString()),
}));

describe("Comment component", () => {
  it("Renders the comment details correctly", () => {
    render(<Comment comment={mockComment} />);

    const user = screen.getByText(/John Doe/i);
    expect(user).toBeInTheDocument();

    const time = screen.getByRole("time");
    expect(time).toBeInTheDocument();
    expect(time).toHaveAttribute("datetime", new Date(mockComment.date).toISOString());

    // expect(time).toHaveTextContent(/Formatted/i);

    expect(screen.getByText(/Formatted/i)).toBeInTheDocument();

    const editableComment = screen.getByTestId("editable-comment");
    expect(editableComment).toHaveTextContent(mockComment.content);
    expect(editableComment).toHaveTextContent(String(mockComment.id));
  });
});
