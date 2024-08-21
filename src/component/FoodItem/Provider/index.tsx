import React, { createContext, useState, useEffect, useContext } from "react";
import { FoodItem, FoodItemService } from "../FoodItemService"; // Updated import

interface ManageFoodItemContextProps {
  foodItems: FoodItem[];
  addFoodItem: (newFoodItem: Omit<FoodItem, 'id'>) => Promise<void>;
  editFoodItem: (id: string, updatedFoodItem: Partial<Omit<FoodItem, 'id'>>) => Promise<void>;
  deleteFoodItem: (id: string) => Promise<void>;
}

interface ManageFoodItemProviderProps {
  children: React.ReactNode;
}

export const ManageFoodItemContext = createContext<ManageFoodItemContextProps | null>(null);

export const ManageFoodItemProvider: React.FC<ManageFoodItemProviderProps> = ({ children }) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    const fetchFoodItemData = async () => {
      try {
        const data = await FoodItemService.fetchFoodItems();
        setFoodItems(data || []);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItemData();
  }, []);

  const addFoodItem = async (newFoodItem: Omit<FoodItem, 'id'>) => {
    try {
      const data = await FoodItemService.addFoodItem(newFoodItem);
      setFoodItems(prevFoodItems => [...prevFoodItems, data]);
    } catch (error) {
      console.error("Error adding food item:", (error as Error).message);
    }
  };

  const editFoodItem = async (id: string, updatedFoodItem: Partial<Omit<FoodItem, 'id'>>) => {
    try {
      const existingFoodItem = foodItems.find(foodItem => foodItem.id === id);
      if (!existingFoodItem) {
        throw new Error("Food item not found");
      }

      const mergedFoodItem = { ...existingFoodItem, ...updatedFoodItem };
      await FoodItemService.editFoodItem(id, mergedFoodItem);
      setFoodItems(prevFoodItems =>
        prevFoodItems.map(foodItem =>
          foodItem.id === id ? mergedFoodItem : foodItem
        )
      );
    } catch (error) {
      console.error("Error editing food item:", (error as Error).message);
    }
  };

  const deleteFoodItem = async (id: string) => {
    try {
      await FoodItemService.deleteFoodItem(id);
      setFoodItems(prevFoodItems => prevFoodItems.filter(foodItem => foodItem.id !== id));
    } catch (error) {
      console.error("Error deleting food item:", (error as Error).message);
    }
  };

  const value: ManageFoodItemContextProps = {
    foodItems,
    addFoodItem,
    editFoodItem,
    deleteFoodItem
  };

  return (
    <ManageFoodItemContext.Provider value={value}>
      {children}
    </ManageFoodItemContext.Provider>
  );
};

export const useFoodItem = () => {
  const context = useContext(ManageFoodItemContext);
  if (!context) {
    throw new Error("useFoodItem must be used within a ManageFoodItemProvider");
  }
  return context;
};
