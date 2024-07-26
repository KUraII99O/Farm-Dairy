import React, { useState, useContext } from "react";
import { ManageBranchContext } from "../Provider"; // Importing the ManageBranchContext
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import { useTranslation } from "../../Translator/Provider";
import { Drawer } from "flowbite-react";
import BranchTable from "../Table";
import EditBranchForm from "../Form";

const BranchList: React.FC = () => {
  const { branches, deleteBranch, addBranch, editBranch } =
    useContext(ManageBranchContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const { translate, language } = useTranslation();

  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";

  const handleDeleteConfirmation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: string) => {
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

  const handleCloseDrawer = () => {
    setIsEditDrawerOpen(false);
    setSelectedBranch(null);
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
            className="p-2 rounded border border-gray-300"
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
      <BranchTable
        sortedBranches={sortedBranches}
        handleSort={handleSort}
        sortIcon={sortIcon}
        handleEditDrawerOpen={handleEditDrawerOpen}
        handleDeleteConfirmation={handleDeleteConfirmation}
        formClass={formClass}
        translate={translate}
      />
      <Drawer
        open={isEditDrawerOpen}
        onClose={handleCloseDrawer}
        position="right" // Set the position to "right"
      >
        <Drawer.Header>
          <h2 className="text-xl font-bold">
            {selectedBranch ? translate("editBranch") : translate("addNewBranch")}
          </h2>
        </Drawer.Header>
        <Drawer.Items>
          <EditBranchForm
            branch={selectedBranch}
            onSubmit={selectedBranch ? handleUpdateBranch : handleAddNewBranch} onClose={undefined}          />
        </Drawer.Items>
      </Drawer>
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
