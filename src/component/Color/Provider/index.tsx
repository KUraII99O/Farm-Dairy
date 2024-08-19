import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Color, ColorService } from "../ColorService";

interface ManageColorContextType {
  colors: Color[];
  addColor: (newColor: Omit<Color, 'id'>) => Promise<void>;
  editColor: (id: string, updatedColor: Omit<Color, 'id'>) => Promise<void>;
  deleteColor: (id: string) => Promise<void>;
}

export const ManageColorContext = createContext<ManageColorContextType | undefined>(undefined);

export const ManageColorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => {
    const fetchColorData = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
        console.log("User ID:", user.id); // Log user ID

        const data = await ColorService.fetchColors();
        console.log("Color data:", data); // Log color data
        setColors(data || []);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    fetchColorData();
  }, []);

  const addColor = async (newColor: Omit<Color, 'id'>) => {
    try {
      const data = await ColorService.addColor(newColor);
      setColors(prevColors => [...prevColors, data]);
    } catch (error) {
      console.error("Error adding color:", error);
    }
  };

  const editColor = async (id: string, updatedColor: Omit<Color, 'id'>) => {
    try {
      await ColorService.editColor(id, updatedColor);
      setColors(prevColors =>
        prevColors.map(color => (color.id === id ? { ...color, ...updatedColor } : color))
      );
    } catch (error) {
      console.error("Error editing color:", error);
    }
  };

  const deleteColor = async (id: string) => {
    try {
      await ColorService.deleteColor(id);
      setColors(prevColors => prevColors.filter(color => color.id !== id));
    } catch (error) {
      console.error("Error deleting color:", error);
    }
  };

  const value = {
    colors,
    addColor,
    editColor,
    deleteColor,
  };

  return (
    <ManageColorContext.Provider value={value}>
      {children}
    </ManageColorContext.Provider>
  );
};

export const useManageColor = () => {
  const context = useContext(ManageColorContext);
  if (!context) {
    throw new Error("useManageColor must be used within a ManageColorProvider");
  }
  return context;
};
