import React, { useState, useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { ManageStallContext } from "../Provider";
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import EditStallForm from "../Form";

const StallList: React.FC = () => {
  const { stalls, deleteStall, addStall, editStall   } = useContext(
    ManageStallContext
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedStall, setSelectedStall] = useState(null);

  const handleDeleteConfirmation = (id: number) => {
    if (window.confirm("Are you sure you want to delete this stall?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteStall(id);
      toast.success("Stall deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting stall.");
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

  const handleEditDrawerOpen = (stall: any) => {
    setSelectedStall(stall);
    setIsEditDrawerOpen(true);
  };

  const handleEditDrawerClose = () => {
    setSelectedStall(null);
    setIsEditDrawerOpen(false);
  };

  const handleAddNewStall = async (newStallData: any) => {
    try {
      await addStall(newStallData);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New stall added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new stall.");
    }
  };

  const handleUpdateStall = async (updatedStallData) => {
    try {
      await editStall(selectedStall.id, updatedStallData);
      setIsEditDrawerOpen(false); // Close the drawer after updating
      toast.success("Stall updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating stall.");
    }
  };

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastStall = currentPage * itemsPerPage;
  const indexOfFirstStall = indexOfLastStall - itemsPerPage;
  const currentStalls = stalls.slice(indexOfFirstStall, indexOfLastStall);

  const sortedStalls = sortBy
    ? currentStalls.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : currentStalls;

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
        Stall List
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
              onClick={() => handleSort("stallNumber")}
            >
              <div className="flex items-center">
                Stall Number
                {sortIcon("stallNumber")}
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
            <th className="border border-gray-300 px-4 py-2">Details</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedStalls
            .filter((stall) =>
              stall.stallNumber.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((stall) => (
              <tr key={stall.id}>
                <td className="border border-gray-300 px-4 py-2">{stall.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {stall.stallNumber}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {stall.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {stall.details}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleEditDrawerOpen(stall)}
                      className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
                    >
                      <BsPencil className="w-5 h-5 mr-1" />
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(stall.id)}
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
              {selectedStall ? "Edit Stall" : "Add New Stall"}
            </h2>
            <EditStallForm
             stall={selectedStall} // Pass selected stall data to the edit form
             onSubmit={selectedStall ? handleUpdateStall : handleAddNewStall}
            />
          </div>
        </div>
      )}
      <Pagination
        totalItems={stalls.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
};

export default StallList;
