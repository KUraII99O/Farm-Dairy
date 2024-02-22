import React, { useState } from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPageOptions?: number[];
  defaultItemsPerPage?: number;
  onPageChange: (page: number, itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPageOptions = [5, 10, 20],
  defaultItemsPerPage = 5,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page, itemsPerPage);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    onPageChange(1, newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center">
        <span className="mr-2">Items per page:</span>
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="border border-gray-300 rounded-md px-2 py-1"
        >
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-gray-200 mr-2"
        >
          &#8592; {/* Unicode character for left arrow */}
        </button>
        <span className="mr-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-gray-200"
        >
          &#8594; {/* Unicode character for right arrow */}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
