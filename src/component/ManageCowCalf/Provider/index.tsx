import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "../../Translator/Provider";

export const ManageCowCalfContext = createContext<any>(null);

interface CowCalf {
  id: number;
  image: File; // Add image property
  gender: string;
  animalType: string;
  buyDate: Date;
  buyingPrice: number;
  milkPerDay: string;
  status: boolean;
  stallNumber: string;
  dateOfBirth: Date;
  animalAgeDays: string;
  weight: string;
  height: string;
  color: string;
  numOfPregnant: string;
  buyFrom: string;
  prevVaccineDone: string;
  note: string;
  CreatedBy: string;
}

export const ManageCowCalfProvider = ({ children }) => {
  const [cowCalves, setCowCalves] = useState<CowCalf[]>([]);
  const { translate } = useTranslation();

  useEffect(() => {
    const fetchCowCalves = async () => {
      try {
        const response = await fetch('http://localhost:3000/calfs');
        if (!response.ok) {
          throw new Error('Failed to fetch CowCalf data');
        }
        const data = await response.json();
        setCowCalves(data);
      } catch (error) {
        console.error('Error fetching CowCalf data:', error.message);
      }
    };

    fetchCowCalves();
  }, []);

  const addCowCalf = async (newCowCalf: Omit<CowCalf, 'id'>) => {
    try {
      const id = cowCalves.length + 1;
      const cowCalfWithId: CowCalf = { id, ...newCowCalf };

      const response = await fetch('http://localhost:3000/calfs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cowCalfWithId),
      });

      if (!response.ok) {
        throw new Error('Failed to add cow calf');
      }

      setCowCalves([...cowCalves, cowCalfWithId]);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const editCowCalf = async (id: number, updatedCowCalf: Partial<CowCalf>) => {
    try {
      const response = await fetch(`http://localhost:3000/calfs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCowCalf),
      });

      if (!response.ok) {
        throw new Error('Failed to edit cow calf');
      }

      const updatedCowCalves = cowCalves.map((cowCalf) =>
        cowCalf.id === id ? { ...cowCalf, ...updatedCowCalf } : cowCalf
      );

      setCowCalves(updatedCowCalves);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const deleteCowCalf = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/calfs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete cow calf');
      }

      const updatedCowCalves = cowCalves.filter((cowCalf) => cowCalf.id !== id);
      setCowCalves(updatedCowCalves);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const toggleStatus = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/calfs/${id}/toggle-status`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Failed to toggle cow calf status");
      }

      const updatedCowCalves = cowCalves.map((cowCalf) =>
        cowCalf.id === id ? { ...cowCalf, status: !cowCalf.status } : cowCalf
      );

      setCowCalves(updatedCowCalves);

      toast.info(translate("Cow calf status updated successfully"), { autoClose: 1000, hideProgressBar: true });
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to toggle cow calf status", { autoClose: 2000, hideProgressBar: true });
    }
  };

  const getCowCalfById = (id: number) => {
    // Find and return the cow calf with the given ID
    return cowCalves.find((cowCalf) => cowCalf.id === id);
  };

  const value = {
    cowCalves,
    setCowCalves,
    
    addCowCalf,
    editCowCalf,
    deleteCowCalf,
    getCowCalfById,
    toggleStatus
  };

  return (
    <ManageCowCalfContext.Provider value={value}>
      {children}
    </ManageCowCalfContext.Provider>
  );
};

export const useManageCowCalf = () => {
  const context = useContext(ManageCowCalfContext);
  if (!context) {
    throw new Error("useManageCowCalf must be used within a ManageCowCalfProvider");
  }
  return context;
};
