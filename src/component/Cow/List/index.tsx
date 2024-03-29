import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../Pagination";
import { BiListUl } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { ManageCowContext } from "../Provider"; // Corrected import
import ItemDetailDrawer from "../ItemDatils";
import { toast, ToastContainer } from "react-toastify";

const AnimalList: React.FC = () => {
  const { cows, deleteCow, setCows } = useContext(ManageCowContext); // Corrected context variable
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cowToDelete, setCowToDelete] = useState<number | null>(null);
  const [selectedCow, setSelectedCow] = useState(null);

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

  const filteredCows = cows.filter((cow) =>
    Object.values(cow).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort cows based on the selected field
  const sortedCows = sortBy
    ? filteredCows.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : filteredCows;

  // Pagination
  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastCow = currentPage * itemsPerPage;
  const indexOfFirstCow = indexOfLastCow - itemsPerPage;
  const currentCows = sortedCows.slice(indexOfFirstCow, indexOfLastCow);

  const handleDeleteConfirmation = (id: number) => {
    if (window.confirm("Are you sure you want to delete this cow?")) {
      handleDelete(id);
    }
  };
  const handleToggleStatus = (id: number) => {
    const cowIndex = currentCows.findIndex((cow) => cow.id === id);
    if (cowIndex !== -1) {
      const updatedCows = [...currentCows];
      updatedCows[cowIndex] = {
        ...updatedCows[cowIndex],
        status: !updatedCows[cowIndex].status,
      };
      setCows(updatedCows); // Update the state of cows
      const statusMessage = updatedCows[cowIndex].status
        ? "enabled"
        : "disabled";
      toast.success(`Toggle status ${statusMessage} successfully`);
    } else {
      toast.error("Cow not found");
    }
  };
  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteCow(id);
      setIsDeleting(false);
      // Ensure you import toast from your preferred toast library
      toast.success("Cow deleted successfully!");
    } catch (error) {
      setIsDeleting(false);
      // Ensure you import toast from your preferred toast library
      toast.error("An error occurred while deleting cow.");
    }
  };

  const handleViewDetails = (cow) => {
    setSelectedCow(cow);
  };

  const handleDrawerClose = () => {
    setSelectedCow(null);
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
            to="/Add-cow"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            Add New
          </Link>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">
        <BiListUl className="inline-block mr-2" />
        Cow List
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
              onClick={() => handleSort("image")}
            >
              <div className="flex items-center">
                Image
                {sortIcon("image")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("gender")}
            >
              <div className="flex items-center">
                Gender
                {sortIcon("gender")}
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
              onClick={() => handleSort("pregnantStatus")}
            >
              <div className="flex items-center">
                Pregnant Status
                {sortIcon("pregnantStatus")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("milkPerDay")}
            >
              <div className="flex items-center">
                Milk Per Day (LTR)
                {sortIcon("milkPerDay")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("animalStatus")}
            >
              <div className="flex items-center">
                Animal Status
                {sortIcon("animalStatus")}
              </div>
            </th>
            <th className="border border-gray-300 px-4 py-2">Action</th>{" "}
          </tr>
        </thead>

        <tbody>
          {currentCows.map((cow) => (
            <tr key={cow.id}>
              {/* Render each field accordingly */}
              <td className="border border-gray-300 px-4 py-2">{cow.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={cow.image} // Set the source of the image
                  alt="Cow Image" // Provide alternative text for accessibility
                  className="w-12 h-12 rounded-full object-cover" // Adjust styling as needed
                />
              </td>{" "}
              <td className="border border-gray-300 px-4 py-2">{cow.gender}</td>
              <td className="border border-gray-300 px-4 py-2">
                {cow.animalType}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {cow.buyDate}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                $ {cow.buyingPrice}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {cow.pregnantStatus}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {cow.milkPerDay}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className={`sr-only peer`}
                    checked={cow.status} // Make sure 'cow.status' is properly defined and always boolean
                    onChange={() => handleToggleStatus(cow.id)}
                  />
                  <div
                    className={`relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600`}
                  ></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {cow.status ? "Active" : "Inactive"}
                  </span>
                </label>
              </td>
              <td className="border border-gray-300 px-2 py-2">
                <div className="flex items-center">
                  <button
                    onClick={() => handleViewDetails(cow)}
                    className="text-secondary hover:text-primary focus:outline-none flex  mr-4"
                  >
                    <FaEye className="w-5 h-5 mr-1" />
                  </button>
                  {/* Edit link */}
                  <Link
                    to={`/Edit-Cow/${cow.id}`}
                    className="text-blue-500 hover:underline flex items-center mr-4"
                  >
                    <BsPencil className="w-5 h-5 mr-1" />
                  </Link>
                  {/* Delete button */}
                  <button
                    onClick={() => handleDeleteConfirmation(cow.id)}
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
      {selectedCow && (
        <ItemDetailDrawer
          isOpen={true} // Ensure it's always open when a cow is selected
          onClose={handleDrawerClose}
          cow={selectedCow}
        />
      )}
      {/* Pagination */}
      <Pagination
        totalItems={sortedCows.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
};

export default AnimalList;
