import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../Pagination";
import { BiListUl } from "react-icons/bi";
import { toast } from "react-toastify";
import { useTranslation } from "../../Translator/Provider";
import { ManageRoutineContext } from "../Provider";
import RoutineMonitorList from "../Table";
import { Drawer } from "flowbite-react";
import ItemDetailDrawer from "../ItemDetails";


interface Information  {
  ServiceName: string;
  Result: string;
  MonitoringTime: string;
};

interface RoutineMonitor {
  id: string;
  date: string;
  stallNo: string;
  healthStatus: number; // Change to number
  note: string;
  reportedBy: string;
  userId: string;
  updatedWeight: string;
  updatedHeight: string;
  milkPerDay: string;
  monitoringDate: string;
  reports: string;
  animalID: string;
  informations: Information[];
}




const RoutineMonitorTable: React.FC = () => {
  const { routineRecords, deleteRoutineRecord } = useContext(ManageRoutineContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [, setIsDeleting] = useState(false);
  const [selectedRoutineRecord, setSelectedRoutineRecord] = useState<RoutineMonitor | null>(null);
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [, setUser] = useState<{ username: string }>({ username: "" });
  const { translate, language } = useTranslation();
  const isArabic = language === "ar";

  const formClass = isArabic ? "rtl" : "ltr";

  const [formData, setFormData] = useState({
    stallNo: "",
    animalID: "",
    date: currentDate,
    note: "",
    reportedBy: "",
    healthStatus: 50,
    informations: Array.from({ length: 3 }, () => ({
      ServiceName: "",
      Result: "",
      MonitoringTime: "",
    })),
    updatedWeight: "",
    updatedHeight: "",
    milkPerDay: "",
    monitoringDate: "",
    reports: "",
  });

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


  const filteredRoutineRecords = routineRecords.filter((routineRecord:RoutineMonitor) =>
    Object.values(routineRecord).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedRoutineRecords = sortBy
    ? filteredRoutineRecords.slice().sort((a:RoutineMonitor, b:RoutineMonitor) => {
      const aValue = a[sortBy as keyof RoutineMonitor];
      const bValue = b[sortBy as keyof RoutineMonitor];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : filteredRoutineRecords;

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastRoutineRecord = currentPage * itemsPerPage;
  const indexOfFirstRoutineRecord = indexOfLastRoutineRecord - itemsPerPage;
  const currentRoutineRecords = sortedRoutineRecords.slice(
    indexOfFirstRoutineRecord,
    indexOfLastRoutineRecord
  );

  const handleDeleteConfirmation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this routine monitor entry?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteRoutineRecord(id);
      setIsDeleting(false);
      toast.success("Routine monitor entry deleted successfully!");
    } catch (error) {
      setIsDeleting(false);
      toast.error("An error occurred while deleting routine monitor entry.");
    }
  };

  const handleViewDetails = (routineRecord:RoutineMonitor) => {
    setSelectedRoutineRecord(routineRecord);
    setIsDetailsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setSelectedRoutineRecord(null);
    setIsDetailsDrawerOpen(false);
  };

  const determineHealthStatus = (status: number) => {
    if (status >= 10 && status <= 30) {
      return { condition: "Poor Condition", color: "bg-red-500" };
    } else if (status > 30 && status <= 60) {
      return { condition: "Warning Condition", color: "bg-yellow-500" };
    } else {
      return { condition: "Good Condition", color: "bg-green-500" };
    }
  };

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

          <Link
            to="/Add-routine-monitor"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            {translate("addNew")}
          </Link>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">
        <BiListUl className="inline-block mr-2 ml-2" style={{ fontSize: "1.5em" }} />
        {translate("routinemonitorlist")}
      </h1>
      <RoutineMonitorList
        currentMonitors={currentRoutineRecords}
        handleSort={handleSort}
        sortIcon={sortIcon}
        handleDeleteConfirmation={handleDeleteConfirmation}
        translate={translate}
        formClass={formClass}
        reportedByuser={formData.reportedBy}
        determineHealthStatus={determineHealthStatus}
        handleViewDetails={handleViewDetails}
      />
      <Drawer
        open={isDetailsDrawerOpen}
        onClose={handleDrawerClose}
        position="right"
      >
        <Drawer.Header title={translate("detailsDrawerTitle")} />
        <Drawer.Items>
          {selectedRoutineRecord && (
            <ItemDetailDrawer
              isOpen={isDetailsDrawerOpen}
              onClose={handleDrawerClose}
              routineMonitor={selectedRoutineRecord}
            />
          )}

        </Drawer.Items>
      </Drawer>
      <Pagination
        totalItems={sortedRoutineRecords.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange} itemsPerPage={0} currentPage={0} setCurrentPage={function (): void {
          throw new Error("Function not implemented.");
        } }      />
    </div>
  );
};

export default RoutineMonitorTable;
