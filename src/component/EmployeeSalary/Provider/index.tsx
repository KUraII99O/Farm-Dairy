import React, { createContext, useContext, useState, ReactNode } from "react";

export interface EmployeeSalary {
    id: number;
    employeeName: string;
    payDate: string;
    month: string;
    monthlySalary: string;
    year: number;
    salaryAmount: number;
    additionMoney: number;
    image: string;
    note: string;
  }
  
interface EmployeeSalaryContextType {
  employeeSalarys: EmployeeSalary[];

  addEmployeeSalary: (EmployeeSalary: EmployeeSalary) => void;
}

const EmployeeSalaryContext = createContext<EmployeeSalaryContextType | undefined>(undefined);

export const useEmployeeSalaryContext = () => {
  const context = useContext(EmployeeSalaryContext);
  if (!context) {
    throw new Error('useEmployeeSalaryContext must be used within an EmployeeSalaryProvider');
  }
  return context;
};

interface ProviderProps {
  children: ReactNode;
}
export const EmployeeSalaryProvider: React.FC<ProviderProps> = ({ children}) => {
  const [employeeSalarys, setEmployeeSalarys] = useState<EmployeeSalary[]>([
    {
      id: 1,
      employeeName: "Doe",
      payDate: "2024-02-10",
      monthlySalary: "January",
      year: 2024,
      salaryAmount: 1115476,
      additionMoney: 4896,
      image: "/path/to/image1.jpg",
      note: ""
    }
  ]);

  const addEmployeeSalary = (EmployeeSalary: EmployeeSalary) => {
    setEmployeeSalarys((prevEmployeeSalarys) => [...prevEmployeeSalarys, EmployeeSalary]);
  };

  return (
    <EmployeeSalaryContext.Provider value={{ employeeSalarys, addEmployeeSalary }}>
      {children}
    </EmployeeSalaryContext.Provider>
  );
};