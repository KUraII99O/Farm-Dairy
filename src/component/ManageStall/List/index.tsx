import React, { useState, useContext, useEffect } from "react";
import { ManageStallContext } from "../Provider";
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import EditStallForm from "../Form";
import { useTranslation } from "../../Translator/Provider";
import { Drawer, Button } from "flowbite-react";
import StallTable from "../Table";
import { Stall } from "../StallService";

const StallList: React.FC = () => {
  const { stalls, deleteStall, addStall, editStall, toggleStallStatus } =
    useContext(ManageStallContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedStall, setSelectedStall] = useState<Stall | null>(null);
  const { translate, language } = useTranslation();

  const handleDeleteConfirmation = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this stall?")) {
      await handleDelete(id);
    }
  };
  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";

  const handleDelete = async (id: string) => {
    try {
      await deleteStall(id);
      toast.success("Stall deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting stall.");
    }
  };

  const handleCloseDrawer = () => {
    setIsEditDrawerOpen(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const drawer = document.querySelector(".Drawer") as HTMLElement;

    if (drawer && !drawer.contains(target)) {
      handleCloseDrawer();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleToggleStatus = async (id: string, newStatus: string) => {
    try {
      await toggleStallStatus(id, newStatus);
      toast.success("Stall status updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating stall status.");
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

  const handleEditDrawerOpen = (stall: Stall | null) => {
    setSelectedStall(stall);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewStall = async (newStallData: Stall) => {
    try {
      await addStall(newStallData);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New stall added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new stall.");
    }
  };

  const handleUpdateStall = async (updatedStallData: Stall) => {
    try {
      if (selectedStall) {
        await editStall(selectedStall.id, updatedStallData);
        setIsEditDrawerOpen(false); // Close the drawer after updating
        toast.success("Stall updated successfully!");
      } else {
        toast.error("No stall selected for updating.");
      }
    } catch (error) {
      toast.error("An error occurred while updating stall.");
    }
  };

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastStall = currentPage * itemsPerPage;
  const indexOfFirstStall = indexOfLastStall - itemsPerPage;
  const currentStalls = stalls.slice(indexOfFirstStall, indexOfLastStall);

  const sortedStalls = sortBy
    ? currentStalls.slice().sort((a: Stall, b: Stall) => {
        const aValue = a[sortBy as keyof Stall] ?? "";
        const bValue = b[sortBy as keyof Stall] ?? "";
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : currentStalls;

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
        className="EditStallDrawer"
        position="right" // Set the position to "right"
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

export default StallList;
