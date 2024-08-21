import React, { useState } from "react";
import { useFoodUnit } from "../Provider"; // Import FoodUnitContext
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import EditFoodUnitForm from "../Form"; // Update to use EditFoodUnitForm instead of EditDesignationForm
import { Drawer } from "flowbite-react";
import { useTranslation } from "../../Translator/Provider";
import FoodUnitTable from "../../FoodUnit/Table";

interface FoodUnit {
  id: string;
  userId: string;
  name: string;
}

const FoodUnitList: React.FC = () => {
  const { foodUnits, deleteFoodUnit, addFoodUnit, editFoodUnit } = useFoodUnit(); // Use FoodUnitContext
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false);
  const [selectedFoodUnit, setSelectedFoodUnit] = useState<FoodUnit | null>(null);
  const { translate, language } = useTranslation();
  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";

  const handleDeleteConfirmation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this food unit?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFoodUnit(id);
      toast.success("Food unit deleted successfully!");
    } catch (error) {
      console.error("Error deleting food unit:", error);
      toast.error("An error occurred while deleting the food unit.");
    }
  };

  const handleCloseDrawer = () => {
    setIsEditDrawerOpen(false);
    setSelectedFoodUnit(null);
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

  const handleEditDrawerOpen = (foodUnit: FoodUnit | null) => {
    setSelectedFoodUnit(foodUnit);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewFoodUnit = async (newFoodUnitData: Omit<FoodUnit, 'id' | 'userId'>) => {
    try {
      await addFoodUnit(newFoodUnitData);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New food unit added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new food unit.");
    }
  };

  const handleUpdateFoodUnit = async (updatedFoodUnitData: Omit<FoodUnit, 'id' | 'userId'>) => {
    try {
      if (selectedFoodUnit) {
        await editFoodUnit(selectedFoodUnit.id, updatedFoodUnitData);
        setIsEditDrawerOpen(false); // Close the drawer after updating
        toast.success("Food unit updated successfully!");
      }
    } catch (error) {
      toast.error("An error occurred while updating food unit.");
    }
  };

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastFoodUnit = currentPage * itemsPerPage;
  const indexOfFirstFoodUnit = indexOfLastFoodUnit - itemsPerPage;
  const currentFoodUnits = foodUnits.slice(indexOfFirstFoodUnit, indexOfLastFoodUnit);

  const sortedFoodUnits = sortBy
    ? currentFoodUnits.slice().sort((a, b) => {
        const aValue = a[sortBy as keyof FoodUnit];
        const bValue = b[sortBy as keyof FoodUnit];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : currentFoodUnits;

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
        Food Unit List
      </h1>
      <FoodUnitTable
        sortedFoodUnits={sortedFoodUnits}
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
            {selectedFoodUnit ? translate("editFoodUnit") : translate("addNewFoodUnit")}
          </h2>
        </Drawer.Header>
        <Drawer.Items> {/* Corrected to Drawer.Body */}
          <EditFoodUnitForm
            foodUnit={selectedFoodUnit}
            onSubmit={selectedFoodUnit ? handleUpdateFoodUnit : handleAddNewFoodUnit}
            onClose={handleCloseDrawer}
          />
        </Drawer.Items>
      </Drawer>
      <Pagination
        totalItems={foodUnits.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
};

export default FoodUnitList;
