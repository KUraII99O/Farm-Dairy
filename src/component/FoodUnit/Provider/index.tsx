import React, { createContext, useState, useContext } from "react";

export const FoodUnitContext = createContext();

export const FoodUnitProvider = ({ children }) => {
  const [foodUnits, setFoodUnits] = useState([
    {
      id: 1,
      name: "Gram",
    },
    {
      id: 2,
      name: "KG",
    },
    // Add more food units as needed
  ]);

  const addFoodUnit = (newFoodUnit) => {
    const maxId = Math.max(...foodUnits.map((foodUnit) => foodUnit.id), 0);
    const newFoodUnitWithId = { ...newFoodUnit, id: maxId + 1 };
    setFoodUnits([...foodUnits, newFoodUnitWithId]);
  };

  const editFoodUnit = (id, updatedFoodUnit) => {
    setFoodUnits((prevFoodUnits) =>
      prevFoodUnits.map((foodUnit) => (foodUnit.id === id ? { ...foodUnit, ...updatedFoodUnit } : foodUnit))
    );
  };

  const deleteFoodUnit = (id) => {
    const updatedFoodUnits = foodUnits.filter((foodUnit) => foodUnit.id !== id);
    setFoodUnits(updatedFoodUnits);
  };

  const getFoodUnitById = (id) => {
    // Find and return the food unit with the given ID
    return foodUnits.find((foodUnit) => foodUnit.id === id);
  };

  const value = {
    foodUnits,
    addFoodUnit,
    editFoodUnit,
    deleteFoodUnit,
    getFoodUnitById,
  };

  return (
    <FoodUnitContext.Provider value={value}>
      {children}
    </FoodUnitContext.Provider>
  );
};

export const useFoodUnit = () => {
  const context = useContext(FoodUnitContext);
  if (!context) {
    throw new Error("useFoodUnit must be used within a FoodUnitProvider");
  }
  return context;
};
