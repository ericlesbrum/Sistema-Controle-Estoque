import React from 'react';
import { Pagination as BsPagination } from 'react-bootstrap';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
}) => {
  if (totalPages <= 1) return null;

  const half = Math.floor(maxVisible / 2);
  let start = Math.max(0, currentPage - half);
  let end = Math.min(totalPages - 1, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(0, end - maxVisible + 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <BsPagination className="justify-content-center mt-4">
      <BsPagination.First
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0}
      />
      <BsPagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      />

      {start > 0 && (
        <>
          <BsPagination.Item onClick={() => onPageChange(0)}>1</BsPagination.Item>
          {start > 1 && <BsPagination.Ellipsis disabled />}
        </>
      )}

      {pages.map(page => (
        <BsPagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page + 1}
        </BsPagination.Item>
      ))}

      {end < totalPages - 1 && (
        <>
          {end < totalPages - 2 && <BsPagination.Ellipsis disabled />}
          <BsPagination.Item onClick={() => onPageChange(totalPages - 1)}>
            {totalPages}
          </BsPagination.Item>
        </>
      )}

      <BsPagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      />
      <BsPagination.Last
        onClick={() => onPageChange(totalPages - 1)}
        disabled={currentPage === totalPages - 1}
      />
    </BsPagination>
  );
};

export default Pagination;