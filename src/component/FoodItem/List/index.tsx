import React, { useState } from "react";
import { useFoodItem } from "../Provider"; // Import useFoodItem hook
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import EditFoodUnitForm from "../Form"; // Update to use EditFoodUnitForm instead of EditDesignationForm
import { useTranslation } from "../../Translator/Provider";
import FoodItemTable from "../Table";
import { Drawer } from "flowbite-react";


interface FoodItem{
  id: string;
  userId: string;
  name: string;
}




const FoodItemList: React.FC = () => {
  const { foodItems, deleteFoodItem, addFoodItem, editFoodItem } = useFoodItem(); // Use useFoodItem hook
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem]= useState<FoodItem | null>(null);
  const { translate, language } = useTranslation();
  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";

  const handleDeleteConfirmation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this food item?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFoodItem(id);
      toast.success("Food item deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting food item.");
    }
  };

  const handleCloseDrawer = () => {
    setIsEditDrawerOpen(false);
    setSelectedFoodItem(null);
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

  const handleEditDrawerOpen = (foodItem: any) => {
    setSelectedFoodItem(foodItem);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewFoodItem = async (newFoodItemData: any) => {
    try {
      await addFoodItem(newFoodItemData);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New food item added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new food item.");
    }
  };

  const handleUpdateFoodItem = async (updatedFoodItemData: any) => {
    try {
      await editFoodItem(selectedFoodItem.id, updatedFoodItemData);
      setIsEditDrawerOpen(false); // Close the drawer after updating
      toast.success("Food item updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating food item.");
    }
  };

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastFoodItem = currentPage * itemsPerPage;
  const indexOfFirstFoodItem = indexOfLastFoodItem - itemsPerPage;
  const currentFoodItems = foodItems.slice(indexOfFirstFoodItem, indexOfLastFoodItem);

  const sortedFoodItems = sortBy
    ? currentFoodItems.slice().sort((a, b) => {
        const aValue = a[sortBy as keyof FoodItem ];
        const bValue = b[sortBy as keyof FoodItem ];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : currentFoodItems;

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
        Food Item List
      </h1>
      <FoodItemTable
        sortedFoodItems={sortedFoodItems}
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
            {selectedFoodItem ? translate("editFoodItem") : translate("addNewFoodItem")}
          </h2>
        </Drawer.Header>
        <Drawer.Items> {/* Corrected to Drawer.Body */}
          <EditFoodUnitForm
            foodItem={selectedFoodItem}
            onSubmit={selectedFoodItem ? handleUpdateFoodItem : handleAddNewFoodItem}
            onClose={handleCloseDrawer}
          />
        </Drawer.Items>
      </Drawer>
      <Pagination
        totalItems={foodItems.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
};

export default FoodItemList;