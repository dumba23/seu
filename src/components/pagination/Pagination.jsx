import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxPagesToShow = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // Adjust startPage if we are near the end
  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  // Build the page numbers array
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-container">
      <ul className="pagination">
        {startPage > 1 && (
          <>
            <li className="page-item">
              <button className="page-link" onClick={() => onPageChange(1)}>
                1
              </button>
            </li>
            {startPage > 2 && <li className="page-item">...</li>}
          </>
        )}

        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${number === currentPage ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => onPageChange(number)}>
              {number}
            </button>
          </li>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <li className="page-item">...</li>}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
