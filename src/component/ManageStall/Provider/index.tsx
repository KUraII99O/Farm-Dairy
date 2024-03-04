import React, { createContext, useState, useContext } from "react";

export const ManageStallContext = createContext();

export const ManageStallProvider = ({ children }) => {
  const [stalls, setStalls] = useState([
    {
      id: 1,
      stallNumber: "A1",
      status: "Occupied",
      details: "Cow: 3, Horse: 2",
    },
    {
      id: 2,
      stallNumber: "B2",
      status: "Vacant",
      details: "Available for new cow",
    },
    {
      id: 3,
      stallNumber: "C3",
      status: "Occupied",
      details: "Cow: 1, Bull: 1",
    },
    // Add more stalls as needed
  ]);

  const addStall = (newStall) => {
    const maxId = Math.max(...stalls.map((stall) => stall.id), 0);
    const newStallWithId = { ...newStall, id: maxId + 1 };
    setStalls([...stalls, newStallWithId]);
  };

  const editStall = (id, updatedStall) => {
    setStalls((prevStalls) =>
      prevStalls.map((stall) => (stall.id === id ? { ...stall, ...updatedStall } : stall))
    );
  };

  const deleteStall = (id) => {
    const updatedStalls = stalls.filter((stall) => stall.id !== id);
    setStalls(updatedStalls);
  };

  const getStallById = (id) => {
    // Find and return the stall with the given ID
    return stalls.find((stall) => stall.id === id);
  };

  const value = {
    stalls,
    addStall,
    editStall,
    deleteStall,
    getStallById,
  };

  return (
    <ManageStallContext.Provider value={value}>
      {children}
    </ManageStallContext.Provider>
  );
};

export const useManageStall = () => {
  const context = useContext(ManageStallContext);
  if (!context) {
    throw new Error("useManageStall must be used within a ManageStallProvider");
  }
  return context;
};
