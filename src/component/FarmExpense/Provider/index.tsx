import React, { createContext, useState, useContext } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      date: "2024-03-01",
      purposeName: "Seeds",
      details: "Purchased seeds for spring planting",
      totalAmount: 200, // Make sure totalAmount is included
      addedBy: "John Doe",
    },
    {
      id: 2,
      date: "2024-03-05",
      purposeName: "Equipment Maintenance",
      details: "Serviced tractor and other farm equipment",
      totalAmount: 150, // Example amount in dollars
      addedBy: "Jane Smith",
    },
    // Add more expenses as needed
  ]);

  const addExpense = (newExpense) => {
    const maxId = Math.max(...expenses.map((expense) => expense.id), 0);
    const newExpenseWithId = { ...newExpense, id: maxId + 1 };
    setExpenses([...expenses, newExpenseWithId]);
  };

  const editExpense = (id, updatedExpense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === id ? { ...expense, ...updatedExpense } : expense
      )
    );
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  const getExpenseById = (id) => {
    // Find and return the expense with the given ID
    return expenses.find((expense) => expense.id === id);
  };

  const value = {
    expenses,
    addExpense,
    editExpense,
    deleteExpense,
    getExpenseById,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }
  return context;
};
