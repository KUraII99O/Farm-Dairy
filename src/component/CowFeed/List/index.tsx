import React, { useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../Pagination";
import { CowFeedContext } from "../Provider";
import { BiListUl } from "react-icons/bi";

import "react-toastify/dist/ReactToastify.css";

const CowFeedTable: React.FC = () => {
  const { cowFeeds, deleteCowFeed } = useContext(CowFeedContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cowFeedToDelete, setCowFeedToDelete] = useState<number | null>(null);

  const handleSort = (fieldName: string) => {
    if (sortBy === fieldName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(fieldName);
      setSortOrder("asc");
    }
  };

  const sortIcon = (fieldName: string) => {
    if (sortBy === fieldName) {
      return sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  // Sorting function for array of objects
  const dynamicSort = (property: string) => {
    let sortOrderValue = sortOrder === "asc" ? 1 : -1;
    return function (a: any, b: any) {
      if (a[property] < b[property]) {
        return -1 * sortOrderValue;
      } else if (a[property] > b[property]) {
        return 1 * sortOrderValue;
      } else {
        return 0;
      }
    };
  };

  // Sort cowFeeds based on the selected field
  const sortedCowFeeds = sortBy
    ? cowFeeds.slice().sort(dynamicSort(sortBy))
    : cowFeeds;

  // Pagination
  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastCowFeed = currentPage * itemsPerPage;
  const indexOfFirstCowFeed = indexOfLastCowFeed - itemsPerPage;
  const currentCowFeeds = sortedCowFeeds.slice(
    indexOfFirstCowFeed,
    indexOfLastCowFeed
  );

  const handleDeleteConfirmation = (id: number) => {
    if (
      window.confirm("Are you sure you want to delete this cow feed entry?")
    ) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteCowFeed(id);
      setIsDeleting(false);
      toast.success("Cow feed entry deleted successfully!");
    } catch (error) {
      setIsDeleting(false);
      toast.error("An error occurred while deleting cow feed entry.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center"></div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded border border-gray-300 "
          />

          <Link
            to="/Add-milk-Sale "
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            Add New
          </Link>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">
        <BiListUl className="inline-block mr-2" />
        Cow Feed List
      </h1>
      <table className="min-w-full bg-white border-collapse">
        {/* Table header */}
        <thead>
          <tr>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("date")}
            >
              <div className="flex items-center">
                Date
                {sortIcon("date")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("stallNo")}
            >
              <div className="flex items-center">
                Stall No
                {sortIcon("stallNo")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("cowNumber")}
            >
              <div className="flex items-center">
                Cow Number
                {sortIcon("cowNumber")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("note")}
            >
              <div className="flex items-center">
                Note
                {sortIcon("note")}
              </div>
            </th>
            <th className="border border-gray-300 px-4 py-2">Action</th>{" "}
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {currentCowFeeds.map((cowFeed) => (
            <tr key={cowFeed.id}>
              {/* Render each field accordingly */}
              <td className="border border-gray-300 px-4 py-2">
                {cowFeed.date}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {cowFeed.stallNo}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {cowFeed.cowNumber}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {cowFeed.note}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex items-center">
                  <Link
                    to={`/Edit-Cow-Feed/${cowFeed.id}`}
                    className="text-blue-500 hover:underline flex items-center mr-2"
                  >
                    <BsPencil className="w-5 h-5 mr-1" />
                  </Link>
                  <button
                    onClick={() => handleDeleteConfirmation(cowFeed.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none flex items-center"
                  >
                    <AiOutlineDelete className="w-5 h-5 mr-1" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <Pagination
        totalItems={sortedCowFeeds.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default CowFeedTable;
