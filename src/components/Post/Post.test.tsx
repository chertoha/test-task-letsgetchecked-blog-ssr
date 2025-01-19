import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Post from "./Post";
import { PostType } from "@/types/entities";

describe("Post Component", () => {
  const data: PostType = {
    id: 123,
    description: "Description",
    slug: "test-comment",
    title: "Test Title",
    publish_date: "2023-01-01",
    author: "Test Author",
    content: "<p>Test content</p>",
  };

  it("Renders the title, publish_date, and author correctly", () => {
    render(<Post data={data} />);

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveTextContent(data.title);

    const time = screen.getByText(data.publish_date);
    expect(time).toBeInTheDocument();
    expect(time).toHaveAttribute("dateTime", new Date(data.publish_date).toISOString());

    const author = screen.getByText(/Author:/);
    expect(author).toHaveTextContent(`Author: ${data.author}`);
  });

  it("Renders HTML content correctly", () => {
    render(<Post data={data} />);

    const content = screen.getByText("Test content");
    expect(content).toBeInTheDocument();
  });
});
