import React, { useState, useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MonitoringServiceContext } from "../Provider"; // Import MonitoringServiceContext
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import EditMonitoringServiceForm from "../Form"; // Update to use EditMonitoringServiceForm instead of EditFoodUnitForm

const MonitoringServiceList: React.FC = () => {
  const { monitoringServices, deleteMonitoringService, addMonitoringService, editMonitoringService } = useContext(MonitoringServiceContext); // Use MonitoringServiceContext
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedMonitoringService, setSelectedMonitoringService] = useState(null);

  const handleDeleteConfirmation = (id: number) => {
    if (window.confirm("Are you sure you want to delete this monitoring service?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMonitoringService(id);
      toast.success("Monitoring service deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting monitoring service.");
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

  const handleEditDrawerOpen = (monitoringService: any) => {
    setSelectedMonitoringService(monitoringService);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewMonitoringService = async (newServiceData: any) => {
    try {
      await addMonitoringService(newServiceData);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New monitoring service added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new monitoring service.");
    }
  };

  const handleUpdateMonitoringService = async (updatedServiceData) => {
    try {
      await editMonitoringService(selectedMonitoringService.id, updatedServiceData);
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
  const currentMonitoringServices = monitoringServices.slice(indexOfFirstMonitoringService, indexOfLastMonitoringService);

  const sortedMonitoringServices = sortBy
    ? currentMonitoringServices.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
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
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("id")}
            >
              <div className="flex items-center">
                #ID
                {sortIcon("id")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("serviceName")}
            >
              <div className="flex items-center">
                Name
                {sortIcon("serviceName")}
              </div>
            </th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedMonitoringServices
            .filter((service) =>
              service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((service) => (
              <tr key={service.id}>
                <td className="border border-gray-300 px-4 py-2">{service.id}</td>
                <td className="border border-gray-300 px-4 py-2">{service.serviceName}</td>
                <td className="border border-gray-300 px-2 py-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleEditDrawerOpen(service)}
                      className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
                    >
                      <BsPencil className="w-5 h-5 mr-1" />
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(service.id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none flex items-center"
                    >
                      <AiOutlineDelete className="w-5 h-5 mr-1" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isEditDrawerOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex justify-end">
          <div className="w-96 bg-white h-full shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              {selectedMonitoringService ? "Edit Monitoring Service" : "Add New Monitoring Service"}
            </h2>
            <EditMonitoringServiceForm
              service={selectedMonitoringService}
              onSubmit={selectedMonitoringService ? handleUpdateMonitoringService : handleAddNewMonitoringService}
              onClose={() => setIsEditDrawerOpen(false)} // Assuming setIsEditDrawerOpen is the function to close the drawer
            />
          </div>
        </div>
      )}
      <Pagination
        totalItems={monitoringServices.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
};

export default MonitoringServiceList;
