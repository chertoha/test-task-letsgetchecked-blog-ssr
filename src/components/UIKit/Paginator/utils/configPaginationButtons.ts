import { IconType } from "react-icons";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { PiInfinityLight } from "react-icons/pi";

export const BUTTON_TYPE = {
  ARROW: "arrow",
  CURRENT: "current",
  DOTS: "dots",
  DEFAULT: "default",
} as const;

export type PaginationButton = {
  title: string;
  value: number;
  type: (typeof BUTTON_TYPE)[keyof typeof BUTTON_TYPE];
  Icon?: IconType;
};

export const PREV_BTN = (currentPage: number): PaginationButton => ({
  title: "",
  value: currentPage - 1,
  type: BUTTON_TYPE.ARROW,
  Icon: BsChevronLeft,
});

export const NEXT_BTN = (currentPage: number): PaginationButton => ({
  title: "",
  value: currentPage + 1,
  type: BUTTON_TYPE.ARROW,
  Icon: BsChevronRight,
});

export const PAGE_BTN = (page: number): PaginationButton => ({
  title: page.toString(),
  value: page,
  type: BUTTON_TYPE.DEFAULT,
});

export const CURRENT_PAGE_BTN = (currentPage: number): PaginationButton => ({
  title: currentPage.toString(),
  value: currentPage,
  type: BUTTON_TYPE.CURRENT,
});

export const LEFT_DOTS_BTN = (currentPage: number): PaginationButton => ({
  title: ". . .",
  value: currentPage - 4,
  type: BUTTON_TYPE.DOTS,
});

export const RIGHT_DOTS_BTN = (currentPage: number): PaginationButton => ({
  title: ". . .",
  value: currentPage + 4,
  type: BUTTON_TYPE.DOTS,
});

export const LAST_PAGE_BTN = (page: number): PaginationButton => ({
  title: "",
  value: page,
  type: BUTTON_TYPE.DEFAULT,
  Icon: PiInfinityLight,
});
