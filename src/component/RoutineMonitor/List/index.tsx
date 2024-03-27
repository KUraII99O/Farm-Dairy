import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../Pagination";
import { BiListUl } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { RoutineMonitorContext } from "../Provider";
import RoutineMonitorDetailsDrawer from "../ItemDetails";
import { toast } from "react-toastify";
import { useTranslation } from "../../Translator/Provider";

const RoutineMonitorTable: React.FC = () => {
  const { routineMonitors, deleteRoutineMonitor } = useContext(
    RoutineMonitorContext
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedRoutineMonitor, setSelectedRoutineMonitor] = useState(null);
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false); // State to control the visibility of the details drawer
  const [currentDate, setCurrentDate] = useState<string>("");
  const [user, setUser] = useState<{ name: string; email: string; }>({
    name: "",
    email: "",
    
  });
  const { translate} = useTranslation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/users"); // Adjust the API endpoint accordingly
        if (response.ok) {
          const userData = await response.json();
          if (userData.length > 0) {
            const { username, email } = userData[0]; // Assuming you only have one user for now
            setUser({ name: username, email: email });
          }
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
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
  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString(); // Adjust the date format as needed
    setCurrentDate(formattedDate);
  }, []);

  // Sorting function for array of objects
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

  const filteredRoutineMonitors = routineMonitors.filter((routineMonitor) =>
    Object.values(routineMonitor).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort routineMonitors based on the selected field
  const sortedRoutineMonitors = sortBy
    ? filteredRoutineMonitors.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : filteredRoutineMonitors;

  // Pagination
  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastRoutineMonitor = currentPage * itemsPerPage;
  const indexOfFirstRoutineMonitor = indexOfLastRoutineMonitor - itemsPerPage;
  const currentRoutineMonitors = sortedRoutineMonitors.slice(
    indexOfFirstRoutineMonitor,
    indexOfLastRoutineMonitor
  );

  const handleDeleteConfirmation = (id: number) => {
    if (
      window.confirm(
        "Are you sure you want to delete this routine monitor entry?"
      )
    ) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteRoutineMonitor(id);
      setIsDeleting(false);
      toast.success("Routine monitor entry deleted successfully!");
    } catch (error) {
      setIsDeleting(false);
      toast.error("An error occurred while deleting routine monitor entry.");
    }
  };

  const handleViewDetails = (routineMonitor) => {
    setSelectedRoutineMonitor(routineMonitor);
    setIsDetailsDrawerOpen(true); // Open the details drawer
  };

  const handleDrawerClose = () => {
    setSelectedRoutineMonitor(null);
    setIsDetailsDrawerOpen(false); // Close the details drawer
  };

  // Determine health status condition and color for progress bar
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
      {selectedRoutineMonitor && (
        <RoutineMonitorDetailsDrawer
          isOpen={isDetailsDrawerOpen}
          onClose={handleDrawerClose}
          routineMonitor={selectedRoutineMonitor}
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
            className="p-2 rounded border border-gray-300 ml-2 "
          />

          <Link
            to="/Add-routine-monitor "
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            {translate("addNew")}
          </Link>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">
        <BiListUl className="inline-block mr-2 ml-2 style={{ fontSize: '1.5em' }}" />
        
        {translate("routinemonitorlist")}
      </h1>
      <table className="min-w-full bg-white border-collapse">
        {/* Table header */}
        <thead>
          <tr>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("date")}
            >
              <div className="flex items-center">
              {translate("date")}
                {sortIcon("date")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("stallNo")}
            >
              <div className="flex items-center">
              {translate("stallNo")}
                {sortIcon("stallNo")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("animalID")}
            >
              <div className="flex items-center">
              {translate("animalID")}
                {sortIcon("animalID")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("note")} // Assuming you want to enable sorting for the "Note" column
            >
              <div className="flex items-center">
              {translate("note")}
                {sortIcon("note")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("healthStatus")}
            >
              <div className="flex items-center">
              {translate("healthstatus")}
                {sortIcon("healthStatus")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("reportedBy")}
            >
              <div className="flex items-center">
              {translate("reportedby")}
                {sortIcon("reportedBy")}
              </div>
            </th>
            <th className="border border-gray-300 px-4 py-2">{translate("action")}</th>{" "}
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {currentRoutineMonitors.map((routineMonitor) => (
            <tr key={routineMonitor.id}>
              {/* Render each field accordingly */}
              <td className="border border-gray-300 px-4 py-2">
                {currentDate}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {routineMonitor.stallNo}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {routineMonitor.animalID}
              </td>
              <td className="border border-gray-300 px-4 py-2">
              {routineMonitor.note}
</td>
              <td className="border border-gray-300 px-4 py-2">
                <div>
                  <div className="bg-gray-300 h-6 w-full  relative">
                    <div
                      className={`h-full ${
                        determineHealthStatus(routineMonitor.healthStatus).color
                      }`}
                      style={{
                        width: `${routineMonitor.healthStatus}%`,
                        transition: "width 0.3s ease-in-out",


                      }}
                    ></div>
                  </div>
                  <span
                    className={`text-xs font-semibold text-${
                      determineHealthStatus(routineMonitor.healthStatus).color
                    }`}
                  >
                    {
                      determineHealthStatus(routineMonitor.healthStatus)
                        .condition
                    }
                  </span>
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.name}
              </td>
              <td className="border border-gray-300 px-2 py-2">
                <div className="flex items-center">
                  <button
                    onClick={() => handleViewDetails(routineMonitor)}
                    className="text-secondary hover:text-primary focus:outline-none flex  mr-4"
                  >
                    <FaEye className="w-5 h-5 mr-1" />
                  </button>
                  {/* Edit link */}
                  <Link
                    to={`/Edit-Routine-Monitor/${routineMonitor.id}`}
                    className="text-blue-500 hover:underline flex items-center mr-4"
                  >
                    <BsPencil className="w-5 h-5 mr-1" />
                  </Link>
                  {/* Delete button */}
                  <button
                    onClick={() => handleDeleteConfirmation(routineMonitor.id)}
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
      {/* Pagination */}
      <Pagination
        totalItems={sortedRoutineMonitors.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default RoutineMonitorTable;
