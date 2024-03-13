import React, { createContext, useState, useContext } from "react";

export const ManageDesignationContext = createContext();

export const ManageDesignationProvider = ({ children }) => {
  const [designations, setDesignations] = useState([
    {
      id: 1,
      name: "Manager",
    },
    {
      id: 2,
      name: "Developer",
    },
    {
      id: 3,
      name: "Designer",
    },
    // Add more designations as needed
  ]);

  const addDesignation = (newDesignation) => {
    const maxId = Math.max(...designations.map((designation) => designation.id), 0);
    const newDesignationWithId = { ...newDesignation, id: maxId + 1 };
    setDesignations([...designations, newDesignationWithId]);
  };

  const editDesignation = (id, updatedDesignation) => {
    setDesignations((prevDesignations) =>
      prevDesignations.map((designation) => (designation.id === id ? { ...designation, ...updatedDesignation } : designation))
    );
  };

  const deleteDesignation = (id) => {
    const updatedDesignations = designations.filter((designation) => designation.id !== id);
    setDesignations(updatedDesignations);
  };

  const getDesignationById = (id) => {
    // Find and return the designation with the given ID
    return designations.find((designation) => designation.id === id);
  };

  const value = {
    designations,
    addDesignation,
    editDesignation,
    deleteDesignation,
    getDesignationById,
  };

  return (
    <ManageDesignationContext.Provider value={value}>
      {children}
    </ManageDesignationContext.Provider>
  );
};

export const useManageDesignation = () => {
  const context = useContext(ManageDesignationContext);
  if (!context) {
    throw new Error("useManageDesignation must be used within a ManageDesignationProvider");
  }
  return context;
};
