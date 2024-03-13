import React, { createContext, useState, useContext } from "react";

export const ExpensePurposeContext = createContext();

export const ExpensePurposeProvider = ({ children }) => {
  const [expensePurposes, setExpensePurposes] = useState([
    {
      id: 1,
      name: "Bucket",
    },
    // Add more purposes as needed
    {
      id: 2,
      name: "Share Profit",
    },
    {
      id: 3,
      name: "Office Rent",
    },
    {
      id: 4,
      name: "Materials",
    },
    {
      id: 5,
      name: "Paper",
    },
    {
      id: 6,
      name: "Snacks",
    },
  ]);

  const addExpensePurpose = (newPurpose) => {
    const maxId = Math.max(...expensePurposes.map((purpose) => purpose.id), 0);
    const newPurposeWithId = { ...newPurpose, id: maxId + 1 };
    setExpensePurposes([...expensePurposes, newPurposeWithId]);
  };

  const editExpensePurpose = (id, updatedPurpose) => {
    setExpensePurposes((prevPurposes) =>
      prevPurposes.map((purpose) => (purpose.id === id ? { ...purpose, ...updatedPurpose } : purpose))
    );
  };

  const deleteExpensePurpose = (id) => {
    const updatedPurposes = expensePurposes.filter((purpose) => purpose.id !== id);
    setExpensePurposes(updatedPurposes);
  };

  const getPurposeById = (id) => {
    // Find and return the purpose with the given ID
    return expensePurposes.find((purpose) => purpose.id === id);
  };

  const value = {
    expensePurposes,
    addExpensePurpose,
    editExpensePurpose,
    deleteExpensePurpose,
    getPurposeById,
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
