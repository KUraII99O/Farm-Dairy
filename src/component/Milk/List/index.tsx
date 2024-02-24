import React, { useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { MilkContext } from "../Provider"; // Assuming MilkContext is provided similarly to UserContext
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../Pagination";
import { BsPencil } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

const MilkTable: React.FC = () => {
  const { milks, deleteMilk } = useContext(MilkContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of milk entries per page
  const [isDeleting, setIsDeleting] = useState(false);
  const [milkToDelete, setMilkToDelete] = useState<number | null>(null);

  // Filter milks based on search term
  const filteredMilks = milks.filter(
    (milk: { [s: string]: unknown } | ArrayLike<unknown>) =>
      Object.values(milk).some((field) =>
        field.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Sort milks based on the selected field
  const sortedMilks = sortBy
    ? filteredMilks.sort((a, b) =>
        sortOrder === "asc"
          ? a[sortBy] > b[sortBy]
            ? 1
            : -1
          : a[sortBy] < b[sortBy]
          ? 1
          : -1
      )
    : filteredMilks;

  // Pagination
  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastMilk = currentPage * itemsPerPage;
  const indexOfFirstMilk = indexOfLastMilk - itemsPerPage;
  const currentMilk = sortedMilks.slice(indexOfFirstMilk, indexOfLastMilk);

  // Pagination end

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

  const handleDeleteConfirmation = (id: number) => {
    if (window.confirm("Are you sure you want to delete this milk entry?")) {
      // If the user confirms, directly call handleDelete
      handleDelete(id);
    }
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteMilk(id);
      setIsDeleting(false);
      // Implement your deletion logic here
    } catch (error) {
      setIsDeleting(false);
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
            to="/Collect-Milk "
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            Collect New
          </Link>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">Milk Table</h1>
      <table className="min-w-full bg-white border-collapse">
        {/* Table header */}
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 cursor-pointer">
              <div className="flex items-center">Date</div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("accountNo")}
            >
              <div className="flex items-center">
                Account No
                {sortIcon("accountNo")}
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
              onClick={() => handleSort("animalID")}
            >
              <div className="flex items-center">
                Animal ID
                {sortIcon("animalID")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("liter")}
            >
              <div className="flex items-center">
                Liter
                {sortIcon("liter")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("fate")}
            >
              <div className="flex items-center">
                Fate
                {sortIcon("fate")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("price")}
            >
              <div className="flex items-center">
                Price
                {sortIcon("price")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("total")}
            >
              <div className="flex items-center">
                Total
                {sortIcon("total")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("collectedFrom")}
            >
              <div className="flex items-center">
                Collected From
                {sortIcon("collectedFrom")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("addedBy")}
            >
              <div className="flex items-center">
                Added By
                {sortIcon("addedBy")}
              </div>
            </th>
            <th className="border border-gray-300 px-4 py-2">Action</th>{" "}
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {currentMilk.map((milk) => (
            <tr key={milk.id}>
              {/* Render each field accordingly */}
              <td className="border border-gray-300 px-4 py-2">{milk.date}</td>
              <td className="border border-gray-300 px-4 py-2">
                {milk.accountNo}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {milk.stallNo}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {milk.animalID}
              </td>
              <td className="border border-gray-300 px-4 py-2">{milk.liter}</td>
              <td className="border border-gray-300 px-4 py-2">{milk.fate}</td>
              <td className="border border-gray-300 px-4 py-2">{milk.price}</td>
              <td className="border border-gray-300 px-4 py-2">{milk.total}</td>
              <td className="border border-gray-300 px-4 py-2">
                {milk.collectedFrom}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {milk.addedBy}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex items-center">
                  <Link
                    to={`/Edit-Milk/${milk.id}`}
                    className="text-blue-500 hover:underline flex items-center mr-2"
                  >
                    <BsPencil className="w-5 h-5 mr-1" />
                  </Link>
                  <button
                    onClick={() => handleDeleteConfirmation(milk.id)}
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
        totalItems={sortedMilks.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default MilkTable;
