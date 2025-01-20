import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { Suspense } from "react";

import PostPage from "./page";
import { mockPost } from "@/utils/mockData/post";

jest.mock("../../../components/Post", () => () => <div>Mock Post</div>);
jest.mock("../../../components/CommentList", () => () => <div>Mock CommentList</div>);
jest.mock("../../../components/CreateCommentForm", () => () => <div>Mock CreateCommentForm</div>);

jest.mock("../../../helpers/basicFetch", () => ({
  basicFetch: jest.fn(() =>
    Promise.resolve({
      data: [mockPost],
    }),
  ),
}));

describe("Post page", () => {
  it("Renders back link, comments heading", async () => {
    const params = Promise.resolve({ slug: "test-post" });

    await act(async () =>
      render(
        <Suspense>
          <PostPage params={params} />
        </Suspense>,
      ),
    );

    const backLink = screen.getByRole("link", { name: /Back to home page/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/");

    const commentsHeading = await screen.findByRole("heading", { level: 2, name: /Comments/ });
    expect(commentsHeading).toBeInTheDocument();

    const addCommentHeading = await screen.findByRole("heading", { level: 3, name: /Add comment/ });
    expect(addCommentHeading).toBeInTheDocument();
  });
});
