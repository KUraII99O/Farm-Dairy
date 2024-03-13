import React, { useState, useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { ManageColorContext } from "../Provider"; // Import ManageColorContext
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import EditColorForm from "../Form"; // Update to use EditColorForm instead of EditStallForm

const ColorList: React.FC = () => {
  const { colors, deleteColor, addColor, editColor } =
    useContext(ManageColorContext); // Use ManageColorContext
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleDeleteConfirmation = (id: number) => {
    if (window.confirm("Are you sure you want to delete this color?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteColor(id);
      toast.success("Color deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting color.");
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

  const handleEditDrawerOpen = (color: any) => {
    setSelectedColor(color);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewColor = async (newColorData: any) => {
    try {
      await addColor(newColorData);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New color added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new color.");
    }
  };

  const handleUpdateColor = async (updatedColorData) => {
    try {
      await editColor(selectedColor.id, updatedColorData);
      setIsEditDrawerOpen(false); // Close the drawer after updating
      toast.success("Color updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating color.");
    }
  };

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastColor = currentPage * itemsPerPage;
  const indexOfFirstColor = indexOfLastColor - itemsPerPage;
  const currentColors = colors.slice(indexOfFirstColor, indexOfLastColor);

  const sortedColors = sortBy
    ? currentColors.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : currentColors;

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
        Color List
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
                Color Name
                {sortIcon("name")}
              </div>
            </th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedColors
            .filter((color) =>
              color.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((color) => (
              <tr key={color.id}>
                <td className="border border-gray-300 px-4 py-2">{color.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {color.name}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleEditDrawerOpen(color)}
                      className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
                    >
                      <BsPencil className="w-5 h-5 mr-1" />
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(color.id)}
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
              {selectedColor ? "Edit Color" : "Add New Color"}
            </h2>
            <EditColorForm
              color={selectedColor}
              onSubmit={selectedColor ? handleUpdateColor : handleAddNewColor}
              onClose={() => setIsEditDrawerOpen(false)} // Assuming setIsEditDrawerOpen is the function to close the drawer
            />
          </div>
        </div>
      )}
      <Pagination
        totalItems={colors.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
};

export default ColorList;
