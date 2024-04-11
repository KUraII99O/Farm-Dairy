import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

export const ManagePregnancyContext = createContext<any>(null);

interface Pregnancy {
  id: string;
  stallNumber: string;
  pregnancyType: string;
  semenType: string;
  semenPushDate: string;
  pregnancyStartDate: string;
  pregnancyStatus: string;
  semenCost: string;
  otherCost: string;
  note: string;
}

export const ManagePregnancyProvider = ({ children }) => {
  const [pregnancies, setPregnancies] = useState<Pregnancy[]>([]);

 const fetchPregnancies = async (animalId) => {
      
      try {
        const response = await fetch('http://localhost:3000/pregnancies?animalId='+animalId);
        if (!response.ok) {
          throw new Error('Failed to fetch Pregnancy data');
        }
        const data = await response.json();
        setPregnancies(data);
      } catch (error) {
        console.error('Error fetching Pregnancy data:', error.message);
      }
    };
  const addPregnancy = async (newPregnancy: Pregnancy) => {
    try {
      newPregnancy.id= (pregnancies.length+1).toString ();
      const response = await fetch('http://localhost:3000/pregnancies', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        
        body: JSON.stringify(newPregnancy),
      });
       pregnancies.push(newPregnancy);

  
      if (!response.ok) {
        throw new Error('Failed to add pregnancy record');
      }
  
      // Get the newly added pregnancy from the response
      const addedPregnancy = await response.json();
  
      // Update the local state with the newly added pregnancy
      setPregnancies([...pregnancies, addedPregnancy]);
  
      // Optionally, you can show a success message
      toast.success('Pregnancy record added successfully!');
    } catch (error) {
      console.error('Error:', error.message);
      // Optionally, you can show an error message
      toast.error('An error occurred while adding new pregnancy record.');
    }
  };

  
 
  const editPregnancy = async (id: number, updatedPregnancy: Omit<Pregnancy, "id">) => {
    console.log(updatedPregnancy);
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
    console.log(id);
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
    getPregnancyById,
    fetchPregnancies
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
