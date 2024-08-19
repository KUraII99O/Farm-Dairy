import React, { useState, } from "react";
import {  useAnimalType } from "../Provider"; // Updated import
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import EditAnimalTypeForm from "../Form"; // Updated import
import AnimalTypeTable from "../Table";
import { useTranslation } from "../../Translator/Provider";
import { Drawer } from "flowbite-react";

interface AnimalType {
  id: string;
  name: string;
  userId: string;
}

const AnimalTypeList: React.FC = () => {
  const { animalTypes, deleteAnimalType, addAnimalType, editAnimalType } = useAnimalType(); // Updated context import and usage
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedAnimalType, setSelectedAnimalType] = useState<AnimalType | null>(null); // Updated state type
  const { translate, language } = useTranslation();

  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";

  const handleDeleteConfirmation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this animal type?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAnimalType(id); // Updated function call
      toast.success("Animal type deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting animal type.");
    }
  };

  const handleCloseDrawer = () => {
    setIsEditDrawerOpen(false);
    setSelectedAnimalType(null);
  };

  const handleEditDrawerOpen = (animalType: AnimalType | null) => {
    setSelectedAnimalType(animalType);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewAnimalType = async (newAnimalTypeData: AnimalType) => {
    try {
      await addAnimalType(newAnimalTypeData);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New animal type added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new animal type.");
    }
  };

  const handleUpdateAnimalType = async (updatedAnimalTypeData: AnimalType) => {
    try {
      if (selectedAnimalType) {
        await editAnimalType(selectedAnimalType.id, updatedAnimalTypeData);
        setIsEditDrawerOpen(false); // Close the drawer after updating
        toast.success("Animal type updated successfully!");
      }
    } catch (error) {
      toast.error("An error occurred while updating animal type.");
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

  const indexOfLastAnimalType = currentPage * itemsPerPage;
  const indexOfFirstAnimalType = indexOfLastAnimalType - itemsPerPage;
  const currentAnimalTypes = animalTypes.slice(indexOfFirstAnimalType, indexOfLastAnimalType);

  const sortedAnimalTypes = sortBy
    ? currentAnimalTypes.slice().sort((a: AnimalType, b: AnimalType) => {
        const aValue = a[sortBy as keyof AnimalType];
        const bValue = b[sortBy as keyof AnimalType];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : currentAnimalTypes;

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
        Animal Types
      </h1>
      <AnimalTypeTable
        sortedAnimalTypes={sortedAnimalTypes}
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
            {selectedAnimalType ? translate("editAnimalType") : translate("addNewAnimalType")}
          </h2>
        </Drawer.Header>
        <Drawer.Items>
          <EditAnimalTypeForm
            animalType={selectedAnimalType ?? undefined} // Ensure compatibility with the type
            onSubmit={selectedAnimalType ? handleUpdateAnimalType : handleAddNewAnimalType}
            onClose={handleCloseDrawer}
          />
        </Drawer.Items>
      </Drawer>
      <Pagination
        totalItems={animalTypes.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
};

export default AnimalTypeList;
