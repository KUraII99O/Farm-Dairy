import React, { useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { LiaFileInvoiceSolid } from "react-icons/lia";

import "react-toastify/dist/ReactToastify.css";
import { MilkSaleContext } from "../Provider"; // Assuming MilkSaleContext is provided similarly to UserContext
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../Pagination";
import { BsPencil } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

const MilkSaleTable: React.FC = () => {
  const { milkSales, deleteMilkSale } = useContext(MilkSaleContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of milk entries per page
  const [isDeleting, setIsDeleting] = useState(false);
  const [milkToDelete, setMilkToDelete] = useState<number | null>(null);

  // Filter milkSales based on search term
  const filteredMilkSales = milkSales.filter(
    (milkSale: { [s: string]: unknown } | ArrayLike<unknown>) =>
      Object.values(milkSale).some((field) =>
        field.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Sort milkSales based on the selected field
  const sortedMilkSales = sortBy
    ? filteredMilkSales.sort((a, b) =>
        sortOrder === "asc"
          ? a[sortBy] > b[sortBy]
            ? 1
            : -1
          : a[sortBy] < b[sortBy]
          ? 1
          : -1
      )
    : filteredMilkSales;

  // Pagination
  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastMilkSale = currentPage * itemsPerPage;
  const indexOfFirstMilkSale = indexOfLastMilkSale - itemsPerPage;
  const currentMilkSales = sortedMilkSales.slice(indexOfFirstMilkSale, indexOfLastMilkSale);

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
    if (window.confirm("Are you sure you want to delete this milk sale entry?")) {
      // If the user confirms, directly call handleDelete
      handleDelete(id);
    }
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteMilkSale(id);
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
            to="/Add-milk-Sale "
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            Collect New
          </Link>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">Milk Sale Table</h1>
      <table className="min-w-full bg-white border-collapse">
        {/* Table header */}
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 cursor-pointer">
              <div className="flex items-center">Invoice</div>
            </th>
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
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center">
                Name
                {sortIcon("name")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("contact")}
            >
              <div className="flex items-center">
                Contact
                {sortIcon("contact")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("email")}
            >
              <div className="flex items-center">
                Email
                {sortIcon("email")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("litre")}
            >
              <div className="flex items-center">
                Litre
                {sortIcon("litre")}
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
              onClick={() => handleSort("paid")}
            >
              <div className="flex items-center">
                Paid
                {sortIcon("paid")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("due")}
            >
              <div className="flex items-center">
                Due
                {sortIcon("due")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("soldBy")}
            >
              <div className="flex items-center">
                Sold By
                {sortIcon("soldBy")}
              </div>
            </th>
            <th className="border border-gray-300 px-4 py-2">Action</th>{" "}
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {currentMilkSales.map((milkSale) => (
            <tr key={milkSale.id}>
              {/* Render each field accordingly */}
              <td className="border border-gray-300 px-4 py-2">{milkSale.invoice}</td>
              <td className="border border-gray-300 px-4 py-2">{milkSale.date}</td>
              <td className="border border-gray-300 px-4 py-2">
                {milkSale.accountNo}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {milkSale.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {milkSale.contact}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {milkSale.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">{milkSale.litre}</td>
              <td className="border border-gray-300 px-4 py-2">{milkSale.price}</td>
              <td className="border border-gray-300 px-4 py-2">{milkSale.total}</td>
              <td className="border border-gray-300 px-4 py-2">{milkSale.paid}</td>
              <td className="border border-gray-300 px-4 py-2">{milkSale.due}</td>
              <td className="border border-gray-300 px-4 py-2">{milkSale.soldBy}</td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex items-center">
                  <Link
                    to={`/Milk-Sale-invoice/${milkSale.id}`}
                    className="text-blue-500 hover:underline flex items-center mr-2"
                  >
                    <LiaFileInvoiceSolid  className="w-5 h-5 mr-1" />
                  </Link>
                  <Link
                    to={`/Edit-Milk-sale/${milkSale.id}`}
                    className="text-blue-500 hover:underline flex items-center mr-2"
                  >
                    <BsPencil className="w-5 h-5 mr-1" />
                  </Link>
                  <button
                    onClick={() => handleDeleteConfirmation(milkSale.id)}
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
        totalItems={sortedMilkSales.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default MilkSaleTable;
