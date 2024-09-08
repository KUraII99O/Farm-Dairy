import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Pregnancy, PregnancyService } from "../CowPregnancyService";

export const ManagePregnancyContext = createContext<{
  pregnancies: Pregnancy[];
  addPregnancy: (newPregnancy: Omit<Pregnancy, 'id'>) => Promise<void>;
  editPregnancy: (id: string, updatedPregnancy: Omit<Pregnancy, 'id'>) => Promise<void>;
  deletePregnancy: (id: string) => Promise<void>;
} | undefined>(undefined);

type ProviderProps = {
  children: ReactNode;
};

export const ManagePregnancyProvider: React.FC<ProviderProps> = ({ children }) => {
  const [pregnancies, setPregnancies] = useState<Pregnancy[]>([]);
  const [animalId] = useState<string>(""); // Add state for animalId

  useEffect(() => {
    const fetchPregnanciesData = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
        console.log("User ID:", user.id); // Log user ID
        if (animalId) {
          const data = await PregnancyService.fetchPregnancies(animalId); // Pass animalId
          console.log("Pregnancies data:", data); // Log pregnancies data
          setPregnancies(data || []);
        }
      } catch (error) {
        console.error("Error fetching pregnancies:", error);
      }
    };

    fetchPregnanciesData();
  }, [animalId]); // Dependency on animalId

  const addPregnancy = async (newPregnancy: Omit<Pregnancy, 'id'>) => {
    console.log("Adding pregnancy:", newPregnancy);
    try {
      const data = await PregnancyService.addPregnancy(newPregnancy);
      console.log("Pregnancy added successfully:", data);
      setPregnancies(prevPregnancies => [...prevPregnancies, data]);
    } catch (error) {
      console.error("Error adding pregnancy:", error);
    }
  };

  const editPregnancy = async (id: string, updatedPregnancy: Omit<Pregnancy, 'id'>) => {
    try {
      await PregnancyService.editPregnancy(id, updatedPregnancy);
      setPregnancies(prevPregnancies =>
        prevPregnancies.map(pregnancy => (pregnancy.id === id ? { ...pregnancy, ...updatedPregnancy } : pregnancy))
      );
    } catch (error) {
      console.error("Error editing pregnancy:", error);
    }
  };

  const deletePregnancy = async (id: string) => {
    try {
      await PregnancyService.deletePregnancy(id);
      setPregnancies(prevPregnancies => prevPregnancies.filter(pregnancy => pregnancy.id !== id));
    } catch (error) {
      console.error("Error deleting pregnancy:", error);
    }
  };

  const value = {
    pregnancies,
    addPregnancy,
    editPregnancy,
    deletePregnancy
  };

  return (
    <ManagePregnancyContext.Provider value={value}>
      {children}
    </ManagePregnancyContext.Provider>
  );
};

export const useManagePregnancy = () => {
  const context = useContext(ManagePregnancyContext);
  if (!context) {
    throw new Error("useManagePregnancy must be used within a ManagePregnancyProvider");
  }
  return context;
};
