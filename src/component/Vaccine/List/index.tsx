import React, { useState } from "react";
import { useVaccine } from "../Provider"; // Updated import
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import EditVaccineForm from "../Form"; // Updated import
import VaccineTable from "../Table";
import { useTranslation } from "../../Translator/Provider";
import { Drawer } from "flowbite-react";

interface Vaccine {
  id: string;
  vaccineName: string;
  periodDays: string; // Assuming period is in days
  repeatVaccine: boolean;
  dose: string;
  note: string;
  userId: string;
}

const VaccineList: React.FC = () => {
  const { vaccines, deleteVaccine, addVaccine, editVaccine } = useVaccine(); // Updated context import and usage
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState<Vaccine | null>(null); // Updated state type
  const { translate, language } = useTranslation();

  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";

  const handleDeleteConfirmation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this vaccine?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteVaccine(id); // Updated function call
      toast.success("Vaccine deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting vaccine.");
    }
  };

  const handleCloseDrawer = () => {
    setIsEditDrawerOpen(false);
    setSelectedVaccine(null);
  };

  const handleEditDrawerOpen = (vaccine: Vaccine | null) => {
    setSelectedVaccine(vaccine);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewVaccine = async (newVaccineData: Vaccine) => {
    try {
      await addVaccine(newVaccineData);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New vaccine added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new vaccine.");
    }
  };

  const handleUpdateVaccine = async (updatedVaccineData: Vaccine) => {
    try {
      if (selectedVaccine) {
        await editVaccine(selectedVaccine.id, updatedVaccineData);
        setIsEditDrawerOpen(false); // Close the drawer after updating
        toast.success("Vaccine updated successfully!");
      }
    } catch (error) {
      toast.error("An error occurred while updating vaccine.");
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

  const indexOfLastVaccine = currentPage * itemsPerPage;
  const indexOfFirstVaccine = indexOfLastVaccine - itemsPerPage;
  const currentVaccines = vaccines.slice(indexOfFirstVaccine, indexOfLastVaccine);

  const sortedVaccines = sortBy
    ? currentVaccines.slice().sort((a: Vaccine, b: Vaccine) => {
        const aValue = a[sortBy as keyof Vaccine];
        const bValue = b[sortBy as keyof Vaccine];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : currentVaccines;

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
        Vaccine List
      </h1>
      <VaccineTable
        sortedVaccines={sortedVaccines}
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
            {selectedVaccine ? translate("editVaccine") : translate("addNewVaccine")}
          </h2>
        </Drawer.Header>
        <Drawer.Items>
          <EditVaccineForm
            vaccine={selectedVaccine ?? undefined} // Ensure compatibility with the type
            onSubmit={selectedVaccine ? handleUpdateVaccine : handleAddNewVaccine}
            onClose={handleCloseDrawer}
          />
        </Drawer.Items>
      </Drawer>
      <Pagination
        totalItems={vaccines.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
};

export default VaccineList;
