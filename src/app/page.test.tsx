import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import Page from "../app/page";
import { Suspense } from "react";

jest.mock("../helpers/basicFetch", () => ({
  basicFetch: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          id: 1,
          title: "Post 1",
          publish_date: "2023-01-01",
          author: "Random Author",
          slug: "blog-post-1",
          description: "Utroque denique invenire et has.",
          content: "<p>Utroque denique invenire et has. Cum case </p>",
        },
      ],
      headers: new Map([["x-total-count", "1"]]),
    }),
  ),
}));

describe("Home Page", () => {
  it("renders a heading", async () => {
    const searchParams = Promise.resolve({ page: "1" });

    await act(async () =>
      render(
        <Suspense>
          <Page searchParams={searchParams} />,
        </Suspense>,
      ),
    );

    // render(
    //   <Suspense>
    //     <Page searchParams={searchParams} />,
    //   </Suspense>,
    // );

    // const heading = screen.getByRole("heading", { level: 1 });
    const heading = await screen.findByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
