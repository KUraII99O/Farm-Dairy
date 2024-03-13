import React, { createContext, useState, useContext } from "react";

export const ManageVaccineContext = createContext();

export const ManageVaccineProvider = ({ children }) => {
  const [vaccines, setVaccines] = useState([
    {
      id: 1,
      vaccineName: "Anthrax",
      periodDays: 120,
      repeatVaccine: "No",
      dose: "Annually in endemic areas.",
      note: "4 months and above",
    },
    {
      id: 2,
      vaccineName: "BDV",
      periodDays: 60,
      repeatVaccine: "No",
      dose: "Push this after 2 Months",
      note: "test test",
    },
    {
      id: 3,
      vaccineName: "BRSV",
      periodDays: 365,
      repeatVaccine: "No",
      dose: "Once a Year Use 2.0 ml using Injection.",
      note: "dsfdsf",
    },
    {
      id: 4,
      vaccineName: "BVD",
      periodDays: 90,
      repeatVaccine: "Yes",
      dose: "(Vial: 30 ml) Every 3 Months",
      note: "sdfdsfdsf",
    },
    {
      id: 5,
      vaccineName: "PI3",
      periodDays: 120,
      repeatVaccine: "No",
      dose: "3ml, midneck injection push.",
      note: "After 4 Months",
    },
    {
      id: 6,
      vaccineName: "Vitamin A",
      periodDays: 60,
      repeatVaccine: "Yes",
      dose: "Oral Single Table",
      note: "Twice a Month",
    },
    // Add more vaccines as needed
  ]);

  const addVaccine = (newVaccine) => {
    const maxId = Math.max(...vaccines.map((vaccine) => vaccine.id), 0);
    const newVaccineWithId = { ...newVaccine, id: maxId + 1 };
    setVaccines([...vaccines, newVaccineWithId]);
  };

  const editVaccine = (id, updatedVaccine) => {
    setVaccines((prevVaccines) =>
      prevVaccines.map((vaccine) => (vaccine.id === id ? { ...vaccine, ...updatedVaccine } : vaccine))
    );
  };

  const deleteVaccine = (id) => {
    const updatedVaccines = vaccines.filter((vaccine) => vaccine.id !== id);
    setVaccines(updatedVaccines);
  };

  const getVaccineById = (id) => {
    // Find and return the vaccine with the given ID
    return vaccines.find((vaccine) => vaccine.id === id);
  };

  const value = {
    vaccines,
    addVaccine,
    editVaccine,
    deleteVaccine,
    getVaccineById,
  };

  return (
    <ManageVaccineContext.Provider value={value}>
      {children}
    </ManageVaccineContext.Provider>
  );
};

export const useManageVaccine = () => {
  const context = useContext(ManageVaccineContext);
  if (!context) {
    throw new Error("useManageVaccine must be used within a ManageVaccineProvider");
  }
  return context;
};
