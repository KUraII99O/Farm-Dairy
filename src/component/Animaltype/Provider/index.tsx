import React, { createContext, useState, useContext } from "react";

export const ManageAnimalTypeContext = createContext();

export const ManageAnimalTypeProvider = ({ children }) => {
  const [animalTypes, setAnimalTypes] = useState([
    { id: 1, name: "Brahman" },
    { id: 2, name: "Friesian" },
    { id: 3, name: "Holstein" },
    { id: 4, name: "Holstein Friesian" },
    { id: 5, name: "Jersey" },
    { id: 6, name: "Mundi" },
    { id: 7, name: "Sahiwal" },
    { id: 8, name: "Sindi" },
  ]);

  const addAnimalType = (newAnimalType) => {
    const maxId = Math.max(...animalTypes.map((type) => type.id), 0);
    const newTypeWithId = { ...newAnimalType, id: maxId + 1 };
    setAnimalTypes([...animalTypes, newTypeWithId]);
  };

  const editAnimalType = (id, updatedAnimalType) => {
    setAnimalTypes((prevTypes) =>
      prevTypes.map((type) => (type.id === id ? { ...type, ...updatedAnimalType } : type))
    );
  };

  const deleteAnimalType = (id) => {
    const updatedTypes = animalTypes.filter((type) => type.id !== id);
    setAnimalTypes(updatedTypes);
  };

  const getAnimalTypeById = (id) => {
    // Find and return the animal type with the given ID
    return animalTypes.find((type) => type.id === id);
  };

  const value = {
    animalTypes,
    addAnimalType,
    editAnimalType,
    deleteAnimalType,
    getAnimalTypeById,
  };

  return (
    <ManageAnimalTypeContext.Provider value={value}>
      {children}
    </ManageAnimalTypeContext.Provider>
  );
};

export const useManageAnimalType = () => {
  const context = useContext(ManageAnimalTypeContext);
  if (!context) {
    throw new Error("useManageAnimalType must be used within a ManageAnimalTypeProvider");
  }
  return context;
};
