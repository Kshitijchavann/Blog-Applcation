import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const MAX_VISIBLE_PAGES = 5; // Set the maximum number of visible pages
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const startPage = Math.max(currentPage - Math.floor(MAX_VISIBLE_PAGES / 2), 1);
  const endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" href="#" onClick={() => onPageChange(currentPage - 1)}>
            Previous
          </a>
        </li>
        {pageNumbers.slice(startPage - 1, endPage).map((page) => (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <a href="#" className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a href="#" className="page-link" onClick={() => onPageChange(currentPage + 1)}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
