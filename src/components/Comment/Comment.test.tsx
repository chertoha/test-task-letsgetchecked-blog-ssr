import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Comment from "./Comment";
import { mockComment } from "@/utils/mockData/comment";

jest.mock("../EditableComment", () => {
  const MockEditableComment = ({ content, commentId }: any) => (
    <div data-testid="editable-comment">
      Mock EditableComment: {content} - {commentId}
    </div>
  );

  MockEditableComment.displayName = "EditableComment";

  return MockEditableComment;
});

jest.mock("../../utils/datetime", () => ({
  dateToString: jest.fn((date: Date) => `Formatted ${date.toDateString()}`),
  isToday: jest.fn((date: Date) => date.toDateString() === new Date().toDateString()),
}));

import { dateToString, isToday } from "../../utils/datetime";

describe("Comment component", () => {
  beforeEach(() => {
    render(<Comment comment={mockComment} />);
  });

  it("Renders the comment details correctly", () => {
    const user = screen.getByText(/User: John Doe/i);

    expect(user).toBeInTheDocument();

    const time = screen.getByText(/Formatted/i);
    expect(time).toBeInTheDocument();
    expect(time).toHaveAttribute("datetime", new Date(mockComment.date).toISOString());

    const editableComment = screen.getByTestId("editable-comment");
    expect(editableComment).toHaveTextContent(mockComment.content);
    expect(editableComment).toHaveTextContent(String(mockComment.id));
  });

  it("Formats the date using dateToString", () => {
    expect(dateToString).toHaveBeenCalledWith(new Date(mockComment.date));
  });

  it("Checks if the date is today and formats time correctly", () => {
    expect(isToday).toHaveBeenCalledWith(new Date(mockComment.date));

    if (isToday(new Date(mockComment.date))) {
      const formattedTime = new Date(mockComment.date).toLocaleTimeString("en-IE", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const time = screen.getByText(content => content.includes(formattedTime));
      expect(time).toBeInTheDocument();
    }
  });
});
