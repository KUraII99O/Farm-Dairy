import React, { useState, } from "react";
import {  useBranch } from "../Provider"; // Importing the ManageBranchContext
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import { useTranslation } from "../../Translator/Provider";
import { Drawer } from "flowbite-react";
import BranchTable from "../Table";
import EditBranchForm from "../Form";

interface Branch {
  id: string;
  name: string;
  setupDate: string;
  builderName: string;
  phoneNumber: string;
  email: string;
}



const BranchList: React.FC = () => {
  const { branches, deleteBranch, addBranch, editBranch } =
  useBranch();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
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

  const handleEditDrawerOpen = (branch: Branch | null) => {
    setSelectedBranch(branch);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewBranch = async (newBranchData: Branch) => {
    try {
      await addBranch(newBranchData);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New branch added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new branch.");
    }
  };

  const handleUpdateBranch = async (updatedBranchData: Branch) => {
    if (selectedBranch) {
      try {
        await editBranch(selectedBranch.id, updatedBranchData);
        setIsEditDrawerOpen(false); // Close the drawer after updating
        toast.success("Branch updated successfully!");
      } catch (error) {
        toast.error("An error occurred while updating branch.");
      }
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
    ? currentBranches.slice().sort((a:Branch, b:Branch) => {
        const aValue = a[sortBy as keyof Branch];
        const bValue = b[sortBy as keyof Branch];
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
            branch={selectedBranch ?? undefined}
            onSubmit={selectedBranch ? handleUpdateBranch : handleAddNewBranch}
            onClose={handleCloseDrawer} // Provide onClose function here
          />
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
