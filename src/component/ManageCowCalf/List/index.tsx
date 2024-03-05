import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../Pagination";
import { BiListUl } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { ManageCowCalfContext } from "../Provider"; // Corrected import
import { toast, ToastContainer } from "react-toastify";
import ItemDetailDrawer from "../ItemDetails/";

const CalfList: React.FC = () => {
  const { cowCalves, deleteCalf, setCowCalves } =
    useContext(ManageCowCalfContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isDeleting, setIsDeleting] = useState(false);
  const [calfToDelete, setCalfToDelete] = useState<number | null>(null);
  const [selectedCalf, setSelectedCalf] = useState(null);

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

  const filteredCalves = cowCalves.filter((calf) =>
    Object.values(calf).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedCalves = sortBy
    ? filteredCalves.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : filteredCalves;

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastCalf = currentPage * itemsPerPage;
  const indexOfFirstCalf = indexOfLastCalf - itemsPerPage;
  const currentCalves = sortedCalves.slice(indexOfFirstCalf, indexOfLastCalf);

  const handleDeleteConfirmation = (id: number) => {
    if (window.confirm("Are you sure you want to delete this calf?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteCalf(id);
      setIsDeleting(false);
      toast.success("Calf deleted successfully!");
    } catch (error) {
      setIsDeleting(false);
      toast.error("An error occurred while deleting calf.");
    }
  };

  const handleViewDetails = (calf) => {
    setSelectedCalf(calf);
    console.log("Selected Calf:", calf); // Add this line to log the selected calf
  };

  const handleCloseDrawer = () => {
    setSelectedCalf(null);
  };

  const handleToggleStatus = (id: number) => {
    const calfIndex = currentCalves.findIndex((calf) => calf.id === id);
    if (calfIndex !== -1) {
      const updatedCalves = [...currentCalves];
      updatedCalves[calfIndex] = {
        ...updatedCalves[calfIndex],
        status: !updatedCalves[calfIndex].status,
      };
      setCowCalves(updatedCalves);
      const statusMessage = updatedCalves[calfIndex].status
        ? "enabled"
        : "disabled";
      toast.success(`Toggle status ${statusMessage} successfully`);
    } else {
      toast.error("Calf not found");
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
            to="/Add-calf"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            Add New Calf
          </Link>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">
        <BiListUl className="inline-block mr-2" />
        Calf List
      </h1>
      <table className="min-w-full bg-white border-collapse">
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
              onClick={() => handleSort("image")}
            >
              <div className="flex items-center">
                Image
                {sortIcon("image")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("motherID")}
            >
              <div className="flex items-center">
              mother ID
                {sortIcon("motherID")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("animalType")}
            >
              <div className="flex items-center">
                Animal Type
                {sortIcon("animalType")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("buyDate")}
            >
              <div className="flex items-center">
                Buy Date
                {sortIcon("buyDate")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("buyingPrice")}
            >
              <div className="flex items-center">
                Buying Price
                {sortIcon("buyingPrice")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center">
                Status
                {sortIcon("status")}
              </div>
            </th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {currentCalves.map((calf) => (
            <tr key={calf.id}>
              <td className="border border-gray-300 px-4 py-2">{calf.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={calf.image}
                  alt="Calf Image"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {calf.motherID}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {calf.animalType}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {calf.buyDate}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                $ {calf.buyingPrice}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className={`sr-only peer`}
                    checked={calf.status}
                    onChange={() => handleToggleStatus(calf.id)}
                  />
                  <div
                    className={`relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600`}
                  ></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {calf.status ? "Active" : "Inactive"}
                  </span>
                </label>
              </td>{" "}
              <td className="border border-gray-300 px-2 py-2">
                <div className="flex items-center">
                  <button
                    onClick={() => handleViewDetails(calf)}
                    className="text-secondary hover:hover:underline flex items-center mr-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                  >
                    <FaEye className="w-5 h-5 mr-1" />
                  </button>
                  <Link
                    to={`/Edit-Calf/${calf.id}`}
                    className="text-blue-500 hover:underline flex items-center mr-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    >
                    <BsPencil className="w-5 h-5 mr-1" />
                  </Link>
                  <button
                    onClick={() => handleDeleteConfirmation(calf.id)}
                    className="text-red-500 hover:hover:underline flex items-center mr-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    >
                    <AiOutlineDelete className="w-5 h-5 mr-1" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {selectedCalf && (
        <ItemDetailDrawer
          isOpen={true} // Ensure it's always open when a calf is selected
          onClose={handleCloseDrawer}
          calf={selectedCalf}
        />
      )}
      <Pagination
        totalItems={sortedCalves.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
};

export default CalfList;
