import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

export const ManagePregnancyContext = createContext<any>(null);

interface Pregnancy {
  id: number;
  stallNumber: string;
  pregnancyType: string;
  semenType: string;
  semenPushDate: string;
  pregnancyStartDate: string;
  pregnancyStatus: string;
  semenCost: string;
  note: string;
}

export const ManagePregnancyProvider = ({ children }) => {
  const [pregnancies, setPregnancies] = useState<Pregnancy[]>([]);

  useEffect(() => {
    const fetchPregnancies = async () => {
      try {
        const response = await fetch('http://localhost:3000/pregnancies');
        if (!response.ok) {
          throw new Error('Failed to fetch Pregnancy data');
        }
        const data = await response.json();
        setPregnancies(data);
      } catch (error) {
        console.error('Error fetching Pregnancy data:', error.message);
      }
    };

    fetchPregnancies();
  }, []);

  const addPregnancy = async (newPregnancy: Omit<Pregnancy, 'id'>) => {
    try {
      // Generate a unique ID for the new pregnancy record
      newPregnancy.id = pregnancies.length + 1;
  
      const response = await fetch('http://localhost:3000/pregnancies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPregnancy),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add pregnancy record');
      }
  
      // Get the updated list of pregnancies from the server
      const updatedPregnancies = await response.json();
  
      // Update the state with the updated list of pregnancies
      setPregnancies(updatedPregnancies);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const editPregnancy = async (id: number, updatedPregnancy: Omit<Pregnancy, "id">) => {
    try {
      const response = await fetch(`http://localhost:3000/pregnancies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPregnancy),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update pregnancy record");
      }
  
      setPregnancies((prevPregnancies) =>
        prevPregnancies.map((pregnancy) =>
          pregnancy.id === id ? { ...pregnancy, ...updatedPregnancy } : pregnancy
        )
      );
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const deletePregnancy = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/pregnancies/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete pregnancy');
      }

      const updatedpregnancies = pregnancies.filter((Pregnancy) => Pregnancy.id !== id);
      setPregnancies(updatedpregnancies);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const getPregnancyById = (id) => {
    // Find and return the pregnancy with the given ID
    return pregnancies.find((pregnancy) => pregnancy.id === id);
  };

  const value = {
    pregnancies,
    addPregnancy,
    editPregnancy,
    deletePregnancy,
    getPregnancyById
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
