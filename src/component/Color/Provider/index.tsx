import React, { createContext, useState, useContext } from "react";

export const ManageColorContext = createContext();

export const ManageColorProvider = ({ children }) => {
  const [colors, setColors] = useState([
    {
      id: 1,
      name: "Black",
    },
    {
      id: 2,
      name: "Black & White",
    },
    {
      id: 3,
      name: "Mixed",
    },
    {
      id: 4,
      name: "Red",
    },
    {
      id: 5,
      name: "Red & Black",
    },
    {
      id: 6,
      name: "White",
    },
  ]);

  const addColor = (newColor) => {
    const maxId = Math.max(...colors.map((color) => color.id), 0);
    const newColorWithId = { ...newColor, id: maxId + 1 };
    setColors([...colors, newColorWithId]);
  };

  const editColor = (id, updatedColor) => {
    setColors((prevColors) =>
      prevColors.map((color) => (color.id === id ? { ...color, ...updatedColor } : color))
    );
  };

  const deleteColor = (id) => {
    const updatedColors = colors.filter((color) => color.id !== id);
    setColors(updatedColors);
  };

  const getColorById = (id) => {
    // Find and return the color with the given ID
    return colors.find((color) => color.id === id);
  };

  const value = {
    colors,
    addColor,
    editColor,
    deleteColor,
    getColorById,
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
