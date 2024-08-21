import React, { createContext, useState, useEffect, useContext } from "react";
import { FoodUnit, FoodUnitService } from "../FoodUnitService"; // Updated import

interface ManageFoodUnitContextProps {
  foodUnits: FoodUnit[];
  addFoodUnit: (newFoodUnit: Omit<FoodUnit, 'id'>) => Promise<void>;
  editFoodUnit: (id: string, updatedFoodUnit: Partial<Omit<FoodUnit, 'id'>>) => Promise<void>;
  deleteFoodUnit: (id: string) => Promise<void>;
}

interface ManageFoodUnitProviderProps {
  children: React.ReactNode;
}

export const ManageFoodUnitContext = createContext<ManageFoodUnitContextProps | null>(null);

export const ManageFoodUnitProvider: React.FC<ManageFoodUnitProviderProps> = ({ children }) => {
  const [foodUnits, setFoodUnits] = useState<FoodUnit[]>([]);

  useEffect(() => {
    const fetchFoodUnitData = async () => {
      try {
        const data = await FoodUnitService.fetchFoodUnits();
        setFoodUnits(data || []);
      } catch (error) {
        console.error("Error fetching food units:", error);
      }
    };

    fetchFoodUnitData();
  }, []);

  const addFoodUnit = async (newFoodUnit: Omit<FoodUnit, 'id'>) => {
    try {
      const data = await FoodUnitService.addFoodUnit(newFoodUnit);
      setFoodUnits(prevFoodUnits => [...prevFoodUnits, data]);
    } catch (error) {
      console.error("Error adding food unit:", (error as Error).message);
    }
  };

  const editFoodUnit = async (id: string, updatedFoodUnit: Partial<Omit<FoodUnit, 'id'>>) => {
    try {
      const existingFoodUnit = foodUnits.find(foodUnit => foodUnit.id === id);
      if (!existingFoodUnit) {
        throw new Error("Food unit not found");
      }

      const mergedFoodUnit = { ...existingFoodUnit, ...updatedFoodUnit };
      await FoodUnitService.editFoodUnit(id, mergedFoodUnit);
      setFoodUnits(prevFoodUnits =>
        prevFoodUnits.map(foodUnit =>
          foodUnit.id === id ? mergedFoodUnit : foodUnit
        )
      );
    } catch (error) {
      console.error("Error editing food unit:", (error as Error).message);
    }
  };

  const deleteFoodUnit = async (id: string) => {
    try {
      await FoodUnitService.deleteFoodUnit(id);
      setFoodUnits(prevFoodUnits => prevFoodUnits.filter(foodUnit => foodUnit.id !== id));
    } catch (error) {
      console.error("Error deleting food unit:", (error as Error).message);
    }
  };

  const value: ManageFoodUnitContextProps = {
    foodUnits,
    addFoodUnit,
    editFoodUnit,
    deleteFoodUnit
  };

  return (
    <ManageFoodUnitContext.Provider value={value}>
      {children}
    </ManageFoodUnitContext.Provider>
  );
};

export const useFoodUnit = () => {
  const context = useContext(ManageFoodUnitContext);
  if (!context) {
    throw new Error("useFoodUnit must be used within a ManageFoodUnitProvider");
  }
  return context;
};
