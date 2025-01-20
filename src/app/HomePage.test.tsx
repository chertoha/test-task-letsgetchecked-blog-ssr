import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { Suspense } from "react";

import Page from "./page";
import { mockPost } from "@/utils/mockData/post";

jest.mock("../helpers/basicFetch", () => ({
  basicFetch: jest.fn(() =>
    Promise.resolve({
      data: [mockPost],
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

    const heading = await screen.findByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
