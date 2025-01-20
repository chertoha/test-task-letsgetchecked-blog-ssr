import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BUTTON_TYPE } from "./utils/configPaginationButtons";
import Paginator from "./Paginator";

jest.mock("./utils/calculatePagination", () => ({
  calculatePagination: jest.fn(),
}));

describe("Paginator Component", () => {
  const mockRoute = "/test-route";
  const mockParams = { testParam: "value" };

  it("Renders paginator with pagination buttons", () => {
    const mockPagination = [
      { title: "1", value: 1, type: BUTTON_TYPE.CURRENT, Icon: null },
      { title: "2", value: 2, type: BUTTON_TYPE.DEFAULT, Icon: null },
    ];

    jest.mocked(
      jest
        .requireMock("./utils/calculatePagination")
        .calculatePagination.mockReturnValue(mockPagination),
    );

    render(
      <Paginator
        totalItems={50}
        perPage={10}
        currentPage={1}
        nearbyQtyPages={1}
        route={mockRoute}
        params={mockParams}
      />,
    );

    const buttons = screen.getAllByRole("link");
    expect(buttons).toHaveLength(mockPagination.length);
    expect(buttons[0]).toHaveTextContent("1");
    expect(buttons[1]).toHaveTextContent("2");

    expect(buttons[1]).toHaveAttribute("href", `${mockRoute}?testParam=value&page=2`);
  });

  it("Does not render paginator if totalItems <= perPage", () => {
    render(
      <Paginator
        totalItems={5}
        perPage={10}
        currentPage={1}
        nearbyQtyPages={1}
        route={mockRoute}
        params={mockParams}
      />,
    );

    const paginator = screen.queryByRole("list");
    expect(paginator).toBeNull();
  });
});
