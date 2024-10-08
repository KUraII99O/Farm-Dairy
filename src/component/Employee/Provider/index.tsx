import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Employee, EmployeeService } from "../EmployeeService";

export const ManageEmployeeContext = createContext<any>(null);

type ProviderProps = {
  children: ReactNode;
};

export const ManageEmployeeProvider: React.FC<ProviderProps> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
        console.log("User ID:", user.id); // Log user ID

        const data = await EmployeeService.fetchEmployees();
        console.log("Employee data:", data); // Log employee data
        setEmployees(data || []);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  const addEmployee = async (newEmployee: Omit<Employee, 'id'>) => {
    try {
      const data = await EmployeeService.addEmployee(newEmployee);
      setEmployees(prevEmployees => [...prevEmployees, data]);
      return null;
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const editEmployee = async (id: string, updatedEmployee: Omit<Employee, 'id'>) => {
    try {
      await EmployeeService.editEmployee(id, updatedEmployee);
      setEmployees(prevEmployees =>
        prevEmployees.map(employee => (employee.id === id ? { ...employee, ...updatedEmployee } : employee))
      );
    } catch (error) {
      console.error("Error editing employee:", error);
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      await EmployeeService.deleteEmployee(id);
      setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const value = {
    employees,
    addEmployee,
    editEmployee,
    deleteEmployee,
  };

  return (
    <ManageEmployeeContext.Provider value={value}>
      {children}
    </ManageEmployeeContext.Provider>
  );
};

export const useManageEmployee = () => {
  const context = useContext(ManageEmployeeContext);
  if (!context) {
    throw new Error("useManageEmployee must be used within a ManageEmployeeProvider");
  }
  return context;
};
