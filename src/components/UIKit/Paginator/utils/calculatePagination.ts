import {
  CURRENT_PAGE_BTN,
  LAST_PAGE_BTN,
  LEFT_DOTS_BTN,
  NEXT_BTN,
  PAGE_BTN,
  PREV_BTN,
  PaginationButton,
  RIGHT_DOTS_BTN,
} from "./configPaginationButtons";

type CalculatePaginationProps = {
  currentPage: number;
  lastPageNumber: number;
  nearbyQtyPages: number;
  hasArrows: boolean;
};

export const calculatePagination = (
  options: CalculatePaginationProps
): PaginationButton[] => {
  return options.currentPage < 999
    ? defaultCalculation(options)
    : hugePagesCalculation(options);
};

function defaultCalculation({
  currentPage,
  lastPageNumber,
  nearbyQtyPages,
  hasArrows,
}: CalculatePaginationProps): PaginationButton[] {
  const pag: PaginationButton[] = [];

  /* PREV */
  if (hasArrows && currentPage > 4) {
    pag.push(PREV_BTN(currentPage));
  }

  for (let i = 1; i <= lastPageNumber; i++) {
    /* CURRENT PAGE */
    if (i === currentPage) {
      pag.push(CURRENT_PAGE_BTN(currentPage));
      continue;
    }

    /* LEFT DOTS */
    if (i > 1 && i < currentPage - nearbyQtyPages - 1) {
      pag.push(LEFT_DOTS_BTN(currentPage));
      i = currentPage - nearbyQtyPages - 1;
      continue;
    }

    /* RIGHT DOTS */
    if (i > currentPage + nearbyQtyPages && i < lastPageNumber - 1) {
      pag.push(RIGHT_DOTS_BTN(currentPage));
      i = lastPageNumber - 1;
      continue;
    }

    /* LAST PAGE MORE THAN 4 digits */
    if (i === lastPageNumber && lastPageNumber > 9999) {
      pag.push(LAST_PAGE_BTN(i));
      continue;
    }

    /* OTHER PAGES */
    pag.push(PAGE_BTN(i));
  }

  /* NEXT */
  if (hasArrows && currentPage <= lastPageNumber - 4) {
    pag.push(NEXT_BTN(currentPage));
  }

  return pag;
}

function hugePagesCalculation({
  currentPage,
}: CalculatePaginationProps): PaginationButton[] {
  const pag: PaginationButton[] = [];

  /* PREV */
  pag.push(PREV_BTN(currentPage));

  /* FIRST PAGE */
  pag.push(PAGE_BTN(1));

  /* LEFT DOTS */
  pag.push(LEFT_DOTS_BTN(currentPage));

  /* CURRENT PAGE */
  pag.push(CURRENT_PAGE_BTN(currentPage));

  /* NEXT */
  pag.push(NEXT_BTN(currentPage));

  return pag;
}
