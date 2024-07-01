import React, { createContext, useState, useEffect, useContext } from "react";
import { Expense, ExpenseService } from "../FarmExpenseService";

export const ExpenseContext = createContext<any>(null);

export const ExpenseProvider: React.FC = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchExpensesData = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
        console.log("User ID:", user.id); // Log user ID
  
        const data = await ExpenseService.fetchExpenses();
        console.log("Expenses data:", data); // Log expenses data
        setExpenses(data || []);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
  
    fetchExpensesData();
  }, []);

  const addExpense = async (newExpense: Omit<Expense, 'id'>) => {
    console.log("Adding expense:", newExpense);
    try {
      const data = await ExpenseService.addExpense(newExpense);
      console.log("Expense added successfully:", data);
      setExpenses(prevExpenses => [...prevExpenses, data]);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const editExpense = async (id: string, updatedExpense: Omit<Expense, 'id'>) => {
    try {
      await ExpenseService.editExpense(id, updatedExpense);
      setExpenses(prevExpenses =>
        prevExpenses.map(expense => (expense.id === id ? { ...expense, ...updatedExpense } : expense))
      );
    } catch (error) {
      console.error("Error editing expense:", error);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await ExpenseService.deleteExpense(id);
      setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };


  const value = {
    expenses,
    addExpense,
    editExpense,
    deleteExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useManageExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useManageExpenses must be used within a ManageExpensesProvider");
  }
  return context;
};
