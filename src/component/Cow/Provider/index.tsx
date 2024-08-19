import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Cow, CowService } from "../CowService";

export const ManageCowContext = createContext<any>(null);


type ProviderProps = {
  children: ReactNode;
};


export const ManageCowProvider: React.FC <ProviderProps> = ({ children }) => {
  const [cows, setCows] = useState<Cow[]>([]);

  useEffect(() => {
    const fetchCowData = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
        console.log("User ID:", user.id); // Log user ID
  
        const data = await CowService.fetchCows(user.id);
        console.log("Cow data:", data); // Log cow data
        setCows(data || []);
      } catch (error) {
        console.error("Error fetching cows:", error);
      }
    };
  
    fetchCowData();
  }, []);

  const addCow = async (newCow: Omit<Cow, 'id'>) => {
    console.log("Adding cow:", newCow);
    try {
      const data = await CowService.addCow(newCow);
      console.log("Cow added successfully:", data);
      setCows(prevCows => [...prevCows, data]);
    } catch (error) {
      console.error("Error adding cow:", error);
    }
  };

  const editCow = async (id: string, updatedCow: Omit<Cow, 'id'>) => {
    try {
      await CowService.editCow(id, updatedCow);
      setCows(prevCows =>
        prevCows.map(cow => (cow.id === id ? { ...cow, ...updatedCow } : cow))
      );
    } catch (error) {
      console.error("Error editing cow:", error);
    }
  };

  const toggleCowStatus = async (id: string) => {
    try {
      await CowService.toggleCowStatus(id);
      setCows(prevCows =>
        prevCows.map(cow => (cow.id === id ? { ...cow, status: !cow.status } : cow))
      );
    } catch (error) {
      console.error("Error toggling cow status:", error);
    }
  };

  const deleteCow = async (id: string) => {
    try {
      await CowService.deleteCow(id);
      setCows(prevCows => prevCows.filter(cow => cow.id !== id));
    } catch (error) {
      console.error("Error deleting cow:", error);
    }
  };

  const value = {
    cows,
    addCow,
    editCow,
    deleteCow,
    toggleCowStatus
  };

  return (
    <ManageCowContext.Provider value={value}>
      {children}
    </ManageCowContext.Provider>
  );
};

export const useManageCows = () => {
  const context = useContext(ManageCowContext);
  if (!context) {
    throw new Error("useManageCows must be used within a ManageCowProvider");
  }
  return context;
};
