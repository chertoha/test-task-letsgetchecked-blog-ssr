import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import SymbolCounter from "./SymbolCounter";

describe("SymbolCounter component", () => {});

it("renders the symbol counter with correct values", () => {
  render(
    <SymbolCounter symbolsNum={50} maxSymbols={200}>
      <input type="text" />
    </SymbolCounter>,
  );

  const symbolCounter = screen.getByTestId("symbol-counter");
  expect(symbolCounter.textContent).toBe("50/200");
});
