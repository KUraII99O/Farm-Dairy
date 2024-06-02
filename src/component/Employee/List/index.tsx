import React, { useState, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Employee } from "../types";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../Pagination";
import { BsPencil } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import EditEmployeeForm from "../Form";
import { toast } from "react-toastify";
import { useTranslation } from "../../Translator/Provider";
import { ManageEmployeeContext } from "../Provider";
import EmployeeList from "../Table";
import { Drawer, Button } from "flowbite-react";

const EmployeeTable: React.FC = () => {
  const { employees, deleteEmployee, addEmployee, editEmployee } = useContext(
    ManageEmployeeContext
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const { translate, language } = useTranslation();
  const isArabic = language === "ar";

  const formClass = isArabic ? "rtl" : "ltr";

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
    try {
      await deleteEmployee(id);
    } catch (error) {
      console.error("Error deleting employee: ", error);
    }
  };

  const handleAddNewEmployee = async (newEmployeeData: any) => {
    try {
      await addEmployee(newEmployeeData);
      setIsEditDrawerOpen(false);
      toast.success("New Employee added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new Employee.");
    }
  };

  const handleUpdateEmployee = async (updatedEmployeeData: any) => {
    try {
      await editEmployee(selectedEmployee.id, updatedEmployeeData);
      setIsEditDrawerOpen(false);
      toast.success("Employee updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating Employee.");
    }
  };

  const handleCloseEditDrawer = () => {
    setIsEditDrawerOpen(false);
    setSelectedEmployee(null);
  };
  const handleEditDrawerOpen = (employee: any) => {
    setSelectedEmployee(employee);
    setIsEditDrawerOpen(true);
  };

  return (
    <div>
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
            <button
              onClick={() => handleEditDrawerOpen(null)}
              className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
            >
              {translate("addemployee")}
            </button>
          </div>
        </div>
        <h1 className="text-xl font-bold mb-4">{translate("employeeTable")}</h1>{" "}
        <div className="rtl:mirror-x">
          <EmployeeList
            currentEmployees={currentEmployee}
            handleSort={handleSort}
            sortIcon={sortIcon}
            handleEditDrawerOpen={handleEditDrawerOpen}

            handleDeleteConfirmation={handleDeleteConfirmation}
            translate={translate}
            formClass={formClass}
          />

          <Drawer
            open={isEditDrawerOpen}
            onClose={handleCloseEditDrawer}
            className="EditStallDrawer"
            position="right" // Set the position to "right"
          >
            <Drawer.Header title="Drawer" />
            <Drawer.Items>
              <EditEmployeeForm
                employee={selectedEmployee}
                onSubmit={
                  selectedEmployee ? handleUpdateEmployee : handleAddNewEmployee
                }
              />
            </Drawer.Items>
          </Drawer>

          {/* Pagination */}
          <Pagination
            totalItems={sortedEmployees.length}
            defaultItemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
          {/* Toast container for notifications */}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
