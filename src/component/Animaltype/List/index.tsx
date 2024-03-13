import React, { useState, useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { ManageAnimalTypeContext } from "../Provider"; // Updated import
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import EditAnimalTypeForm from "../Form"; // Updated import

const AnimalTypeList: React.FC = () => {
  const { animalTypes, deleteAnimalType, addAnimalType, editAnimalType } =
    useContext(ManageAnimalTypeContext); // Updated context import and usage
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedAnimalType, setSelectedAnimalType] = useState(null); // Updated state name

  const handleDeleteConfirmation = (id: number) => {
    if (window.confirm("Are you sure you want to delete this animal type?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAnimalType(id); // Updated function call
      toast.success("Animal type deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting animal type.");
    }
  };

  const handleEditDrawerOpen = (animalType: any) => {
    setSelectedAnimalType(animalType);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewAnimalType = async (newAnimalTypeData: any) => {
    try {
      await addAnimalType(newAnimalTypeData);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New animal type added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new animal type.");
    }
  };

  const handleUpdateAnimalType = async (updatedAnimalTypeData) => {
    try {
      await editAnimalType(selectedAnimalType.id, updatedAnimalTypeData);
      setIsEditDrawerOpen(false); // Close the drawer after updating
      toast.success("Animal type updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating animal type.");
    }
  };

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

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastAnimalType = currentPage * itemsPerPage;
  const indexOfFirstAnimalType = indexOfLastAnimalType - itemsPerPage;
  const currentAnimalTypes = animalTypes.slice(
    indexOfFirstAnimalType,
    indexOfLastAnimalType
  );

  const sortedAnimalTypes = sortBy
    ? currentAnimalTypes.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : currentAnimalTypes;

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
          <button
            onClick={() => handleEditDrawerOpen(null)}
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            Add New
          </button>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">
        <BiListUl className="inline-block mr-2" />
        Animal Types
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
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center">
                Name
                {sortIcon("name")}
              </div>
            </th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedAnimalTypes
            .filter((animalType) =>
              animalType.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((animalType) => (
              <tr key={animalType.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {animalType.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {animalType.name}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleEditDrawerOpen(animalType)}
                      className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
                    >
                      <BsPencil className="w-5 h-5 mr-1" />
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(animalType.id)}
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
      {isEditDrawerOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex justify-end">
          <div className="w-96 bg-white h-full shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              {selectedAnimalType ? "Edit Animal Type" : "Add New Animal Type"}
            </h2>
            <EditAnimalTypeForm
              animalType={selectedAnimalType}
              onSubmit={selectedAnimalType ? handleUpdateAnimalType : handleAddNewAnimalType}
              onClose={() => setIsEditDrawerOpen(false)}
            />
          </div>
        </div>
      )}
      <Pagination
        totalItems={animalTypes.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
};

export default AnimalTypeList;
