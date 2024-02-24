import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StaffContext } from "../Provider";
import { Staff } from "../types";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../Pagination";
import { BsPencil } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

const StaffTable: React.FC = () => {
  const { staff, toggleStatus, deleteStaffMember } = useContext(StaffContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of staff per page
  const [isDeleting, setIsDeleting] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<number | null>(null);

  // Filter staff based on search term
  const filteredStaff = staff.filter((staffMember) =>
    Object.values(staffMember).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort staff based on the selected field
  const sortedStaff = sortBy
    ? filteredStaff.sort((a, b) =>
        sortOrder === "asc"
          ? a[sortBy] > b[sortBy]
            ? 1
            : -1
          : a[sortBy] < b[sortBy]
          ? 1
          : -1
      )
    : filteredStaff;

  // Pagination
  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastStaff = currentPage * itemsPerPage;
  const indexOfFirstStaff = indexOfLastStaff - itemsPerPage;
  const currentStaff = sortedStaff.slice(indexOfFirstStaff, indexOfLastStaff);

  // Pagination end

  const handleToggleStatus = (id: number) => {
    toggleStatus(id);
    const staffMember = staff.find((member) => member.id === id);
    const statusMessage = staffMember.status ? "enabled" : "disabled";
    toast.success(`Toggle status ${statusMessage} successfully`);
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

  const handleDeleteConfirmation = (id: number) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      // If the user confirms, directly call handleDelete
      handleDelete(id);
    }
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteStaffMember(id);
      setIsDeleting(false);
      setStaff((prevStaff) => prevStaff.filter((member) => member.id !== id));
    } catch (error) {
      setIsDeleting(false);
    }
  };
  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          
        </div>
        <div className="flex items-center">
          
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded border border-gray-300 ml-2"
          />
          <Link
            to="/add-staff"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            Add Staff
          </Link>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">Staff Table</h1>
      <table className="min-w-full bg-white border-collapse">
        {/* Table header */}
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 cursor-pointer">
              <div className="flex items-center">Image</div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center">
                Staff Name
                {sortIcon("name")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("email")}
            >
              <div className="flex items-center">
                Email
                {sortIcon("email")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("mobile")}
            >
              <div className="flex items-center">
                Mobile No
                {sortIcon("mobile")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("designation")}
            >
              <div className="flex items-center">
                Designation
                {sortIcon("designation")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("joiningDate")}
            >
              <div className="flex items-center">
                Joining Date
                {sortIcon("joiningDate")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("salary")}
            >
              <div className="flex items-center">
                Salary
                {sortIcon("GrossSalary")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center">Status</div>
            </th>
            <th className="border border-gray-300 px-4 py-2">Action</th>{" "}
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {currentStaff.map((staffMember: Staff) => (
            <tr key={staffMember.id}>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={staffMember.image}
                  alt="Profile"
                  className="h-12 w-12 rounded-full"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {staffMember.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {staffMember.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {staffMember.mobile}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {staffMember.designation}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {staffMember.joiningDate}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {staffMember.GrossSalary}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className={`sr-only peer`}
                    checked={staffMember.status}
                    onChange={() => handleToggleStatus(staffMember.id)}
                  />
                  <div
                    className={`relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600`}
                  ></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {staffMember.status ? "Active" : "Inactive"}
                  </span>
                </label>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex items-center">
                  <Link
                    to={`/edit-staff/${staffMember.id}`}
                    className="text-blue-500 hover:underline flex items-center mr-2"
                  >
                    <BsPencil className="w-5 h-5 mr-1" />
                  </Link>
                  <button
                    onClick={() => handleDeleteConfirmation(staffMember.id)}
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
        totalItems={sortedStaff.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default StaffTable;
