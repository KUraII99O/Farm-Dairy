import React, { useState, useContext, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { ManageStallContext } from "../Provider";
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import EditStallForm from "../Form";
import { useTranslation } from "../../Translator/Provider";
import { Drawer, Button } from "flowbite-react";
import StallTable from "../Table";
import StallService from "../Services"; // Import the StallService

const StallList: React.FC = () => {
  const { stalls } = useContext(ManageStallContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedStall, setSelectedStall] = useState(null);
  const { translate, language } = useTranslation();

  // Destructure the functions and constants from StallService
  const {
    handleDeleteConfirmation,
    isArabic,
    formClass,
    handleDelete,
    handleCloseDrawer,
    handleOutsideClick,
    handleToggleStatus,
    handleSort,
    sortIcon,
    handleEditDrawerOpen,
    handleAddNewStall,
    handleUpdateStall,
    handlePageChange,
    sortedStalls,
  } = StallService();

  // useEffect for handling outside clicks
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  // Calculate index of first and last stall for pagination
  const indexOfLastStall = currentPage * itemsPerPage;
  const indexOfFirstStall = indexOfLastStall - itemsPerPage;
  const currentStalls = stalls.slice(indexOfFirstStall, indexOfLastStall);

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center"></div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder={translate("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded border border-gray-300 ml-2"
          />
          <Button
            onClick={() => handleEditDrawerOpen(null)}
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            {translate("addNew")}
          </Button>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">
        <BiListUl
          className="inline-block mr-2 ml-2  "
          style={{ fontSize: "1.5em" }}
        />
        {translate("stalllist")}
      </h1>
      <StallTable
        sortedStalls={sortedStalls}
        handleSort={handleSort}
        sortIcon={sortIcon}
        handleToggleStatus={handleToggleStatus}
        handleEditDrawerOpen={handleEditDrawerOpen}
        handleDeleteConfirmation={handleDeleteConfirmation}
        translate={translate}
        formClass={formClass}
      />
      <Drawer
        open={isEditDrawerOpen}
        onClose={handleCloseDrawer}
        className="EditStallDrawer right-0"
      >
        <Drawer.Header title="Drawer" />
        <Drawer.Items>
          <EditStallForm
            stall={selectedStall}
            onSubmit={selectedStall ? handleUpdateStall : handleAddNewStall}
          />
        </Drawer.Items>
      </Drawer>

      <Pagination
        totalItems={stalls.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
};

export default StallList;
