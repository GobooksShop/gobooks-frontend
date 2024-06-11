import React from 'react';
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
      <div className="pagination">
        <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
        >
          &lt;
        </button>
        {pageNumbers.map((pageNumber) => (
            <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={pageNumber === currentPage ? 'active' : ''}
            >
              {pageNumber + 1}
            </button>
        ))}
        <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
        >
          &gt;
        </button>
      </div>
  );
}

export default Pagination;
