import React, { createContext, useState, useEffect, useContext } from "react";
import { ExpensePurpose, ExpensePurposeService } from "../ExpensePurposeService";

export const ExpensePurposeContext = createContext<any>(null);

export const ExpensePurposeProvider = ({ children }) => {
  const [expensePurposes, setExpensePurposes] = useState<ExpensePurpose[]>([]);

 
  useEffect(() => {
    const fetchExpensePurposesData = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
        console.log("User ID:", user.id); // Log user ID
  
        const data = await ExpensePurposeService.fetchExpensePurposes();
        console.log("Staff data:", data); // Log staff data
        setExpensePurposes(data || []);
      } catch (error) {
        console.error("Error fetching Expense Purposes:", error);
      }
    };
  
    fetchExpensePurposesData();
  }, []);

  const addExpensePurpose = async (newExpensePurpose: Omit<ExpensePurpose, 'id'>) => {
    try {
      const data = await ExpensePurposeService.addExpensePurpose(newExpensePurpose);
      setExpensePurposes(prevExpensePurposes => [...prevExpensePurposes, data]);
    } catch (error) {
      console.error("Error adding expense purpose:", (error as Error).message);
    }
  };

  const editExpensePurpose = async (id: string, updatedExpensePurpose: Omit<ExpensePurpose, 'id' | 'userId'>) => {
    try {
      await ExpensePurposeService.editExpensePurpose(id, updatedExpensePurpose);
      setExpensePurposes(prevExpensePurposes =>
        prevExpensePurposes.map(expensePurpose =>
          expensePurpose.id === id ? { ...expensePurpose, ...updatedExpensePurpose } : expensePurpose
        )
      );
    } catch (error) {
      console.error("Error editing expense purpose:", (error as Error).message);
    }
  };

  const deleteExpensePurpose = async (id: string) => {
    try {
      await ExpensePurposeService.deleteExpensePurpose(id);
      setExpensePurposes(prevExpensePurposes => prevExpensePurposes.filter(expensePurpose => expensePurpose.id !== id));
    } catch (error) {
      console.error("Error deleting expense purpose:", (error as Error).message);
    }
  };

  const value = {
    expensePurposes,
    addExpensePurpose,
    editExpensePurpose,
    deleteExpensePurpose
  };

  return (
    <ExpensePurposeContext.Provider value={value}>
      {children}
    </ExpensePurposeContext.Provider>
  );
};

export const useExpensePurpose = () => {
  const context = useContext(ExpensePurposeContext);
  if (!context) {
    throw new Error("useExpensePurpose must be used within an ExpensePurposeProvider");
  }
  return context;
};
