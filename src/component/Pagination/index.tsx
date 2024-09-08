import React, { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useTranslation } from "../Translator/Provider"; // Import the translation hook

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number; // Add this line
  currentPage: number; // Add this line
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // Add this line
  itemsPerPageOptions?: number[];
  defaultItemsPerPage?: number;
  onPageChange: (page: number, itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  itemsPerPageOptions = [5, 10, 20],
  defaultItemsPerPage = 5,
  onPageChange,
}) => {
  const [localItemsPerPage, setLocalItemsPerPage] = useState(defaultItemsPerPage);
  const { translate, language } = useTranslation();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page, localItemsPerPage);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = parseInt(e.target.value);
    setLocalItemsPerPage(newItemsPerPage);
    onPageChange(1, newItemsPerPage);
    setCurrentPage(1);
  };

  const isRTL = language === "ar";

  return (
    <div className={`flex justify-between items-center mt-4 ${isRTL ? 'rtl' : ''}`}>
      <div className="flex items-center">
        <span className={`mr-2 ${isRTL ? 'ml-2' : ''}`}>
          {translate("itemsPerPage")}:
        </span>
        <select
          value={localItemsPerPage}
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
        <span className="mr-2">{`${translate("page")} ${currentPage}`}</span>
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
