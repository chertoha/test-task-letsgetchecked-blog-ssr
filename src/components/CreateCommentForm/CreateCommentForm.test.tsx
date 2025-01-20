import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CreateCommentForm from "./CreateCommentForm";
import { mockPost } from "@/utils/mockData/post";

jest.mock("../../actions/createCommentAction", () => ({
  createCommentAction: jest.fn(),
}));

describe("CreateCommentForm component", () => {
  it("Renders the input fields correctly", () => {
    render(<CreateCommentForm postId={mockPost.id} />);

    const userField = screen.getByPlaceholderText("Name");
    expect(userField).toBeInTheDocument();

    const contentField = screen.getByPlaceholderText("Comment...");
    expect(contentField).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: /Send/i });
    expect(submitButton).toBeInTheDocument();
  });
});
