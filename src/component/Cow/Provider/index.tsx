import React, { createContext, useState, useContext } from "react";

export const ManageCowContext = createContext();

export const ManageCowProvider = ({ children }) => {
  const [cows, setCows] = useState([
    {
      id: 1,
      image: "cow1.jpg",
      gender: "Female",
      animalType: "Dairy",
      buyDate: "2024-01-01",
      buyingPrice: "50",
      pregnantStatus: "Yes",
      milkPerDay: "10",
      animalStatus: "Active",
      informations: {
        stallNo: "C3",
        dateOfBirth: "2023-07-10",
        animalAgeDays: 230,
        weight: 300,
        height: 55,
        color: "Black",
        numOfPregnant: 1,
        nextPregnancyApproxTime: "2024-08-20",
        buyFrom: "Farm PQR",
        prevVaccineDone: "Yes",
        note: "This cow is currently resting due to health issues",
        createdBy: "Michael Smith",
      },
    },
    {
      id: 2,
      image: "cow2.jpg",
      gender: "Male",
      animalType: "Beef",
      buyDate: "2024-01-02",
      buyingPrice: "60",
      pregnantStatus: "No",
      milkPerDay: "0",
      animalStatus: "Active",
      informations: {
        stallNo: "A1",
        dateOfBirth: "2023-05-15",
        animalAgeDays: 300,
        weight: 350,
        height: 60,
        color: "Brown",
        numOfPregnant: 0,
        nextPregnancyApproxTime: null,
        buyFrom: "Farm XYZ",
        prevVaccineDone: "Yes",
        note: "This cow is ready for sale",
        createdBy: "Jessica Johnson",
      },
    },
    {
      id: 3,
      image: "cow3.jpg",
      gender: "Female",
      animalType: "Dairy",
      buyDate: "2024-01-03",
      buyingPrice: "55",
      pregnantStatus: "No",
      milkPerDay: "8",
      animalStatus: "Inactive",
      informations: {
        stallNo: "B2",
        dateOfBirth: "2023-08-20",
        animalAgeDays: 200,
        weight: 280,
        height: 52,
        color: "White",
        numOfPregnant: 0,
        nextPregnancyApproxTime: null,
        buyFrom: "Farm LMN",
        prevVaccineDone: "No",
        note: "This cow needs medical attention",
        createdBy: "John Doe",
      },
    },
    // Add more cows as needed
  ]);

  const addCow = (newCow) => {
    const maxId = Math.max(...cows.map((cow) => cow.id), 0);
    const newCowWithId = { ...newCow, id: maxId + 1 };
    setCows([...cows, newCowWithId]);
  };

  const editCow = (id, updatedCow) => {
    const updatedCowList = cows.map((item) =>
      item.id === id ? { ...item, ...updatedCow } : item
    );
    setCows(updatedCowList);
  };

  const deleteCow = (id) => {
    const updatedCows = cows.filter((cow) => cow.id !== id);
    setCows(updatedCows);
  };

  const getCowById = (id) => {
    // Find and return the cow with the given ID
    return cows.find((cow) => cow.id === id);
  };

  const value = {
    cows,
    setCows, // Include setCows in the value object
    addCow,
    editCow,
    deleteCow,
    getCowById,
  };

  return (
    <ManageCowContext.Provider value={value}>
      {children}
    </ManageCowContext.Provider>
  );
};

export const useManageCow = () => {
  const context = useContext(ManageCowContext);
  if (!context) {
    throw new Error("useManageCow must be used within a ManageCowProvider");
  }
  return context;
};
