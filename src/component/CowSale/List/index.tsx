import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../Pagination";
import { BiListUl } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { useSaleList } from "../provider"; // Corrected import
import { toast, ToastContainer } from "react-toastify";
import ItemDetailDrawer from "../ItemDetails";
import { LiaFileInvoiceSolid } from "react-icons/lia";

const SaleList: React.FC = () => {
  const { sales, deleteSale } = useSaleList(); // Corrected usage of useSaleList hook
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState<number | null>(null);
  const [selectedSale, setSelectedSale] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const filteredSales = sales.filter((sale) =>
    Object.values(sale).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort sales based on the selected field
  const sortedSales = sortBy
    ? filteredSales.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : filteredSales;

  // Pagination
  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastSale = currentPage * itemsPerPage;
  const indexOfFirstSale = indexOfLastSale - itemsPerPage;
  const currentSales = sortedSales.slice(indexOfFirstSale, indexOfLastSale);

  const handleDeleteConfirmation = (id: number) => {
    if (window.confirm("Are you sure you want to delete this sale?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteSale(id);
      setIsDeleting(false);
      // Ensure you import toast from your preferred toast library
      toast.success("Sale deleted successfully!");
    } catch (error) {
      setIsDeleting(false);
      // Ensure you import toast from your preferred toast library
      toast.error("An error occurred while deleting sale.");
    }
  };

  const handleViewDetails = (sale) => {
    setSelectedSale(sale);
  };

  const handleDrawerClose = () => {
    setSelectedSale(null);
    setIsDrawerOpen(false);
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
            to="/Add-sale"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            Add New
          </Link>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">
        <BiListUl className="inline-block mr-2" />
        Sale List
      </h1>
      <table className="min-w-full bg-white border-collapse">
        {/* Table header */}
        <thead>
          <tr>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("id")}
            >
              <div className="flex items-center">
                #ID
                {sortIcon("id")}
              </div>
            </th>
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
              onClick={() => handleSort("customerName")}
            >
              <div className="flex items-center">
                Customer Name
                {sortIcon("customerName")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("customerEmail")}
            >
              <div className="flex items-center">
                Customer Email
                {sortIcon("customerEmail")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("address")}
            >
              <div className="flex items-center">
                Address
                {sortIcon("address")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("totalPrice")}
            >
              <div className="flex items-center">
                Total Price
                {sortIcon("totalPrice")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("totalPaid")}
            >
              <div className="flex items-center">
                Total Paid
                {sortIcon("totalPaid")}
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
              onClick={() => handleSort("note")}
            >
              <div className="flex items-center">
                Note
                {sortIcon("note")}
              </div>
            </th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {currentSales.map((sale) => (
            <tr key={sale.id}>
              {/* Render each field accordingly */}
              <td className="border border-gray-300 px-4 py-2">{sale.id}</td>
              <td className="border border-gray-300 px-4 py-2">{sale.date}</td>
              <td className="border border-gray-300 px-4 py-2">
                {sale.customerName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {sale.customerEmail}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {sale.address}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {sale.totalPrice}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {sale.totalPaid}
              </td>
              <td className="border border-gray-300 px-4 py-2">{sale.due}</td>
              <td className="border border-gray-300 px-4 py-2">{sale.note}</td>
              <td className="border border-gray-300 px-2 py-2">
                <div className="flex items-center">
                <Link
                    to={`/Cow-Sale-invoice/${sale.id}`}
                    className="text-blue-500 hover:underline flex items-center mr-4"
                  >
                    <LiaFileInvoiceSolid className="w-5 h-5 mr-1" />
                  </Link>

                  <button
                    onClick={() => handleViewDetails(sale)}
                    className="text-secondary hover:text-primary focus:outline-none flex  mr-4"
                  >
                    <FaEye className="w-5 h-5 mr-1" />
                  </button>
                  <Link
                    to={`/Edit-Sale/${sale.id}`}
                    className="text-blue-500 hover:underline flex items-center mr-4"
                  >
                    <BsPencil className="w-5 h-5 mr-1" />
                  </Link>
                  <button
                    onClick={() => handleDeleteConfirmation(sale.id)}
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
      {/* Render ItemDetailDrawer outside of the table */}
      <ItemDetailDrawer
        isOpen={Boolean(selectedSale)}
        onClose={handleDrawerClose}
        selectedSale={selectedSale}
      />
      {/* Pagination */}
      <Pagination
        totalItems={sortedSales.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
};

export default SaleList;
