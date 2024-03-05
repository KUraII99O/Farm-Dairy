import React, { createContext, useState, useContext } from "react";

export const ManageCowCalfContext = createContext();

export const ManageCowCalfProvider = ({ children }) => {
  const [cowCalves, setCowCalves] = useState([
    {
        id: 1,
        image: "calf1.jpg",
        gender: "Female",
        animalType: "Dairy",
        buyDate: "2024-01-01",
        buyingPrice: "50",
        motherID: "10",
        animalStatus: "Active",
        informations: {
          stallNo: "C3",
          dateOfBirth: "2023-07-10",
          animalAgeDays: 230,
          weight: 100,
          height: 30,
          color: "Black",
          buyFrom: "Farm PQR",
          prevVaccineDone: "Yes",
          note: "This calf is currently resting due to health issues",
          createdBy: "Michael Smith",
        },
      },
      {
        id: 2,
        image: "calf2.jpg",
        gender: "Male",
        animalType: "Beef",
        buyDate: "2024-01-02",
        buyingPrice: "60",
        motherID: "0",
        animalStatus: "Active",
        informations: {
          stallNo: "A1",
          dateOfBirth: "2023-05-15",
          animalAgeDays: 300,
          weight: 120,
          height: 35,
          color: "Brown",
          buyFrom: "Farm XYZ",
          prevVaccineDone: "Yes",
          note: "This calf is ready for sale",
          createdBy: "Jessica Johnson",
        },
      },
    // Add more calf details as needed
  ]);

  const addCalf = (newCalf) => {
    const maxId = Math.max(...cowCalves.map((calf) => calf.id), 0);
    const newCalfWithId = { ...newCalf, id: maxId + 1 };
    setCowCalves([...cowCalves, newCalfWithId]);
  };

  const editCalf = (id, updatedCalf) => {
    const updatedCalfList = cowCalves.map((item) =>
      item.id === id ? { ...item, ...updatedCalf } : item
    );
    setCowCalves(updatedCalfList);
  };

  const deleteCalf = (id) => {
    const updatedCalfs = cowCalves.filter((calf) => calf.id !== id);
    setCowCalves(updatedCalfs);
  };

  const getCalfById = (id) => {
    // Find and return the calf with the given ID
    return cowCalves.find((calf) => calf.id === id);
  };

  const value = {
    cowCalves,
    setCowCalves, // Include setCowCalves in the value object
    addCalf,
    editCalf,
    deleteCalf,
    getCalfById,
  };

  return (
    <ManageCowCalfContext.Provider value={value}>
      {children}
    </ManageCowCalfContext.Provider>
  );
};

export const useManageCow = () => {
  const context = useContext(ManageCowCalfContext);
  if (!context) {
    throw new Error("useManageCow must be used within a ManageCowProvider");
  }
  return context;
};
