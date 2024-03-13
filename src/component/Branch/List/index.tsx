import React, { useState, useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { ManageBranchContext } from "../Provider"; // Importing the ManageBranchContext instead
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import EditBranchForm from "../Form";

const BranchList: React.FC = () => { // Renaming the component to BranchList
  const { branches, deleteBranch, addBranch, editBranch } = // Using branches and related functions
    useContext(ManageBranchContext); // Switching to ManageBranchContext
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleDeleteConfirmation = (id: number) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBranch(id);
      toast.success("Branch deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting branch.");
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

  const handleEditDrawerOpen = (branch: any) => {
    setSelectedBranch(branch);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewBranch = async (newBranchData: any) => {
    try {
      await addBranch(newBranchData);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New branch added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new branch.");
    }
  };

  const handleUpdateBranch = async (updatedBranchData) => {
    try {
      await editBranch(selectedBranch.id, updatedBranchData);
      setIsEditDrawerOpen(false); // Close the drawer after updating
      toast.success("Branch updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating branch.");
    }
  };

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastBranch = currentPage * itemsPerPage;
  const indexOfFirstBranch = indexOfLastBranch - itemsPerPage;
  const currentBranches = branches.slice(indexOfFirstBranch, indexOfLastBranch);

  const sortedBranches = sortBy
    ? currentBranches.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : currentBranches;

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
        Branch List
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
              onClick={() => handleSort("branchName")}
            >
              <div className="flex items-center">
                Branch Name
                {sortIcon("branchName")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("setupDate")}
            >
              <div className="flex items-center">
                Setup Date
                {sortIcon("setupDate")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("builderName")}
            >
              <div className="flex items-center">
                Builder Name
                {sortIcon("builderName")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("phoneNumber")}
            >
              <div className="flex items-center">
                Phone Number
                {sortIcon("phoneNumber")}
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
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedBranches
            .filter((branch) =>
              branch.branchName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((branch) => (
              <tr key={branch.id}>
                <td className="border border-gray-300 px-4 py-2">{branch.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {branch.branchName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {branch.setupDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {branch.builderName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {branch.phoneNumber}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {branch.email}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleEditDrawerOpen(branch)}
                      className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
                    >
                      <BsPencil className="w-5 h-5 mr-1" />
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(branch.id)}
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
              {selectedBranch ? "Edit Branch" : "Add New Branch"}
            </h2>
            <EditBranchForm
              branch={selectedBranch}
              onSubmit={selectedBranch ? handleUpdateBranch : handleAddNewBranch}
              onClose={() => setIsEditDrawerOpen(false)} // Assuming setIsEditDrawerOpen is the function to close the drawer
            />
          </div>
        </div>
      )}
      <Pagination
        totalItems={branches.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
};

export default BranchList;
