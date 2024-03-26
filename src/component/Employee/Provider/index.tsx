import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

 interface Employee {
  id: number;
  image: string;
  name: string;
  payDate: string; // Assuming payDate is a string representing a date
  month: string;
  year: number;
  salaryAmount: number;
  additionAmount: number;
  total: number;
}

export const EmployeeContext = createContext<any>(null);

export const EmployeeProvider: React.FC = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:3000/employees");
        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employee data:", error.message);
      }
    };

    fetchEmployees();
  }, []);

  const addEmployee = async (newEmployee: Omit<Employee, "id">) => {
    try {
      const id = employees.length + 1;
      const employeeWithId: Employee = { id, ...newEmployee };

      const response = await fetch("http://localhost:3000/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeWithId),
      });

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      setEmployees([...employees, employeeWithId]);
      toast.success("Employee added successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to add employee");
    }
  };

  const editEmployee = async (id: number, updatedEmployee: Employee) => {
    try {
      const response = await fetch(`http://localhost:3000/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployee),
      });

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

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

  const deleteEmployee = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/employees/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== id)
      );

      toast.success("Employee deleted successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to delete employee");
    }
  };

  const value = {
    employees,
    addEmployee,
    editEmployee,
    deleteEmployee,
  };

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
