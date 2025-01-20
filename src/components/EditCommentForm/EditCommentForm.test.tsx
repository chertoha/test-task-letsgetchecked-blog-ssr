import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import EditCommentForm from "./EditCommentForm";
import { mockComment } from "@/utils/mockData/comment";

const initialValues = {
  content: mockComment.content,
};

jest.mock("../../actions/editCommentAction", () => ({
  editCommentAction: jest.fn().mockResolvedValue({ status: "success" }),
}));

jest.mock("../UIKit/Field", () => {
  const MockField = ({ name }: any) => (
    <textarea data-testid="field" name={name} defaultValue={initialValues.content}></textarea>
  );

  MockField.displayName = " Field";
  return MockField;
});

describe("EditCommentForm component", () => {
  const mockClose = jest.fn();
  const commentId = 1;

  beforeEach(() => {
    jest.clearAllMocks();

    render(
      <EditCommentForm commentId={commentId} initialValues={initialValues} close={mockClose} />,
    );
  });

  it("Renders the form with initial values and buttons", () => {
    const field = screen.getByTestId("field");
    expect(field).toHaveValue(mockComment.content);

    const confirm = screen.getByRole("button", { name: /Confirm comment update/i });
    expect(confirm).toBeInTheDocument();

    const cancel = screen.getByRole("button", { name: /Cancel comment update/i });
    expect(cancel).toBeInTheDocument();
  });

  it("Calls editCommentAction on form submission", async () => {
    const action = jest.mocked(jest.requireMock("../../actions/editCommentAction"));

    const { editCommentAction } = action;

    const submitButton = screen.getByRole("button", { name: /Confirm comment update/i });
    fireEvent.click(submitButton);

    await waitFor(() => expect(editCommentAction).toHaveBeenCalledWith(commentId, initialValues));
  });

  it("Сalls close function when cancel button is clicked", () => {
    const cancel = screen.getByRole("button", { name: /Cancel comment update/i });
    fireEvent.click(cancel);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
