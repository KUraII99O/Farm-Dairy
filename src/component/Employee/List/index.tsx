import React, { useState, useContext, useEffect } from "react";
import { ManageEmployeeContext } from "../Provider"; // Update context for employees
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import EditEmployeeForm from "../Form"; // Update form component for employees
import { useTranslation } from "../../Translator/Provider";
import { Drawer, Button } from "flowbite-react";
import EmployeeTable from "../Table"; // Update table component for employees
import { Employee } from "../EmployeeService"; // Update to Employee interface

const EmployeeList: React.FC = () => {
  const { employees, deleteEmployee, addEmployee, editEmployee, } =
    useContext(ManageEmployeeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { translate, language } = useTranslation();

  const handleDeleteConfirmation = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await handleDelete(id);
    }
  };

  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";

  const handleDelete = async (id: string) => {
    try {
      await deleteEmployee(id);
      toast.success("Employee deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting the employee.");
    }
  };

  const handleCloseDrawer = () => {
    setIsEditDrawerOpen(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const drawer = document.querySelector(".Drawer") as HTMLElement;

    if (drawer && !drawer.contains(target)) {
      handleCloseDrawer();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
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

  const handleEditDrawerOpen = (employee: Employee | null) => {
    setSelectedEmployee(employee);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewEmployee = async (newEmployeeData: Employee) => {
    try {
      await addEmployee(newEmployeeData);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New employee added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new employee.");
    }
  };

  const handleUpdateEmployee = async (updatedEmployeeData: Employee) => {
    try {
      if (selectedEmployee) {
        await editEmployee(selectedEmployee.id, updatedEmployeeData);
        setIsEditDrawerOpen(false); // Close the drawer after updating
        toast.success("Employee updated successfully!");
      } else {
        toast.error("No employee selected for updating.");
      }
    } catch (error) {
      toast.error("An error occurred while updating employee.");
    }
  };

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const sortedEmployees = sortBy
    ? currentEmployees.slice().sort((a: Employee, b: Employee) => {
        const aValue = a[sortBy as keyof Employee] ?? "";
        const bValue = b[sortBy as keyof Employee] ?? "";
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : currentEmployees;

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
          <Button
            onClick={() => handleEditDrawerOpen(null)}
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            {translate("addNew")}
          </Button>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">
        <BiListUl
          className="inline-block mr-2 ml-2"
          style={{ fontSize: "1.5em" }}
        />
        {translate("employeelist")} {/* Update title for employees */}
      </h1>
      <EmployeeTable // Update to EmployeeTable
        sortedEmployees={sortedEmployees}
        handleSort={handleSort}
        sortIcon={sortIcon}
        handleEditDrawerOpen={handleEditDrawerOpen}
        handleDeleteConfirmation={handleDeleteConfirmation}
        translate={translate}
        formClass={formClass}
      />
      <Drawer
        open={isEditDrawerOpen}
        onClose={handleCloseDrawer}
        className="EditEmployeeDrawer"
        position="right" // Set the position to "right"
      >
        <Drawer.Header title="Drawer" />
        <Drawer.Items>
          <EditEmployeeForm // Update to EditEmployeeForm
            employee={selectedEmployee}
            onSubmit={selectedEmployee ? handleUpdateEmployee : handleAddNewEmployee}
          />
        </Drawer.Items>
      </Drawer>

      <Pagination
        totalItems={employees.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        itemsPerPage={0}
        currentPage={0}
        setCurrentPage={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <ToastContainer />
    </div>
  );
};

export default EmployeeList; // Update export to EmployeeList
