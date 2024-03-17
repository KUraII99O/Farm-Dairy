import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useFoodItem } from "../Provider"; // Import useFoodItem hook
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import EditFoodUnitForm from "../Form"; // Update to use EditFoodUnitForm instead of EditDesignationForm

const FoodItemList: React.FC = () => {
  const { foodItems, deleteFoodItem, addFoodItem, editFoodItem } = useFoodItem(); // Use useFoodItem hook
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);

  const handleDeleteConfirmation = (id: number) => {
    if (window.confirm("Are you sure you want to delete this food item?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFoodItem(id);
      toast.success("Food item deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting food item.");
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

  const handleEditDrawerOpen = (foodItem: any) => {
    setSelectedFoodItem(foodItem);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewFoodItem = async (newFoodItemData: any) => {
    try {
      await addFoodItem(newFoodItemData);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New food item added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new food item.");
    }
  };

  const handleUpdateFoodItem = async (updatedFoodItemData: any) => {
    try {
      await editFoodItem(selectedFoodItem.id, updatedFoodItemData);
      setIsEditDrawerOpen(false); // Close the drawer after updating
      toast.success("Food item updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating food item.");
    }
  };

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastFoodItem = currentPage * itemsPerPage;
  const indexOfFirstFoodItem = indexOfLastFoodItem - itemsPerPage;
  const currentFoodItems = foodItems.slice(indexOfFirstFoodItem, indexOfLastFoodItem);

  const sortedFoodItems = sortBy
    ? currentFoodItems.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : currentFoodItems;

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
        Food Item List
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
          {sortedFoodItems
            .filter((foodItem) =>
              foodItem.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((foodItem) => (
              <tr key={foodItem.id}>
                <td className="border border-gray-300 px-4 py-2">{foodItem.id}</td>
                <td className="border border-gray-300 px-4 py-2">{foodItem.name}</td>
                <td className="border border-gray-300 px-2 py-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleEditDrawerOpen(foodItem)}
                      className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
                    >
                      <BsPencil className="w-5 h-5 mr-1" />
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(foodItem.id)}
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
              {selectedFoodItem ? "Edit Food Item" : "Add New Food Item"}
            </h2>
            <EditFoodUnitForm
              foodItem={selectedFoodItem} 
              onSubmit={selectedFoodItem ? handleUpdateFoodItem : handleAddNewFoodItem}
              onClose={() => setIsEditDrawerOpen(false)} // Assuming setIsEditDrawerOpen is the function to close the drawer
            />
          </div>
        </div>
      )}
      <Pagination
        totalItems={foodItems.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
};

export default FoodItemList;