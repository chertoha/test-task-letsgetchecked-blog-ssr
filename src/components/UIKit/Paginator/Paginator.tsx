import "./Paginator.style.css";
import Link from "next/link";
import { FC } from "react";
import { PaginationButton } from "./utils/configPaginationButtons";
import { calculatePagination } from "./utils/calculatePagination";
// import { nanoid } from "nanoid";
import { BUTTON_TYPE } from "./utils/configPaginationButtons";

interface IPaginatorProps {
  totalItems: number;
  perPage: number;
  currentPage: number;
  nearbyQtyPages: 1 | 2;
  route: string;
  hasArrows?: boolean;
  params?: object;
}

const Paginator: FC<IPaginatorProps> = ({
  perPage,
  totalItems,
  currentPage,
  nearbyQtyPages,
  route,
  hasArrows = true,
  params,
}) => {
  const paginatorList: PaginationButton[] = calculatePagination({
    currentPage,
    lastPageNumber: Math.ceil(Number(totalItems) / Number(perPage)),
    nearbyQtyPages,
    hasArrows,
  });

  const isEmpty = totalItems <= perPage;

  return (
    !isEmpty && (
      <ul className="paginator-list">
        {paginatorList.map(({ title, value, type, Icon }, i) => (
          <li key={i} className="paginator-list-item group">
            <Link
              className={`paginator-page-link group-hover:text-accent-red ${
                type === BUTTON_TYPE.CURRENT && "font-bold"
              }`}
              href={{ pathname: route, query: { ...params, page: value } }}
              aria-label={`Page ${value}`}
            >
              {title}
              {Icon && <Icon />}
            </Link>
          </li>
        ))}
      </ul>
    )
  );
};

export default Paginator;
