import React, { useState } from "react";
import { useMonitoring } from "../Provider"; // Import MonitoringServiceContext
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import { Drawer } from "flowbite-react";
import MonitoringTable from "../Table";
import { useTranslation } from "../../Translator/Provider";
import EditMonitoringForm from "../Form";
import { Monitoring } from "../MonitoringService";

const MonitoringServiceList: React.FC = () => {
  const { monitorings, addMonitoring, editMonitoring, deleteMonitoring } = useMonitoring(); // Use MonitoringServiceContext
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedMonitoringService, setSelectedMonitoringService] = useState<Monitoring | null>(null);
  const { translate, language } = useTranslation();
  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";

  const handleDeleteConfirmation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this monitoring service?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMonitoring(id);
      toast.success("Monitoring service deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting monitoring service.");
    }
  };

  const handleCloseDrawer = () => {
    setIsEditDrawerOpen(false);
    setSelectedMonitoringService(null);
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

  const handleEditDrawerOpen = (monitoringService: Monitoring | null) => {
    setSelectedMonitoringService(monitoringService);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewMonitoringService = async (newServiceData: Omit<Monitoring, "id" | "userId">) => {
    try {
      await addMonitoring(newServiceData);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New monitoring service added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new monitoring service.");
    }
  };

  const handleUpdateMonitoringService = async (updatedServiceData: Omit<Monitoring, "id" | "userId">) => {
    if (!selectedMonitoringService) return;
    try {
      await editMonitoring(selectedMonitoringService.id!, updatedServiceData);
      setIsEditDrawerOpen(false); // Close the drawer after updating
      toast.success("Monitoring service updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating monitoring service.");
    }
  };

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastMonitoringService = currentPage * itemsPerPage;
  const indexOfFirstMonitoringService = indexOfLastMonitoringService - itemsPerPage;
  const currentMonitoringServices = monitorings.slice(indexOfFirstMonitoringService, indexOfLastMonitoringService);

  const sortedMonitoringServices = sortBy
    ? currentMonitoringServices.slice().sort((a, b) => {
        const aValue = a[sortBy as keyof Monitoring]?? "";
        const bValue = b[sortBy as keyof Monitoring]?? "";
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : currentMonitoringServices;

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
        Monitoring Service List
      </h1>
      <MonitoringTable
        sortedMonitorings={sortedMonitoringServices}
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
        position="right"
      >
        <Drawer.Header>
          <h2 className="text-xl font-bold">
            {selectedMonitoringService ? translate("editFoodItem") : translate("addNewFoodItem")}
          </h2>
        </Drawer.Header>
        <Drawer.Items>
          <EditMonitoringForm
            monitoring={selectedMonitoringService}
            onSubmit={selectedMonitoringService ? handleUpdateMonitoringService : handleAddNewMonitoringService}
            onClose={handleCloseDrawer}
          />
        </Drawer.Items>
      </Drawer>
      <Pagination
        totalItems={monitorings.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange} itemsPerPage={0} currentPage={0} setCurrentPage={function (): void {
          throw new Error("Function not implemented.");
        } }      />
      <ToastContainer />
    </div>
  );
};

export default MonitoringServiceList;
