import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PostCard from "./PostCard";
import { mockPost } from "@/utils/mockData/post";
import ROUTES from "@/config/routes";

describe("PostCard Component", () => {
  const data = mockPost;

  beforeEach(() => {
    render(<PostCard post={data} />);
  });

  it("Renders time, author, publish_date, title, description correctly", () => {
    const time = screen.getByRole("time");
    expect(time).toBeInTheDocument();
    expect(time).toHaveTextContent(data.publish_date);
    expect(time).toHaveAttribute("datetime", new Date(data.publish_date).toISOString());

    const author = screen.getByText(data.author);
    expect(author).toBeInTheDocument();

    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toHaveTextContent(data.title);

    const description = screen.getByText(data.description);
    expect(description).toBeInTheDocument();
  });

  it("Renders a link to correct post url", async () => {
    const url = ROUTES.POSTS + "/" + data.slug;

    const link = screen.getByRole("link", { name: /view more/i });
    expect(link).toHaveAttribute("href", url);
  });
});
