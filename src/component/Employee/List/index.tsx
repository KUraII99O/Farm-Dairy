import React, { useState, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import EditEmployeeForm from "../Form";
import { toast } from "react-toastify";
import { useTranslation } from "../../Translator/Provider";
import { ManageEmployeeContext } from "../Provider";
import EmployeeList from "../Table";
import { Drawer } from "flowbite-react";
import { Employee } from "../EmployeeService";


const EmployeeTable: React.FC = () => {
  const { employees, deleteEmployee, addEmployee, editEmployee } = useContext(
    ManageEmployeeContext
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const { translate, language } = useTranslation();
  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";

  const filteredEmployees = employees.filter((employee: Employee) =>
    Object.values(employee).some((field) => {
      if (
        typeof field === "string" ||
        typeof field === "number" ||
        typeof field === "boolean"
      ) {
        return field
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
      return false;
    })
  );
  const sortedEmployees = sortBy
    ? filteredEmployees.sort((a: Employee, b: Employee) =>
        sortOrder === "asc"
          ? a[sortBy as keyof Employee] > b[sortBy as keyof Employee]
            ? 1
            : -1
          : a[sortBy as keyof Employee] < b[sortBy as keyof Employee]
          ? 1
          : -1
      )
    : filteredEmployees;

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

  const handleDeleteConfirmation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEmployee(id);
      toast.success("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee: ", error);
      toast.error("An error occurred while deleting employee.");
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
      if (selectedEmployee)
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

  const handleEditDrawerOpen = (employee: Employee | null) => {
    setSelectedEmployee(employee);
    setIsEditDrawerOpen(true);
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
          <button
            onClick={() => handleEditDrawerOpen(null)}
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            {translate("addemployee")}
          </button>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">{translate("employeeTable")}</h1>
      <div className="rtl:mirror-x">
        <EmployeeList
          currentEmployees={sortedEmployees}
          handleSort={handleSort}
          sortIcon={sortIcon}
          handleEditDrawerOpen={handleEditDrawerOpen}
          handleDeleteConfirmation={handleDeleteConfirmation}
          translate={translate}
          formClass={formClass}
          itemsPerPage={0}
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
              employee={selectedEmployee ?? undefined} // Pass undefined if selectedEmployee is null
              onSubmit={
                selectedEmployee ? handleUpdateEmployee : handleAddNewEmployee
              }
            />
          </Drawer.Items>
        </Drawer>

        <ToastContainer />
      </div>
    </div>
  );
};

export default EmployeeTable;
