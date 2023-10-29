import React from "react";
import { usePagination } from "../hooks/usePagination";
import "../styles/Pagination.css";
const DOTS = "...";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  const onLast = () => {
    onPageChange(lastPage);
  };
  const onFirst = () => {
    onPageChange(1);
  };
  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className="pagination-container">
      <li
        onClick={onFirst}
        className={`pagination-item ${currentPage === 1 && "disabled"}`}
      >
        <div className="arrow left" />
        <div className="arrow left" />
      </li>
      <li
        onClick={onPrevious}
        className={`pagination-item ${currentPage === 1 && "disabled"}`}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }
        return (
          <li
            className={`pagination-item ${
              pageNumber === currentPage && "selected"
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        onClick={onNext}
        className={`pagination-item ${currentPage === lastPage && "disabled"}`}
      >
        <div className="arrow right" />
      </li>
      <li
        onClick={onLast}
        className={`pagination-item ${currentPage === lastPage && "disabled"}`}
      >
        <div className="arrow right" />
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
