import React, { createContext, useState, useContext } from "react";

export const SupplierContext = createContext();

export const SupplierProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "John Doe",
      companyName: "ABC Enterprises",
      phoneNumber: "+1234567890",
      email: "john.doe@example.com",
      image: "path_to_image1.jpg", // Provide the path to the image
    },
    {
      id: 2,
      name: "Jane Smith",
      companyName: "XYZ Corporation",
      phoneNumber: "+1987654321",
      email: "jane.smith@example.com",
      image: "path_to_image2.jpg", // Provide the path to the image
    },
    // Add more suppliers as needed
  ]);

  const addSupplier = (newSupplier) => {
    const maxId = Math.max(...suppliers.map((supplier) => supplier.id), 0);
    const newSupplierWithId = { ...newSupplier, id: maxId + 1 };
    setSuppliers([...suppliers, newSupplierWithId]);
  };

  const editSupplier = (id, updatedSupplier) => {
    setSuppliers((prevSuppliers) =>
      prevSuppliers.map((supplier) => (supplier.id === id ? { ...supplier, ...updatedSupplier } : supplier))
    );
  };

  const deleteSupplier = (id) => {
    const updatedSuppliers = suppliers.filter((supplier) => supplier.id !== id);
    setSuppliers(updatedSuppliers);
  };

  const getSupplierById = (id) => {
    // Find and return the supplier with the given ID
    return suppliers.find((supplier) => supplier.id === id);
  };

  const value = {
    suppliers,
    addSupplier,
    editSupplier,
    deleteSupplier,
    getSupplierById,
  };

  return (
    <SupplierContext.Provider value={value}>
      {children}
    </SupplierContext.Provider>
  );
};

export const useSupplier = () => {
  const context = useContext(SupplierContext);
  if (!context) {
    throw new Error("useSupplier must be used within a SupplierProvider");
  }
  return context;
};
