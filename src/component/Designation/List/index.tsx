import React, { useState } from "react";
import { useManageDesignation } from "../Provider"; // Import ManageDesignationContext
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import EditDesignationForm from "../Form"; // Update to use EditDesignationForm instead of EditStallForm
import DesignationTable from "../Table";
import { useTranslation } from "../../Translator/Provider";
import { Designation } from "../DesignationService";


const DesignationList: React.FC = () => {
  const { designations, deleteDesignation, addDesignation, editDesignation } =
    useManageDesignation(); // Use ManageDesignationContext
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedDesignation, setSelectedDesignation] =
    useState<Designation | null>(null);
  const { translate, language } = useTranslation();

  const handleDeleteConfirmation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this designation?")) {
      handleDelete(id);
    }
  };
  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";

  const handleDelete = async (id: string) => {
    try {
      await deleteDesignation(id);
      toast.success("Designation deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting designation.");
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

  const handleEditDrawerOpen = (designation: any) => {
    setSelectedDesignation(designation);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewDesignation = async (newDesignationData: any) => {
    try {
      await addDesignation(newDesignationData);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New designation added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new designation.");
    }
  };

  const handleUpdateDesignation = async (
    updatedDesignationData: Designation
  ) => {
    try {
      if (selectedDesignation)
        await editDesignation(selectedDesignation.id!, updatedDesignationData);
      setIsEditDrawerOpen(false); // Close the drawer after updating
      toast.success("Designation updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating designation.");
    }
  };

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastDesignation = currentPage * itemsPerPage;
  const indexOfFirstDesignation = indexOfLastDesignation - itemsPerPage;
  const currentDesignations = designations.slice(
    indexOfFirstDesignation,
    indexOfLastDesignation
  );

  const sortedDesignations = sortBy
    ? currentDesignations.slice().sort((a, b) => {
        const aValue = a[sortBy as keyof Designation] ?? "";
        const bValue = b[sortBy as keyof Designation] ?? "";
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : currentDesignations;

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

      <DesignationTable
        sortedDesignations={sortedDesignations}
        handleSort={handleSort}
        sortIcon={sortIcon}
        handleEditDrawerOpen={handleEditDrawerOpen}
        handleDeleteConfirmation={handleDeleteConfirmation}
        translate={translate}
        formClass={formClass}
      />
      {isEditDrawerOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex justify-end">
          <div className="w-96 bg-white h-full shadow-lg p-6">
            <EditDesignationForm
              designation={selectedDesignation}
              onSubmit={
                selectedDesignation
                  ? handleUpdateDesignation
                  : handleAddNewDesignation
              }
              onClose={() => setIsEditDrawerOpen(false)} // Assuming setIsEditDrawerOpen is the function to close the drawer
            />
          </div>
        </div>
      )}
      <Pagination
        totalItems={designations.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        itemsPerPage={0}
        currentPage={0}
        setCurrentPage={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <ToastContainer />
    </div>
  );
};

export default DesignationList;
