import React, { createContext, useState, useContext } from 'react';

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([
    { 
      id: 1, 
      name: 'dariues', 
      PayDate: '14/03/2023', 
      Month: 'January', 
      Year: '2023', 
      SalaryAmount: '4000', 
      AdditionAmount: '3000', 
      Total: 70000, 
      status: true, 
      image: 'path_to_image1', 
      presentAddress: 'test adress', 
      permanentAddress: 'same adress ', 
      basicSalary: 99877, 
      grossSalary: 87876, 
      nid: '675896754'
    },
    { 
      id: 2, 
      name: 'Briar', 
      PayDate: '14/06/2023', 
      Month: 'July', 
      Year: '2023', 
      SalaryAmount: '3000', 
      AdditionAmount: '2000', 
      Total: 50000, 
      status: true, 
      image: 'path_to_image1', 
      presentAddress: 'test adress', 
      permanentAddress: 'same adress ', 
      basicSalary: 99877, 
      grossSalary: 87876, 
      nid: '675896754'
    },
    { 
      id: 3, 
      name: 'Kayn', 
      PayDate: '20/03/2023', 
      Month: 'June', 
      Year: '2023', 
      SalaryAmount: '6000', 
      AdditionAmount: '1000', 
      Total: 7000, 
      status: true, 
      image: 'path_to_image1', 
      presentAddress: 'test adress', 
      permanentAddress: 'same adress ', 
      basicSalary: 99877, 
      grossSalary: 87876, 
      nid: '675896754'
    },
    
    // Add more mock data as needed
  ]);

  const addEmployee = (newEmployee) => {
    const maxId = Math.max(...employees.map(s => s.id), 0);
    const newEmployeeWithId = { ...newEmployee, id: maxId + 1 };
    setEmployees([...employees, newEmployeeWithId]);
  };

  const editEmployee = (id, updatedEmployee) => {
    const updatedEmployeeList = employees.map(item => (item.id === id ? { ...item, ...updatedEmployee } : item));
    setEmployees(updatedEmployeeList);
  };

  const deleteEmployee = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  const toggleStatus = (id) => {
    const updatedEmployees = employees.map((employee) => {
      if (employee.id === id) {
        return { ...employee, status: !employee.status };
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  };

  const value = {
    employees,
    addEmployee,
    editEmployee,
    deleteEmployee,
    toggleStatus,
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
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  return context;
};
