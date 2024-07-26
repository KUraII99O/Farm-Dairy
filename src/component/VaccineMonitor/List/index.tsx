import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../Pagination";
import { BiListUl } from "react-icons/bi";
import VaccineMonitorDetailsDrawer from "../ItemDetails";
import { useTranslation } from "../../Translator/Provider";
import VaccineMonitorList from "../Table";
import { toast } from "react-toastify";
import {  ManageVaccineMonitorContext } from "../Provider";
import { VaccineMonitor } from "../VaccineMonitorService";

const VaccineMonitorTable: React.FC = () => {
  const context = useContext(ManageVaccineMonitorContext);
  if (!context) {
    throw new Error("VaccineMonitorTable must be used within a ManageVaccineMonitorProvider");
  }  const { vaccineRecords, deleteVaccineRecord } = context;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [, setIsDeleting] = useState(false);
  const [selectedVaccineMonitor, setSelectedVaccineMonitor] = useState<VaccineMonitor | null>(null);
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [, setUser] = useState<{ username: string }>({ username: "" });

  const [currentDate, setCurrentDate] = useState<string>("");
  const { translate, language } = useTranslation();
  const isArabic = language === "ar";

  const [formData, setFormData] = useState({
    stallNo: "",
    CowNumber: "",
    date: currentDate,
    note: "",
    reportedby: "",
    informations: Array.from({ length: 3 }, () => ({
      VaccineName: "",
      Dose: "",
      Repeat: "",
      Remarks: "",
      GivenTime: "",
    })),
  });

  const formClass = isArabic ? "rtl" : "ltr";

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString(); // Adjust the date format as needed
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          const { username } = userData;
          setUser({ username: username });
          setFormData((prevFormData) => ({
            ...prevFormData,
            reportedby: username,
          }));
          console.log("Username fetched successfully:", username);
        } else {
          console.error("No user data found in local storage");
        }
      } catch (error) {
        console.error("Error fetching user data from local storage:", error);
      }
    };

    fetchUserData();
  }, []);

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

  const filteredVaccineMonitors = vaccineRecords ? vaccineRecords.filter((vaccineMonitor) =>
    Object.values(vaccineMonitor).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) : [];

  const dynamicSort = (property: keyof VaccineMonitor) => {
    const sortOrderValue = sortOrder === "asc" ? 1 : -1;
    return function (a: VaccineMonitor, b: VaccineMonitor) {
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
  ? filteredVaccineMonitors.slice().sort(dynamicSort(sortBy as keyof VaccineMonitor))
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

  const handleDeleteConfirmation = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this vaccine monitor entry?"
      )
    ) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteVaccineRecord(id);
      setIsDeleting(false);
      toast.success("Vaccine monitor entry deleted successfully!");
    } catch (error) {
      setIsDeleting(false);
      toast.error("An error occurred while deleting vaccine monitor entry.");
    }
  };
  const handleViewDetails = (vaccineMonitor: VaccineMonitor) => {
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
            placeholder={translate("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded border border-gray-300 ml-2"
          />
          <Link
            to="/Add-vaccine-monitor"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            {translate("addNew")}
          </Link>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">
        <BiListUl className="inline-block mr-2" />
        {translate("vaccinemonitorlist")}
      </h1>
      <VaccineMonitorList
        currentVaccineMonitors={currentVaccineMonitors}
        handleSort={handleSort}
        sortIcon={sortIcon}
        handleDeleteConfirmation={handleDeleteConfirmation}
        translate={translate}
        formClass={formClass}
        reportedbyuser={formData.reportedby}
        handleViewDetails={handleViewDetails}
      />
      <Pagination
        totalItems={sortedVaccineMonitors.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default VaccineMonitorTable;
