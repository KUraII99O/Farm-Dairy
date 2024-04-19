import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "../../Translator/Provider";

export const ManageCowContext = createContext<any>(null);

interface Cow {
  id: string;
  image: string; // Add image property
  gender: string;
  animalType: string;
  buyDate: Date;
  buyingPrice: number;
  pregnantStatus: boolean;
  milkPerDay: string;
  animalStatus: boolean;
  stallNumber: string;
  dateOfBirth: Date;
  animalAgeDays: string;
  weight: string;
  height: string;
  color: string;
  numOfPregnant: string;
  nextPregnancyApproxTime: string;
  buyFrom: string;
  prevVaccineDone: string;
  note: string;
  CreatedBy: string;
}

export const ManageCowProvider = ({ children }) => {
  const [cows, setCows] = useState<Cow[]>([]);
  const { translate } = useTranslation();

  useEffect(() => {
    const fetchCows = async () => {
      try {
        const response = await fetch('http://localhost:3000/cows');
        if (!response.ok) {
          throw new Error('Failed to fetch Cow data');
        }
        const data = await response.json();
        setCows(data);
      } catch (error) {
        console.error('Error fetching Cow data:', error.message);
      }
    };

    fetchCows();
  }, []);

  const addCow = async (newCow: Omit<Cow, 'id'>) => {
    try {
      const id = cows.length + 1;
      const cowWithId: Cow = { id, ...newCow };
        console.log(cowWithId);
      const response = await fetch('http://localhost:3000/cows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cowWithId),
      });

      if (!response.ok) {
        throw new Error('Failed to add cow');
      }

      setCows([...cows, cowWithId]);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const editCow = async (id: number, updatedCow: Partial<Cow>) => {
    try {
      const response = await fetch(`http://localhost:3000/cows/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCow),
      });

      if (!response.ok) {
        throw new Error('Failed to edit cow');
      }

      const updatedCows = cows.map((cow) =>
        cow.id === id ? { ...cow, ...updatedCow } : cow
      );

      setCows(updatedCows);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const deleteCow = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/cows/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete cow');
      }

      const updatedCows = cows.filter((cow) => cow.id !== id);
      setCows(updatedCows);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  
const ToggleStatus = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/cows/${id}/toggle-status`, {
      method: "PUT",
    });

    if (!response.ok) {
      throw new Error("Failed to toggle cow status");
    }

    const updatedCows = cows.map((cow) =>
      cow.id === id ? { ...cow, animalStatus: !cow.animalStatus } : cow
    );

    setCows(updatedCows);

    toast.info(translate("Cow status updated successfully"), { autoClose: 1000, hideProgressBar: true });
  } catch (error) {
    console.error("Error:", error.message);
    toast.error("Failed to toggle cow status", { autoClose: 2000, hideProgressBar: true });
  }
};


  const getCowById = (id: number) => {
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
    ToggleStatus
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
