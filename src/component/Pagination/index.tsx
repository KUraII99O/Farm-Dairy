import React, { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useTranslation } from "../Translator/Provider"; // Import the translation hook

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
  const { translate, language } = useTranslation(); // Get the translation function and current language

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

  // Determine the direction based on the current language
  const isRTL = language === "ar"; // Change to your RTL language code if different

  return (
    <div className={`flex justify-between items-center mt-4 ${isRTL ? 'rtl' : ''}`}>
      <div className="flex items-center">
        <span className={`mr-2 ${isRTL ? 'ml-2' : ''}`}>
          {translate("itemsPerPage")}: {/* Translate "Items per page" */}
        </span>
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className={`border border-gray-300 rounded-md px-2 py-1 ${isRTL ? 'rtl' : ''}`}
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
          className={`px-3 py-1 rounded-md bg-gray-200 mr-2 cursor-pointer ${isRTL ? 'ml-2' : ''}`}
        >
          {isRTL ? <HiArrowNarrowRight /> : <HiArrowLeft />}
        </button>
        <span className="mr-2">{`${translate("page")} ${currentPage}  `}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md bg-gray-200 cursor-pointer ${isRTL ? 'mr-2' : ''}`}
        >
          {isRTL ? <HiArrowLeft /> : <HiArrowNarrowRight />}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
