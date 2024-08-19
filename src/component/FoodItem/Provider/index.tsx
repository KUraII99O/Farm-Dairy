import React, { createContext, useState, useContext } from "react";

export const FoodItemContext = createContext();

export const FoodItemProvider = ({ children }) => {
  const [foodItems, setFoodItems] = useState([
    {
      id: 1,
      name: "Grass",
    },
    {
      id: 2,
      name: "Water",
    },
    {
      id: 3,
      name: "Salt",
    },
    // Add more food items as needed
  ]);

  const addFoodItem = (newFoodItem) => {
    const maxId = Math.max(...foodItems.map((foodItem) => foodItem.id), 0);
    const newFoodItemWithId = { ...newFoodItem, id: maxId + 1 };
    setFoodItems([...foodItems, newFoodItemWithId]);
  };

  const editFoodItem = (id, updatedFoodItem) => {
    setFoodItems((prevFoodItems) =>
      prevFoodItems.map((foodItem) => (foodItem.id === id ? { ...foodItem, ...updatedFoodItem } : foodItem))
    );
  };

  const deleteFoodItem = (id) => {
    const updatedFoodItems = foodItems.filter((foodItem) => foodItem.id !== id);
    setFoodItems(updatedFoodItems);
  };

  const getFoodItemById = (id) => {
    // Find and return the food item with the given ID
    return foodItems.find((foodItem) => foodItem.id === id);
  };

  const value = {
    foodItems,
    addFoodItem,
    editFoodItem,
    deleteFoodItem,
    getFoodItemById,
  };

  return (
    <FoodItemContext.Provider value={value}>
      {children}
    </FoodItemContext.Provider>
  );
};

export const useFoodItem = () => {
  const context = useContext(FoodItemContext);
  if (!context) {
    throw new Error("useFoodItem must be used within a FoodItemProvider");
  }
  return context;
};
