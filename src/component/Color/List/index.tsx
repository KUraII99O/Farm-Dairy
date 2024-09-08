import React, { useState } from "react";
import { useManageColor } from "../Provider";
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import EditColorForm from "../Form";
import { useTranslation } from "../../Translator/Provider";
import ColorTable from "../Table";
import { Drawer } from "flowbite-react";

interface Color {
  id: string;
  name: string;
  userId: string;
}

const ColorList: React.FC = () => {
  const { colors, deleteColor, addColor, editColor } = useManageColor();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const { translate, language } = useTranslation();

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";

  const handleDeleteConfirmation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this color?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteColor(id);
      toast.success("Color deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting color.");
    }
  };

  const handleCloseDrawer = () => {
    setIsEditDrawerOpen(false);
    setSelectedColor(null);
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

  const handleEditDrawerOpen = (color: Color | null) => {
    setSelectedColor(color);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewColor = async (newColorData: Color) => {
    // Ensure userId is included in addColor
    try {
      await addColor(newColorData);
      setIsEditDrawerOpen(false);
      toast.success("New color added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new color.");
    }
  };

  const handleUpdateColor = async (updatedColorData: Color) => {
    // Ensure userId is included in editColor
    if (selectedColor) {
      try {
        await editColor(selectedColor.id, updatedColorData);
        setIsEditDrawerOpen(false);
        toast.success("Color updated successfully!");
      } catch (error) {
        toast.error("An error occurred while updating color.");
      }
    }
  };

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastColor = currentPage * itemsPerPage;
  const indexOfFirstColor = indexOfLastColor - itemsPerPage;
  const currentColors = colors.slice(indexOfFirstColor, indexOfLastColor);

  const sortedColors = sortBy
    ? currentColors.slice().sort((a: Color, b: Color) => {
        const aValue = a[sortBy as keyof Color] || "";
        const bValue = b[sortBy as keyof Color] || "";
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : currentColors;

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
        Color List
      </h1>
      <div className="rtl:mirror-x">
        <ColorTable
          sortedColors={sortedColors}
          handleSort={handleSort}
          sortIcon={sortIcon}
          handleDeleteConfirmation={handleDeleteConfirmation}
          handleEditDrawerOpen={handleEditDrawerOpen}
          translate={translate}
          formClass={formClass}
        />
      </div>
      <Drawer
        open={isEditDrawerOpen}
        onClose={handleCloseDrawer}
        position="right"
      >
        <Drawer.Header>
          <h2 className="text-xl font-bold">
            {selectedColor ? translate("editColor") : translate("addNewColor")}
          </h2>
        </Drawer.Header>
        <Drawer.Items>
          <EditColorForm
            color={selectedColor ?? undefined}
            onSubmit={selectedColor ? handleUpdateColor : handleAddNewColor} // Modified functions to handle form data
            onClose={handleCloseDrawer}
          />
        </Drawer.Items>
      </Drawer>

      <Pagination
        totalItems={colors.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange} itemsPerPage={0} currentPage={0} setCurrentPage={function (): void {
          throw new Error("Function not implemented.");
        } }      />
      <ToastContainer />
    </div>
  );
};

export default ColorList;
