import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../Pagination";
import { BiListUl } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { VaccineMonitorContext } from "../Provider";
import RoutineMonitorDetailsDrawer from "../ItemDetails";
import VaccineMonitorDetailsDrawer from "../ItemDetails";

const VaccineMonitorTable: React.FC = () => {
  const { vaccineMonitors, deleteVaccineMonitor } = useContext(
    VaccineMonitorContext
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedVaccineMonitor, setSelectedVaccineMonitor] = useState(null);
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);

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

  const filteredVaccineMonitors = vaccineMonitors.filter((vaccineMonitor) =>
    Object.values(vaccineMonitor).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const dynamicSort = (property: string) => {
    let sortOrderValue = sortOrder === "asc" ? 1 : -1;
    return function (a: any, b: any) {
      if (a[property] < b[property]) {
        return -1 * sortOrderValue;
      } else if (a[property] > b[property]) {
        return 1 * sortOrderValue;
      } else {
        return 0;
      }
    };
  };

  const sortedVaccineMonitors = sortBy
    ? filteredVaccineMonitors.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : filteredVaccineMonitors;

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastVaccineMonitor = currentPage * itemsPerPage;
  const indexOfFirstVaccineMonitor = indexOfLastVaccineMonitor - itemsPerPage;
  const currentVaccineMonitors = sortedVaccineMonitors.slice(
    indexOfFirstVaccineMonitor,
    indexOfLastVaccineMonitor
  );

  const handleDeleteConfirmation = (id: number) => {
    if (
      window.confirm(
        "Are you sure you want to delete this vaccine monitor entry?"
      )
    ) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteVaccineMonitor(id);
      setIsDeleting(false);
      toast.success("Vaccine monitor entry deleted successfully!");
    } catch (error) {
      setIsDeleting(false);
      toast.error("An error occurred while deleting vaccine monitor entry.");
    }
  };

  const handleViewDetails = (vaccineMonitor) => {
    setSelectedVaccineMonitor(vaccineMonitor);
    setIsDetailsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setSelectedVaccineMonitor(null);
    setIsDetailsDrawerOpen(false);
  };

  return (
    <div className="overflow-x-auto">
      {selectedVaccineMonitor && (
        <VaccineMonitorDetailsDrawer
          isOpen={isDetailsDrawerOpen}
          onClose={handleDrawerClose}
          vaccineMonitor={selectedVaccineMonitor}
        />
      )}
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

          <Link
            to="/Add-vaccine-monitor"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            Add New
          </Link>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">
        <BiListUl className="inline-block mr-2" />
        Vaccine Monitor List
      </h1>
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("date")}
            >
              <div className="flex items-center">
                Date
                {sortIcon("date")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("stallNo")}
            >
              <div className="flex items-center">
                Stall No
                {sortIcon("stallNo")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("CowNumber")}
            >
              <div className="flex items-center">
                Cow Number
                {sortIcon("CowNumber")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("note")}
            >
              <div className="flex items-center">
                Note
                {sortIcon("note")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("reportedBy")}
            >
              <div className="flex items-center">
                Reported By
                {sortIcon("reportedBy")}
              </div>
            </th>
            <th className="border border-gray-300 px-4 py-2">Action</th>{" "}
          </tr>
        </thead>
        <tbody>
          {currentVaccineMonitors.map((vaccineMonitor) => (
            <tr key={vaccineMonitor.id}>
              <td className="border border-gray-300 px-4 py-2">
                {vaccineMonitor.date}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {vaccineMonitor.stallNo}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {vaccineMonitor.CowNumber}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {vaccineMonitor.note}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {vaccineMonitor.reportedBy}
              </td>
              <td className="border border-gray-300 px-2 py-2">
                <div className="flex items-center">
                  <button
                    onClick={() => handleViewDetails(vaccineMonitor)}
                    className="text-secondary hover:text-primary focus:outline-none flex  mr-4"
                  >
                    <FaEye className="w-5 h-5 mr-1" />
                  </button>
                  <Link
                    to={`/Edit-Vaccine-Monitor/${vaccineMonitor.id}`}
                    className="text-blue-500 hover:underline flex items-center mr-4"
                  >
                    <BsPencil className="w-5 h-5 mr-1" />
                  </Link>
                  <button
                    onClick={() => handleDeleteConfirmation(vaccineMonitor.id)}
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
      <Pagination
        totalItems={sortedVaccineMonitors.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default VaccineMonitorTable;
