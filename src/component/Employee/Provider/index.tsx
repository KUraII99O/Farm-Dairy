import React, { createContext, useState, useContext, useEffect, useMemo, ReactNode } from "react";
import { toast } from "react-toastify";
import EmployeeService from "../EmployeeService";

// Define the Employee interface
export interface Employee {
  id: string;
  image: string;
  name: string;
  payDate: string; // Assuming payDate is a string representing a date
  month: string;
  year: number;
  salaryAmount: number;
  additionAmount: number;
  total: number;
}

// Define the context type
interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (newEmployee: Omit<Employee, "id">) => Promise<void>;
  editEmployee: (id: string, updatedEmployee: Employee) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
  toggleEmployeeStatus: (id: string) => Promise<Employee>;
}

export const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await EmployeeService.fetchEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employee data:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const addEmployee = async (newEmployee: Omit<Employee, "id">) => {
    try {
      const employee = await EmployeeService.addEmployee(newEmployee);
      setEmployees([...employees, employee]);
      toast.success("Employee added successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to add employee");
    }
  };

  const editEmployee = async (id: string, updatedEmployee: Employee) => {
    try {
      await EmployeeService.editEmployee(id, updatedEmployee);
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === id ? { ...employee, ...updatedEmployee } : employee
        )
      );
      toast.success("Employee updated successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to update employee");
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      await EmployeeService.deleteEmployee(id);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== id)
      );
      toast.success("Employee deleted successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to delete employee");
    }
  };

  const toggleEmployeeStatus = async (id: string) => {
    try {
      const updatedEmployee = await EmployeeService.toggleEmployeeStatus(id);
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === id ? { ...employee, status: !employee.status } : employee
        )
      );
      toast.success("Employee status updated successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to toggle employee status");
    }
  };

  const value = useMemo(() => ({
    employees,
    addEmployee,
    editEmployee,
    deleteEmployee,
    toggleEmployeeStatus,
  }), [employees]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployee must be used within an EmployeeProvider");
  }
  return context;
};
