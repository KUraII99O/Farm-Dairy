import React, { useState, useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FoodUnitContext } from "../Provider"; // Import FoodUnitContext
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import EditFoodUnitForm from "../Form"; // Update to use EditFoodUnitForm instead of EditDesignationForm

const FoodUnitList: React.FC = () => {
  const { foodUnits, deleteFoodUnit, addFoodUnit, editFoodUnit } = useContext(FoodUnitContext); // Use FoodUnitContext
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedFoodUnit, setSelectedFoodUnit] = useState(null);

  const handleDeleteConfirmation = (id: number) => {
    if (window.confirm("Are you sure you want to delete this food unit?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFoodUnit(id);
      toast.success("Food unit deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting food unit.");
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

  const handleEditDrawerOpen = (foodUnit: any) => {
    setSelectedFoodUnit(foodUnit);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewFoodUnit = async (newFoodUnitData: any) => {
    try {
      await addFoodUnit(newFoodUnitData);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New food unit added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new food unit.");
    }
  };

  const handleUpdateFoodUnit = async (updatedFoodUnitData) => {
    try {
      await editFoodUnit(selectedFoodUnit.id, updatedFoodUnitData);
      setIsEditDrawerOpen(false); // Close the drawer after updating
      toast.success("Food unit updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating food unit.");
    }
  };

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastFoodUnit = currentPage * itemsPerPage;
  const indexOfFirstFoodUnit = indexOfLastFoodUnit - itemsPerPage;
  const currentFoodUnits = foodUnits.slice(indexOfFirstFoodUnit, indexOfLastFoodUnit);

  const sortedFoodUnits = sortBy
    ? currentFoodUnits.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : currentFoodUnits;

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
        Food Unit List
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
          {sortedFoodUnits
            .filter((foodUnit) =>
              foodUnit.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((foodUnit) => (
              <tr key={foodUnit.id}>
                <td className="border border-gray-300 px-4 py-2">{foodUnit.id}</td>
                <td className="border border-gray-300 px-4 py-2">{foodUnit.name}</td>
                <td className="border border-gray-300 px-2 py-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleEditDrawerOpen(foodUnit)}
                      className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
                    >
                      <BsPencil className="w-5 h-5 mr-1" />
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(foodUnit.id)}
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
              {selectedFoodUnit ? "Edit Food Unit" : "Add New Food Unit"}
            </h2>
            <EditFoodUnitForm
              foodUnit={selectedFoodUnit}
              onSubmit={selectedFoodUnit ? handleUpdateFoodUnit : handleAddNewFoodUnit}
              onClose={() => setIsEditDrawerOpen(false)} // Assuming setIsEditDrawerOpen is the function to close the drawer
            />
          </div>
        </div>
      )}
      <Pagination
        totalItems={foodUnits.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
};

export default FoodUnitList;
