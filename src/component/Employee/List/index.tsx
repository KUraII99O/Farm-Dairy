import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EmployeeContext } from "../Provider";
import { Employee } from "../types";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../Pagination";
import { BsPencil } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import EmployeeDrawer from "../Drawer";

const EmployeeTable: React.FC = () => {
  const { employees, toggleStatus, deleteEmployee } =
    useContext(EmployeeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isDeleting, setIsDeleting] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredEmployees = employees.filter((employee) =>
    Object.values(employee).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedEmployees = sortBy
    ? filteredEmployees.sort((a, b) =>
        sortOrder === "asc"
          ? a[sortBy] > b[sortBy]
            ? 1
            : -1
          : a[sortBy] < b[sortBy]
          ? 1
          : -1
      )
    : filteredEmployees;

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployee = sortedEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

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
    if (window.confirm("Are you sure you want to delete this employee?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteEmployee(id);
      setIsDeleting(false);
    } catch (error) {
      setIsDeleting(false);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

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
            onClick={toggleDrawer}
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            {drawerOpen ? "X" : "Add New"} 
          </button>
        </div>
      </div>
      <EmployeeDrawer isOpen={drawerOpen} onClose={toggleDrawer} />
      <h1 className="text-xl font-bold mb-4">Employee Table</h1>
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
                Employee Name
                {sortIcon("name")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("PayDate")}
            >
              <div className="flex items-center">
                PayDate
                {sortIcon("PayDate")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("Month")}
            >
              <div className="flex items-center">
                Month
                {sortIcon("Month")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("Year")}
            >
              <div className="flex items-center">
                Year
                {sortIcon("Year")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("SalaryAmount")}
            >
              <div className="flex items-center">
                Salary Amount
                {sortIcon("SalaryAmount")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("AdditionAmount")}
            >
              <div className="flex items-center">
                Addition Amount
                {sortIcon("AdditionAmount")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center">Total</div>
            </th>
            <th className="border border-gray-300 px-4 py-2">Action</th>{" "}
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {currentEmployee.map((employee: Employee) => (
            <tr key={employee.id}>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={employee.image}
                  alt="Profile"
                  className="h-12 w-12 rounded-full"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {employee.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {employee.PayDate}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {employee.Month}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {employee.Year}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {employee.SalaryAmount}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {employee.AdditionAmount}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {parseInt(employee.SalaryAmount) +
                  parseInt(employee.AdditionAmount)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex items-center">
                  <Link
                    to={`/edit-employee/${employee.id}`}
                    className="text-blue-500 hover:underline flex items-center mr-2"
                  >
                    <BsPencil className="w-5 h-5 mr-1" />
                  </Link>
                  <button
                    onClick={() => handleDeleteConfirmation(employee.id)}
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
        totalItems={sortedEmployees.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default EmployeeTable;
