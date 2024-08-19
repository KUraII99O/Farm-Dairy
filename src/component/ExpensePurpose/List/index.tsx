import React, { useState, useContext } from "react";
import Pagination from "../../Pagination";
import { BiListUl } from "react-icons/bi";
import { ExpensePurposeContext } from "../Provider";
import { toast, ToastContainer } from "react-toastify";
import EditPurposeForm from "../Form";
import ExpensePurposeTable from "../Table";
import { useTranslation } from "../../Translator/Provider";
import { Drawer, Button } from "flowbite-react";

const PurposeList: React.FC = () => {
  const { expensePurposes, deleteExpensePurpose, addExpensePurpose, editExpensePurpose } = useContext(ExpensePurposeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name"); // Default sorting field
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const { translate, language } = useTranslation();

  // Define handleUpdatePurpose function
  const handleUpdatePurpose = async (updatedPurposeData) => {
    try {
      await editExpensePurpose(selectedPurpose.id, updatedPurposeData);
      setIsEditDrawerOpen(false);
      toast.success("Purpose updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating the purpose.");
    }
  };

  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";

  const handleAddNewPurpose = async (newPurposeData: any) => {
    try {
      await addExpensePurpose(newPurposeData);
      setIsEditDrawerOpen(false);
      toast.success("New purpose added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new purpose.");
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

  const handleEditDrawerOpen = (purpose: any) => {
    setSelectedPurpose(purpose);
    setIsEditDrawerOpen(true);
  };

  const handleDeleteConfirmation = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this purpose?")) {
      try {
        await deleteExpensePurpose(id);
        toast.success("Purpose deleted successfully!");
      } catch (error) {
        toast.error("An error occurred while deleting the purpose.");
      }
    }
  };

  const handleCloseDrawer = () => {
    setIsEditDrawerOpen(false);
    setSelectedPurpose(null);
  };

  const sortIcon = (fieldName: string) => {
    if (sortBy === fieldName) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return "";
  };

  const dynamicSort = (property: string) => {
    const sortOrderValue = sortOrder === "asc" ? 1 : -1;
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

  const filteredPurposes = expensePurposes.filter((purpose) =>
    Object.values(purpose).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedPurposes = sortBy
    ? filteredPurposes.slice().sort(dynamicSort(sortBy))
    : filteredPurposes;

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastPurpose = currentPage * itemsPerPage;
  const indexOfFirstPurpose = indexOfLastPurpose - itemsPerPage;
  const currentPurposes = sortedPurposes.slice(
    indexOfFirstPurpose,
    indexOfLastPurpose
  );

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
        Purpose List
      </h1>
      <ExpensePurposeTable
        sortedExpensePurposes={currentPurposes}
        handleSort={handleSort}
        sortIcon={sortIcon}
        handleEditDrawerOpen={handleEditDrawerOpen}
        handleDeleteConfirmation={handleDeleteConfirmation}
        translate={translate}
        formClass={formClass}
      />
      <Drawer
        open={isEditDrawerOpen}
        onClose={handleCloseDrawer}
        className="EditPurposeDrawer"
        position="right" // Set the position to "right"
      >
        <Drawer.Header>
          <h2 className="text-xl font-bold">
            {selectedPurpose ? translate("editPurpose") : translate("addNewPurpose")}
          </h2>
        </Drawer.Header>
        <Drawer.Items>
          <EditPurposeForm
            purpose={selectedPurpose}
            onSubmit={selectedPurpose ? handleUpdatePurpose : handleAddNewPurpose}
          />
        </Drawer.Items>
      </Drawer>
      <Pagination
        totalItems={sortedPurposes.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
};

export default PurposeList;
